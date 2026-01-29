---
title: Deployment
description: Build and deploy your blog to GitHub Pages
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Getting Started
  - Deployment
---

# Deployment

Time to share your blog with the world! This guide covers deploying to GitHub Pages.

## Build for Production

First, create a production build:

```bash
npm run build
```

This creates a `dist/` folder with static files:

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

## Preview Locally

Test the build before deploying:

```bash
npm run preview
```

Visit `http://localhost:4321` to verify everything works.

## Deploy to GitHub Pages

### Step 1: Configure Astro

Update your `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name/',  // Only if NOT using custom domain
});
```

::: tip Custom Domain
If using a custom domain (e.g., `myblog.com`), set `base: '/'` or remove it entirely.
:::

### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

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

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment", select **GitHub Actions** as the source
4. Push your code to the `main` branch

Your site will be available at `https://username.github.io/repo-name/`

### Step 4: Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file**: Create `public/CNAME` with your domain:
   ```
   myblog.com
   ```

2. **Configure DNS**: Add these records at your domain registrar:
   - **A records** (for apex domain like `myblog.com`):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME record** (for `www` subdomain):
     ```
     www -> username.github.io
     ```

3. **Update Astro config**:
   ```javascript
   export default defineConfig({
     site: 'https://myblog.com',
     // No base needed for custom domain
   });
   ```

4. **Enable in GitHub**: In repository Settings → Pages, add your custom domain

::: info SSL Certificate
GitHub automatically provisions a free SSL certificate. It may take up to 24 hours.
:::

## Deployment Checklist

Before deploying, verify:

- [ ] `npm run build` completes without errors
- [ ] `npm run preview` shows site correctly
- [ ] All links work (no broken links)
- [ ] Images load properly
- [ ] Meta tags are set (title, description)
- [ ] Favicon is configured

## Continuous Deployment

Once configured, your site updates automatically:

```bash
git add .
git commit -m "Add new blog post"
git push origin main
# Site automatically updates in ~1-2 minutes!
```

## Other Deployment Options

This blog can be deployed to any static hosting platform:

- **Vercel** - Zero-config Astro support, global CDN
- **Netlify** - Easy setup with form handling
- **Cloudflare Pages** - Fast edge network, free tier
- **AWS S3 + CloudFront** - Scalable cloud hosting
- **Firebase Hosting** - Google's hosting platform

For detailed instructions on these platforms, refer to the [Astro Deployment Guides](https://docs.astro.build/en/guides/deploy/).

---

Congratulations! You've completed the Get Started guide.

Continue learning with the [Writing Guide](/posts/blog_docs_en/02.guide) to master content creation.
