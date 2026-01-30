import * as vscode from 'vscode';
import { StatusBarManager } from './statusBarManager';

let statusBarManager: StatusBarManager | undefined;

/**
 * 插件激活时调用
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Crypto Ticker extension is now active');

  // 创建状态栏管理器
  statusBarManager = new StatusBarManager(context);
  statusBarManager.initialize();

  // 注册刷新命令
  const refreshCommand = vscode.commands.registerCommand('crypto-ticker.refresh', async () => {
    if (statusBarManager) {
      await statusBarManager.updatePrices();
      vscode.window.showInformationMessage('Crypto prices refreshed');
    }
  });

  // 注册切换显示命令
  const toggleCommand = vscode.commands.registerCommand('crypto-ticker.toggle', () => {
    if (statusBarManager) {
      statusBarManager.toggle();
    }
  });

  // 注册配置命令
  const configureCommand = vscode.commands.registerCommand('crypto-ticker.configure', () => {
    if (statusBarManager) {
      statusBarManager.reconfigure();
    }
  });

  // 监听配置变化
  const configChangeListener = vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('cryptoTicker')) {
      if (statusBarManager) {
        statusBarManager.reconfigure();
      }
    }
  });

  // 添加到订阅列表
  context.subscriptions.push(
    refreshCommand,
    toggleCommand,
    configureCommand,
    configChangeListener
  );

  // 显示欢迎消息
  vscode.window.showInformationMessage('Crypto Ticker is now running! 🚀');
}

/**
 * 插件停用时调用
 */
export function deactivate() {
  if (statusBarManager) {
    statusBarManager.dispose();
    statusBarManager = undefined;
  }
  console.log('Crypto Ticker extension is now deactivated');
}
