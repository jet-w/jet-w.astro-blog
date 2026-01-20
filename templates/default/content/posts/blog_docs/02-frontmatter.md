---
title: Frontmatter 配置
description: 文章元数据配置完整指南
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - 配置
  - Frontmatter
---

# Frontmatter 配置

Frontmatter 是文章开头 `---` 之间的 YAML 格式元数据，用于定义文章的标题、日期、标签等信息。

## 完整字段列表

```yaml
---
# 基础字段（必填/推荐）
title: 文章标题              # 必填
description: 文章描述         # 推荐，用于 SEO 和列表展示
pubDate: 2025-01-01          # 推荐，发布日期

# 分类与标签
tags:                        # 可选，标签列表
  - 标签1
  - 标签2
categories:                  # 可选，分类列表
  - 分类名

# 作者与来源
author: 作者名               # 可选，默认使用站点配置

# 显示控制
image: /images/cover.jpg     # 可选，封面图片
icon: ri:article-line        # 可选，侧边栏图标
draft: false                 # 可选，草稿不会发布
star: false                  # 可选，星标/推荐文章
index: true                  # 可选，是否加入索引

# 时间相关
updatedDate: 2025-01-02      # 可选，最后更新日期
---
```

## 字段详解

### title（标题）

**必填字段**，显示在页面、列表和 SEO 中。

```yaml
title: 深入理解 JavaScript 闭包
```

::: warning 特殊字符
标题包含冒号、引号等特殊字符时，需用引号包裹：
```yaml
title: "Vue 3: 新特性详解"
```
:::

### description（描述）

用于 SEO 和文章列表展示，建议 50-160 字符。

```yaml
description: 本文详细介绍 JavaScript 闭包的概念、原理和实际应用
```

### pubDate / date（发布日期）

系统同时支持 `pubDate` 和 `date` 两种写法：

```yaml
pubDate: 2025-01-01
# 或
date: 2025-01-01
```

支持的格式：

```yaml
pubDate: 2025-01-01              # 仅日期
pubDate: 2025-01-01T10:30:00     # ISO 格式
pubDate: 2025-01-01 10:30        # 简写格式
```

### tags（标签）

用于文章分类和标签云展示：

```yaml
tags:
  - JavaScript
  - 前端
  - 教程
```

也支持行内数组格式：

```yaml
tags: [JavaScript, 前端, 教程]
```

::: tip 标签建议
- 3-5 个标签为宜
- 使用有意义的关键词
- 同类文章使用统一标签
:::

### categories（分类）

宏观的内容分类，与标签不同：

```yaml
categories:
  - 技术教程
```

系统同时支持 `categories` 和 `category` 两种写法，也支持单个字符串：

```yaml
category: 技术教程
# 等同于
categories:
  - 技术教程
```

### author（作者）

文章作者，不填则使用站点配置中的默认作者：

```yaml
author: 张三
```

### image（封面图）

文章封面图片，用于列表展示和社交分享：

```yaml
image: /images/posts/my-cover.jpg
```

图片放置于 `public/images/` 目录。

### icon（图标）

侧边栏和列表中显示的图标，支持多种格式：

```yaml
icon: ri:vue-line              # Remix Icon
icon: fa:code                  # Font Awesome
icon: bi:terminal              # Bootstrap Icons
```

详见 [图标系统](./09-icons)。

### draft（草稿）

设为 `true` 时文章不会发布：

```yaml
draft: true
```

草稿文章：
- 不在列表中显示
- 不会构建到生产环境
- 开发环境可通过 URL 直接访问预览

### star（星标）

标记推荐文章：

```yaml
star: true
```

星标文章可用于首页精选展示。

### updatedDate（更新日期）

文章最后更新时间，显示在文章底部：

```yaml
updatedDate: 2025-01-15
```

## 实际示例

### 技术教程

```yaml
---
title: Vue 3 组合式 API 指南
description: 全面掌握 Vue 3 Composition API
pubDate: 2025-01-01
updatedDate: 2025-01-10
author: 张三
tags:
  - Vue
  - Vue 3
  - 前端
categories:
  - 技术教程
image: /images/vue3-guide.jpg
---
```

### 系列文章首页

```yaml
---
title: TypeScript 入门教程
description: 从零开始学习 TypeScript
pubDate: 2025-01-01
categories:
  - 教程系列
star: true
---
```

### 草稿文章

```yaml
---
title: 正在撰写的文章
pubDate: 2025-01-01
draft: true
---
```

## 常见问题

### YAML 解析错误

```yaml
# 错误：冒号后需要空格
title:标题

# 正确
title: 标题
```

### 日期格式问题

```yaml
# 错误
date: 12-01-2025       # 格式不对
date: 2025/01/01       # 斜杠不支持

# 正确
date: 2025-01-01       # YYYY-MM-DD
```

### 列表格式问题

```yaml
# 错误
tags: JavaScript, Vue  # 逗号分隔不行

# 正确
tags:
  - JavaScript
  - Vue
# 或
tags: [JavaScript, Vue]
```

## 下一步

- [Markdown 基础](./03-markdown-basic) - 学习文章内容写作
- [图标系统](./09-icons) - 了解 icon 字段的使用
