---
title: Project Structure
description: Understand how files and folders are organized
pubDate: 2025-01-01
author: Astro Blog
categories:
  - Documentation
tags:
  - Getting Started
  - Structure
---

# Project Structure

Understanding the project structure helps you know where to find and place files.

## Overview

```
your-blog/
├── content/              # Your content
│   ├── posts/           # Blog posts
│   └── pages/           # Standalone pages
├── public/               # Static assets
│   ├── images/          # Images
│   └── videos/          # Videos
├── src/
│   ├── config/          # Configuration files
│   │   ├── locales/     # Language configs
│   │   ├── site.ts      # Site settings
│   │   └── ...
│   └── ...
├── astro.config.mjs      # Astro configuration
└── package.json          # Dependencies
```

## Content Directory

This is where your content lives:

### posts/

Blog posts in Markdown or MDX format:

```
content/posts/
├── hello-world.md         # Individual post
├── tutorials/             # Category folder
│   ├── README.md         # Category index
│   └── getting-started.md
└── blog_docs_en/          # Documentation
    └── ...
```

### pages/

Standalone pages like About, Contact:

```
content/pages/
├── about.md              # /about
└── contact.md            # /contact
```

## Public Directory

Static files served directly:

```
public/
├── images/               # Images
│   ├── avatar.jpg       # /images/avatar.jpg
│   └── posts/           # Post images
├── videos/               # Videos
├── favicon.svg           # Site favicon
└── robots.txt           # SEO file
```

::: tip Direct Access
Files in `public/` are served at the root URL.
`public/images/cat.jpg` → `https://yoursite.com/images/cat.jpg`
:::

## Configuration Directory

Site configuration files:

```
src/config/
├── locales/              # Language-specific configs
│   ├── en/              # English
│   │   ├── index.ts
│   │   ├── site.ts
│   │   ├── menu.ts
│   │   ├── footer.ts
│   │   └── sidebar.ts
│   └── zh-CN/           # Chinese
│       └── ...
├── site.ts               # Default site config
├── menu.ts               # Default menu
├── sidebar.ts            # Sidebar settings
├── footer.ts             # Footer settings
└── social.ts             # Social links
```

## Key Configuration Files

### astro.config.mjs

Main Astro configuration:

```javascript
export default defineConfig({
  integrations: [
    astroBlog({ i18n: i18nConfig }),
    vue(),
    tailwind(),
  ],
  site: 'https://yourdomain.com',
});
```

### src/config/site.ts

Site metadata:

```typescript
export const siteConfig = {
  title: 'My Blog',
  description: 'A blog about...',
  author: 'Your Name',
  avatar: '/images/avatar.jpg',
};
```

### src/config/menu.ts

Navigation links:

```typescript
export const menu = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'Posts', href: '/posts', icon: 'posts' },
  { name: 'About', href: '/about', icon: 'about' },
];
```

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Posts | lowercase with dashes | `my-first-post.md` |
| Config | camelCase or kebab | `site.ts`, `menu.ts` |
| Images | descriptive names | `hero-banner.jpg` |

::: warning Avoid Spaces
Don't use spaces in filenames. Use dashes instead:
- ❌ `my first post.md`
- ✅ `my-first-post.md`
:::

## What Each Folder Does

| Folder | Purpose | You Should... |
|--------|---------|---------------|
| `content/posts/` | Blog posts | Add your articles here |
| `content/pages/` | Static pages | Add about, contact pages |
| `public/` | Static assets | Put images, files |
| `src/config/` | Settings | Customize your site |

---

Now you understand the structure! Let's learn how to [deploy your blog](./05-deploy).
