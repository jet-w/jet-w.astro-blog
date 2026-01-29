---
title: 安装
description: 设置你的开发环境并安装 Astro 博客
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 入门
  - 安装
---

# 安装

本指南将帮助你在电脑上设置 Astro 博客。

## 前置要求

在开始之前，请确保你已具备：

### Node.js

需要 Node.js 18.x 或更高版本。

```bash
# 检查你的 Node.js 版本
node --version
# 应该输出：v18.x.x 或更高
```

::: tip 安装 Node.js
如果你没有 Node.js，请从 [nodejs.org](https://nodejs.org) 下载。
选择 **LTS** 版本以获得最佳稳定性。
:::

### 包管理器

npm 随 Node.js 一起安装。你也可以使用 pnpm 或 yarn：

```bash
# 检查 npm 版本
npm --version

# 或使用 pnpm（推荐，安装更快）
npm install -g pnpm
pnpm --version
```

## 安装依赖

进入你的博客项目文件夹并安装依赖：

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

这将安装 `package.json` 中定义的所有必需包。

## 启动开发服务器

启动本地开发服务器：

```bash
# 使用 npm
npm run dev

# 或使用 pnpm
pnpm dev
```

你应该看到类似这样的输出：

```
🚀 astro  v5.x.x ready in 1234ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

::: tip 热重载
开发服务器支持热重载。当你保存文件时，浏览器会自动刷新以显示你的更改。
:::

## 在浏览器中打开

在浏览器中访问 `http://localhost:4321`。你应该能看到你的博客首页！

## 验证安装

检查一切是否正常工作：

1. **首页加载** - 你看到博客首页
2. **文章列表** - 导航到 `/posts` 查看文章
3. **深色模式** - 切换顶部的主题开关
4. **搜索** - 尝试搜索功能

## 常见问题

### 端口已被占用

如果端口 4321 被占用，Astro 会使用其他端口。检查终端输出获取实际 URL。

或者指定不同的端口：

```bash
npm run dev -- --port 3000
```

### 依赖安装失败

尝试清除缓存：

```bash
# 删除 node_modules 和 lock 文件
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### Node.js 版本过旧

将 Node.js 更新到 18 或更高版本。考虑使用 [nvm](https://github.com/nvm-sh/nvm) 来管理 Node 版本：

```bash
# 安装 nvm 后：
nvm install 20
nvm use 20
```

---

开发服务器运行起来了吗？太好了！让我们 [创建你的第一篇文章](./03-create-post)。
