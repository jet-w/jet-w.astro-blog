---
title: 快速开始
description: 5分钟创建你的第一篇博客文章
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - 入门
  - 教程
---

# 快速开始

本章将带你快速上手博客系统，从安装到发布第一篇文章。

## 环境准备

确保已安装以下工具：

- **Node.js** 18.x 或更高版本
- **npm** 或 **pnpm** 包管理器

```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version
```

## 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

开发服务器启动后，访问 `http://localhost:4321` 即可预览博客。

::: tip 热更新
开发模式下修改文件会自动刷新页面，无需手动重启服务器。
:::

## 目录结构

```
content/posts/
├── blog_docs/          # 博客文档
├── tech/               # 技术文章
│   ├── README.md       # 目录首页
│   └── article.md      # 具体文章
└── my-first-post.md    # 根目录文章
```

::: note 目录组织
- 相关主题文章放在同一目录
- 每个目录可添加 `README.md` 作为首页
- 访问目录路径会自动展示 README 内容
:::

## 创建第一篇文章

在 `content/posts/` 目录下创建 `hello-world.md`：

```markdown
---
title: Hello World
description: 我的第一篇博客文章
pubDate: 2025-01-01
author: 你的名字
tags:
  - 入门
categories:
  - 随笔
---

# Hello World

欢迎来到我的博客！

## 为什么开始写博客

写博客可以帮助我：

1. 整理和巩固知识
2. 分享经验和见解
3. 记录成长过程

> 千里之行，始于足下。
```

保存后，访问 `http://localhost:4321/posts/hello-world` 即可查看。

## Frontmatter 基础

文章开头 `---` 之间的部分是 Frontmatter（元数据）：

```yaml
---
title: 文章标题          # 必填
description: 文章描述    # 推荐，用于 SEO 和列表展示
pubDate: 2025-01-01     # 推荐，发布日期
author: 作者名           # 可选
tags:                   # 可选，标签列表
  - 标签1
  - 标签2
categories:             # 可选，分类列表
  - 分类名
draft: false            # 可选，草稿状态
star: false             # 可选，星标/置顶
---
```

::: info 日期字段
支持 `pubDate` 和 `date` 两种写法，系统会自动识别。
:::

## 添加图片

将图片放入 `public/images/` 目录，然后在文章中引用：

```markdown
![图片描述](/images/my-image.png)
```

## 构建部署

```bash
# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

构建产物在 `dist/` 目录，可部署到任何静态托管服务。

## 常见问题

### 文章不显示？

检查以下几点：

1. Frontmatter 格式正确（`---` 标记完整）
2. `title` 字段存在且非空
3. `draft` 不是 `true`

### URL 路径规则

- 文件路径决定 URL：`content/posts/tech/intro.md` → `/posts/tech/intro`
- 路径自动转小写
- `README.md` 对应目录路径：`content/posts/tech/README.md` → `/posts/tech`

## 下一步

- [Frontmatter 配置](./02-frontmatter) - 了解所有配置项
- [Markdown 基础](./03-markdown-basic) - 复习 Markdown 语法
- [容器语法](./04-containers) - 使用提示框等组件
