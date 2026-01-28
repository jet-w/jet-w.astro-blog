---
title: Deployment
description: Build and deploy your blog to the web
pubDate: 2025-01-01
author: Astro Blog
categories:
  - Documentation
tags:
  - Getting Started
  - Deployment
---

# Deployment

Time to share your blog with the world! Let's build and deploy.

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

## Deployment Options

Your static site can be hosted anywhere. Here are popular options:

### Vercel (Recommended)

::: tip Why Vercel?
- **Zero configuration** - Automatic Astro detection
- **Free tier** - Generous free hosting
- **Fast** - Global CDN
:::

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

Vercel automatically:
- Detects Astro
- Runs `npm run build`
- Deploys the `dist/` folder

### Netlify

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Connect your repository
4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages

1. Add to `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name/',  // If not using custom domain
});
```

2. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

3. Enable GitHub Pages in repository settings

### Cloudflare Pages

1. Connect repository at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Set build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Output directory: `dist`

## Environment Variables

For sensitive data, use environment variables:

```bash
# .env (local development)
PUBLIC_SITE_URL=https://myblog.com
```

Access in code:

```javascript
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
```

::: warning Public vs Private
Variables prefixed with `PUBLIC_` are exposed to the browser.
Keep API keys and secrets without the `PUBLIC_` prefix.
:::

## Custom Domain

Most platforms support custom domains:

1. **Buy a domain** (Namecheap, Google Domains, etc.)
2. **Add to platform** - Follow platform-specific instructions
3. **Update DNS** - Point to platform's servers
4. **SSL** - Usually automatic (free with Let's Encrypt)

## Deployment Checklist

Before deploying, verify:

- [ ] `npm run build` completes without errors
- [ ] `npm run preview` shows site correctly
- [ ] All links work (no broken links)
- [ ] Images load properly
- [ ] Meta tags are set (title, description)
- [ ] Favicon is configured

## Continuous Deployment

With GitHub + Vercel/Netlify:

1. Push changes to `main` branch
2. Platform automatically rebuilds
3. Site updates in ~1 minute

```bash
git add .
git commit -m "Add new blog post"
git push origin main
# Site automatically updates!
```

---

Congratulations! You've completed the Get Started guide.

Continue learning with the [Writing Guide](../guide/) to master content creation.
