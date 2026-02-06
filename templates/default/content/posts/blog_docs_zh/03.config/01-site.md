---
title: 站点设置
description: 配置站点的标题、描述和元数据
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 配置
  - 站点
---

# 站点设置

配置博客的基本信息和元数据。

## 站点配置

### 基本设置

编辑 `src/config/site.ts`：

```typescript
export const siteConfig = {
  // 站点标题（显示在浏览器标签和头部）
  title: '我的超棒博客',

  // 站点描述（用于 SEO）
  description: '一个关于 Web 开发和技术的博客',

  // 作者名称
  author: '张三',

  // 作者头像（显示在头部和页脚）
  avatar: '/images/avatar.jpg',

  // 站点 URL（用于 SEO 和 RSS）
  url: 'https://myblog.com',
};
```

### 多语言设置

对于多语言站点，在语言文件夹中配置：

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

## 导航菜单

### 菜单配置

```typescript
// src/config/locales/zh-CN/menu.ts
export const menu = [
  { name: '首页', href: '/', icon: 'home' },
  { name: '文章', href: '/posts', icon: 'posts' },
  { name: '标签', href: '/tags', icon: 'tags' },
  { name: '关于', href: '/about', icon: 'about' },
];
```

### 可用图标

| 图标 | 名称 |
|------|------|
| 首页图标 | `home` |
| 文章图标 | `posts` |
| 标签图标 | `tags` |
| 分类图标 | `categories` |
| 归档图标 | `archives` |
| 幻灯片图标 | `slides` |
| 关于图标 | `about` |

### 外部链接

```typescript
{
  name: 'GitHub',
  href: 'https://github.com/username',
  icon: 'github',
  external: true  // 在新标签页打开
}
```

## 社交链接

在 `src/config/social.ts` 中配置社交媒体链接：

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
    label: '邮箱',
  },
];
```

### 支持的平台

| 类型 | 平台 |
|------|------|
| `github` | GitHub |
| `twitter` | Twitter/X |
| `linkedin` | LinkedIn |
| `email` | 邮箱 |
| `youtube` | YouTube |
| `discord` | Discord |
| `rss` | RSS 订阅 |

## 页脚配置

```typescript
// src/config/locales/zh-CN/footer.ts
export const footer = {
  quickLinksTitle: '快速链接',
  quickLinks: [
    { name: '首页', href: '/' },
    { name: '文章', href: '/posts' },
    { name: '关于', href: '/about' },
  ],
  contactTitle: '联系方式',
};
```

## 布局配置

### 内容区宽度

通过 `layout.contentWidth` 设置内容区的最大宽度：

```typescript
// src/config/site.ts
export const siteConfig = {
  title: '我的博客',
  // ...其他配置

  // 布局配置
  layout: {
    contentWidth: 'normal',  // 预设宽度
  },
};
```

### 预设宽度选项

| 选项 | 宽度 | 说明 |
|------|------|------|
| `narrow` | 768px | 窄版，适合纯文字阅读 |
| `normal` | 1024px | 标准宽度（默认） |
| `wide` | 1280px | 宽版，适合展示更多内容 |
| `full` | 100% | 全宽，占满容器 |

### 自定义宽度

除了预设值，你也可以设置任意 CSS 宽度值：

```typescript
layout: {
  contentWidth: '900px',     // 固定像素宽度
}
```

```typescript
layout: {
  contentWidth: '80vw',      // 视口宽度百分比
}
```

```typescript
layout: {
  contentWidth: '60rem',     // rem 单位
}
```

### 使用示例

**窄版布局**（适合博客文章）：

```typescript
export const siteConfig = {
  title: '阅读笔记',
  layout: {
    contentWidth: 'narrow',
  },
};
```

**宽版布局**（适合文档站点）：

```typescript
export const siteConfig = {
  title: '技术文档',
  layout: {
    contentWidth: 'wide',
  },
};
```

::: tip 布局建议
- **博客文章**：使用 `narrow` 或 `normal`，提升阅读体验
- **技术文档**：使用 `normal` 或 `wide`，便于展示代码
- **作品集**：使用 `wide` 或 `full`，展示更多视觉内容
:::

## Astro 配置

`astro.config.mjs` 中的主要配置：

```javascript
export default defineConfig({
  // 你的站点 URL（RSS 和站点地图必需）
  site: 'https://myblog.com',

  // 如果不在根路径的基础路径
  base: '/',

  integrations: [
    astroBlog({ i18n: i18nConfig }),
    vue(),
    tailwind(),
  ],
});
```

## SEO 设置

SEO 通过以下方式配置：

1. **站点配置** - 默认标题和描述
2. **Frontmatter** - 每篇文章的标题和描述
3. **自动生成** - Meta 标签、Open Graph、Twitter 卡片

### 默认 SEO

```typescript
// src/config/site.ts
export const defaultSEO = {
  title: '我的博客',
  description: '页面的默认描述',
  image: '/images/og-default.jpg',
};
```

### 文章 SEO

```yaml
---
title: 文章标题
description: 搜索结果中显示的文章描述
image: /images/post-cover.jpg
---
```

## 最佳实践

::: tip 配置技巧
1. **保持 URL 一致** - 使用或不使用尾部斜杠，但要保持一致
2. **优化图片** - 头像和 OG 图片应该优化压缩
3. **写好描述** - SEO 描述控制在 150-160 字符
4. **更新社交链接** - 保持链接最新且有效
:::

---

下一步：[侧边栏配置](./02-sidebar)
