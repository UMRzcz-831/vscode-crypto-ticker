import * as vscode from 'vscode';
import { CryptoService, CryptoPrice } from './cryptoService';

export class StatusBarManager {
  private statusBarItems: Map<string, vscode.StatusBarItem> = new Map();
  private cryptoService: CryptoService;
  private updateInterval?: NodeJS.Timeout;
  private isEnabled: boolean = true;

  constructor(private context: vscode.ExtensionContext) {
    this.cryptoService = new CryptoService();
  }

  /**
   * 初始化状态栏项目
   */
  initialize(): void {
    const config = vscode.workspace.getConfiguration('cryptoTicker');
    const enabledCoins = config.get<string[]>('enabledCoins', ['BTC', 'ETH', 'SOL']);

    // 为每个启用的币创建状态栏项目
    let priority = 100;
    for (const symbol of enabledCoins) {
      const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        priority--
      );
      
      statusBarItem.command = 'crypto-ticker.refresh';
      statusBarItem.tooltip = `Click to refresh ${symbol} price`;
      this.statusBarItems.set(symbol, statusBarItem);
      this.context.subscriptions.push(statusBarItem);
      
      if (this.isEnabled) {
        statusBarItem.show();
      }
    }

    // 首次更新
    this.updatePrices();

    // 设置定时更新
    this.startAutoUpdate();
  }

  /**
   * 更新价格显示
   */
  async updatePrices(): Promise<void> {
    try {
      const config = vscode.workspace.getConfiguration('cryptoTicker');
      const enabledCoins = config.get<string[]>('enabledCoins', ['BTC', 'ETH', 'SOL']);
      const showChange = config.get<boolean>('showChangePercentage', true);
      const displayFormat = config.get<string>('displayFormat', 'compact');

      const prices = await this.cryptoService.getPrices(enabledCoins);

      for (const price of prices) {
        const statusBarItem = this.statusBarItems.get(price.symbol);
        if (statusBarItem) {
          statusBarItem.text = this.formatStatusBarText(price, showChange, displayFormat);
          statusBarItem.tooltip = this.formatTooltip(price);
          
          // 设置颜色
          if (showChange) {
            if (price.changePercentage24h > 0) {
              statusBarItem.color = '#00ff00';
            } else if (price.changePercentage24h < 0) {
              statusBarItem.color = '#ff0000';
            } else {
              statusBarItem.color = undefined;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error updating prices:', error);
      vscode.window.showErrorMessage('Failed to update crypto prices. Please try again.');
    }
  }

  /**
   * 格式化状态栏文本
   */
  private formatStatusBarText(price: CryptoPrice, showChange: boolean, format: string): string {
    const priceStr = this.cryptoService.formatPrice(price.price);
    
    if (format === 'detailed') {
      if (showChange) {
        const changeStr = this.cryptoService.formatChangePercentage(price.changePercentage24h);
        return `${price.symbol}: ${priceStr} (${changeStr})`;
      }
      return `${price.symbol}: ${priceStr}`;
    } else {
      // compact format
      if (showChange) {
        const changeStr = this.cryptoService.formatChangePercentage(price.changePercentage24h);
        return `${price.symbol} ${priceStr} ${changeStr}`;
      }
      return `${price.symbol} ${priceStr}`;
    }
  }

  /**
   * 格式化提示文本
   */
  private formatTooltip(price: CryptoPrice): string {
    const lines = [
      `${price.symbol} Price Information`,
      `────────────────────`,
      `Current Price: ${this.cryptoService.formatPrice(price.price)}`,
      `24h Change: ${this.cryptoService.formatChangePercentage(price.changePercentage24h)}`,
      `Last Updated: ${price.lastUpdate.toLocaleTimeString()}`,
      ``,
      `Click to refresh`
    ];
    
    return lines.join('\n');
  }

  /**
   * 开始自动更新
   */
  private startAutoUpdate(): void {
    this.stopAutoUpdate();
    
    const config = vscode.workspace.getConfiguration('cryptoTicker');
    const interval = config.get<number>('refreshInterval', 30) * 1000;

    this.updateInterval = setInterval(() => {
      this.updatePrices();
    }, interval);
  }

  /**
   * 停止自动更新
   */
  private stopAutoUpdate(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = undefined;
    }
  }

  /**
   * 切换显示状态
   */
  toggle(): void {
    this.isEnabled = !this.isEnabled;
    
    for (const [_, item] of this.statusBarItems) {
      if (this.isEnabled) {
        item.show();
      } else {
        item.hide();
      }
    }

    vscode.window.showInformationMessage(
      `Crypto Ticker ${this.isEnabled ? 'enabled' : 'disabled'}`
    );
  }

  /**
   * 重新配置
   */
  reconfigure(): void {
    // 清理现有状态栏项目
    for (const [_, item] of this.statusBarItems) {
      item.dispose();
    }
    this.statusBarItems.clear();
    
    // 重新初始化
    this.initialize();
    
    vscode.window.showInformationMessage('Crypto Ticker settings updated');
  }

  /**
   * 清理资源
   */
  dispose(): void {
    this.stopAutoUpdate();
    for (const [_, item] of this.statusBarItems) {
      item.dispose();
    }
    this.statusBarItems.clear();
  }
}
