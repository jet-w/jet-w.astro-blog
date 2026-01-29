---
title: 代码块
description: 语法高亮、行号和代码显示功能
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - Markdown
  - 代码
---

# 代码块

使用 Shiki 提供的精美语法高亮来展示代码。

## 基本代码块

用三个反引号包裹代码：

````markdown
```
纯文本代码块
```
````

## 语法高亮

在反引号后指定语言：

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

## 支持的语言

支持 100+ 种语言：

| 语言 | 标识符 |
|------|--------|
| JavaScript | `javascript`, `js` |
| TypeScript | `typescript`, `ts` |
| Python | `python`, `py` |
| HTML | `html` |
| CSS | `css` |
| JSON | `json` |
| Bash | `bash`, `sh` |
| Markdown | `markdown`, `md` |

## 语言示例

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

# 安装依赖
npm install

# 构建项目
npm run build

# 部署
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

## 行内代码

使用单个反引号表示行内代码：

```markdown
使用 `npm install` 安装依赖。
```

使用 `npm install` 安装依赖。

## 代码块功能

### 复制按钮

所有代码块在悬停时都会显示复制按钮。

### 语言标签

语言名称显示在头部。

### 可折叠代码

长代码块（15+ 行）会自动折叠，带有"展开"按钮。

::: tip 试试看
向上滚动查看较长代码块上的展开/折叠功能。
:::

## 容器中的代码

代码在容器中也能正常工作：

::: tip 示例
```javascript
// 这段代码在提示容器内
console.log('Hello from a container!');
```
:::

## Diff 语法

展示代码变化：

```diff
- const old = 'before';
+ const new = 'after';
```

## 最佳实践

::: info 代码块技巧
1. **始终指定语言** 以获得正确的高亮
2. **保持示例简洁** - 只展示相关代码
3. **添加注释** 解释复杂逻辑
4. **测试你的代码** - 确保示例真正有效
:::

---

继续学习高级功能：[Mermaid 图表](./03-mermaid)。
