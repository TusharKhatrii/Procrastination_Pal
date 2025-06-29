
# Procrastination Pal 🎬

A simple Chrome extension that calculates the total duration of YouTube playlists, helping you understand exactly how much time you're about to spend watching videos.

## Features ✨

- **Quick Calculation**: Get total playlist duration with one click
- **Clean Interface**: Simple, user-friendly popup design
- **Smart Detection**: Automatically finds video durations on playlist pages
- **Multiple Formats**: Displays results in hours, minutes, and seconds
- **Error Handling**: Clear feedback when something goes wrong
- **No Data Collection**: Works entirely locally, no external servers

## Installation 🚀

### Option 1: Manual Installation (Recommended)

1. **Download the extension files**:
   - Clone this repository or download the ZIP file
   - Extract to a folder on your computer

2. **Load into Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked" 
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

### Option 2: Chrome Web Store
*Coming soon...*

## How to Use 📖

1. **Navigate to YouTube**: Go to any YouTube playlist page
   - Example: `https://www.youtube.com/playlist?list=...`
   - Scroll till end to get accurate result


2. **Open the extension**: Click the Procrastination Pal icon in your browser toolbar

3. **Calculate duration**: Click the "Calculate Playlist Duration" button

4. **View results**: The total duration will be displayed in the popup

## File Structure 📁

```
procrastination-pal/
├── manifest.json       # Extension configuration
├── index.html         # Extension popup interface
├── main.js          # Main extension logic
└── README.md         # This file
```

## Technical Details 🔧

### Permissions
- `scripting`: Required to inject code into YouTube pages
- `activeTab`: Access to the currently active tab
- `https://www.youtube.com/*`: Permission to run on YouTube

### How It Works
1. Extension detects if you're on a YouTube playlist page
2. Injects a content script to scan for video duration elements
3. Uses multiple CSS selectors as fallbacks (YouTube changes their layout frequently)
4. Calculates total time and displays in a user-friendly format

### Browser Compatibility
- Chrome (Manifest V3)
- Edge (Chromium-based)
- Other Chromium-based browsers

## Troubleshooting 🔍

### "Please navigate to a YouTube playlist page first"
- Make sure you're on a playlist URL (contains `/playlist?list=`)
- Regular video pages won't work, only playlist pages

### "Could not find video durations"
- Try scrolling down to load more playlist videos
- Refresh the page and try again
- Some private or restricted playlists may not work

### Extension not appearing
- Check that it's enabled in `chrome://extensions/`
- Try reloading the extension
- Make sure all files are in the same folder

### Results seem incorrect
- YouTube may have changed their layout (this happens frequently)
- Some videos might be hidden or not fully loaded
- Try scrolling through the entire playlist first

## Development 💻

### Building from Source
```bash
# Clone the repository
git clone [your-repo-url]
cd procrastination-pal

# No build process needed - it's pure HTML/CSS/JS
# Just load the folder directly into Chrome
```

### Making Changes
1. Edit the relevant files (`index.html`, `main.js`, `manifest.json`)
2. Go to `chrome://extensions/`
3. Click the refresh button on the Procrastination Pal extension
4. Test your changes

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Known Issues 🐛

- YouTube frequently changes their HTML structure, which may break duration detection
- Very long playlists (1000+ videos) might take longer to calculate
- Some playlist videos may not be accessible due to privacy settings

## Privacy 🔒

Procrastination Pal:
- ✅ Works entirely locally on your device
- ✅ Does not collect any personal data
- ✅ Does not send data to external servers
- ✅ Only accesses YouTube pages when you explicitly use the extension
- ✅ Open source - you can verify the code yourself

## Changelog 📝

### Version 1.0.0
- Initial release
- Basic playlist duration calculation
- Clean popup interface
- Multiple fallback selectors for YouTube changes


## Support 💬

Having issues? Here's how to get help:

1. **Check the troubleshooting section** above
2. **Open an issue** on GitHub with:
   - Your Chrome version
   - The playlist URL you're trying to use
   - Any error messages you see
   - Steps to reproduce the problem

## Acknowledgments 🙏

- Thanks to the YouTube team for their platform (even though they keep changing the HTML structure 😅)
- Inspired by the need to know "how much time am I about to waste?"

---

**Made with ❤️ for fellow procrastinators everywhere**