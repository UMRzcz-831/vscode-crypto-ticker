# 🐛 故障排查指南

## 常见问题解决方案

### 问题：command 'crypto-ticker.toggle' not found

这个错误通常发生在以下情况：

#### 解决方案 1: 重新加载窗口

1. 按 `Cmd+Shift+P` (Mac) 或 `Ctrl+Shift+P` (Windows/Linux)
2. 输入并选择 **"Developer: Reload Window"**
3. 等待 VS Code 重新加载
4. 再次尝试命令

#### 解决方案 2: 卸载并重新安装

1. 打开扩展视图 (`Cmd+Shift+X` 或 `Ctrl+Shift+X`)
2. 找到 "Crypto Ticker" 扩展
3. 点击卸载
4. 重新安装 VSIX 文件：
   - 点击扩展视图右上角 `...`
   - 选择 "从 VSIX 安装..."
   - 选择 `crypto-ticker-0.1.0.vsix`
5. 重新加载窗口

#### 解决方案 3: 检查插件是否激活

1. 按 `Cmd+Shift+P` / `Ctrl+Shift+P`
2. 输入 "Developer: Show Running Extensions"
3. 查找 "Crypto Ticker"
4. 如果没有显示，说明插件未激活

**手动激活：**
- 打开任意文件夹/工作区
- 插件会自动激活（配置为 `onStartupFinished`）
- 检查状态栏右下角是否有价格显示

#### 解决方案 4: 开发模式测试

如果安装 VSIX 有问题，可以用开发模式：

```bash
cd /Users/zhangchaozhe/github/vscode-crypto-ticker
code .
# 在 VS Code 中按 F5
```

这会打开一个新的 Extension Development Host 窗口，插件会自动加载。

#### 解决方案 5: 检查日志

1. 打开输出面板：`View` → `Output`
2. 在下拉菜单中选择 "Extension Host"
3. 查找 "Crypto Ticker extension is now active" 消息
4. 如果没有这条消息，说明插件没有激活

**可能的错误消息：**
- `Cannot find module 'axios'` → 运行 `npm install`
- TypeScript 编译错误 → 运行 `npm run compile`
- 其他错误 → 查看错误堆栈

---

## 安装步骤详解

### 从 VSIX 安装（推荐）

1. **确保文件完整**
   ```bash
   ls -lh crypto-ticker-0.1.0.vsix
   # 应该显示 ~14KB
   ```

2. **打开 VS Code**

3. **打开扩展视图**
   - Mac: `Cmd+Shift+X`
   - Windows/Linux: `Ctrl+Shift+X`

4. **从 VSIX 安装**
   - 点击扩展视图右上角的 `...` (更多操作)
   - 选择 "Install from VSIX..."
   - 导航到项目文件夹
   - 选择 `crypto-ticker-0.1.0.vsix`

5. **等待安装完成**
   - 会显示 "Installing extension..."
   - 安装完成后会提示 "Completed installing extension"

6. **重新加载窗口**
   - 点击 "Reload Now" 按钮
   - 或手动重新加载：`Cmd+R` / `Ctrl+R`

7. **验证安装**
   - 查看状态栏右下角
   - 应该看到类似：`BTC $45,234 +2.3%`
   - 如果没有，等待 5-10 秒（首次获取价格）

### 从命令行安装

```bash
# 方法 1: 使用 code 命令
code --install-extension /Users/zhangchaozhe/github/vscode-crypto-ticker/crypto-ticker-0.1.0.vsix

# 方法 2: 使用绝对路径
code --install-extension ~/github/vscode-crypto-ticker/crypto-ticker-0.1.0.vsix
```

安装后需要重启 VS Code。

---

## 验证安装成功

### 检查清单

- [ ] 扩展列表中能看到 "Crypto Ticker"
- [ ] 状态栏右下角显示加密货币价格
- [ ] 可以点击价格刷新
- [ ] 命令面板中能找到 "Crypto Ticker" 相关命令
- [ ] 鼠标悬停在价格上显示详细信息

### 测试命令

按 `Cmd+Shift+P` / `Ctrl+Shift+P`，然后输入：

1. **Crypto Ticker: Refresh Prices** ✅
   - 应该刷新所有价格
   - 显示 "Crypto prices refreshed" 消息

2. **Crypto Ticker: Toggle Display** ✅
   - 应该隐藏/显示状态栏价格
   - 显示 "Crypto Ticker enabled/disabled" 消息

3. **Crypto Ticker: Configure Settings** ✅
   - 应该打开设置页面
   - 显示 "Crypto Ticker settings updated" 消息

### 测试配置

打开设置 (`Cmd+,` / `Ctrl+,`)，搜索 "Crypto Ticker"：

- [ ] `cryptoTicker.reshInterval` 可以修改
- [ ] `cryptoTicker.displayFormat` 可以切换
- [ ] `cryptoTicker.enabledCoins` 可以选择
- [ ] `cryptoTicker.showChangePercentage` 可以开关

修改配置后，价格显示应该立即更新。

---

## 开发模式调试

如果安装的 VSIX 有问题，使用开发模式调试：

### 步骤

1. **打开项目**
   ```bash
   cd /Users/zhangchaozhe/github/vscode-crypto-ticker
   code .
   ```

2. **安装依赖**（如果还没有）
   ```bash
   npm install
   ```

3. **编译代码**
   ```bash
   npm run compile
   ```

4. **启动调试**
   - 按 `F5`
   - 或点击 Run → Start Debugging
   - 或点击侧边栏的调试图标，然后点击绿色播放按钮

5. **查看 Extension Development Host**
   - 会打开一个新的 VS Code 窗口
   - 窗口标题显示 "[Extension Development Host]"
   - 查看状态栏是否有价格显示

6. **查看日志**
   - 在原窗口（不是 Extension Development Host）
   - 打开 Debug Console
   - 查看 `console.log` 输出

### 常见开发模式错误

**错误：Cannot find module 'axios'**
```bash
npm install
```

**错误：Cannot find module './statusBarManager'**
```bash
npm run compile
```

**错误：Debugger listening on ws://...**
- 这不是错误，是正常的调试信息
- 插件应该可以正常运行

---

## 网络问题

### CoinGecko API 无法访问

如果价格不显示，可能是网络问题：

1. **检查网络连接**
   ```bash
   curl https://api.coingecko.com/api/v3/ping
   # 应该返回：{"gecko_says":"(V3) To the Moon!"}
   ```

2. **测试 API**
   ```bash
   curl "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
   # 应该返回：{"bitcoin":{"usd":45234.5}}
   ```

3. **代理设置**
   
   如果需要代理，在 VS Code 设置中配置：
   ```json
   {
     "http.proxy": "http://proxy.example.com:8080"
   }
   ```

---

## 完全卸载

如果需要完全卸载插件：

1. **卸载扩展**
   - Extensions → Crypto Ticker → Uninstall

2. **删除配置**（可选）
   
   打开设置 JSON：
   ```json
   // 删除以下配置（如果有）
   "cryptoTicker.refreshInterval": 30,
   "cryptoTicker.displayFormat": "compact",
   "cryptoTicker.enabledCoins": ["BTC", "ETH", "SOL"],
   "cryptoTicker.showChangePercentage": true
   ```

3. **重新加载窗口**

---

## 获取帮助

如果问题仍然存在：

1. **查看文档**
   - README.md
   - USAGE_CN.md
   - TESTING_GUIDE.md

2. **检查 GitHub Issues**
   - https://github.com/UMRzcz-831/vscode-crypto-ticker/issues

3. **提交 Issue**
   - 描述问题
   - 附上错误日志
   - 说明操作系统和 VS Code 版本

4. **开发模式日志**
   - 在 Extension Development Host 中复现问题
   - 复制 Debug Console 的输出
   - 附在 Issue 中

---

**祝你使用顺利！** 🚀
