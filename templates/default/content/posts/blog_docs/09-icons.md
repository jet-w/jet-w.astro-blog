---
title: 图标系统
description: 多图标库使用指南，美化你的文章和导航
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - 图标
  - UI
---

# 图标系统

本博客内置支持多种图标库，可以在 Frontmatter 的 `icon` 字段中使用，用于侧边栏导航和文章列表的视觉增强。

## 支持的图标库

| 图标库 | 前缀 | 特点 |
|:---|:---|:---|
| Emoji | 直接使用 | 简单直观，无需配置 |
| Remix Icon | `ri:` | 现代简洁，推荐使用 |
| Font Awesome | `fa:` | 最流行的图标库 |
| Bootstrap Icons | `bi:` | Bootstrap 风格 |
| Material Icons | `mi:` | Google Material 设计 |
| Ionicons | `ion:` | Ionic 框架图标 |

## Emoji 图标

最简单的方式，直接使用 Emoji：

```yaml
---
icon: "📚"
---

# 或者
icon: "🚀"
icon: "💡"
icon: "⚙️"
icon: "🎨"
```

### 常用 Emoji 推荐

| 分类 | Emoji |
|:---|:---|
| 文档 | 📄 📝 📋 📑 📃 |
| 文件夹 | 📁 📂 🗂️ |
| 技术 | 💻 🖥️ ⚙️ 🔧 🛠️ |
| 编程 | 👨‍💻 👩‍💻 🐛 🔨 |
| 学习 | 📚 📖 🎓 ✏️ |
| 提示 | 💡 ⚡ ✨ 🔥 |
| 警告 | ⚠️ 🚨 ❗ ❌ |
| 成功 | ✅ ✔️ 👍 🎉 |
| 网络 | 🌐 🔗 📡 |
| 安全 | 🔒 🔐 🛡️ |

## Remix Icon

现代简洁的图标库，推荐作为主要图标来源。

### 语法格式

```yaml
icon: ri:图标名-样式
```

样式分为：
- `-line` 线性图标
- `-fill` 填充图标

### 常用图标

```yaml
# 文件相关
icon: ri:file-line          # 文件
icon: ri:folder-line        # 文件夹
icon: ri:folder-3-line      # 文件夹（另一种样式）
icon: ri:article-line       # 文章

# 编程相关
icon: ri:code-line          # 代码
icon: ri:code-s-slash-line  # 代码斜杠
icon: ri:terminal-line      # 终端
icon: ri:git-branch-line    # Git 分支

# 技术栈
icon: ri:javascript-line    # JavaScript
icon: ri:vuejs-line         # Vue
icon: ri:reactjs-line       # React
icon: ri:html5-line         # HTML5
icon: ri:css3-line          # CSS3

# 工具
icon: ri:settings-3-line    # 设置
icon: ri:tools-line         # 工具
icon: ri:bug-line           # Bug
icon: ri:test-tube-line     # 测试

# 数据
icon: ri:database-2-line    # 数据库
icon: ri:server-line        # 服务器
icon: ri:cloud-line         # 云

# UI/设计
icon: ri:palette-line       # 调色板
icon: ri:layout-line        # 布局
icon: ri:paint-brush-line   # 画笔

# 其他
icon: ri:book-line          # 书籍
icon: ri:lightbulb-line     # 灯泡
icon: ri:star-line          # 星星
icon: ri:rocket-line        # 火箭
icon: ri:trophy-line        # 奖杯
```

### 查找更多图标

访问 [Remix Icon 官网](https://remixicon.com/) 查找图标名称。

## Font Awesome

最流行的图标库，图标数量丰富。

### 语法格式

```yaml
# Solid 样式（默认）
icon: fa:图标名

# Regular 样式
icon: fa-regular:图标名

# Brands 样式（品牌图标）
icon: fa-brands:图标名
```

### 常用图标

```yaml
# 基础图标
icon: fa:home              # 主页
icon: fa:user              # 用户
icon: fa:cog               # 设置
icon: fa:search            # 搜索

# 文件图标
icon: fa:file              # 文件
icon: fa:folder            # 文件夹
icon: fa:file-code         # 代码文件
icon: fa:file-alt          # 文档

# 品牌图标
icon: fa-brands:github     # GitHub
icon: fa-brands:docker     # Docker
icon: fa-brands:python     # Python
icon: fa-brands:node-js    # Node.js
icon: fa-brands:aws        # AWS
```

### 查找更多图标

访问 [Font Awesome 官网](https://fontawesome.com/icons) 查找图标。

## Bootstrap Icons

Bootstrap 风格的图标库。

### 语法格式

```yaml
icon: bi:图标名
```

### 常用图标

```yaml
icon: bi:house              # 主页
icon: bi:file-earmark       # 文件
icon: bi:folder             # 文件夹
icon: bi:code-slash         # 代码
icon: bi:terminal           # 终端
icon: bi:gear               # 设置
icon: bi:book               # 书籍
icon: bi:lightning          # 闪电
icon: bi:star               # 星星
```

### 查找更多图标

访问 [Bootstrap Icons 官网](https://icons.getbootstrap.com/) 查找图标。

## Material Icons

Google Material Design 风格图标。

### 语法格式

```yaml
# 默认样式
icon: mi:图标名

# Outlined 样式
icon: mi-outlined:图标名

# Round 样式
icon: mi-round:图标名
```

### 常用图标

```yaml
icon: mi:home               # 主页
icon: mi:folder             # 文件夹
icon: mi:code               # 代码
icon: mi:settings           # 设置
icon: mi:article            # 文章
icon: mi-outlined:lightbulb # 灯泡（线性）
icon: mi-round:star         # 星星（圆角）
```

### 查找更多图标

访问 [Material Icons 官网](https://fonts.google.com/icons) 查找图标。

## Ionicons

Ionic 框架的图标库。

### 语法格式

```yaml
# 默认（filled）
icon: ion:图标名

# Outline 样式
icon: ion:图标名-outline

# Sharp 样式
icon: ion:图标名-sharp
```

### 常用图标

```yaml
icon: ion:home              # 主页
icon: ion:folder            # 文件夹
icon: ion:code              # 代码
icon: ion:settings          # 设置
icon: ion:book              # 书籍
icon: ion:rocket-outline    # 火箭（线性）
```

## 使用场景

### 文章 Frontmatter

在文章的元数据中设置图标：

```yaml
---
title: "Vue 3 入门教程"
icon: ri:vuejs-line
---
```

### 系列文档的 README

为整个系列设置统一图标：

```yaml
---
title: "Docker 完全指南"
icon: fa-brands:docker
---
```

### 按内容类型选择图标

| 内容类型 | 推荐图标 |
|:---|:---|
| 入门教程 | `ri:rocket-line` 🚀 |
| API 文档 | `ri:code-s-slash-line` |
| 配置指南 | `ri:settings-3-line` ⚙️ |
| 最佳实践 | `ri:trophy-line` 🏆 |
| 问题排查 | `ri:bug-line` 🐛 |
| 版本更新 | `ri:refresh-line` |

### 按技术栈选择图标

| 技术 | 推荐图标 |
|:---|:---|
| JavaScript | `ri:javascript-line` |
| TypeScript | `ri:typescript-line` |
| Vue | `ri:vuejs-line` |
| React | `ri:reactjs-line` |
| Node.js | `fa-brands:node-js` |
| Python | `fa-brands:python` |
| Docker | `fa-brands:docker` |
| Git | `ri:git-branch-line` |
| Database | `ri:database-2-line` |

## 图标大小

图标大小在组件中自动调整，一般不需要手动设置。默认大小为 `1em`，与文字大小一致。

## 注意事项

::: tip 图标命名
- 不同图标库的命名规则不同
- 建议在官网搜索确认准确名称
- 名称区分大小写
:::

::: warning 加载性能
- 图标库通过 CDN 加载
- 首次访问可能有轻微延迟
- 建议同一项目使用统一的图标库
:::

## 下一步

- [侧边栏配置](./10-sidebar) - 配置导航菜单，结合图标使用
- [站点配置](./11-config) - 自定义博客外观
