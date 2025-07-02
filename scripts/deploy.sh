#!/bin/bash

# 如果任何命令执行失败，则立即退出
set -e

# 执行构建
echo "正在构建项目..."
npm run build

# 进入构建产物目录
cd out

# 创建一个.nojekyll文件，防止GitHub Pages使用Jekyll处理
touch .nojekyll

# 初始化一个新的Git仓库，添加所有文件并提交
git init
git add -A
git commit -m 'Deploying to GitHub Pages'

# 强制推送到hakkaslee.github.io仓库的main分支
# 请确保您已经创建了这个仓库并且配置了SSH密钥
echo "正在部署到 GitHub Pages..."
git push -f git@github.com:hakkaslee/hakkaslee.github.io.git main

echo "部署成功！" 