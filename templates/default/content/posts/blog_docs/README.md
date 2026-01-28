---
title: 博客使用指南
description: Astro Tech Blog 完整使用文档，涵盖配置、写作、样式等各个方面
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - 文档
  - 指南
star: true
---

# Astro Tech Blog 使用指南

欢迎使用 Astro Tech Blog！这是一个基于 Astro 构建的现代化技术博客系统，支持 Markdown/MDX 写作、代码高亮、数学公式、流程图、视频嵌入等丰富功能。

## 文档目录

### 入门指南

| 文档 | 说明 |
|------|------|
| [快速开始](./01-quick-start) | 项目安装、运行与部署 |
| [Frontmatter 配置](./02-frontmatter) | 文章头部元数据配置详解 |

### 内容写作

| 文档 | 说明 |
|------|------|
| [Markdown 基础](./03-markdown-basic) | Markdown 基础语法与扩展 |
| [容器语法](./04-containers) | 提示框、警告框等容器组件 |
| [代码块](./05-code-blocks) | 代码高亮、行号、复制功能 |
| [Mermaid 图表](./06-mermaid) | 流程图、时序图、甘特图等 |
| [视频嵌入](./07-video) | YouTube、Bilibili、自托管视频 |
| [LaTeX 数学公式](./08-latex) | 行内公式与公式块 |

### 系统配置

| 文档 | 说明 |
|------|------|
| [图标系统](./09-icons) | 多图标库支持与使用方法 |
| [侧边栏配置](./10-sidebar) | 导航菜单的自动扫描与手动配置 |
| [站点配置](./11-config) | 站点信息、菜单、样式等配置 |
| [多语言支持](./12-i18n) | 多语言配置与国际化 |

## 核心特性

::: tip 丰富的写作功能
- **Markdown/MDX** - 支持标准 Markdown 及 MDX 组件
- **代码高亮** - 基于 Shiki，支持 100+ 语言
- **数学公式** - KaTeX 渲染，支持行内和块级公式
- **Mermaid 图表** - 流程图、时序图、甘特图等
- **容器语法** - tip、warning、danger 等提示框
- **视频嵌入** - 支持 YouTube、Bilibili、自托管视频
:::

::: info 系统功能
- **深色模式** - 默认深色主题，支持切换
- **响应式设计** - 完美适配桌面和移动端
- **SEO 优化** - 自动生成 meta 标签和 sitemap
- **RSS 订阅** - 自动生成 RSS feed (`/rss.xml`)
- **全文搜索** - 快速搜索文章内容
- **浮动目录** - 文章目录导航
:::

## 配置系统

博客采用模块化配置设计，所有配置文件位于 `src/config/` 目录：

| 文件 | 说明 |
|------|------|
| `site.ts` | 站点标题、描述、作者等基本信息 |
| `menu.ts` | 顶部导航菜单配置 |
| `sidebar.ts` | 侧边栏配置（支持自动扫描目录） |
| `social.ts` | 社交链接配置 |
| `footer.ts` | 页脚配置 |

## 目录结构

```
astro_blog/
├── content/
│   ├── posts/          # 博客文章（支持子目录分类）
│   └── pages/          # 独立页面（如 about）
├── public/
│   ├── images/         # 图片资源
│   └── videos/         # 视频资源
├── src/
│   ├── components/     # 组件
│   │   └── media/      # 视频组件（YouTube、Bilibili、Video）
│   ├── config/         # 配置文件
│   ├── layouts/        # 布局模板
│   ├── pages/          # 页面路由
│   └── styles/         # 全局样式
└── astro.config.mjs    # Astro 配置
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 创建文章

在 `content/posts/` 目录下创建 `.md` 或 `.mdx` 文件：

```markdown
---
title: 文章标题
description: 文章描述
pubDate: 2025-01-01
tags:
  - 标签1
  - 标签2
categories:
  - 分类
---

文章内容...
```

::: note 目录即分类
将文章放入子目录可自动组织结构，如 `content/posts/tech/article.md` 会生成路径 `/posts/tech/article`。每个目录可包含 `README.md` 作为目录首页。
:::

## 技术栈

::: details 查看完整技术栈
- **框架**: [Astro](https://astro.build) v5.x
- **样式**: [Tailwind CSS](https://tailwindcss.com) v4.x
- **组件**: [Vue 3](https://vuejs.org)
- **代码高亮**: [Shiki](https://shiki.style)
- **数学公式**: [KaTeX](https://katex.org)
- **图表**: [Mermaid](https://mermaid.js.org)
- **图标**: Font Awesome、Material Icons、Remix Icon、Bootstrap Icons
:::

---

准备好了吗？从 [快速开始](./01-quick-start) 开始你的博客之旅！
