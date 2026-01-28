---
title: Configuration
description: Customize your blog with site settings, sidebar, and i18n
pubDate: 2025-01-01
author: Astro Blog
categories:
  - Documentation
tags:
  - Configuration
  - Settings
---

# Configuration

Customize every aspect of your blog through configuration files.

## Configuration Files

All configuration lives in `src/config/`:

```
src/config/
├── locales/          # Language-specific configs
│   ├── en/          # English
│   └── zh-CN/       # Chinese
├── site.ts           # Site metadata
├── menu.ts           # Navigation menu
├── sidebar.ts        # Sidebar settings
├── footer.ts         # Footer content
└── social.ts         # Social links
```

## Configuration Guides

| Guide | Description |
|-------|-------------|
| [Site Settings](./01-site) | Title, description, author info |
| [Sidebar](./02-sidebar) | Navigation and document trees |
| [Multi-language](./03-i18n) | Add multiple language support |

## Quick Overview

### Site Configuration

```typescript
// src/config/site.ts
export const siteConfig = {
  title: 'My Blog',
  description: 'A tech blog',
  author: 'Your Name',
  avatar: '/images/avatar.jpg',
};
```

### Navigation Menu

```typescript
// src/config/locales/en/menu.ts
export const menu = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'Posts', href: '/posts', icon: 'posts' },
  { name: 'About', href: '/about', icon: 'about' },
];
```

### Multi-language

```javascript
// astro.config.mjs
const i18nConfig = defineI18nConfig({
  defaultLocale: 'en',
  locales: [
    { code: 'en', name: 'English' },
    { code: 'zh-CN', name: '中文' },
  ],
  localeConfigs: {
    'en': enConfig,
    'zh-CN': zhCNConfig,
  },
});
```

---

Start with [Site Settings](./01-site)!
