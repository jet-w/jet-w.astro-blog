import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkDirective from 'remark-directive';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

// Import plugins and integration from @jet-w/astro-blog
import { astroBlog, defineI18nConfig } from '@jet-w/astro-blog';
import { remarkProtectCode, rehypeRestoreCode } from '@jet-w/astro-blog/plugins/remark-protect-code.mjs';
import { remarkContainers } from '@jet-w/astro-blog/plugins/remark-containers.mjs';
import { remarkMermaid } from '@jet-w/astro-blog/plugins/remark-mermaid.mjs';
import { rehypeCleanContainers } from '@jet-w/astro-blog/plugins/rehype-clean-containers.mjs';
import { rehypeTabs } from '@jet-w/astro-blog/plugins/rehype-tabs.mjs';
import { rehypeRelativeLinks } from '@jet-w/astro-blog/plugins/rehype-relative-links.mjs';

// Import locale-specific configurations
import { zhCNConfig } from './src/config/locales/zh-CN';
import { enConfig } from './src/config/locales/en';

// i18n configuration - supports any number of languages
const i18nConfig = defineI18nConfig({
  defaultLocale: 'en',
  locales: [
    { code: 'en', name: 'English', htmlLang: 'en', dateLocale: 'en-US' },
    { code: 'zh-CN', name: '中文', htmlLang: 'zh-CN', dateLocale: 'zh-CN' },
  ],
  routing: {
    prefixDefaultLocale: false, // en (default) uses /posts, zh-CN uses /zh-CN/posts
  },
  localeConfigs: {
    'en': enConfig,
    'zh-CN': zhCNConfig,
  },
});

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroBlog({ i18n: i18nConfig }),
    vue(),
    mdx(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  markdown: {
    remarkPlugins: [
      remarkProtectCode,  // Must run FIRST to protect code blocks
      remarkMath,
      remarkDirective,    // Parse ::: syntax into directive nodes
      remarkContainers,   // Handle container syntax (works with both plain text and directive nodes)
      remarkMermaid,
    ],
    rehypePlugins: [
      rehypeRaw,
      rehypeKatex,
      rehypeCleanContainers,
      rehypeTabs,
      rehypeRelativeLinks,
      rehypeRestoreCode,  // Must run LAST to restore ::: in code blocks
    ],
    shikiConfig: {
      theme: 'github-dark',
      langs: [],
      wrap: true
    }
  },
  site: 'https://example.com',
  base: '/',
  build: {
    assets: 'assets'
  },
  vite: {
    resolve: {
      // Help Vite resolve peer dependencies from injected routes
      dedupe: ['@astrojs/rss', 'astro']
    }
  }
});
