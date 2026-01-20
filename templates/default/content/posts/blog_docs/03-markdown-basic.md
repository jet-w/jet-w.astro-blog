---
title: Markdown 基础语法
description: 标准 Markdown 语法快速参考
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - Markdown
  - 语法
---

# Markdown 基础语法

本文回顾 Markdown 的基础语法，帮助你快速上手文章写作。

## 标题

使用 `#` 号创建标题，`#` 数量表示标题级别：

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

::: tip 建议
- 文章正文从二级标题 `##` 开始
- 一级标题 `#` 用于文章主标题
- 保持标题层级的连贯性
:::

## 段落与换行

**段落**：空行分隔

```markdown
这是第一段。

这是第二段。
```

**换行**：行尾两个空格，或使用 `<br>`

```markdown
第一行
第二行

或者

第一行<br>第二行
```

## 文本样式

| 样式 | 语法 | 效果 |
|:---|:---|:---|
| 粗体 | `**粗体**` | **粗体** |
| 斜体 | `*斜体*` | *斜体* |
| 粗斜体 | `***粗斜体***` | ***粗斜体*** |
| 删除线 | `~~删除线~~` | ~~删除线~~ |
| 行内代码 | `` `code` `` | `code` |

## 列表

### 无序列表

```markdown
- 项目一
- 项目二
  - 子项目 2.1
  - 子项目 2.2
- 项目三
```

效果：

- 项目一
- 项目二
  - 子项目 2.1
  - 子项目 2.2
- 项目三

### 有序列表

```markdown
1. 第一步
2. 第二步
3. 第三步
   1. 子步骤 3.1
   2. 子步骤 3.2
```

效果：

1. 第一步
2. 第二步
3. 第三步
   1. 子步骤 3.1
   2. 子步骤 3.2

### 任务列表

```markdown
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 待办事项
```

效果：

- [x] 已完成任务
- [ ] 未完成任务
- [ ] 待办事项

## 链接

### 基本链接

```markdown
[链接文字](https://example.com)
[带标题的链接](https://example.com "鼠标悬停提示")
```

效果：[链接文字](https://example.com)

### 内部链接

```markdown
[查看快速开始](./01-quick-start)
[返回首页](/)
[锚点链接](#标题)
```

### 自动链接

```markdown
<https://example.com>
<email@example.com>
```

## 图片

### 基本语法

```markdown
![替代文字](/images/example.jpg)
![带标题的图片](/images/example.jpg "图片标题")
```

### 图片存放位置

将图片放在 `public/images/` 目录下：

```
public/
└── images/
    ├── posts/
    │   └── my-article/
    │       └── screenshot.png
    └── logo.png
```

引用方式：

```markdown
![截图](/images/posts/my-article/screenshot.png)
```

::: tip 图片命名建议
- 使用有意义的文件名
- 使用小写字母和连字符
- 按文章组织图片目录
:::

## 引用

```markdown
> 这是一段引用文字。
> 可以有多行。
>
> > 嵌套引用
```

效果：

> 这是一段引用文字。
> 可以有多行。
>
> > 嵌套引用

## 代码

### 行内代码

```markdown
使用 `console.log()` 输出日志。
```

效果：使用 `console.log()` 输出日志。

### 代码块

````markdown
```javascript
function hello(name) {
  console.log(`Hello, ${name}!`);
}
```
````

效果：

```javascript
function hello(name) {
  console.log(`Hello, ${name}!`);
}
```

详见 [代码块与高亮](./05-code-blocks)。

## 表格

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容1  | 内容2    | 内容3  |
| 内容4  | 内容5    | 内容6  |
```

效果：

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容1  | 内容2    | 内容3  |
| 内容4  | 内容5    | 内容6  |

::: info 对齐方式
- `:---` 左对齐
- `:---:` 居中对齐
- `---:` 右对齐
:::

## 分隔线

```markdown
---

***

___
```

效果：

---

## 脚注

```markdown
这是一段带脚注的文字[^1]。

[^1]: 这是脚注的内容。
```

## 转义字符

使用反斜杠 `\` 转义特殊字符：

```markdown
\*不是斜体\*
\# 不是标题
\[不是链接\]
```

效果：\*不是斜体\*

## HTML 支持

Markdown 中可以直接使用 HTML：

```markdown
<details>
<summary>点击展开</summary>

这是隐藏的内容。

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd>
```

效果：

<details>
<summary>点击展开</summary>

这是隐藏的内容。

</details>

快捷键：<kbd>Ctrl</kbd> + <kbd>C</kbd>

## 最佳实践

### 1. 保持简洁

```markdown
# 好的写法
使用 **重点** 标记关键词。

# 避免过度使用
使用 ***非常非常*** **重要的** *关键* ~~词~~。
```

### 2. 合理使用列表

```markdown
# 适合用列表
功能特点：
- 快速
- 简单
- 强大

# 不适合用列表（改用段落）
这是一个关于...的说明，它包含了...的内容。
```

### 3. 代码与说明配合

```markdown
使用 `map()` 方法遍历数组：

```javascript
const doubled = [1, 2, 3].map(x => x * 2);
```

这会返回 `[2, 4, 6]`。
```

## 下一步

掌握基础语法后，学习本博客的增强功能：

- [容器语法](./04-containers) - 提示框、警告框等
- [代码块与高亮](./05-code-blocks) - 代码展示最佳实践
- [Mermaid 图表](./06-mermaid) - 绘制流程图等
