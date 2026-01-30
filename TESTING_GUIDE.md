# 🎯 如何测试和使用 Crypto Ticker 插件

## 方法 1: 开发模式（推荐用于测试）

### 步骤：

1. **打开项目**
   ```bash
   cd /Users/zhangchaozhe/github/vscode-crypto-ticker
   code .
   ```

2. **启动调试**
   - 在 VS Code 中按 `F5`
   - 或者点击 Run → Start Debugging
   - 会自动：
     - 编译 TypeScript 代码
     - 打开一个新的 "Extension Development Host" 窗口
     - 加载插件

3. **查看效果**
   - 在新窗口的**右下角状态栏**查看价格
   - 应该看到类似：`BTC $45,234 +2.3% | ETH $2,456 -1.2% | SOL $98.45 +5.6%`

4. **测试功能**
   - **点击价格**：刷新所有价格
   - **鼠标悬停**：显示详细信息
   - **命令面板** (`Cmd+Shift+P`)：
     - 输入 "Crypto Ticker"
     - 尝试各种命令

5. **修改代码**
   - 修改任何 `.ts` 文件
   - 在 Extension Development Host 窗口按 `Cmd+R` (Mac) 或 `Ctrl+R` (Windows)
   - 查看更改效果

---

## 方法 2: 安装 VSIX 文件（用于正式使用）

### 步骤：

1. **构建 VSIX 文件**
   ```bash
   cd /Users/zhangchaozhe/github/vscode-crypto-ticker
   
   # 方法 A: 使用构建脚本
   ./build.sh
   
   # 方法 B: 手动构建
   npm install
   npm run compile
   npm install -g @vscode/vsce
   npm run package
   ```

2. **安装到 VS Code**
   - 打开 VS Code
   - 打开扩展视图：`Cmd+Shift+X` (Mac) 或 `Ctrl+Shift+X` (Windows)
   - 点击右上角的 `...` (更多操作)
   - 选择 "从 VSIX 安装..."
   - 选择 `crypto-ticker-0.1.0.vsix` 文件
   - 等待安装完成
   - 重新加载窗口

3. **使用插件**
   - 查看状态栏右下角
   - 开始使用！

---

## 方法 3: 持续开发模式

### 监听文件变化并自动编译：

```bash
cd /Users/zhangchaozhe/github/vscode-crypto-ticker
npm run watch
```

- 在另一个终端或 VS Code 中按 `F5`
- 每次保存文件时自动重新编译
- 在 Extension Development Host 中按 `Cmd+R` / `Ctrl+R` 重新加载

---

## 📋 测试检查清单

### ✅ 基础功能
- [ ] 状态栏显示价格
- [ ] 价格自动更新（默认 30 秒）
- [ ] 点击价格手动刷新
- [ ] 鼠标悬停显示工具提示

### ✅ 命令
- [ ] `Crypto Ticker: Refresh Prices` 工作正常
- [ ] `Crypto Ticker: Toggle Display` 可以显示/隐藏
- [ ] `Crypto Ticker: Configure Settings` 打开设置

### ✅ 配置
- [ ] 修改 `refreshInterval` 生效
- [ ] 切换 `displayFormat` (compact/detailed) 生效
- [ ] 修改 `enabledCoins` 生效
- [ ] 切换 `showChangePercentage` 生效

### ✅ 颜色显示
- [ ] 价格上涨显示绿色
- [ ] 价格下跌显示红色

### ✅ 错误处理
- [ ] 断网时使用缓存数据
- [ ] 显示错误提示消息

---

## 🎨 自定义配置示例

### 只显示 BTC
```json
{
  "cryptoTicker.enabledCoins": ["BTC"]
}
```

### 更快的刷新速率
```json
{
  "cryptoTicker.refreshInterval": 15
}
```

### 详细显示格式
```json
{
  "cryptoTicker.displayFormat": "detailed"
}
```

### 不显示涨跌幅
```json
{
  "cryptoTicker.showChangePercentage": false
}
```

---

## 🐛 调试技巧

### 查看日志
1. 在 Extension Development Host 窗口
2. Help → Toggle Developer Tools
3. 查看 Console 标签
4. 查找 `console.log` 输出

### 设置断点
1. 在 `.ts` 文件中点击行号左侧设置断点
2. 按 `F5` 启动调试
3. 触发对应功能
4. 调试器会在断点处暂停

### 常见问题排查

**问题：状态栏没有显示**
- 检查是否已激活插件（查看输出面板）
- 尝试运行 "Crypto Ticker: Toggle Display" 命令
- 检查网络连接

**问题：价格不更新**
- 检查 `refreshInterval` 设置
- 手动运行 "Crypto Ticker: Refresh Prices"
- 查看 Console 是否有错误

**问题：颜色不显示**
- 确保 `showChangePercentage` 为 `true`
- 检查主题设置

---

## 📦 发布到 VS Code Marketplace

### 准备工作

1. **创建发布者账号**
   - 访问 https://marketplace.visualstudio.com/manage
   - 使用 Microsoft 账号登录
   - 创建一个发布者 ID（例如：yourname-extensions）

2. **获取 Personal Access Token (PAT)**
   - 访问 https://dev.azure.com
   - User Settings → Personal Access Tokens
   - 创建新 Token，权限选择 "Marketplace: Manage"
   - 复制并保存 Token（只显示一次！）

3. **更新 package.json**
   ```json
   {
     "publisher": "your-publisher-id"
   }
   ```

### 发布步骤

```bash
# 1. 登录
vsce login your-publisher-id
# 输入你的 PAT

# 2. 发布
vsce publish

# 或指定版本号
vsce publish minor  # 0.1.0 → 0.2.0
vsce publish patch  # 0.1.0 → 0.1.1
vsce publish major  # 0.1.0 → 1.0.0
```

### 更新插件

```bash
# 修改代码后
vsce publish patch

# 或手动修改 package.json 的 version
vsce publish
```

---

## 🎉 完成！

现在你可以：
- ✅ 测试插件功能
- ✅ 自定义配置
- ✅ 打包分发
- ✅ 发布到市场

**祝你使用愉快！** 🚀📈💰

---

## 📞 获取帮助

如果遇到问题：
1. 查看 README.md
2. 查看 USAGE_CN.md
3. 检查 Console 日志
4. 提交 GitHub Issue

Happy Coding! 💻
