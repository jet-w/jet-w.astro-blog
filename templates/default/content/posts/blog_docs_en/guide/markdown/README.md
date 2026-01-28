---
title: Markdown Essentials
description: Core Markdown syntax for everyday writing
pubDate: 2025-01-01
author: Astro Blog
categories:
  - Documentation
tags:
  - Markdown
  - Writing
---

# Markdown Essentials

Markdown is a lightweight markup language that makes writing formatted content easy and intuitive.

## Headings

Use `#` symbols for headings:

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

::: tip Best Practices
- Use only one `# Heading 1` per page (your title)
- Don't skip levels (don't jump from `##` to `####`)
- Keep headings concise
:::

## Text Formatting

### Basic Styles

| Syntax | Result | Use For |
|--------|--------|---------|
| `**bold**` | **bold** | Important terms |
| `*italic*` | *italic* | Emphasis |
| `~~strike~~` | ~~strike~~ | Deprecated content |
| `` `code` `` | `code` | Inline code |

### Combined Styles

```markdown
***bold and italic***
**bold with `code` inside**
```

## Links

### Basic Links

```markdown
[Link Text](https://example.com)
[Link with Title](https://example.com "Hover text")
```

### Internal Links

Link to other posts:

```markdown
[See the guide](./02-containers)
[Back to home](/)
```

## Images

### Basic Image

```markdown
![Alt text](/images/photo.jpg)
```

### Image with Caption

```markdown
![Beautiful sunset](/images/sunset.jpg)
*A beautiful sunset over the ocean*
```

### Image Sizing

Use HTML for more control:

```html
<img src="/images/photo.jpg" alt="Photo" width="300" />
```

## Lists

### Unordered Lists

```markdown
- Item one
- Item two
  - Nested item
  - Another nested
- Item three
```

Result:
- Item one
- Item two
  - Nested item
  - Another nested
- Item three

### Ordered Lists

```markdown
1. First step
2. Second step
3. Third step
```

### Task Lists

```markdown
- [x] Completed task
- [ ] Pending task
- [ ] Another task
```

- [x] Completed task
- [ ] Pending task
- [ ] Another task

## Blockquotes

```markdown
> This is a quote.
> It can span multiple lines.

> Nested quotes:
>> Are also possible
```

> This is a quote.
> It can span multiple lines.

## Horizontal Rules

Create dividers with:

```markdown
---
```

---

## Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

### Table Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L    | C      | R     |
```

| Left | Center | Right |
|:-----|:------:|------:|
| L    | C      | R     |

## Escaping Characters

Use backslash to show literal characters:

```markdown
\*not italic\*
\# not a heading
```

\*not italic\*

---

Next: Learn about [Containers](./02-containers) for callouts and tips.
