---
title: Icons
description: Use icons from Font Awesome, Material, Remix, and Bootstrap
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Icons
  - Design
---

# Icons

Add visual elements with icons from multiple popular libraries.

## Available Libraries

| Library | Prefix | Icons |
|---------|--------|-------|
| Font Awesome | `fa-` | 2000+ |
| Material Icons | `material-icons` | 2500+ |
| Remix Icon | `ri-` | 2400+ |
| Bootstrap Icons | `bi-` | 2000+ |
| Ionicons | `ion-` | 1300+ |

## Font Awesome

### Solid Icons

```html
<i class="fas fa-home"></i>
<i class="fas fa-star"></i>
<i class="fas fa-heart"></i>
<i class="fas fa-user"></i>
```

<i class="fas fa-home"></i> <i class="fas fa-star"></i> <i class="fas fa-heart"></i> <i class="fas fa-user"></i>

### Regular Icons

```html
<i class="far fa-star"></i>
<i class="far fa-heart"></i>
<i class="far fa-comment"></i>
```

<i class="far fa-star"></i> <i class="far fa-heart"></i> <i class="far fa-comment"></i>

### Brand Icons

```html
<i class="fab fa-github"></i>
<i class="fab fa-twitter"></i>
<i class="fab fa-linkedin"></i>
```

<i class="fab fa-github"></i> <i class="fab fa-twitter"></i> <i class="fab fa-linkedin"></i>

## Material Icons

```html
<span class="material-icons">home</span>
<span class="material-icons">favorite</span>
<span class="material-icons">settings</span>
```

<span class="material-icons">home</span> <span class="material-icons">favorite</span> <span class="material-icons">settings</span>

### Outlined Style

```html
<span class="material-icons-outlined">home</span>
<span class="material-icons-outlined">favorite</span>
```

<span class="material-icons-outlined">home</span> <span class="material-icons-outlined">favorite</span>

### Rounded Style

```html
<span class="material-icons-round">home</span>
<span class="material-icons-round">favorite</span>
```

<span class="material-icons-round">home</span> <span class="material-icons-round">favorite</span>

## Remix Icon

```html
<i class="ri-home-line"></i>
<i class="ri-home-fill"></i>
<i class="ri-star-line"></i>
<i class="ri-star-fill"></i>
```

<i class="ri-home-line"></i> <i class="ri-home-fill"></i> <i class="ri-star-line"></i> <i class="ri-star-fill"></i>

### Common Icons

```html
<i class="ri-github-fill"></i>
<i class="ri-twitter-fill"></i>
<i class="ri-code-line"></i>
<i class="ri-terminal-box-line"></i>
```

<i class="ri-github-fill"></i> <i class="ri-twitter-fill"></i> <i class="ri-code-line"></i> <i class="ri-terminal-box-line"></i>

## Bootstrap Icons

```html
<i class="bi bi-house"></i>
<i class="bi bi-star"></i>
<i class="bi bi-heart"></i>
<i class="bi bi-github"></i>
```

<i class="bi bi-house"></i> <i class="bi bi-star"></i> <i class="bi bi-heart"></i> <i class="bi bi-github"></i>

## Ionicons

```html
<ion-icon name="home"></ion-icon>
<ion-icon name="star"></ion-icon>
<ion-icon name="heart"></ion-icon>
```

<ion-icon name="home"></ion-icon> <ion-icon name="star"></ion-icon> <ion-icon name="heart"></ion-icon>

## Sizing

### Font Awesome

```html
<i class="fas fa-star fa-xs"></i>
<i class="fas fa-star fa-sm"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star fa-lg"></i>
<i class="fas fa-star fa-2x"></i>
<i class="fas fa-star fa-3x"></i>
```

<i class="fas fa-star fa-xs"></i> <i class="fas fa-star fa-sm"></i> <i class="fas fa-star"></i> <i class="fas fa-star fa-lg"></i> <i class="fas fa-star fa-2x"></i> <i class="fas fa-star fa-3x"></i>

### CSS Sizing

```html
<i class="ri-star-fill" style="font-size: 24px;"></i>
<i class="ri-star-fill" style="font-size: 32px;"></i>
```

<i class="ri-star-fill" style="font-size: 24px;"></i> <i class="ri-star-fill" style="font-size: 32px;"></i>

## Coloring

```html
<i class="fas fa-star" style="color: gold;"></i>
<i class="fas fa-heart" style="color: red;"></i>
<i class="fas fa-leaf" style="color: green;"></i>
```

<i class="fas fa-star" style="color: gold;"></i> <i class="fas fa-heart" style="color: red;"></i> <i class="fas fa-leaf" style="color: green;"></i>

## Animation

### Font Awesome

```html
<i class="fas fa-spinner fa-spin"></i>
<i class="fas fa-circle-notch fa-spin"></i>
<i class="fas fa-sync fa-spin"></i>
```

<i class="fas fa-spinner fa-spin"></i> <i class="fas fa-circle-notch fa-spin"></i> <i class="fas fa-sync fa-spin"></i>

## Common Use Cases

### In Text

Use icons inline with text:

```markdown
<i class="fas fa-check" style="color: green;"></i> Task completed

<i class="fas fa-times" style="color: red;"></i> Task failed

<i class="fas fa-info-circle" style="color: blue;"></i> Information
```

<i class="fas fa-check" style="color: green;"></i> Task completed

<i class="fas fa-times" style="color: red;"></i> Task failed

<i class="fas fa-info-circle" style="color: blue;"></i> Information

### In Lists

```markdown
- <i class="ri-checkbox-circle-fill" style="color: green;"></i> Feature A
- <i class="ri-checkbox-circle-fill" style="color: green;"></i> Feature B
- <i class="ri-close-circle-fill" style="color: red;"></i> Not supported
```

- <i class="ri-checkbox-circle-fill" style="color: green;"></i> Feature A
- <i class="ri-checkbox-circle-fill" style="color: green;"></i> Feature B
- <i class="ri-close-circle-fill" style="color: red;"></i> Not supported

## Icon Search

Find icons at:
- [Font Awesome](https://fontawesome.com/icons)
- [Material Icons](https://fonts.google.com/icons)
- [Remix Icon](https://remixicon.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Ionicons](https://ionic.io/ionicons)

::: tip Choosing Icons
1. **Stay consistent** - Pick one library for most icons
2. **Match your style** - Outlined vs filled, thin vs bold
3. **Consider meaning** - Icons should be intuitive
4. **Don't overuse** - Icons should enhance, not clutter
:::

---

Next: [Slides](./05-slides) to create interactive presentations.

Or continue to [Configuration](../../config/) to customize your blog.
