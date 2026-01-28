---
title: Containers
description: Use callout boxes for tips, warnings, and important information
pubDate: 2025-01-01
author: Astro Blog
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

::: tip
This is a helpful tip for the reader.
:::

### Info

For informational notes:

```markdown
::: info
Here's some additional information.
:::
```

::: info
Here's some additional information.
:::

### Warning

For things to be careful about:

```markdown
::: warning
Be careful with this operation.
:::
```

::: warning
Be careful with this operation.
:::

### Danger

For critical warnings:

```markdown
::: danger
This action cannot be undone!
:::
```

::: danger
This action cannot be undone!
:::

### Note

For general notes:

```markdown
::: note
A side note for the reader.
:::
```

::: note
A side note for the reader.
:::

## Custom Titles

Add a custom title after the type:

```markdown
::: tip Pro Tip
This container has a custom title.
:::
```

::: tip Pro Tip
This container has a custom title.
:::

```markdown
::: warning Security Notice
Always validate user input!
:::
```

::: warning Security Notice
Always validate user input!
:::

## Rich Content

Containers support full Markdown inside:

```markdown
::: info Features
This blog supports:
- **Markdown** formatting
- `Code` snippets
- [Links](https://example.com)

| Feature | Status |
|---------|--------|
| Images  | ✅     |
| Tables  | ✅     |
:::
```

::: info Features
This blog supports:
- **Markdown** formatting
- `Code` snippets
- [Links](https://example.com)

| Feature | Status |
|---------|--------|
| Images  | ✅     |
| Tables  | ✅     |
:::

## Details (Collapsible)

Create expandable sections:

```markdown
::: details Click to expand
This content is hidden by default.
You can put lots of content here.
:::
```

::: details Click to expand
This content is hidden by default.
You can put lots of content here.
:::

### Details with Custom Title

```markdown
::: details View the solution
```javascript
function solve() {
  return 42;
}
```
:::
```

::: details View the solution
```javascript
function solve() {
  return 42;
}
```
:::

## Nested Containers

You can nest containers (use more colons for outer):

```markdown
:::: warning Important
This is important!

::: tip
A tip inside a warning.
:::
::::
```

:::: warning Important
This is important!

::: tip
A tip inside a warning.
:::
::::

## Best Practices

::: tip When to Use Containers
- **tip** - Helpful suggestions, best practices
- **info** - Background information, context
- **warning** - Potential issues, things to watch
- **danger** - Critical errors, data loss risks
- **note** - General observations
- **details** - Optional content, long examples
:::

::: warning Don't Overuse
Too many containers can be distracting. Use them sparingly for truly important information.
:::

---

Next: Master [Code Blocks](./03-code-blocks) for beautiful code snippets.
