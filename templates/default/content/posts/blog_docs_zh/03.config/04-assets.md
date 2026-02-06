---
title: 自定义资源
description: 配置页面加载的自定义 CSS 和 JavaScript 文件
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 配置
  - CSS
  - JavaScript
---

# 自定义资源

通过 `customAssets` 配置，你可以在页面中加载任意数量的外部 CSS 和 JavaScript 文件。

## 基本配置

在 `astro.config.mjs` 中配置自定义资源：

```javascript
import { defineConfig } from 'astro/config';
import { astroBlogIntegration } from '@jet-w/astro-blog';

export default defineConfig({
  integrations: [
    astroBlogIntegration({
      customAssets: {
        assets: [
          // 加载外部 CSS
          { type: 'css', src: 'https://example.com/custom.css' },

          // 加载外部 JS
          { type: 'js', src: 'https://example.com/script.js' },
        ]
      }
    })
  ]
});
```

## 配置选项

每个资源支持以下选项：

| 选项 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `type` | `'css' \| 'js'` | 是 | 资源类型 |
| `src` | `string` | 是 | 资源的 URL 或路径 |
| `position` | `'head' \| 'body'` | 否 | JS 加载位置（默认 `head`） |
| `async` | `boolean` | 否 | 异步加载 JS |
| `defer` | `boolean` | 否 | 延迟加载 JS |
| `module` | `boolean` | 否 | 作为 ES 模块加载 |
| `crossorigin` | `'anonymous' \| 'use-credentials'` | 否 | 跨域设置 |
| `integrity` | `string` | 否 | SRI 完整性校验哈希 |

## 使用示例

### 加载 CSS 文件

```javascript
customAssets: {
  assets: [
    // 外部 CDN CSS
    { type: 'css', src: 'https://cdn.example.com/library.css' },

    // 本地 CSS（放在 public 目录）
    { type: 'css', src: '/styles/custom.css' },

    // 带 SRI 校验的 CSS
    {
      type: 'css',
      src: 'https://cdn.example.com/secure.css',
      integrity: 'sha384-xxxxxxxxxxxx',
      crossorigin: 'anonymous'
    },
  ]
}
```

### 加载 JavaScript 文件

```javascript
customAssets: {
  assets: [
    // 在 head 中加载（默认）
    { type: 'js', src: 'https://cdn.example.com/analytics.js' },

    // 延迟加载
    { type: 'js', src: '/scripts/custom.js', defer: true },

    // 异步加载
    { type: 'js', src: '/scripts/tracking.js', async: true },

    // 在 body 底部加载
    { type: 'js', src: '/scripts/init.js', position: 'body' },

    // ES 模块
    { type: 'js', src: '/scripts/module.js', module: true },
  ]
}
```

### 完整示例

```javascript
import { defineConfig } from 'astro/config';
import { astroBlogIntegration, defineI18nConfig } from '@jet-w/astro-blog';

export default defineConfig({
  integrations: [
    astroBlogIntegration({
      customAssets: {
        assets: [
          // 加载自定义字体
          {
            type: 'css',
            src: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap'
          },

          // 加载第三方分析脚本
          {
            type: 'js',
            src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
            async: true
          },

          // 自定义初始化脚本
          {
            type: 'js',
            src: '/scripts/analytics-init.js',
            position: 'body'
          },

          // 自定义样式覆盖
          { type: 'css', src: '/styles/overrides.css' },
        ]
      }
    })
  ]
});
```

## 加载位置说明

### CSS 文件
- 所有 CSS 文件都在 `<head>` 中加载
- 加载顺序与配置数组顺序一致

### JavaScript 文件
- `position: 'head'`（默认）：在 `<head>` 中加载
- `position: 'body'`：在 `</body>` 前加载

### 加载属性
- `async`：脚本异步下载，下载完成后立即执行
- `defer`：脚本异步下载，在 DOM 解析完成后按顺序执行
- `module`：作为 ES 模块加载（自带 defer 效果）

## 注意事项

::: warning 本地文件路径
本地 CSS/JS 文件应放在 `public` 目录下，路径以 `/` 开头。

例如：`public/styles/custom.css` 对应 `src: '/styles/custom.css'`
:::

::: tip SRI 安全
对于外部 CDN 资源，建议使用 `integrity` 属性进行 SRI（子资源完整性）校验，防止资源被篡改。
:::
