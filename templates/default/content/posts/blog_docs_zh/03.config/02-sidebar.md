---
title: 侧边栏配置
description: 配置导航树和文档组织
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 配置
  - 侧边栏
---

# 侧边栏配置

侧边栏为你的博客提供导航和文档组织功能。

## 基本配置

编辑 `src/config/sidebar.ts`：

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

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `enabled` | boolean | `true` | 显示/隐藏侧边栏 |
| `showSearch` | boolean | `true` | 显示搜索框 |
| `showRecentPosts` | boolean | `true` | 显示最近文章 |
| `recentPostsCount` | number | `5` | 最近文章数量 |
| `showPopularTags` | boolean | `true` | 显示标签云 |
| `popularTagsCount` | number | `8` | 标签数量 |
| `showArchives` | boolean | `true` | 显示归档 |
| `archivesCount` | number | `6` | 归档月份数 |
| `groups` | array | `[]` | 文档树分组 |

## 文档树分组

分组可以为特定区域创建有组织的导航。

### 自动扫描分组

从文件夹自动生成导航：

```typescript
// src/config/locales/zh-CN/sidebar.ts
export const sidebar = {
  groups: [
    {
      type: 'scan',
      title: '文档',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs_zh',
      collapsed: false,
      showForPaths: ['/zh-CN/posts/blog_docs_zh/**'],
    },
  ],
};
```

| 选项 | 描述 |
|------|------|
| `type` | `'scan'` 表示自动扫描 |
| `title` | 分组标题 |
| `icon` | Remix 图标名称 |
| `scanPath` | `content/posts/` 中要扫描的文件夹 |
| `collapsed` | 默认折叠 |
| `showForPaths` | 仅在匹配的 URL 显示 |

### 手动分组

手动定义导航：

```typescript
{
  type: 'manual',
  title: '资源',
  icon: 'ri:links-line',
  items: [
    { title: 'API 参考', slug: 'api-reference' },
    { title: '示例', link: 'https://examples.com' },
  ],
  showForPaths: ['/posts/api/**'],
}
```

## 路径匹配

使用 `showForPaths` 控制分组何时显示：

```typescript
showForPaths: [
  '/posts/docs/**',     // 所有文档页面
  '/posts/tutorials/*', // 仅直接子页面
  '/about',            // 精确匹配
]
```

### 模式语法

| 模式 | 匹配 |
|------|------|
| `/posts/docs` | 精确路径 |
| `/posts/docs/*` | 直接子页面 |
| `/posts/docs/**` | 所有后代页面 |

## 多语言侧边栏

为每种语言配置不同的侧边栏：

```typescript
// src/config/locales/en/sidebar.ts
export const sidebar = {
  groups: [
    {
      type: 'scan',
      title: 'Documentation',  // 英文
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
      title: '文档',  // 中文
      scanPath: 'blog_docs_zh',
      showForPaths: ['/zh-CN/posts/blog_docs_zh/**'],
    },
  ],
};
```

## 完整示例

```typescript
// src/config/locales/zh-CN/sidebar.ts
export const sidebar = {
  groups: [
    // 文档区域
    {
      type: 'scan',
      title: '文档',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs_zh',
      collapsed: false,
      showForPaths: ['/zh-CN/posts/blog_docs_zh/**'],
    },
    // 教程区域
    {
      type: 'scan',
      title: '教程',
      icon: 'ri:graduation-cap-line',
      scanPath: 'tutorials',
      collapsed: true,
      showForPaths: ['/zh-CN/posts/tutorials/**'],
    },
    // 外部资源
    {
      type: 'manual',
      title: '资源',
      icon: 'ri:links-line',
      items: [
        { title: 'Astro 文档', link: 'https://docs.astro.build' },
        { title: 'Tailwind CSS', link: 'https://tailwindcss.com' },
      ],
    },
  ],
};
```

## 侧边栏小部件

侧边栏还显示：

### 最近文章

显示最新发布的文章：

```typescript
showRecentPosts: true,
recentPostsCount: 5,
```

### 热门标签

显示使用最多的标签：

```typescript
showPopularTags: true,
popularTagsCount: 8,
```

### 归档

按月显示文章：

```typescript
showArchives: true,
archivesCount: 6,
```

## 隐藏侧边栏

在 frontmatter 中为特定页面禁用侧边栏：

```yaml
---
title: 全宽页面
showSidebar: false
---
```

或全局禁用：

```typescript
export const sidebarConfig = {
  enabled: false,
  // ...
};
```

---

下一步：[多语言支持](./03-i18n)
