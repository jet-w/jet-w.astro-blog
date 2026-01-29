---
title: Site Settings
description: Configure your site's title, description, and metadata
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Configuration
  - Site
---

# Site Settings

Configure your blog's basic information and metadata.

## Site Configuration

### Basic Settings

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  // Site title (shown in browser tab and header)
  title: 'My Awesome Blog',

  // Site description (used for SEO)
  description: 'A blog about web development and technology',

  // Author name
  author: 'John Doe',

  // Author avatar (shown in header and footer)
  avatar: '/images/avatar.jpg',

  // Site URL (for SEO and RSS)
  url: 'https://myblog.com',
};
```

### Per-Language Settings

For multi-language sites, configure in locale folders:

```typescript
// src/config/locales/en/site.ts
export const site = {
  title: 'My Blog',
  description: 'A tech blog about web development',
};

// src/config/locales/zh-CN/site.ts
export const site = {
  title: '我的博客',
  description: '关于 Web 开发的技术博客',
};
```

## Navigation Menu

### Menu Configuration

```typescript
// src/config/locales/en/menu.ts
export const menu = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'Posts', href: '/posts', icon: 'posts' },
  { name: 'Tags', href: '/tags', icon: 'tags' },
  { name: 'About', href: '/about', icon: 'about' },
];
```

### Available Icons

| Icon | Name |
|------|------|
| Home icon | `home` |
| Posts icon | `posts` |
| Tags icon | `tags` |
| Categories icon | `categories` |
| Archives icon | `archives` |
| Slides icon | `slides` |
| About icon | `about` |

### External Links

```typescript
{
  name: 'GitHub',
  href: 'https://github.com/username',
  icon: 'github',
  external: true  // Opens in new tab
}
```

## Social Links

Configure social media links in `src/config/social.ts`:

```typescript
export const socialLinks = [
  {
    type: 'github',
    url: 'https://github.com/username',
    label: 'GitHub',
  },
  {
    type: 'twitter',
    url: 'https://twitter.com/username',
    label: 'Twitter',
  },
  {
    type: 'email',
    url: 'mailto:hello@example.com',
    label: 'Email',
  },
];
```

### Supported Platforms

| Type | Platform |
|------|----------|
| `github` | GitHub |
| `twitter` | Twitter/X |
| `linkedin` | LinkedIn |
| `email` | Email |
| `youtube` | YouTube |
| `discord` | Discord |
| `rss` | RSS Feed |

## Footer Configuration

```typescript
// src/config/locales/en/footer.ts
export const footer = {
  quickLinksTitle: 'Quick Links',
  quickLinks: [
    { name: 'Home', href: '/' },
    { name: 'Posts', href: '/posts' },
    { name: 'About', href: '/about' },
  ],
  contactTitle: 'Contact',
};
```

## Astro Configuration

Main configuration in `astro.config.mjs`:

```javascript
export default defineConfig({
  // Your site's URL (required for RSS and sitemap)
  site: 'https://myblog.com',

  // Base path if not at root
  base: '/',

  integrations: [
    astroBlog({ i18n: i18nConfig }),
    vue(),
    tailwind(),
  ],
});
```

## SEO Settings

SEO is configured through:

1. **Site config** - Default title and description
2. **Frontmatter** - Per-post title and description
3. **Auto-generated** - Meta tags, Open Graph, Twitter cards

### Default SEO

```typescript
// src/config/site.ts
export const defaultSEO = {
  title: 'My Blog',
  description: 'Default description for pages',
  image: '/images/og-default.jpg',
};
```

### Per-Post SEO

```yaml
---
title: Post Title
description: Post description for search results
image: /images/post-cover.jpg
---
```

## Best Practices

::: tip Configuration Tips
1. **Keep URLs consistent** - Use trailing slashes or not, but be consistent
2. **Optimize images** - Avatar and OG images should be web-optimized
3. **Write good descriptions** - 150-160 characters for SEO
4. **Update social links** - Keep them current and working
:::

---

Next: [Sidebar Configuration](./02-sidebar)
