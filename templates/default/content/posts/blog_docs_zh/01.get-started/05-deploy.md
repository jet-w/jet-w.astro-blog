---
title: 部署
description: 构建并部署你的博客到 GitHub Pages
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 入门
  - 部署
---

# 部署

是时候与世界分享你的博客了！本指南介绍如何部署到 GitHub Pages。

## 构建生产版本

首先，创建生产构建：

```bash
npm run build
```

这会创建一个包含静态文件的 `dist/` 文件夹：

```
dist/
├── index.html
├── posts/
│   └── hello-world/
│       └── index.html
├── assets/
│   ├── styles.css
│   └── scripts.js
└── ...
```

## 本地预览

部署前测试构建：

```bash
npm run preview
```

访问 `http://localhost:4321` 验证一切正常。

## 部署到 GitHub Pages

### 步骤 1: 配置 Astro

更新你的 `astro.config.mjs`：

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name/',  // 仅在不使用自定义域名时需要
});
```

::: tip 自定义域名
如果使用自定义域名（如 `myblog.com`），设置 `base: '/'` 或完全移除它。
:::

### 步骤 2: 创建 GitHub Actions 工作流

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 步骤 3: 启用 GitHub Pages

1. 在 GitHub 上打开你的仓库
2. 导航到 **Settings** → **Pages**
3. 在 "Build and deployment" 下，选择 **GitHub Actions** 作为来源
4. 将代码推送到 `main` 分支

你的站点将可在 `https://username.github.io/repo-name/` 访问

### 步骤 4: 自定义域名（可选）

要使用自定义域名：

1. **添加 CNAME 文件**: 创建 `public/CNAME` 并写入你的域名：
   ```
   myblog.com
   ```

2. **配置 DNS**: 在你的域名注册商添加以下记录：
   - **A 记录**（用于顶级域名如 `myblog.com`）：
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME 记录**（用于 `www` 子域名）：
     ```
     www -> username.github.io
     ```

3. **更新 Astro 配置**：
   ```javascript
   export default defineConfig({
     site: 'https://myblog.com',
     // 自定义域名不需要 base
   });
   ```

4. **在 GitHub 中启用**: 在仓库 Settings → Pages 中，添加你的自定义域名

::: info SSL 证书
GitHub 会自动提供免费的 SSL 证书。可能需要最多 24 小时生效。
:::

## 部署清单

部署前验证：

- [ ] `npm run build` 无错误完成
- [ ] `npm run preview` 正确显示站点
- [ ] 所有链接正常工作（无断链）
- [ ] 图片正确加载
- [ ] Meta 标签已设置（标题、描述）
- [ ] Favicon 已配置

## 持续部署

配置完成后，你的站点会自动更新：

```bash
git add .
git commit -m "添加新博客文章"
git push origin main
# 站点在约 1-2 分钟内自动更新！
```

## 其他部署选项

这个博客可以部署到任何静态托管平台：

- **Vercel** - 零配置 Astro 支持，全球 CDN
- **Netlify** - 简单设置，支持表单处理
- **Cloudflare Pages** - 快速边缘网络，免费套餐
- **AWS S3 + CloudFront** - 可扩展的云托管
- **Firebase Hosting** - Google 的托管平台

有关这些平台的详细说明，请参阅 [Astro 部署指南](https://docs.astro.build/en/guides/deploy/)。

---

恭喜！你已完成快速入门指南。

继续学习 [写作指南](/posts/blog_docs_zh/02.guide) 来掌握内容创作。
