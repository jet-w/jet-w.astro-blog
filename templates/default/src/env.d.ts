/// <reference types="astro/client" />

// Virtual module for i18n config (injected by @jet-w/astro-blog integration)
declare module 'virtual:astro-blog-i18n' {
  import type { I18nConfig } from '@jet-w/astro-blog/config';
  export const i18nConfig: I18nConfig;
}
