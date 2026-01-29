---
title: 项目结构
description: 了解文件和文件夹的组织方式
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 入门
  - 结构
---

# 项目结构

了解项目结构有助于你知道在哪里查找和放置文件。

## 概览

```
your-blog/
├── content/              # 你的内容
│   ├── posts/           # 博客文章
│   └── pages/           # 独立页面
├── public/               # 静态资源
│   ├── images/          # 图片
│   └── videos/          # 视频
├── src/
│   ├── config/          # 配置文件
│   │   ├── locales/     # 语言配置
│   │   ├── site.ts      # 站点设置
│   │   └── ...
│   └── ...
├── astro.config.mjs      # Astro 配置
└── package.json          # 依赖
```

## 内容目录

这是你的内容存放的地方：

### posts/

Markdown 或 MDX 格式的博客文章：

```
content/posts/
├── hello-world.md         # 单篇文章
├── tutorials/             # 分类文件夹
│   ├── README.md         # 分类索引
│   └── getting-started.md
└── blog_docs_zh/          # 文档
    └── ...
```

### pages/

独立页面，如关于、联系：

```
content/pages/
├── about.md              # /about
└── contact.md            # /contact
```

## Public 目录

直接提供的静态文件：

```
public/
├── images/               # 图片
│   ├── avatar.jpg       # /images/avatar.jpg
│   └── posts/           # 文章图片
├── videos/               # 视频
├── favicon.svg           # 站点图标
└── robots.txt           # SEO 文件
```

::: tip 直接访问
`public/` 中的文件在根 URL 提供。
`public/images/cat.jpg` → `https://yoursite.com/images/cat.jpg`
:::

## 配置目录

站点配置文件：

```
src/config/
├── locales/              # 语言特定配置
│   ├── en/              # 英文
│   │   ├── index.ts
│   │   ├── site.ts
│   │   ├── menu.ts
│   │   ├── footer.ts
│   │   └── sidebar.ts
│   └── zh-CN/           # 中文
│       └── ...
├── site.ts               # 默认站点配置
├── menu.ts               # 默认菜单
├── sidebar.ts            # 侧边栏设置
├── footer.ts             # 页脚设置
└── social.ts             # 社交链接
```

## 关键配置文件

### astro.config.mjs

主要 Astro 配置：

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

站点元数据：

```typescript
export const siteConfig = {
  title: '我的博客',
  description: '一个关于...',
  author: '你的名字',
  avatar: '/images/avatar.jpg',
};
```

### src/config/menu.ts

导航链接：

```typescript
export const menu = [
  { name: '首页', href: '/', icon: 'home' },
  { name: '文章', href: '/posts', icon: 'posts' },
  { name: '关于', href: '/about', icon: 'about' },
];
```

## 文件命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 文章 | 小写加短横线 | `my-first-post.md` |
| 配置 | camelCase 或 kebab | `site.ts`, `menu.ts` |
| 图片 | 描述性名称 | `hero-banner.jpg` |

::: warning 避免空格
不要在文件名中使用空格。使用短横线代替：
- ❌ `my first post.md`
- ✅ `my-first-post.md`
:::

## 各文件夹的作用

| 文件夹 | 用途 | 你应该... |
|--------|------|-----------|
| `content/posts/` | 博客文章 | 在这里添加你的文章 |
| `content/pages/` | 静态页面 | 添加关于、联系页面 |
| `public/` | 静态资源 | 放置图片、文件 |
| `src/config/` | 设置 | 自定义你的站点 |

---

现在你了解了结构！让我们学习如何 [部署你的博客](./05-deploy)。
