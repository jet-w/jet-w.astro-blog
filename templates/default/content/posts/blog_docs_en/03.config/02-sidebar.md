---
title: Sidebar Configuration
description: Configure navigation trees and document organization
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Configuration
  - Sidebar
---

# Sidebar Configuration

The sidebar provides navigation and document organization for your blog.

## Basic Configuration

Edit `src/config/sidebar.ts`:

```typescript
export const sidebarConfig = {
  enabled: true,
  showSearch: true,
  showRecentPosts: true,
  recentPostsCount: 5,
  showPopularTags: true,
  popularTagsCount: 8,
  showArchives: true,
  archivesCount: 6,
  groups: [],
};
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Show/hide sidebar |
| `showSearch` | boolean | `true` | Show search box |
| `showRecentPosts` | boolean | `true` | Show recent posts |
| `recentPostsCount` | number | `5` | Number of recent posts |
| `showPopularTags` | boolean | `true` | Show tag cloud |
| `popularTagsCount` | number | `8` | Number of tags |
| `showArchives` | boolean | `true` | Show archives |
| `archivesCount` | number | `6` | Number of archive months |
| `groups` | array | `[]` | Document tree groups |

## Document Tree Groups

Groups create organized navigation for specific sections.

### Auto-Scan Groups

Automatically generate navigation from a folder:

```typescript
// src/config/locales/en/sidebar.ts
export const sidebar = {
  groups: [
    {
      type: 'scan',
      title: 'Documentation',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs_en',
      collapsed: false,
      showForPaths: ['/posts/blog_docs_en/**'],
    },
  ],
};
```

| Option | Description |
|--------|-------------|
| `type` | `'scan'` for auto-scan |
| `title` | Group heading |
| `icon` | Remix icon name |
| `scanPath` | Folder to scan in `content/posts/` |
| `collapsed` | Start collapsed |
| `showForPaths` | Only show on matching URLs |

### Manual Groups

Define navigation manually:

```typescript
{
  type: 'manual',
  title: 'Resources',
  icon: 'ri:links-line',
  items: [
    { title: 'API Reference', slug: 'api-reference' },
    { title: 'Examples', link: 'https://examples.com' },
  ],
  showForPaths: ['/posts/api/**'],
}
```

## Path Matching

Control when groups appear with `showForPaths`:

```typescript
showForPaths: [
  '/posts/docs/**',     // All docs pages
  '/posts/tutorials/*', // Direct children only
  '/about',            // Exact match
]
```

### Pattern Syntax

| Pattern | Matches |
|---------|---------|
| `/posts/docs` | Exact path |
| `/posts/docs/*` | Direct children |
| `/posts/docs/**` | All descendants |

## Per-Language Sidebar

Configure different sidebars for each language:

```typescript
// src/config/locales/en/sidebar.ts
export const sidebar = {
  groups: [
    {
      type: 'scan',
      title: 'Documentation',  // English
      scanPath: 'blog_docs_en',
      showForPaths: ['/posts/blog_docs_en/**'],
    },
  ],
};

// src/config/locales/zh-CN/sidebar.ts
export const sidebar = {
  groups: [
    {
      type: 'scan',
      title: '文档',  // Chinese
      scanPath: 'blog_docs',
      showForPaths: ['/zh-CN/posts/blog_docs/**'],
    },
  ],
};
```

## Complete Example

```typescript
// src/config/locales/en/sidebar.ts
export const sidebar = {
  groups: [
    // Documentation section
    {
      type: 'scan',
      title: 'Documentation',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs_en',
      collapsed: false,
      showForPaths: ['/posts/blog_docs_en/**'],
    },
    // Tutorials section
    {
      type: 'scan',
      title: 'Tutorials',
      icon: 'ri:graduation-cap-line',
      scanPath: 'tutorials',
      collapsed: true,
      showForPaths: ['/posts/tutorials/**'],
    },
    // External resources
    {
      type: 'manual',
      title: 'Resources',
      icon: 'ri:links-line',
      items: [
        { title: 'Astro Docs', link: 'https://docs.astro.build' },
        { title: 'Tailwind CSS', link: 'https://tailwindcss.com' },
      ],
    },
  ],
};
```

## Sidebar Widgets

The sidebar also shows:

### Recent Posts

Shows latest published posts:

```typescript
showRecentPosts: true,
recentPostsCount: 5,
```

### Popular Tags

Shows most-used tags:

```typescript
showPopularTags: true,
popularTagsCount: 8,
```

### Archives

Shows posts by month:

```typescript
showArchives: true,
archivesCount: 6,
```

## Hiding the Sidebar

Disable sidebar for specific pages in frontmatter:

```yaml
---
title: Full Width Page
showSidebar: false
---
```

Or globally:

```typescript
export const sidebarConfig = {
  enabled: false,
  // ...
};
```

---

Next: [Multi-language Support](./03-i18n)
