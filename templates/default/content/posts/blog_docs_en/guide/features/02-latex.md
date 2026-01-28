---
title: LaTeX Math
description: Write mathematical formulas with LaTeX and KaTeX
pubDate: 2025-01-01
author: Astro Blog
categories:
  - Documentation
tags:
  - LaTeX
  - Math
---

# LaTeX Math

Write beautiful mathematical formulas using LaTeX syntax, rendered with [KaTeX](https://katex.org).

## Inline Math

Use single `$` for inline formulas:

```markdown
The famous equation $E = mc^2$ changed physics.
```

The famous equation $E = mc^2$ changed physics.

More examples:
- Area of circle: $A = \pi r^2$
- Pythagorean theorem: $a^2 + b^2 = c^2$
- Quadratic formula: $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$

## Block Math

Use double `$$` for centered, block-level formulas:

```markdown
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

## Basic Syntax

### Superscripts and Subscripts

| Syntax | Result |
|--------|--------|
| `x^2` | $x^2$ |
| `x_i` | $x_i$ |
| `x_i^2` | $x_i^2$ |
| `x^{10}` | $x^{10}$ |

### Fractions

```latex
$$
\frac{a}{b} \quad \frac{1}{2} \quad \frac{x+1}{y-1}
$$
```

$$
\frac{a}{b} \quad \frac{1}{2} \quad \frac{x+1}{y-1}
$$

### Square Roots

```latex
$$
\sqrt{2} \quad \sqrt{x+y} \quad \sqrt[3]{8}
$$
```

$$
\sqrt{2} \quad \sqrt{x+y} \quad \sqrt[3]{8}
$$

## Greek Letters

| Letter | Syntax | Letter | Syntax |
|--------|--------|--------|--------|
| $\alpha$ | `\alpha` | $\beta$ | `\beta` |
| $\gamma$ | `\gamma` | $\delta$ | `\delta` |
| $\pi$ | `\pi` | $\sigma$ | `\sigma` |
| $\theta$ | `\theta` | $\lambda$ | `\lambda` |
| $\Omega$ | `\Omega` | $\Sigma$ | `\Sigma` |

## Operators

### Sums and Products

```latex
$$
\sum_{i=1}^{n} x_i \quad \prod_{i=1}^{n} x_i
$$
```

$$
\sum_{i=1}^{n} x_i \quad \prod_{i=1}^{n} x_i
$$

### Integrals

```latex
$$
\int_a^b f(x)dx \quad \iint_D f(x,y)dxdy \quad \oint_C f(z)dz
$$
```

$$
\int_a^b f(x)dx \quad \iint_D f(x,y)dxdy \quad \oint_C f(z)dz
$$

### Limits

```latex
$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$
```

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

## Matrices

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

## Equations

### Aligned Equations

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

### Cases

```latex
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

## Common Formulas

### Statistics

Standard deviation:
$$
\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2}
$$

### Calculus

Taylor series:
$$
e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

### Physics

Maxwell's equations:
$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}
$$

## Tips

::: tip Best Practices
1. **Use inline math** for simple formulas in text
2. **Use block math** for complex or important equations
3. **Add spacing** with `\quad` between elements
4. **Test rendering** - KaTeX doesn't support all LaTeX
:::

::: info Reference
Full KaTeX syntax: [katex.org/docs/supported.html](https://katex.org/docs/supported.html)
:::

---

Next: [Video Embedding](./03-video) for multimedia content.
