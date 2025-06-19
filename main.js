document.addEventListener('DOMContentLoaded', function () {
    const calcBtn = document.getElementById('calc-btn');
    const resultDiv = document.getElementById('result');

    calcBtn.addEventListener('click', async function () {
        try {
            // Get the current active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // Check if we're on a YouTube playlist page
            if (!tab.url || !tab.url.includes('youtube.com/playlist')) {
                showResult('Please navigate to a YouTube playlist page first.', 'error');
                return;
            }

            // Disable button and show loading
            calcBtn.disabled = true;
            calcBtn.textContent = 'Calculating...';
            showResult('Analyzing playlist videos...', 'loading');

            // Inject and execute the content script
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: calculatePlaylistDuration
            });

            const result = results[0].result;

            if (result.success) {
                showResult(
                    `Total Duration: ${result.duration}`,
                    'success'
                );
            } else {
                showResult(result.error, 'error');
            }

        } catch (error) {
            console.error('Extension error:', error);
            showResult('Error: Could not access the page. Please refresh and try again.', 'error');
        } finally {
            // Re-enable button
            calcBtn.disabled = false;
            calcBtn.textContent = 'Calculate Playlist Duration';
        }
    });

    function showResult(message, type) {
        resultDiv.innerHTML = message;
        resultDiv.className = type;
        resultDiv.style.display = 'block';
    }
});

function calculatePlaylistDuration() {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 15; // 15 seconds timeout

        const interval = setInterval(() => {
            attempts++;

            
             const selectors = [
                'span.ytd-thumbnail-overlay-time-status-renderer',
                'div.badge-shape-wiz__text',
                'span.style-scope.ytd-thumbnail-overlay-time-status-renderer',
                '#text.ytd-thumbnail-overlay-time-status-renderer',
                '.ytd-thumbnail-overlay-time-status-renderer #text',
                'ytd-thumbnail-overlay-time-status-renderer #text'
            ];
            
            let durationElements = [];
            
            // Try each selector
            for (const selector of selectors) {
                durationElements = Array.from(document.querySelectorAll(selector));
                if (durationElements.length > 0) {
                    break;
                }
            }

            // Fallback: look for time-like patterns in any element
            if (durationElements.length === 0) {
                const timeRegex = /^\d{1,2}:\d{2}(:\d{2})?$/;
                const allSpans = document.querySelectorAll('span');

                durationElements = Array.from(allSpans).filter(el => {
                    const text = el.textContent?.trim();
                    return text && timeRegex.test(text) &&
                        el.children.length === 0 && // Only leaf nodes
                        !el.closest('input, textarea, script, style');
                });
            }

            if (durationElements.length === 0) {
                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    resolve({
                        success: false,
                        error: 'Could not find video durations. Make sure you\'re on a playlist page and videos are loaded.'
                    });
                    return;
                }
                return; // Continue trying
            }

            // Extract and validate durations
            const videoDurations = durationElements
                .map(el => el.textContent?.trim())
                .filter(dur => dur && /^\d{1,2}:\d{2}(:\d{2})?$/.test(dur))
                .filter((dur, index, arr) => arr.indexOf(dur) === index); // Remove duplicates

            if (videoDurations.length === 0) {
                return; // Continue trying
            }

            clearInterval(interval);

            // Convert duration to seconds
            function durationToSeconds(duration) {
                const parts = duration.split(':').map(Number);
                if (parts.length === 3) {
                    return parts[0] * 3600 + parts[1] * 60 + parts[2];
                }
                if (parts.length === 2) {
                    return parts[0] * 60 + parts[1];
                }
                return 0;
            }

            // Calculate total
            const totalSeconds = videoDurations.reduce((sum, dur) => sum + durationToSeconds(dur), 0);

            // Format result
            function formatSeconds(seconds) {
                const h = Math.floor(seconds / 3600);
                const m = Math.floor((seconds % 3600) / 60);
                const s = (seconds % 60);

                if (h > 0) {
                    return `${h}h ${m}m ${s}s`;
                } else {
                    return `${m}m ${s}s`;
                }
            }

            resolve({
                success: true,
                duration: formatSeconds(totalSeconds),
                count: videoDurations.length,
                totalSeconds: totalSeconds
            });

        }, 1000);
    });
}