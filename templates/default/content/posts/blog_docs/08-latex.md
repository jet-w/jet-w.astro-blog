---
title: LaTeX 数学公式
description: 使用 LaTeX 语法排版数学公式
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - LaTeX
  - 数学公式
  - KaTeX
---

# LaTeX 数学公式

本博客使用 KaTeX 渲染 LaTeX 数学公式，支持行内公式和块级公式。

## 基本语法

### 行内公式

使用单个美元符号 `$...$` 包裹：

```markdown
爱因斯坦的质能方程 $E = mc^2$ 揭示了质量和能量的关系。
```

效果：爱因斯坦的质能方程 $E = mc^2$ 揭示了质量和能量的关系。

### 块级公式

使用双美元符号 `$$...$$` 包裹：

```markdown
$$
E = mc^2
$$
```

效果：

$$
E = mc^2
$$

## 基础数学符号

### 上标和下标

| 语法 | 效果 | 说明 |
|:---|:---|:---|
| `x^2` | $x^2$ | 上标 |
| `x_i` | $x_i$ | 下标 |
| `x^{10}` | $x^{10}$ | 多字符上标 |
| `x_{ij}` | $x_{ij}$ | 多字符下标 |
| `x_i^2` | $x_i^2$ | 同时使用 |

### 分数

```markdown
$\frac{a}{b}$
$\frac{x+1}{x-1}$
$\dfrac{a}{b}$  <!-- 更大的分数 -->
```

效果：$\frac{a}{b}$ 、 $\frac{x+1}{x-1}$ 、 $\dfrac{a}{b}$

### 根号

```markdown
$\sqrt{x}$
$\sqrt[3]{x}$
$\sqrt{x^2 + y^2}$
```

效果：$\sqrt{x}$ 、 $\sqrt[3]{x}$ 、 $\sqrt{x^2 + y^2}$

### 求和与积分

```markdown
$\sum_{i=1}^{n} x_i$
$\prod_{i=1}^{n} x_i$
$\int_{a}^{b} f(x) dx$
```

效果：

- 求和：$\sum_{i=1}^{n} x_i$
- 连乘：$\prod_{i=1}^{n} x_i$
- 积分：$\int_{a}^{b} f(x) dx$

块级显示（更大的符号）：

$$
\sum_{i=1}^{n} x_i \quad \prod_{i=1}^{n} x_i \quad \int_{a}^{b} f(x) \, dx
$$

## 希腊字母

| 小写 | 代码 | 大写 | 代码 |
|:---|:---|:---|:---|
| $\alpha$ | `\alpha` | $A$ | `A` |
| $\beta$ | `\beta` | $B$ | `B` |
| $\gamma$ | `\gamma` | $\Gamma$ | `\Gamma` |
| $\delta$ | `\delta` | $\Delta$ | `\Delta` |
| $\epsilon$ | `\epsilon` | $E$ | `E` |
| $\theta$ | `\theta` | $\Theta$ | `\Theta` |
| $\lambda$ | `\lambda` | $\Lambda$ | `\Lambda` |
| $\mu$ | `\mu` | $M$ | `M` |
| $\pi$ | `\pi` | $\Pi$ | `\Pi` |
| $\sigma$ | `\sigma` | $\Sigma$ | `\Sigma` |
| $\phi$ | `\phi` | $\Phi$ | `\Phi` |
| $\omega$ | `\omega` | $\Omega$ | `\Omega` |

## 运算符

### 基本运算符

| 符号 | 代码 | 符号 | 代码 |
|:---|:---|:---|:---|
| $+$ | `+` | $-$ | `-` |
| $\times$ | `\times` | $\div$ | `\div` |
| $\pm$ | `\pm` | $\mp$ | `\mp` |
| $\cdot$ | `\cdot` | $\ast$ | `\ast` |

### 关系运算符

| 符号 | 代码 | 符号 | 代码 |
|:---|:---|:---|:---|
| $=$ | `=` | $\neq$ | `\neq` |
| $<$ | `<` | $>$ | `>` |
| $\leq$ | `\leq` | $\geq$ | `\geq` |
| $\approx$ | `\approx` | $\equiv$ | `\equiv` |
| $\sim$ | `\sim` | $\propto$ | `\propto` |

### 集合运算符

| 符号 | 代码 | 符号 | 代码 |
|:---|:---|:---|:---|
| $\in$ | `\in` | $\notin$ | `\notin` |
| $\subset$ | `\subset` | $\supset$ | `\supset` |
| $\subseteq$ | `\subseteq` | $\supseteq$ | `\supseteq` |
| $\cup$ | `\cup` | $\cap$ | `\cap` |
| $\emptyset$ | `\emptyset` | $\infty$ | `\infty` |

### 逻辑运算符

| 符号 | 代码 | 符号 | 代码 |
|:---|:---|:---|:---|
| $\land$ | `\land` | $\lor$ | `\lor` |
| $\neg$ | `\neg` | $\forall$ | `\forall` |
| $\exists$ | `\exists` | $\Rightarrow$ | `\Rightarrow` |

## 括号

### 普通括号

```markdown
$(a+b)$
$[a+b]$
$\{a+b\}$
```

效果：$(a+b)$ 、 $[a+b]$ 、 $\{a+b\}$

### 自适应括号

使用 `\left` 和 `\right` 让括号自动调整大小：

```markdown
$\left( \frac{a}{b} \right)$
$\left[ \sum_{i=1}^{n} x_i \right]$
```

效果：

$$
\left( \frac{a}{b} \right) \quad \left[ \sum_{i=1}^{n} x_i \right]
$$

## 矩阵

### 基本矩阵

```markdown
$$
\begin{matrix}
a & b \\
c & d
\end{matrix}
$$
```

$$
\begin{matrix}
a & b \\
c & d
\end{matrix}
$$

### 带括号的矩阵

```markdown
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$

$$
\begin{bmatrix}
a & b \\
c & d
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
a & b \\
c & d
\end{bmatrix}
$$

### 行列式

```markdown
$$
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix}
= ad - bc
$$
```

$$
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix}
= ad - bc
$$

## 多行公式

### 对齐的多行公式

```markdown
$$
\begin{aligned}
f(x) &= (x+1)^2 \\
     &= x^2 + 2x + 1
\end{aligned}
$$
```

$$
\begin{aligned}
f(x) &= (x+1)^2 \\
     &= x^2 + 2x + 1
\end{aligned}
$$

### 分段函数

```markdown
$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$
```

$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$

## 特殊函数

### 三角函数

$\sin x$、$\cos x$、$\tan x$、$\cot x$、$\sec x$、$\csc x$

### 对数函数

$\log x$、$\ln x$、$\log_2 x$、$\lg x$

### 极限

```markdown
$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$
```

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

### 导数

$f'(x)$、$f''(x)$、$\frac{df}{dx}$、$\frac{\partial f}{\partial x}$

## 常用公式示例

### 二次方程求根公式

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

### 欧拉公式

$$
e^{i\pi} + 1 = 0
$$

### 高斯积分

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 麦克劳林级数

$$
e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

### 贝叶斯公式

$$
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
$$

### 麦克斯韦方程组

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

## 间距调整

| 代码 | 效果 | 说明 |
|:---|:---|:---|
| `a \quad b` | $a \quad b$ | 大空格 |
| `a \qquad b` | $a \qquad b$ | 更大空格 |
| `a \, b` | $a \, b$ | 小空格 |
| `a \! b` | $a \! b$ | 负空格 |

## 注意事项

::: tip 语法转义
在 Markdown 中，某些字符需要转义：
- 下划线 `_` 有时需要写成 `\_`
- 美元符号 `$` 用 `\$` 转义
:::

::: warning 兼容性
部分高级 LaTeX 语法可能不被 KaTeX 支持。如遇到渲染问题，可查阅 [KaTeX 支持的函数列表](https://katex.org/docs/supported.html)。
:::

## 下一步

- [图标系统](./09-icons) - 使用各种图标
- [侧边栏配置](./10-sidebar) - 自定义导航结构
