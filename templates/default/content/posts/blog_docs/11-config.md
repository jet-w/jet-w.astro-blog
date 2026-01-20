---
title: 站点配置
description: 配置站点信息、菜单、社交链接和样式
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - 配置
  - 主题
  - 样式
---

# 站点配置

本博客采用模块化配置系统，所有配置文件位于 `src/config/` 目录。

## 配置文件概览

```
src/config/
├── site.ts      # 站点基本信息
├── menu.ts      # 导航菜单配置
├── sidebar.ts   # 侧边栏配置
├── social.ts    # 社交链接配置
└── footer.ts    # 页脚配置
```

## 站点信息 (site.ts)

配置博客的基本信息：

```typescript
// src/config/site.ts
export const siteConfig: SiteConfig = {
  title: 'Astro Tech Blog',
  description: '基于Astro构建的现代化技术博客',
  author: 'Your Name',
  email: 'your@email.com',
  avatar: '/images/avatar.jpg',
  social: {
    github: 'https://github.com/username',
    twitter: 'https://twitter.com/username',
    linkedin: 'https://linkedin.com/in/username',
    email: 'mailto:your@email.com'
  },
  menu  // 从 menu.ts 导入
};

// SEO 默认配置
export const defaultSEO = {
  title: siteConfig.title,
  description: siteConfig.description,
  image: '/images/og-image.jpg',
  type: 'website' as const
};
```

## 导航菜单 (menu.ts)

配置顶部导航菜单项：

```typescript
// src/config/menu.ts
export const menu: NavigationItem[] = [
  {
    name: '首页',
    href: '/',
    icon: 'home'
  },
  {
    name: '博客',
    href: '/posts',
    icon: 'posts'
  },
  {
    name: '分类',
    href: '/categories',
    icon: 'categories'
  },
  {
    name: '标签',
    href: '/tags',
    icon: 'tags'
  },
  {
    name: '归档',
    href: '/archives',
    icon: 'archives'
  },
  {
    name: '关于',
    href: '/about',
    icon: 'about'
  }
];
```

### 图标选项

| icon 值 | 说明 |
|:---|:---|
| `home` | 首页图标 |
| `posts` | 文章图标 |
| `categories` | 分类图标 |
| `tags` | 标签图标 |
| `archives` | 归档图标 |
| `about` | 关于图标 |

## 社交链接 (social.ts)

配置社交媒体链接，显示在页脚和其他位置：

```typescript
// src/config/social.ts
export const socialLinks: SocialLink[] = [
  { type: 'github', url: 'https://github.com/username', label: 'GitHub' },
  { type: 'twitter', url: 'https://twitter.com/username', label: 'Twitter' },
  { type: 'linkedin', url: 'https://linkedin.com/in/username', label: 'LinkedIn' },
  { type: 'email', url: 'mailto:your@email.com', label: 'Email' }
];
```

### 支持的社交平台

| type 值 | 平台 |
|:---|:---|
| `github` | GitHub |
| `twitter` | Twitter/X |
| `linkedin` | LinkedIn |
| `email` | 邮箱 |
| `youtube` | YouTube |
| `discord` | Discord |
| `weibo` | 微博 |
| `zhihu` | 知乎 |

每个平台都有内置的 SVG 图标，也可以通过 `icon` 字段自定义。

## 页脚配置 (footer.ts)

配置页脚内容：

```typescript
// src/config/footer.ts
export const footerConfig: FooterConfig = {
  // 快速链接
  quickLinksTitle: '快速链接',
  quickLinks: [
    { name: '首页', href: '/' },
    { name: '文章', href: '/posts' },
    { name: '标签', href: '/tags' },
    { name: '分类', href: '/categories' },
    { name: '归档', href: '/archives' },
    { name: '关于', href: '/about' }
  ],

  // 联系方式
  contactTitle: '联系方式',
  socialLinks: socialLinks,  // 从 social.ts 导入

  // RSS
  showRss: true,
  rssUrl: '/rss.xml',

  // 版权信息（支持 {year} 和 {author} 占位符）
  copyright: '© {year} {author}. All rights reserved.',

  // Powered by
  poweredBy: {
    text: 'Astro',
    url: 'https://astro.build'
  }
};
```

## 深色模式

博客默认使用深色模式，并内置主题切换功能：

1. **自动检测**：首次访问时检测系统主题偏好
2. **用户选择**：记住用户的主题选择到 localStorage
3. **无闪烁**：使用内联脚本避免主题切换时的闪烁

### 切换方式

点击页面右上角的主题切换按钮（太阳/月亮图标）即可切换。

### 技术实现

```html
<!-- 浅色模式 -->
<html lang="zh-CN">

<!-- 深色模式 -->
<html lang="zh-CN" class="dark">
```

## 样式系统

### 全局样式

位置：`src/styles/global.css`

包含：
- Tailwind CSS 基础样式
- 自定义容器样式（tip/warning/danger 等）
- 代码块样式
- 表格样式
- 视频嵌入样式
- 深色模式适配

### 颜色系统

博客使用 Tailwind CSS 的颜色系统：

| 用途 | 颜色 |
|:---|:---|
| 主色调 | `primary-*` (蓝色系) |
| 中性色 | `slate-*` |
| 成功 | `green-*` |
| 警告 | `yellow-*` |
| 错误 | `red-*` |
| 信息 | `blue-*` |

### 修改主色调

在 `tailwind.config.cjs` 中覆盖 primary 颜色：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          // ...
          500: '#d946ef',  // 主色
          600: '#c026d3',
          // ...
        }
      }
    }
  }
};
```

## 响应式设计

使用 Tailwind 默认断点：

| 前缀 | 最小宽度 | 适用设备 |
|:---|:---|:---|
| `sm:` | 640px | 手机横屏 |
| `md:` | 768px | 平板 |
| `lg:` | 1024px | 笔记本 |
| `xl:` | 1280px | 桌面 |
| `2xl:` | 1536px | 大屏 |

## 代码高亮主题

代码块使用 Shiki 进行语法高亮。修改主题在 `astro.config.mjs`：

```javascript
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-dark',  // 可选: 'nord', 'dracula', 'one-dark-pro' 等
    }
  }
});
```

## 常见配置场景

### 修改站点标题和描述

编辑 `src/config/site.ts`：

```typescript
export const siteConfig: SiteConfig = {
  title: '我的技术博客',
  description: '分享技术，记录成长',
  // ...
};
```

### 添加新的导航菜单项

编辑 `src/config/menu.ts`：

```typescript
export const menu: NavigationItem[] = [
  // 现有菜单项...
  {
    name: '项目',
    href: '/projects',
    icon: 'posts'
  }
];
```

### 添加社交链接

编辑 `src/config/social.ts`：

```typescript
export const socialLinks: SocialLink[] = [
  // 现有链接...
  { type: 'youtube', url: 'https://youtube.com/@channel', label: 'YouTube' }
];
```

## 总结

恭喜你完成了博客使用指南的学习！现在你已经掌握了：

- 创建和组织文章
- Frontmatter 配置
- Markdown 增强语法
- 容器、代码块、图表、公式
- 视频嵌入
- 图标系统
- 侧边栏配置
- 站点配置和样式自定义

开始写作，分享你的知识吧！

::: tip 获取帮助
如有问题，可以：
1. 查阅本系列文档
2. 参考示例文章
3. 查看源代码实现
:::
