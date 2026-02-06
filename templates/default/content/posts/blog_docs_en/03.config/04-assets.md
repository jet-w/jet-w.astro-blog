---
title: Custom Assets
description: Configure custom CSS and JavaScript files to load on pages
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Configuration
  - CSS
  - JavaScript
---

# Custom Assets

With the `customAssets` configuration, you can load any number of external CSS and JavaScript files on your pages.

## Basic Configuration

Configure custom assets in `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import { astroBlogIntegration } from '@jet-w/astro-blog';

export default defineConfig({
  integrations: [
    astroBlogIntegration({
      customAssets: {
        assets: [
          // Load external CSS
          { type: 'css', src: 'https://example.com/custom.css' },

          // Load external JS
          { type: 'js', src: 'https://example.com/script.js' },
        ]
      }
    })
  ]
});
```

## Configuration Options

Each asset supports the following options:

| Option | Type | Required | Description |
|--------|------|:--------:|-------------|
| `type` | `'css' \| 'js'` | Yes | Asset type |
| `src` | `string` | Yes | URL or path of the asset |
| `position` | `'head' \| 'body'` | No | JS load position (default: `head`) |
| `async` | `boolean` | No | Load JS asynchronously |
| `defer` | `boolean` | No | Defer JS loading |
| `module` | `boolean` | No | Load as ES module |
| `crossorigin` | `'anonymous' \| 'use-credentials'` | No | Cross-origin setting |
| `integrity` | `string` | No | SRI integrity hash |

## Usage Examples

### Loading CSS Files

```javascript
customAssets: {
  assets: [
    // External CDN CSS
    { type: 'css', src: 'https://cdn.example.com/library.css' },

    // Local CSS (placed in public directory)
    { type: 'css', src: '/styles/custom.css' },

    // CSS with SRI verification
    {
      type: 'css',
      src: 'https://cdn.example.com/secure.css',
      integrity: 'sha384-xxxxxxxxxxxx',
      crossorigin: 'anonymous'
    },
  ]
}
```

### Loading JavaScript Files

```javascript
customAssets: {
  assets: [
    // Load in head (default)
    { type: 'js', src: 'https://cdn.example.com/analytics.js' },

    // Deferred loading
    { type: 'js', src: '/scripts/custom.js', defer: true },

    // Async loading
    { type: 'js', src: '/scripts/tracking.js', async: true },

    // Load at body bottom
    { type: 'js', src: '/scripts/init.js', position: 'body' },

    // ES module
    { type: 'js', src: '/scripts/module.js', module: true },
  ]
}
```

### Complete Example

```javascript
import { defineConfig } from 'astro/config';
import { astroBlogIntegration, defineI18nConfig } from '@jet-w/astro-blog';

export default defineConfig({
  integrations: [
    astroBlogIntegration({
      customAssets: {
        assets: [
          // Load custom fonts
          {
            type: 'css',
            src: 'https://fonts.googleapis.com/css2?family=Inter&display=swap'
          },

          // Load third-party analytics script
          {
            type: 'js',
            src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
            async: true
          },

          // Custom initialization script
          {
            type: 'js',
            src: '/scripts/analytics-init.js',
            position: 'body'
          },

          // Custom style overrides
          { type: 'css', src: '/styles/overrides.css' },
        ]
      }
    })
  ]
});
```

## Load Position Details

### CSS Files
- All CSS files are loaded in the `<head>`
- Load order follows the configuration array order

### JavaScript Files
- `position: 'head'` (default): Loaded in `<head>`
- `position: 'body'`: Loaded before `</body>`

### Loading Attributes
- `async`: Script downloads asynchronously and executes immediately when ready
- `defer`: Script downloads asynchronously and executes in order after DOM parsing
- `module`: Load as ES module (has implicit defer behavior)

## Important Notes

::: warning Local File Paths
Local CSS/JS files should be placed in the `public` directory, with paths starting with `/`.

Example: `public/styles/custom.css` corresponds to `src: '/styles/custom.css'`
:::

::: tip SRI Security
For external CDN resources, it's recommended to use the `integrity` attribute for SRI (Subresource Integrity) verification to prevent resource tampering.
:::
