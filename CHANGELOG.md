# Crypto Ticker

## [0.1.0] - 2026-01-30

### Added
- Initial release
- Real-time price tracking for Bitcoin (BTC), Ethereum (ETH), and Solana (SOL)
- Status bar integration with live price updates
- Configurable refresh intervals (minimum 10 seconds)
- 24-hour price change indicators with color coding
- Two display formats: compact and detailed
- Commands:
  - Refresh prices manually
  - Toggle display on/off
  - Configure settings
- Automatic price updates based on configured interval
- Detailed tooltips on hover showing:
  - Current price
  - 24-hour change percentage
  - Last update time
- Configuration options:
  - Refresh interval
  - Display format
  - Enabled coins selection
  - Show/hide change percentage

### Features
- Uses CoinGecko API for reliable price data
- Caching mechanism to handle API failures gracefully
- Color-coded price changes (green for positive, red for negative)
- Low memory footprint
- Non-intrusive status bar display

### Technical
- TypeScript implementation
- Axios for HTTP requests
- VS Code API 1.75.0+
- Modular architecture with separate services
