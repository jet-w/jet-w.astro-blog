/**
 * jet-w.astro-blog
 *
 * A modern Astro blog theme with Vue and Tailwind CSS support
 */

// Config exports
export * from './config';

// Type exports
export * from './types';

// Integration export
export { astroBlogIntegration, type AstroBlogIntegrationOptions } from './integration';
export { default as astroBlog } from './integration';

// i18n utility exports
export {
  getLocaleFromPath,
  getLocaleByCode,
  removeLocalePrefix,
  getLocalizedPath,
  getAlternateLinks,
  getLocaleConfig,
  t,
  formatDate,
  formatDateShort,
  isRTL,
  getTextDirection,
  isMultiLanguageEnabled,
  getLocalePrefix,
  getContentPathPrefix,
  filterPostsByLocale,
  type MergedLocaleConfig,
  type AlternateLink,
} from './utils/i18n';

// Vue composable export
export {
  useI18n,
  createI18nContext,
  I18N_LOCALE_KEY,
  I18N_CONFIG_KEY,
  I18N_TRANSLATIONS_KEY,
  type I18nContext,
  type UseI18nReturn,
} from './utils/useI18n';

// Note: Content config schemas are provided as templates in the CLI tool
// Users should copy and customize the content.config.ts file from the template

/**
 * Define blog configuration helper
 */
export interface BlogConfig {
  site: import('./types').SiteConfig;
  sidebar?: import('./config').SidebarConfig;
  footer?: import('./config').FooterConfig;
  social?: import('./config').SocialLink[];
  i18n?: import('./config').I18nConfig;
}

export function defineBlogConfig(config: BlogConfig): BlogConfig {
  return config;
}

/**
 * Get Astro config with jet-w.astro-blog integrations
 */
export function getAstroConfig(options?: {
  remarkPlugins?: any[];
  rehypePlugins?: any[];
}) {
  return {
    markdown: {
      remarkPlugins: options?.remarkPlugins || [],
      rehypePlugins: options?.rehypePlugins || [],
      shikiConfig: {
        theme: 'github-dark',
        langs: [],
        wrap: true
      }
    }
  };
}
