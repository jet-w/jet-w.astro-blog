---
title: 侧边栏配置
description: 灵活配置博客导航菜单，支持自动扫描和手动配置
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - 配置
  - 侧边栏
  - 导航
---

# 侧边栏配置

本博客提供灵活的侧边栏配置系统，支持三种配置模式：自动扫描、手动配置和混合模式。

## 配置文件位置

```
src/config/sidebar.ts
```

## 配置结构

```typescript
export const sidebarConfig: SidebarConfig = {
  enabled: true,                    // 是否启用侧边栏
  showRecentPosts: true,            // 显示最新文章
  recentPostsCount: 5,              // 最新文章数量
  showPopularTags: true,            // 显示热门标签
  popularTagsCount: 8,              // 热门标签数量
  showArchives: true,               // 显示文章归档
  archivesCount: 6,                 // 归档条目数量
  showFriendLinks: true,            // 显示友情链接
  friendLinks: [...],               // 友情链接列表
  groups: [...]                     // 侧边栏分组配置
};
```

## 三种配置模式

### 1. 扫描模式 (scan)

自动扫描指定文件夹，根据文件结构生成导航树。

```typescript
{
  type: 'scan',
  title: '技术文档',                 // 分组标题
  icon: 'ri:folder-3-line',         // 分组图标
  scanPath: 'tech',                 // 扫描路径（相对于 content/posts）
  collapsed: false,                 // 默认是否折叠
}
```

#### 完整配置选项

```typescript
{
  type: 'scan',
  title: '技术文档',
  icon: 'ri:folder-3-line',
  scanPath: 'tech/tools',           // 可以是子目录
  collapsed: false,                 // 默认展开
  maxDepth: 3,                      // 最大扫描深度
  exclude: ['drafts', 'archive'],   // 排除的文件夹/文件
  include: ['*.md'],                // 只包含的文件
  sortBy: 'name',                   // 排序方式: 'name' | 'date' | 'title'
  sortOrder: 'asc',                 // 排序顺序: 'asc' | 'desc'
}
```

#### 示例：扫描多个目录

```typescript
groups: [
  {
    type: 'scan',
    title: '前端开发',
    icon: 'ri:code-line',
    scanPath: 'tech/frontend',
  },
  {
    type: 'scan',
    title: '后端开发',
    icon: 'ri:server-line',
    scanPath: 'tech/backend',
  },
  {
    type: 'scan',
    title: 'DevOps',
    icon: 'ri:cloud-line',
    scanPath: 'tech/devops',
  },
]
```

::: tip 文件夹标题
在文件夹中添加 `README.md`，其 `title` 字段会显示为文件夹名称。
:::

### 2. 手动模式 (manual)

完全手动配置导航项，适合需要精确控制顺序和内容的场景。

```typescript
{
  type: 'manual',
  title: '快速导航',
  icon: 'ri:star-line',
  items: [
    {
      title: '入门指南',
      slug: 'getting-started',      // 文章路径
      icon: 'ri:rocket-line',
    },
    {
      title: 'API 文档',
      slug: 'api-reference',
      badge: 'NEW',                 // 徽章文字
      badgeType: 'success',         // 徽章类型
    },
    {
      title: '外部链接',
      link: 'https://example.com',  // 外部链接
      icon: 'ri:external-link-line',
    },
  ]
}
```

#### 嵌套结构

```typescript
{
  type: 'manual',
  title: '教程系列',
  items: [
    {
      title: 'Vue 教程',
      icon: 'ri:vuejs-line',
      children: [                   // 子项
        { title: '基础入门', slug: 'vue/basics' },
        { title: '组件开发', slug: 'vue/components' },
        { title: '状态管理', slug: 'vue/state' },
      ]
    },
    {
      title: 'React 教程',
      icon: 'ri:reactjs-line',
      children: [
        { title: '快速开始', slug: 'react/quickstart' },
        { title: 'Hooks 详解', slug: 'react/hooks' },
      ]
    },
  ]
}
```

#### 徽章类型

| 类型 | 颜色 | 用途 |
|:---|:---|:---|
| `info` | 蓝色 | 一般信息 |
| `success` | 绿色 | 新内容、推荐 |
| `warning` | 黄色 | 注意、测试中 |
| `error` | 红色 | 热门、重要 |

```typescript
items: [
  { title: '新功能', slug: 'new-feature', badge: 'NEW', badgeType: 'success' },
  { title: '热门文章', slug: 'popular', badge: 'HOT', badgeType: 'error' },
  { title: '测试版', slug: 'beta', badge: 'BETA', badgeType: 'warning' },
]
```

### 3. 混合模式 (mixed)

结合扫描和手动配置，灵活组合。

```typescript
{
  type: 'mixed',
  title: '学习资源',
  icon: 'ri:book-line',
  sections: [
    {
      type: 'manual',
      title: '推荐阅读',
      items: [
        { title: '必读文章', slug: 'must-read', badge: 'HOT', badgeType: 'error' },
        { title: '常见问题', slug: 'faq' },
      ]
    },
    {
      type: 'scan',
      title: '教程系列',
      scanPath: 'tutorials',
    }
  ]
}
```

### 4. 分隔符 (divider)

在分组之间添加视觉分隔：

```typescript
groups: [
  {
    type: 'scan',
    title: '技术文档',
    scanPath: 'tech',
  },
  {
    type: 'divider',
    title: '其他内容',             // 可选的分隔符标题
  },
  {
    type: 'manual',
    title: '关于',
    items: [...]
  },
]
```

## 完整配置示例

```typescript
// src/config/sidebar.ts
import type { SidebarConfig } from './sidebar';

export const sidebarConfig: SidebarConfig = {
  enabled: true,

  // 最新文章
  showRecentPosts: true,
  recentPostsCount: 5,

  // 热门标签
  showPopularTags: true,
  popularTagsCount: 8,

  // 归档
  showArchives: true,
  archivesCount: 6,

  // 友情链接
  showFriendLinks: true,
  friendLinks: [
    {
      title: 'Astro 官网',
      url: 'https://astro.build',
      icon: 'ri:rocket-line',
    },
    {
      title: 'Tailwind CSS',
      url: 'https://tailwindcss.com',
      icon: 'ri:palette-line',
    },
    {
      title: 'Vue.js',
      url: 'https://vuejs.org',
      icon: 'ri:vuejs-line',
    },
  ],

  // 导航分组
  groups: [
    // 快速导航（手动配置）
    {
      type: 'manual',
      title: '快速导航',
      icon: 'ri:star-line',
      items: [
        {
          title: '博客指南',
          slug: 'blog_docs/README',
          icon: 'ri:book-open-line',
          badge: 'START',
          badgeType: 'success',
        },
      ]
    },

    // 分隔符
    { type: 'divider', title: '技术文档' },

    // 技术文档（自动扫描）
    {
      type: 'scan',
      title: '技术文档',
      icon: 'ri:folder-3-line',
      scanPath: 'tech',
      collapsed: false,
    },

    // LLM 相关（自动扫描）
    {
      type: 'scan',
      title: 'LLM & MCP',
      icon: 'ri:robot-line',
      scanPath: 'LLM-MCP',
      collapsed: false,
    },

    // 博客文档（自动扫描）
    {
      type: 'scan',
      title: '博客指南',
      icon: 'ri:book-line',
      scanPath: 'blog_docs',
    },
  ]
};
```

## 文件夹结构与导航

### 目录结构影响导航

```
content/posts/
├── tech/
│   ├── README.md          # → "技术文档"（文件夹标题）
│   ├── vue/
│   │   ├── README.md      # → "Vue 教程"
│   │   ├── basics.md      # → "Vue 基础"
│   │   └── advanced.md    # → "Vue 进阶"
│   └── react/
│       ├── README.md      # → "React 教程"
│       └── hooks.md       # → "React Hooks"
└── blog_docs/
    ├── README.md          # → "博客指南"
    └── 01-quick-start.md  # → "快速开始"
```

### README.md 的作用

每个文件夹的 `README.md` 用于：
1. 提供文件夹的显示名称（`title` 字段）
2. 提供文件夹的图标（`icon` 字段）
3. 作为该系列的介绍/索引页

```yaml
# tech/vue/README.md
---
title: "Vue 3 完全指南"    # 显示为文件夹名称
icon: ri:vuejs-line        # 文件夹图标
description: "从入门到精通的 Vue 3 教程"
---
```

## 常见场景配置

### 技术博客

```typescript
groups: [
  { type: 'scan', title: '前端', scanPath: 'frontend', icon: 'ri:html5-line' },
  { type: 'scan', title: '后端', scanPath: 'backend', icon: 'ri:server-line' },
  { type: 'scan', title: '数据库', scanPath: 'database', icon: 'ri:database-line' },
  { type: 'scan', title: 'DevOps', scanPath: 'devops', icon: 'ri:cloud-line' },
]
```

### 教程网站

```typescript
groups: [
  {
    type: 'manual',
    title: '入门',
    icon: 'ri:rocket-line',
    items: [
      { title: '快速开始', slug: 'getting-started', badge: 'START' },
      { title: '安装指南', slug: 'installation' },
      { title: '基本概念', slug: 'concepts' },
    ]
  },
  { type: 'scan', title: '教程', scanPath: 'tutorials' },
  { type: 'scan', title: 'API 参考', scanPath: 'api' },
]
```

### 文档站点

```typescript
groups: [
  {
    type: 'mixed',
    title: '指南',
    sections: [
      {
        type: 'manual',
        title: '必读',
        items: [
          { title: '介绍', slug: 'intro' },
          { title: '快速开始', slug: 'quickstart' },
        ]
      },
      { type: 'scan', title: '详细指南', scanPath: 'guide' },
    ]
  },
  { type: 'scan', title: 'API', scanPath: 'api' },
  {
    type: 'manual',
    title: '更多',
    items: [
      { title: 'FAQ', slug: 'faq' },
      { title: '更新日志', slug: 'changelog' },
      { title: 'GitHub', link: 'https://github.com/xxx' },
    ]
  },
]
```

## 注意事项

::: tip 路径大小写
`scanPath` 区分大小写，确保与实际文件夹名称一致。
:::

::: warning 排除规则
使用 `exclude` 排除不需要显示的文件夹：
```typescript
{
  type: 'scan',
  scanPath: 'tech',
  exclude: ['drafts', 'archive', 'temp'],
}
```
:::

::: info 排序说明
- `sortBy: 'name'` - 按文件名排序（默认）
- `sortBy: 'title'` - 按文章标题排序
- `sortBy: 'date'` - 按发布日期排序
:::

## 下一步

- [站点配置](./11-config) - 自定义站点信息和样式
- [图标系统](./09-icons) - 选择合适的图标
