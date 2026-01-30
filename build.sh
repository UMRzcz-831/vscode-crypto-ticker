#!/bin/bash

# Crypto Ticker Extension - Build & Package Script
# 构建和打包脚本

set -e  # 遇到错误立即退出

echo "🚀 Starting Crypto Ticker build process..."
echo ""

# 1. 清理旧的构建
echo "📦 Step 1: Cleaning old build files..."
rm -rf out/
rm -f *.vsix
echo "✅ Clean completed"
echo ""

# 2. 安装依赖
echo "📦 Step 2: Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# 3. 编译 TypeScript
echo "🔨 Step 3: Compiling TypeScript..."
npm run compile
echo "✅ Compilation completed"
echo ""

# 4. 运行 lint 检查
echo "🔍 Step 4: Running linter..."
npm run lint || echo "⚠️  Lint warnings found (non-blocking)"
echo ""

# 5. 打包成 VSIX
echo "📦 Step 5: Packaging extension..."
if command -v vsce &> /dev/null; then
    npm run package
    echo "✅ Package created successfully!"
    echo ""
    echo "📦 VSIX file created:"
    ls -lh *.vsix
else
    echo "⚠️  vsce not found. Installing..."
    npm install -g @vscode/vsce
    npm run package
    echo "✅ Package created successfully!"
    echo ""
    echo "📦 VSIX file created:"
    ls -lh *.vsix
fi

echo ""
echo "🎉 Build process completed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Test the extension: Press F5 in VS Code"
echo "   2. Install locally: Extensions → Install from VSIX"
echo "   3. Publish: vsce publish"
echo ""
