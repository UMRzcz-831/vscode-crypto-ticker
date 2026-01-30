# Quick Start Guide - Crypto Ticker

## 🚀 Getting Started

### Installation & Development

1. **Install Dependencies**
   ```bash
   cd vscode-crypto-ticker
   npm install
   ```

2. **Compile the Extension**
   ```bash
   npm run compile
   ```

3. **Run in Development Mode**
   - Press `F5` in VS Code
   - This will open a new "Extension Development Host" window
   - The extension will be automatically loaded

4. **Test the Extension**
   - Look at the bottom-right status bar
   - You should see crypto prices like: `BTC $45,234 +2.3%`
   - Click on any price to refresh

### Building a VSIX Package

To create an installable `.vsix` file:

```bash
npm install -g @vscode/vsce
npm run package
```

This creates `crypto-ticker-0.1.0.vsix` that you can:
- Install locally via VS Code Extensions → "Install from VSIX..."
- Share with others
- Publish to the VS Code Marketplace

### Publishing to Marketplace

1. **Create a Publisher Account**
   - Go to https://marketplace.visualstudio.com/manage
   - Create a publisher ID

2. **Update package.json**
   - Change `"publisher"` field to your publisher ID

3. **Get a Personal Access Token**
   - Go to https://dev.azure.com
   - Create a PAT with Marketplace scope

4. **Publish**
   ```bash
   vsce login <your-publisher-id>
   vsce publish
   ```

## 🛠️ Development

### Project Structure

```
vscode-crypto-ticker/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── cryptoService.ts      # API service for fetching prices
│   └── statusBarManager.ts   # Status bar UI management
├── package.json              # Extension manifest
├── tsconfig.json            # TypeScript configuration
└── README.md                # Documentation
```

### Key Files

- **extension.ts**: Activates the extension, registers commands, handles lifecycle
- **cryptoService.ts**: Fetches crypto prices from CoinGecko API
- **statusBarManager.ts**: Manages status bar items and updates

### Available Commands

While developing, you can test these commands via `Cmd+Shift+P`:

- `Crypto Ticker: Refresh Prices`
- `Crypto Ticker: Toggle Display`
- `Crypto Ticker: Configure Settings`

### Testing Changes

1. Make code changes
2. Run `npm run compile` (or use `npm run watch` for auto-compile)
3. Press `Ctrl+R` (or `Cmd+R` on Mac) in the Extension Development Host to reload
4. Test your changes

## 📝 Configuration

Test different configurations in your `settings.json`:

```json
{
  "cryptoTicker.refreshInterval": 30,
  "cryptoTicker.displayFormat": "compact",
  "cryptoTicker.enabledCoins": ["BTC", "ETH", "SOL"],
  "cryptoTicker.showChangePercentage": true
}
```

## 🐛 Debugging

- Set breakpoints in your TypeScript code
- Use `console.log()` - output appears in Debug Console
- Check "Devls" console for errors (Help → Toggle Developer Tools)

## 📚 Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [CoinGecko API Docs](https://www.coingecko.com/api/documentation)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## 🎯 Next Steps

Ideas for enhancements:
- Add more cryptocurrencies
- Add price alerts
- Show price charts
- Add favorites/watchlist
- Support multiple currencies (EUR, GBP, etc.)
- Add historical price data
- Implement WebSocket for real-time updates

Happy coding! 🚀
