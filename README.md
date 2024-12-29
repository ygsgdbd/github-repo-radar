# GitHub Repo Radar <img src="assets/icon.svg" alt="GitHub Repo Radar Logo" width="32" height="32" align="right" />

[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/github-repo-radar)](https://chrome.google.com/webstore/detail/github-repo-radar)
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/github-repo-radar)](https://chrome.google.com/webstore/detail/github-repo-radar)
[![GitHub License](https://img.shields.io/github/license/ygsgdbd/github-repo-radar)](https://github.com/ygsgdbd/github-repo-radar/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ygsgdbd/github-repo-radar/pulls)

A Chrome extension that enhances your GitHub repository search experience by displaying repository information directly in search results.

![GitHub repository information displayed in Google search results](screenshots/google_search.png)

## Tech Stack

- ⚛️ **React** - UI development
- 🎨 **Tailwind CSS** - Styling
- 🧩 **Plasmo** - Extension framework
- 📦 **TypeScript** - Type safety
- 🔧 **Chrome Extension Manifest V3** - Extension architecture

## Features

- 🔍 Shows repository information in Google search results
- ⭐️ Displays stars and forks count
- 📝 Shows primary programming language
- ⚖️ Displays repository license
- 🕒 Shows last update time
- 🌓 Supports dark mode
- 🔒 Privacy focused - no data collection

## Roadmap

- 🔄 Support for more search engines:
  - Bing
  - DuckDuckGo
  - Baidu
  - More to come...

## Installation

> ⚠️ This extension is currently under review by the Chrome Web Store. Once approved, you'll be able to install it directly from there.

### Manual Installation
1. Clone this repository
2. Run `pnpm install && pnpm build`
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the `build/chrome-mv3-dev` folder

## Development

This extension is built with [Plasmo](https://docs.plasmo.com/).

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Package for distribution
pnpm package
```

The development build will be in `build/chrome-mv3-dev`.

## Privacy

This extension is designed with privacy in mind:
- No data collection
- No external servers
- All processing happens locally
- Minimal permissions required

Read our full [Privacy Policy](PRIVACY.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Plasmo Framework](https://docs.plasmo.com/)
- Badges provided by [Shields.io](https://shields.io/)
