---
title: 代码块与高亮
description: 代码展示的最佳实践和高级用法
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - 代码
  - 语法高亮
---

# 代码块与高亮

本博客使用 Shiki 进行代码语法高亮，支持 100+ 编程语言，并提供代码复制、折叠等增强功能。

## 基本用法

### 行内代码

使用单个反引号包裹：

```markdown
使用 `npm install` 安装依赖。
变量 `count` 的值为 `10`。
```

效果：使用 `npm install` 安装依赖。

### 代码块

使用三个反引号包裹，并指定语言：

````markdown
```javascript
function hello(name) {
  console.log(`Hello, ${name}!`);
}

hello('World');
```
````

效果：

```javascript
function hello(name) {
  console.log(`Hello, ${name}!`);
}

hello('World');
```

## 支持的语言

博客支持众多编程语言，常用的包括：

| 语言 | 标识符 | 语言 | 标识符 |
|:---|:---|:---|:---|
| JavaScript | `javascript` 或 `js` | Python | `python` 或 `py` |
| TypeScript | `typescript` 或 `ts` | Java | `java` |
| HTML | `html` | CSS | `css` |
| Vue | `vue` | React JSX | `jsx` |
| Bash | `bash` 或 `shell` | SQL | `sql` |
| JSON | `json` | YAML | `yaml` |
| Markdown | `markdown` 或 `md` | Go | `go` |
| Rust | `rust` | C/C++ | `c` / `cpp` |

## 语言示例

### JavaScript / TypeScript

```javascript
// ES6+ 特性
const greet = (name) => `Hello, ${name}!`;

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

// 解构赋值
const { name, age } = user;
const [first, ...rest] = array;
```

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

function getUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json());
}
```

### Vue

```vue
<template>
  <div class="counter">
    <button @click="decrement">-</button>
    <span>{{ count }}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const increment = () => count.value++;
const decrement = () => count.value--;
</script>

<style scoped>
.counter {
  display: flex;
  gap: 1rem;
}
</style>
```

### Python

```python
from typing import List, Optional

class DataProcessor:
    def __init__(self, data: List[dict]):
        self.data = data

    def filter_by(self, key: str, value: any) -> List[dict]:
        """根据键值对过滤数据"""
        return [item for item in self.data if item.get(key) == value]

    async def fetch_and_process(self, url: str) -> Optional[dict]:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                return await response.json()
```

### Bash / Shell

```bash
#!/bin/bash

# 变量定义
PROJECT_NAME="my-project"
BUILD_DIR="./dist"

# 函数定义
build() {
  echo "Building $PROJECT_NAME..."
  npm run build

  if [ $? -eq 0 ]; then
    echo "Build successful!"
  else
    echo "Build failed!" >&2
    exit 1
  fi
}

# 执行构建
build
```

### SQL

```sql
-- 创建用户表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 查询活跃用户
SELECT
  u.username,
  COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id
HAVING COUNT(p.id) > 5
ORDER BY post_count DESC;
```

### JSON / YAML

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "vue": "^3.4.0",
    "axios": "^1.6.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: secret

volumes:
  pgdata:
```

## 代码块功能

### 自动语言检测

代码块顶部会显示语言标识：

```python
print("This shows 'python' label")
```

### 代码复制

每个代码块右上角有复制按钮，点击即可复制代码。

### 代码折叠

超过 15 行的代码块会自动折叠，点击"展开代码"查看完整内容：

```javascript
// 这是一个较长的代码示例
// 用于演示代码折叠功能

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(l => l !== listener);
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    this.events[event].forEach(listener => listener.apply(this, args));
    return true;
  }

  once(event, listener) {
    const onceListener = (...args) => {
      listener.apply(this, args);
      this.off(event, onceListener);
    };
    return this.on(event, onceListener);
  }
}

// 使用示例
const emitter = new EventEmitter();
emitter.on('data', (data) => console.log(data));
emitter.emit('data', { message: 'Hello!' });
```

## 无语言代码块

如果不指定语言，代码块会显示为纯文本：

```
这是纯文本代码块
不会进行语法高亮
适合显示命令输出等
```

指定 `text` 或 `plaintext` 也可以：

```text
[INFO] 2024-01-01 10:00:00 - Application started
[DEBUG] 2024-01-01 10:00:01 - Loading configuration...
[INFO] 2024-01-01 10:00:02 - Ready to accept connections
```

## 最佳实践

### 1. 始终指定语言

```markdown
<!-- 好 -->
```javascript
const x = 1;
```

<!-- 不好 -->
```
const x = 1;
```
```

### 2. 保持代码简洁

```markdown
<!-- 好：只展示关键代码 -->
```javascript
// 关键实现
const result = data.filter(x => x.active).map(x => x.name);
```

<!-- 不好：包含过多无关代码 -->
```javascript
// 导入模块
import { something } from 'somewhere';
import { another } from 'another-place';
// ... 很多无关代码 ...
const result = data.filter(x => x.active).map(x => x.name);
// ... 更多无关代码 ...
```
```

### 3. 添加必要注释

```javascript
// 使用 reduce 计算总和
const total = numbers.reduce((sum, num) => sum + num, 0);

// 解构并设置默认值
const { name = 'Anonymous', age = 0 } = user;
```

### 4. 使用正确的语言标识

```markdown
<!-- Vue 单文件组件用 vue -->
```vue
<template>...</template>
```

<!-- React JSX 用 jsx 或 tsx -->
```jsx
function App() {
  return <div>Hello</div>;
}
```

<!-- 命令行用 bash -->
```bash
npm install package-name
```
```

## 下一步

学习更多可视化功能：

- [Mermaid 图表](./06-mermaid) - 绘制流程图、时序图等
- [LaTeX 数学公式](./07-latex) - 数学公式排版
