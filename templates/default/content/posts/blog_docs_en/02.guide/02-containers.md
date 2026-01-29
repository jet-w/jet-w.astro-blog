---
title: Containers
description: Use callout boxes for tips, warnings, and important information
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Markdown
  - Containers
---

# Containers

Containers are special callout boxes that help highlight important information.

## Basic Syntax

```markdown
::: type
Content goes here
:::
```

## Container Types

### Tip

For helpful suggestions:

```markdown
::: tip
This is a helpful tip for the reader.
:::
```

<div class="container-tip custom-container" data-container-type="tip">
<div class="container-title">Tip</div>
<div class="container-content">
<p>This is a helpful tip for the reader.</p>
</div>
</div>

### Info

For informational notes:

```markdown
::: info
Here's some additional information.
:::
```

<div class="container-info custom-container" data-container-type="info">
<div class="container-title">Info</div>
<div class="container-content">
<p>Here's some additional information.</p>
</div>
</div>

### Warning

For things to be careful about:

```markdown
::: warning
Be careful with this operation.
:::
```

<div class="container-warning custom-container" data-container-type="warning">
<div class="container-title">Warning</div>
<div class="container-content">
<p>Be careful with this operation.</p>
</div>
</div>

### Danger

For critical warnings:

```markdown
::: danger
This action cannot be undone!
:::
```

<div class="container-danger custom-container" data-container-type="danger">
<div class="container-title">Danger</div>
<div class="container-content">
<p>This action cannot be undone!</p>
</div>
</div>

### Note

For general notes:

```markdown
::: note
A side note for the reader.
:::
```

<div class="container-note custom-container" data-container-type="note">
<div class="container-title">Note</div>
<div class="container-content">
<p>A side note for the reader.</p>
</div>
</div>

## Custom Titles

Add a custom title after the type:

```markdown
::: tip Pro Tip
This container has a custom title.
:::
```

<div class="container-tip custom-container" data-container-type="tip">
<div class="container-title">Pro Tip</div>
<div class="container-content">
<p>This container has a custom title.</p>
</div>
</div>

```markdown
::: warning Security Notice
Always validate user input!
:::
```

<div class="container-warning custom-container" data-container-type="warning">
<div class="container-title">Security Notice</div>
<div class="container-content">
<p>Always validate user input!</p>
</div>
</div>

## Rich Content

Containers support full Markdown inside:

```markdown
::: info Features
This blog supports:
- **Markdown** formatting
- `Code` snippets
- [Links](https://example.com)
:::
```

<div class="container-info custom-container" data-container-type="info">
<div class="container-title">Features</div>
<div class="container-content">
<p>This blog supports:</p>
<ul>
<li><strong>Markdown</strong> formatting</li>
<li><code>Code</code> snippets</li>
<li><a href="https://example.com">Links</a></li>
</ul>
</div>
</div>

## Details (Collapsible)

Create expandable sections:

```markdown
::: details Click to expand
This content is hidden by default.
You can put lots of content here.
:::
```

<details class="container-details custom-container" data-container-type="details">
<summary class="container-title">Click to expand</summary>
<div class="container-content">
<p>This content is hidden by default.</p>
<p>You can put lots of content here.</p>
</div>
</details>

### Details with Code

```markdown
::: details View the solution
function solve() {
  return 42;
}
:::
```

<details class="container-details custom-container" data-container-type="details">
<summary class="container-title">View the solution</summary>
<div class="container-content">

```javascript
function solve() {
  return 42;
}
```

</div>
</details>

## Best Practices

<div class="container-tip custom-container" data-container-type="tip">
<div class="container-title">When to Use Containers</div>
<div class="container-content">
<ul>
<li><strong>tip</strong> - Helpful suggestions, best practices</li>
<li><strong>info</strong> - Background information, context</li>
<li><strong>warning</strong> - Potential issues, things to watch</li>
<li><strong>danger</strong> - Critical errors, data loss risks</li>
<li><strong>note</strong> - General observations</li>
<li><strong>details</strong> - Optional content, long examples</li>
</ul>
</div>
</div>

<div class="container-warning custom-container" data-container-type="warning">
<div class="container-title">Don't Overuse</div>
<div class="container-content">
<p>Too many containers can be distracting. Use them sparingly for truly important information.</p>
</div>
</div>

## Quick Reference

| Type | Syntax | Use Case |
|------|--------|----------|
| tip | `::: tip` | Helpful suggestions |
| info | `::: info` | Additional information |
| warning | `::: warning` | Cautions |
| danger | `::: danger` | Critical warnings |
| note | `::: note` | Side notes |
| details | `::: details` | Collapsible content |

---

Next: Master [Code Blocks](./03-code-blocks) for beautiful code snippets.
