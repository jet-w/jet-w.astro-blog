---
title: 创建博客与文章
description: 使用 CLI 创建博客项目并编写你的第一篇文章
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 入门
  - 写作
  - CLI
---

# 创建博客与文章

本文将指导你使用 CLI 工具快速创建博客项目，并编写发布你的第一篇文章。

## 使用 CLI 创建博客项目

### 快速开始

使用 `@jet-w/astro-blog-cli` 可以快速创建一个新的博客项目：

```bash
npx @jet-w/astro-blog-cli my-blog
```

### 交互模式

不带参数运行命令进入交互模式，系统会逐步引导你配置：

```bash
npx @jet-w/astro-blog-cli
```

你将被提示输入：
- 项目名称
- 博客标题（中英文）
- 博客描述（中英文）
- 作者名称
- 作者邮箱
- 网站 URL
- 模板选择

### 非交互模式

使用 `-y` 参数跳过提示，直接使用默认值或指定的选项：

```bash
# 使用默认配置快速创建
npx @jet-w/astro-blog-cli my-blog -y

# 指定自定义选项
npx @jet-w/astro-blog-cli my-blog -y \
  --title "我的技术博客" \
  --title-zh "我的技术博客" \
  --description "A blog about tech" \
  --description-zh "一个关于技术的博客" \
  --author "张三" \
  --email "zhangsan@example.com" \
  --site "https://myblog.com"
```

### CLI 命令选项

| 选项 | 描述 | 默认值 |
|------|------|--------|
| `-t, --template <template>` | 使用的模板 | `default` |
| `--title <title>` | 博客标题（英文） | `My Astro Blog` |
| `--title-zh <titleZh>` | 博客标题（中文） | `我的Astro博客` |
| `--description <description>` | 博客描述（英文） | - |
| `--description-zh <descriptionZh>` | 博客描述（中文） | - |
| `--author <author>` | 作者名称 | `Author` |
| `--email <email>` | 作者邮箱 | `email@example.com` |
| `--site <site>` | 网站 URL | `https://example.com` |
| `--lang <lang>` | CLI 语言（`en`/`zh`） | 自动检测 |
| `-y, --yes` | 跳过提示，使用默认值 | - |
| `-f, --force` | 覆盖已存在的目录 | - |

### 启动开发服务器

项目创建完成后：

```bash
cd my-blog
npm install
npm run dev
```

博客将在 `http://localhost:4321` 运行。

### 项目结构

创建的项目包含以下结构：

```
my-blog/
├── astro.config.mjs        # Astro 配置文件
├── package.json
├── src/
│   ├── config/
│   │   ├── site.ts         # 网站主配置
│   │   └── locales/        # i18n 配置
│   │       ├── en/         # 英文语言包
│   │       └── zh-CN/      # 中文语言包
│   └── content.config.ts   # 内容集合配置
├── content/
│   ├── posts/              # 博客文章（Markdown/MDX）
│   ├── pages/              # 静态页面
│   └── slides/             # 演示幻灯片
└── public/                 # 静态资源
```

## 创建第一篇文章

现在让我们来写你的第一篇博客文章！

### 文章存放位置

所有博客文章都放在 `content/posts/` 目录：

```
content/
└── posts/
    ├── my-first-post.md    ← 你的文章放在这里
    ├── another-post.md
    └── tech/               ← 或者放在子目录中
        └── tutorial.md
```

### 创建新文章

在 `content/posts/` 中创建一个名为 `hello-world.md` 的文件：

```markdown
---
title: Hello World
description: 我的第一篇博客文章
pubDate: 2025-01-15
author: 你的名字
tags:
  - 介绍
categories:
  - 个人
---

# Hello World

欢迎来到我的博客！这是我的第一篇文章。

## 我为什么开始写博客

我开始写这个博客是为了：

1. 分享我学到的东西
2. 记录我的旅程
3. 与他人建立联系

> 最好的开始时间是昨天，其次是现在。

## 接下来

敬请期待更多关于以下内容的文章：

- Web 开发
- 我的项目
- 经验教训

感谢阅读！
```

### 查看你的文章

保存文件后访问：

```
http://localhost:4321/posts/hello-world
```

你的文章应该会以完整的样式呈现！

## 理解 Frontmatter

`---` 标记之间的部分称为 **frontmatter**。它包含文章的元数据：

```yaml
---
title: Hello World          # 必填 - 文章标题
description: 我的第一篇文章  # 用于 SEO 和预览
pubDate: 2025-01-15        # 发布日期
author: 你的名字            # 作者名称
tags:                      # 标签（数组）
  - 介绍
categories:                # 分类（数组）
  - 个人
draft: false               # true = 从列表中隐藏
star: false                # true = 精选文章
---
```

::: tip 必填与可选
只有 `title` 是必填的。其他字段都是可选的，但建议填写以便更好地组织和优化 SEO。
:::

## 使用子目录组织文章

使用子目录来组织相关文章：

```
content/posts/
├── tutorials/
│   ├── README.md        ← 显示在 /posts/tutorials
│   ├── javascript.md    ← 显示在 /posts/tutorials/javascript
│   └── css.md           ← 显示在 /posts/tutorials/css
└── projects/
    └── my-app.md        ← 显示在 /posts/projects/my-app
```

### 目录 README

每个目录可以有一个 `README.md` 作为该目录的索引页面：

```markdown
---
title: 教程
description: 一步步学习 Web 开发
---

# 教程

欢迎来到我的教程专区！

- [JavaScript 基础](./javascript)
- [CSS 技巧](./css)
```

## URL 路径规则

你的文件路径决定了 URL：

| 文件路径 | URL |
|----------|-----|
| `posts/hello.md` | `/posts/hello` |
| `posts/tech/intro.md` | `/posts/tech/intro` |
| `posts/tech/README.md` | `/posts/tech` |

::: info 大小写不敏感
URL 会自动转为小写。`Hello-World.md` 变成 `/posts/hello-world`。
:::

## 添加图片

将图片放在 `public/images/` 目录并引用：

```markdown
![我的照片](/images/photo.jpg)
```

对于文章专用的图片，你可以创建一个文件夹：

```
public/
└── images/
    └── posts/
        └── hello-world/
            └── cover.jpg
```

然后使用：

```markdown
![封面](/images/posts/hello-world/cover.jpg)
```

## 博客特性一览

使用本主题创建的博客支持以下特性：

- **多语言支持（i18n）**：中英文双语切换
- **Markdown & MDX**：强大的内容编写能力
- **代码高亮**：内置语法高亮支持
- **Mermaid 图表**：流程图、时序图等
- **LaTeX 数学公式**：支持数学公式渲染
- **自定义容器**：tip、warning、danger 等提示块
- **RSS 订阅**：自动生成 RSS feed
- **Tailwind CSS**：现代化的样式支持
- **Vue.js 组件**：可在 MDX 中使用 Vue 组件

---

恭喜你创建了博客并发布了第一篇文章！接下来，让我们了解 [项目结构](./04-structure)。
