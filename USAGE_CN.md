# Crypto Ticker - 使用指南

## 功能介绍

这是一个 VS Code 插件，可以在状态栏实时显示加密货币价格（SOL、BTC、ETH）。

## 快速开始

### 1. 安装依赖
```bash
cd vscode-crypto-ticker
npm install
```

### 2. 开发模式运行

#### 方法一：使用 VS Code 调试
1. 用 VS Code 打开此项目
2. 按 `F5` 键
3. 会自动打开一个新的 VS Code 窗口（Extension Development Host）
4. 在新窗口的右下角状态栏就能看到加密货币价格了

#### 方法二：手动编译和安装
```bash
# 编译
npm run compile

# 打包成 .vsix 文件
npm install -g @vscode/vsce
npm run package

# 会生成 crypto-ticker-0.1.0.vsix 文件
```

然后在 VS Code 中：
1. 打开扩展视图 (Cmd+Shift+X 或 Ctrl+Shift+X)
2. 点击右上角的 `...` 菜单
3. 选择 "从 VSIX 安装..."
4. 选择生成的 `.vsix` 文件

### 3. 使用插件

安装后，你会在 VS Code 右下角状态栏看到：

```
SOL $98.45 +5.67% | ETH $2,456.78 -1.23% | BTC $45,234.50 +2.34%
```

#### 可用命令

按 `Cmd+Shift+P` (Mac) 或 `Ctrl+Shift+P` (Windows/Linux) 打开命令面板，输入：

1. **Crypto Ticker: Refresh Prices** - 手动刷新价格
2. **Crypto Ticker: Toggle Display** - 显示/隐藏价格显示
3. **Crypto Ticker: Configure Settings** - 配置设置

#### 点击功能

- 点击任何一个加密货币价格 → 刷新所有价格
- 鼠标悬停在价格上 → 显示详细信息（当前价格、24小时变化、最后更新时间）

## 配置选项

打开 VS Code 设置 (Cmd+, 或 Ctrl+,)，搜索 "Crypto Ticker"：

```json
{
  // 刷新间隔（秒），最小 10 秒
  "cryptoTicker.refreshInterval": 30,
  
  // 显示格式："compact" 或 "detailed"
  "cryptoTicker.displayFormat": "compact",
  
  // 要显示的币种
  "cryptoTicker.enabledCoins": ["BTC", "ETH", "SOL"],
  
  // 是否显示 24 小时涨跌幅
  "cryptoTicker.showChangePercentage": true
}
```

### 配置说明

#### refreshInterval (刷新间隔)
- 默认：30 秒
- 最小值：10 秒
- 说明：价格更新的频率

#### displayFormat (显示格式)
- **compact**（紧凑）: `BTC $45,234 +2.3%`
- **detailed**（详细）: `BTC: $45,234.50 (+2.34%)`

#### enabledCoins (显示的币种)
可以选择显示哪些币种，支持：
- `BTC` - 比特币
- `ETH` - 以太坊
- `SOL` - Solana

示例：
```json
// 只显示 BTC 和 ETH
"cryptoTicker.enabledCoins": ["BTC", "ETH"]
```

#### showChangePercentage (显示涨跌幅)
- `true`: 显示 24 小时涨跌幅百分比
- `false`: 只显示价格

## 颜色说明

- 🟢 **绿色**：价格上涨
- 🔴 **红色**：价格下跌
- ⚪ **白色**：价格无变化

## 项目结构

```
vscode-crypto-ticker/
├── src/                      # 源代码
│   ├── extension.ts          # 插件入口
│   ├── cryptoService.ts      # 价格服务（调用 CoinGecko API）
│   └── statusBarManager.ts   # 状态栏管理
├── out/                      # 编译后的 JavaScript 文件
├── package.json              # 插件配置文件
├── tsconfig.json            # TypeScript 配置
├── README.md                # 英文文档
├── QUICKSTART.md            # 快速开始指南
└── USAGE_CN.md              # 本文件（中文使用说明）
```

## 开发调试

### 1. 监听模式编译
```bash
npm run watch
```
这样修改代码后会自动重新编译。

### 2. 重新加载插件
在 Extension Development Host 窗口中：
- Mac: `Cmd+R`
- Windows/Linux: `Ctrl+R`

### 3. 查看日志
- 打开开发者工具：Help → Toggle Developer Tools
- 查看 Console 面板

## API 说明

本插件使用 [CoinGecko API](https://www.coingecko.com/api/documentation) 获取价格数据：
- 免费使用
- 无需注册或 API Key
- 支持全球加密货币价格

## 常见问题

### Q: 为什么价格不更新？
A: 
1. 检查网络连接
2. 确认刷新间隔设置（最小 10 秒）
3. 手动点击价格或运行 "Refresh Prices" 命令

### Q: 可以添加更多币种吗？
A: 当前版本支持 BTC、ETH、SOL。如需添加更多币种，可以修改 `cryptoService.ts` 中的 `COIN_IDS` 映射。

### Q: 价格延迟多少？
A: 价格数据来自 CoinGecko API，通常有几秒到几十秒的延迟。

### Q: 会不会影响 VS Code 性能？
A: 不会。插件使用定时器定期获取价格，内存占用极小，不会影响编辑器性能。

## 未来计划

- [ ] 支持更多加密货币
- [ ] 价格提醒功能
- [ ] 价格图表显示
- [ ] 支持多种法币（EUR、GBP 等）
- [ ] 历史价格数据
- [ ] WebSocket 实时价格推送

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**祝你使用愉快！** 🚀📈
