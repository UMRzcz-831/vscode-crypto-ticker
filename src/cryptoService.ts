import axios from 'axios';

export interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
  changePercentage24h: number;
  lastUpdate: Date;
}

export class CryptoService {
  private readonly API_BASE_URL = 'https://api.coingecko.com/api/v3';
  private cache: Map<string, CryptoPrice> = new Map();
  private cacheTimeout = 30000; // 30 seconds

  private readonly COIN_IDS: { [key: string]: string } = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'SOL': 'solana'
  };

  /**
   * 获取多个加密货币的价格
   */
  async getPrices(symbols: string[]): Promise<CryptoPrice[]> {
    try {
      const coinIds = symbols.map(s => this.COIN_IDS[s]).filter(Boolean);
      
      if (coinIds.length === 0) {
        return [];
      }

      const response = await axios.get(`${this.API_BASE_URL}/simple/price`, {
        params: {
          ids: coinIds.join(','),
          vs_currencies: 'usd',
          include_24hr_change: true,
          include_24hr_vol: false
        },
        timeout: 5000
      });

      const prices: CryptoPrice[] = [];
      
      for (const [symbol, coinId] of Object.entries(this.COIN_IDS)) {
        if (!symbols.includes(symbol)) {
          continue;
        }

        const data = response.data[coinId];
        if (data) {
          const price: CryptoPrice = {
            symbol,
            price: data.usd,
            change24h: data.usd_24h_change || 0,
            changePercentage24h: data.usd_24h_change || 0,
            lastUpdate: new Date()
          };
          
          this.cache.set(symbol, price);
          prices.push(price);
        }
      }

      return prices;
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      // 返回缓存数据
      return this.getCachedPrices(symbols);
    }
  }

  /**
   * 获取单个加密货币的价格
   */
  async getPrice(symbol: string): Promise<CryptoPrice | null> {
    const prices = await this.getPrices([symbol]);
    return prices.length > 0 ? prices[0] : null;
  }

  /**
   * 获取缓存的价格
   */
  private getCachedPrices(symbols: string[]): CryptoPrice[] {
    const cached: CryptoPrice[] = [];
    
    for (const symbol of symbols) {
      const price = this.cache.get(symbol);
      if (price) {
        cached.push(price);
      }
    }
    
    return cached;
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * 格式化价格显示
   */
  formatPrice(price: number): string {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(4)}`;
    }
  }

  /**
   * 格式化变化百分比
   */
  formatChangePercentage(change: number): string {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  }

  /**
   * 获取变化颜色（用于状态栏）
   */
  getChangeColor(change: number): string {
    if (change > 0) {
      return '#00ff00'; // 绿色
    } else if (change < 0) {
      return '#ff0000'; // 红色
    }
    return '#ffffff'; // 白色
  }
}
