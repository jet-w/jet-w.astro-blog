---
title: 配置
description: 使用站点设置、侧边栏和多语言自定义你的博客
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 配置
  - 设置
---

# 配置

通过配置文件自定义博客的各个方面。

## 配置文件

所有配置都在 `src/config/` 目录：

```
src/config/
├── locales/          # 语言特定配置
│   ├── en/          # 英文
│   └── zh-CN/       # 中文
├── site.ts           # 站点元数据
├── menu.ts           # 导航菜单
├── sidebar.ts        # 侧边栏设置
├── footer.ts         # 页脚内容
└── social.ts         # 社交链接
```

## 配置指南

| 指南 | 描述 |
|------|------|
| [站点设置](./01-site) | 标题、描述、作者信息 |
| [侧边栏](./02-sidebar) | 导航和文档树 |
| [多语言](./03-i18n) | 添加多语言支持 |

## 快速概览

### 站点配置

```typescript
// src/config/site.ts
export const siteConfig = {
  title: '我的博客',
  description: '一个技术博客',
  author: '你的名字',
  avatar: '/images/avatar.jpg',
};
```

### 导航菜单

```typescript
// src/config/locales/zh-CN/menu.ts
export const menu = [
  { name: '首页', href: '/', icon: 'home' },
  { name: '文章', href: '/posts', icon: 'posts' },
  { name: '关于', href: '/about', icon: 'about' },
];
```

### 多语言

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

从 [站点设置](./01-site) 开始！
