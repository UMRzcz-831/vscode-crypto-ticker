# Crypto Ticker for VS Code

A real-time cryptocurrency price ticker extension for Visual Studio Code that displays live prices for Bitcoin (BTC), Ethereum (ETH), and Solana (SOL) in the status bar.

## Features

- 📊 **Real-time Price Updates**: Automatically fetches and displays crypto prices at configurable intervals
- 💹 **24h Change Indicators**: Shows price change percentages with color-coded indicators (green for up, red for down)
- ⚙️ **Customizable**: Configure which coins to display, refresh intervals, and display format
- 🎨 **Clean UI**: Compact status bar display that doesn't clutter your workspace
- 📈 **Detailed Tooltips**: Hover over any coin to see detailed price information

## Screenshots

The extension displays crypto prices in your status bar like this:

```
BTC $45,234.50 +2.34% | ETH $2,456.78 -1.23% | SOL $98.45 +5.67%
```

## Installation

### From VSIX (Manual Installation)

1. Download the latest `.vsix` file from releases
2. Open VS Code
3. Go to Extensions view (`Cmd+Shift+X` or `Ctrl+Shift+X`)
4. Click the `...` menu at the top
5. Select "Install from VSIX..."
6. Choose the downloaded `.vsix` file

### From Source

1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press `F5` to open a new VS Code window with the extension loaded

## Usage

### Commands

Access these commands via the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`):

- **Crypto Ticker: Refresh Prices** - Manually refresh all cryptocurrency prices
- **Crypto Ticker: Toggle Display** - Show/hide the ticker in the status bar
- **Crypto Ticker: Configure Settings** - Open extension settings

### Configuration

Configure the extension through VS Code settings:

```json
{
  // Refresh interval in seconds (minimum: 10)
  "cryptoTicker.refreshInterval": 30,
  
  // Display format: "compact" or "detailed"
  "cryptoTicker.displayFormat": "compact",
  
  // Coins to display
  "cryptoTicker.enabledCoins": ["BTC", "ETH", "SOL"],
  
  // Show 24h price change percentage
  "cryptoTicker.showChangePercentage": true
}
```

#### Settings Details

- **refreshInterval**: How often to fetch new prices (in seconds). Default is 30 seconds. Minimum value is 10 seconds to avoid API rate limiting.

- **displayFormat**: 
  - `compact`: Shows prices in a condensed format (e.g., `BTC $45,234 +2.3%`)
  - `detailed`: Shows more descriptive format (e.g., `BTC: $45,234.50 (+2.34%)`)

- **enabledCoins**: Array of coin symbols to display. Available options: `BTC`, `ETH`, `SOL`

- **showChangePercentage**: Toggle display of 24-hour price change percentage

## API

This extension uses the [CoinGecko API](https://www.coingecko.com/api/documentation) to fetch cryptocurrency prices. The API is free and doesn't require authentication for basic usage.

## Requirements

- VS Code 1.75.0 or higher
- Internet connection for fetching prices

## Known Issues

- Prices may be delayed by a few seconds due to API caching
- Very frequent refresh rates (< 10 seconds) are not supported to comply with API rate limits

## Release Notes

### 0.1.0

Initial release:
- Real-time price tracking for BTC, ETH, and SOL
- Configurable refresh intervals
- 24h change indicators
- Multiple display formats
- Compact status bar integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Privacy

This extension:
- Makes API calls to CoinGecko for price data
- Does not collect or transmit any personal information
- Does not require any authentication or API keys

## Support

If you encounter any issues or have feature requests, please file an issue on the GitHub repository.

---

**Enjoy tracking your crypto prices!** 🚀📈
