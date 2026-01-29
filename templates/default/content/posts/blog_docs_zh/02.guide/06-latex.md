---
title: LaTeX 数学
description: 使用 LaTeX 和 KaTeX 编写数学公式
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - LaTeX
  - 数学
---

# LaTeX 数学

使用 LaTeX 语法编写精美的数学公式，由 [KaTeX](https://katex.org) 渲染。

## 行内公式

使用单个 `$` 表示行内公式：

```markdown
著名的方程 $E = mc^2$ 改变了物理学。
```

著名的方程 $E = mc^2$ 改变了物理学。

更多示例：
- 圆的面积：$A = \pi r^2$
- 勾股定理：$a^2 + b^2 = c^2$
- 求根公式：$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$

## 块级公式

使用双 `$$` 表示居中的块级公式：

```markdown
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

## 基本语法

### 上标和下标

| 语法 | 结果 |
|------|------|
| `x^2` | $x^2$ |
| `x_i` | $x_i$ |
| `x_i^2` | $x_i^2$ |
| `x^{10}` | $x^{10}$ |

### 分数

```latex
$$
\frac{a}{b} \quad \frac{1}{2} \quad \frac{x+1}{y-1}
$$
```

$$
\frac{a}{b} \quad \frac{1}{2} \quad \frac{x+1}{y-1}
$$

### 根号

```latex
$$
\sqrt{2} \quad \sqrt{x+y} \quad \sqrt[3]{8}
$$
```

$$
\sqrt{2} \quad \sqrt{x+y} \quad \sqrt[3]{8}
$$

## 希腊字母

| 字母 | 语法 | 字母 | 语法 |
|------|------|------|------|
| $\alpha$ | `\alpha` | $\beta$ | `\beta` |
| $\gamma$ | `\gamma` | $\delta$ | `\delta` |
| $\pi$ | `\pi` | $\sigma$ | `\sigma` |
| $\theta$ | `\theta` | $\lambda$ | `\lambda` |
| $\Omega$ | `\Omega` | $\Sigma$ | `\Sigma` |

## 运算符

### 求和与连乘

```latex
$$
\sum_{i=1}^{n} x_i \quad \prod_{i=1}^{n} x_i
$$
```

$$
\sum_{i=1}^{n} x_i \quad \prod_{i=1}^{n} x_i
$$

### 积分

```latex
$$
\int_a^b f(x)dx \quad \iint_D f(x,y)dxdy \quad \oint_C f(z)dz
$$
```

$$
\int_a^b f(x)dx \quad \iint_D f(x,y)dxdy \quad \oint_C f(z)dz
$$

### 极限

```latex
$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$
```

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

## 矩阵

```latex
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\quad
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{bmatrix}
$$
```

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\quad
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{bmatrix}
$$

## 方程组

### 对齐方程

```latex
$$
\begin{aligned}
(a+b)^2 &= a^2 + 2ab + b^2 \\
(a-b)^2 &= a^2 - 2ab + b^2
\end{aligned}
$$
```

$$
\begin{aligned}
(a+b)^2 &= a^2 + 2ab + b^2 \\
(a-b)^2 &= a^2 - 2ab + b^2
\end{aligned}
$$

### 分段函数

```latex
$$
f(x) = \begin{cases}
x^2 & \text{如果 } x \geq 0 \\
-x^2 & \text{如果 } x < 0
\end{cases}
$$
```

$$
f(x) = \begin{cases}
x^2 & \text{如果 } x \geq 0 \\
-x^2 & \text{如果 } x < 0
\end{cases}
$$

## 常用公式

### 统计学

标准差：
$$
\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2}
$$

### 微积分

泰勒级数：
$$
e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

### 物理学

麦克斯韦方程组：
$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}
$$

## 提示

::: tip 最佳实践
1. **行内公式用于简单公式**
2. **块级公式用于复杂或重要的方程**
3. **使用 `\quad` 添加间距**
4. **测试渲染** - KaTeX 不支持所有 LaTeX
:::

::: info 参考
完整 KaTeX 语法：[katex.org/docs/supported.html](https://katex.org/docs/supported.html)
:::

---

下一步：[视频嵌入](./07-video) 了解多媒体内容。
