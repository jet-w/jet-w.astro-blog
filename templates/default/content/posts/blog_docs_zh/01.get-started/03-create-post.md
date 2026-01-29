---
title: 创建第一篇文章
description: 编写并发布你的第一篇博客文章
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 入门
  - 写作
---

# 创建第一篇文章

让我们来写你的第一篇博客文章！这才是真正有趣的开始。

## 文章存放位置

所有博客文章都放在 `content/posts/` 目录：

```
content/
└── posts/
    ├── my-first-post.md    ← 你的文章放在这里
    ├── another-post.md
    └── tech/               ← 或者放在子目录中
        └── tutorial.md
```

## 创建新文章

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

## 查看你的文章

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

## 使用子目录

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

---

恭喜你发布了第一篇文章！接下来，让我们了解 [项目结构](./04-structure)。
