---
title: 容器
description: 使用标注框来突出提示、警告和重要信息
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - Markdown
  - 容器
---

# 容器

容器是特殊的标注框，用于突出显示重要信息。

## 基本语法

```markdown
::: type
内容放在这里
:::
```

## 容器类型

### 提示 (Tip)

用于有用的建议：

```markdown
::: tip
这是给读者的一个有用提示。
:::
```

<div class="container-tip custom-container" data-container-type="tip">
<div class="container-title">Tip</div>
<div class="container-content">
<p>这是给读者的一个有用提示。</p>
</div>
</div>

### 信息 (Info)

用于补充说明：

```markdown
::: info
这里是一些额外的信息。
:::
```

<div class="container-info custom-container" data-container-type="info">
<div class="container-title">Info</div>
<div class="container-content">
<p>这里是一些额外的信息。</p>
</div>
</div>

### 警告 (Warning)

用于需要注意的事项：

```markdown
::: warning
请小心这个操作。
:::
```

<div class="container-warning custom-container" data-container-type="warning">
<div class="container-title">Warning</div>
<div class="container-content">
<p>请小心这个操作。</p>
</div>
</div>

### 危险 (Danger)

用于严重警告：

```markdown
::: danger
此操作无法撤销！
:::
```

<div class="container-danger custom-container" data-container-type="danger">
<div class="container-title">Danger</div>
<div class="container-content">
<p>此操作无法撤销！</p>
</div>
</div>

### 备注 (Note)

用于一般性说明：

```markdown
::: note
给读者的一个旁注。
:::
```

<div class="container-note custom-container" data-container-type="note">
<div class="container-title">Note</div>
<div class="container-content">
<p>给读者的一个旁注。</p>
</div>
</div>

## 自定义标题

在类型后添加自定义标题：

```markdown
::: tip 专业建议
这个容器有一个自定义标题。
:::
```

<div class="container-tip custom-container" data-container-type="tip">
<div class="container-title">专业建议</div>
<div class="container-content">
<p>这个容器有一个自定义标题。</p>
</div>
</div>

```markdown
::: warning 安全提醒
始终验证用户输入！
:::
```

<div class="container-warning custom-container" data-container-type="warning">
<div class="container-title">安全提醒</div>
<div class="container-content">
<p>始终验证用户输入！</p>
</div>
</div>

## 丰富内容

容器内支持完整的 Markdown：

```markdown
::: info 功能特性
这个博客支持：
- **Markdown** 格式
- `代码` 片段
- [链接](https://example.com)
:::
```

<div class="container-info custom-container" data-container-type="info">
<div class="container-title">功能特性</div>
<div class="container-content">
<p>这个博客支持：</p>
<ul>
<li><strong>Markdown</strong> 格式</li>
<li><code>代码</code> 片段</li>
<li><a href="https://example.com">链接</a></li>
</ul>
</div>
</div>

## 折叠面板 (Details)

创建可展开的区域：

```markdown
::: details 点击展开
这些内容默认是隐藏的。
你可以在这里放很多内容。
:::
```

<details class="container-details custom-container" data-container-type="details">
<summary class="container-title">点击展开</summary>
<div class="container-content">
<p>这些内容默认是隐藏的。</p>
<p>你可以在这里放很多内容。</p>
</div>
</details>

### 折叠面板中的代码

```markdown
::: details 查看解决方案
function solve() {
  return 42;
}
:::
```

<details class="container-details custom-container" data-container-type="details">
<summary class="container-title">查看解决方案</summary>
<div class="container-content">

```javascript
function solve() {
  return 42;
}
```

</div>
</details>

## 最佳实践

<div class="container-tip custom-container" data-container-type="tip">
<div class="container-title">何时使用容器</div>
<div class="container-content">
<ul>
<li><strong>tip</strong> - 有用的建议、最佳实践</li>
<li><strong>info</strong> - 背景信息、上下文</li>
<li><strong>warning</strong> - 潜在问题、需要注意的事项</li>
<li><strong>danger</strong> - 严重错误、数据丢失风险</li>
<li><strong>note</strong> - 一般性说明</li>
<li><strong>details</strong> - 可选内容、长示例</li>
</ul>
</div>
</div>

<div class="container-warning custom-container" data-container-type="warning">
<div class="container-title">不要过度使用</div>
<div class="container-content">
<p>太多容器会分散注意力。谨慎使用，只用于真正重要的信息。</p>
</div>
</div>

## 快速参考

| 类型 | 语法 | 用途 |
|------|------|------|
| tip | `::: tip` | 有用的建议 |
| info | `::: info` | 额外信息 |
| warning | `::: warning` | 注意事项 |
| danger | `::: danger` | 严重警告 |
| note | `::: note` | 旁注 |
| details | `::: details` | 可折叠内容 |

---

下一步：掌握 [代码块](./03-code-blocks) 来展示精美的代码片段。
