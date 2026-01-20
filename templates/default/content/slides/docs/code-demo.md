---
title: 代码高亮演示
description: 展示代码语法高亮功能
pubDate: 2025-01-05
theme: night
transition: fade
slideNumber: true
---

## JavaScript 示例

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

---

## Python 示例

```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
```

---

## TypeScript 示例

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
```

---

## YAML 配置

```yaml
layout: slides
theme: night
transition: fade
slideNumber: true
```
