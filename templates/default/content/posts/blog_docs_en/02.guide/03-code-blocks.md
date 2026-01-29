---
title: Code Blocks
description: Syntax highlighting, line numbers, and code display features
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Markdown
  - Code
---

# Code Blocks

Display code with beautiful syntax highlighting powered by Shiki.

## Basic Code Blocks

Wrap code in triple backticks:

````markdown
```
Plain text code block
```
````

## Syntax Highlighting

Specify the language after the backticks:

````markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

## Supported Languages

Over 100 languages are supported:

| Language | Identifier |
|----------|------------|
| JavaScript | `javascript`, `js` |
| TypeScript | `typescript`, `ts` |
| Python | `python`, `py` |
| HTML | `html` |
| CSS | `css` |
| JSON | `json` |
| Bash | `bash`, `sh` |
| Markdown | `markdown`, `md` |

## Language Examples

### JavaScript/TypeScript

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'Alice',
  age: 25
};
```

### Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print([fibonacci(i) for i in range(10)])
```

### HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

### CSS

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
```

### Bash

```bash
#!/bin/bash

# Install dependencies
npm install

# Build project
npm run build

# Deploy
rsync -avz dist/ server:/var/www/blog/
```

### JSON

```json
{
  "name": "my-blog",
  "version": "1.0.0",
  "dependencies": {
    "astro": "^5.0.0",
    "vue": "^3.4.0"
  }
}
```

## Inline Code

Use single backticks for inline code:

```markdown
Use `npm install` to install dependencies.
```

Use `npm install` to install dependencies.

## Code Block Features

### Copy Button

All code blocks have a copy button that appears on hover.

### Language Label

The language name is displayed in the header.

### Collapsible Code

Long code blocks (15+ lines) are automatically collapsed with an "Expand" button.

::: tip Try It
Scroll up to see the expand/collapse feature on longer code blocks.
:::

## Code in Containers

Code works inside containers:

::: tip Example
```javascript
// This code is inside a tip container
console.log('Hello from a container!');
```
:::

## Diff Syntax

Show code changes:

```diff
- const old = 'before';
+ const new = 'after';
```

## Best Practices

::: info Code Block Tips
1. **Always specify the language** for proper highlighting
2. **Keep examples focused** - show only relevant code
3. **Add comments** to explain complex logic
4. **Test your code** - ensure examples actually work

:::

---

Continue to advanced features: [Mermaid Diagrams](../features/01-mermaid).
