/**
 * i18n Utility Functions
 *
 * Provides helper functions for multi-language support.
 */

import type {
  I18nConfig,
  Locale,
  UITranslations,
} from '../config/i18n';
import {
  defaultI18nConfig,
  getUITranslations,
} from '../config/i18n';
import type { SiteConfig, NavigationItem } from '../types';
import type { FooterConfig } from '../config/footer';
import type { SidebarConfig } from '../config/sidebar';
import { defaultSiteConfig } from '../config/site';
import { defaultMenu } from '../config/menu';
import { defaultFooterConfig } from '../config/footer';
import { sidebarConfig as defaultSidebarConfig } from '../config/sidebar';

/**
 * Merged locale configuration with all defaults applied
 */
export interface MergedLocaleConfig {
  locale: Locale;
  site: SiteConfig;
  menu: NavigationItem[];
  footer: FooterConfig;
  sidebar: SidebarConfig;
  ui: UITranslations;
}

/**
 * Alternate link for SEO (hreflang)
 */
export interface AlternateLink {
  locale: string;
  url: string;
  hreflang: string;
}

/**
 * Get current locale from URL pathname
 *
 * @example
 * getLocaleFromPath('/en/posts', config) // 'en'
 * getLocaleFromPath('/posts', config) // 'zh-CN' (default)
 * getLocaleFromPath('/zh-CN/about', config) // 'zh-CN'
 */
export function getLocaleFromPath(
  pathname: string,
  config: I18nConfig = defaultI18nConfig
): string {
  // Remove leading slash and get first segment
  const segments = pathname.replace(/^\//, '').split('/');
  const firstSegment = segments[0];

  // Check if first segment matches any locale code
  const matchedLocale = config.locales.find(
    (locale) => locale.code === firstSegment
  );

  if (matchedLocale) {
    return matchedLocale.code;
  }

  // Return default locale
  return config.defaultLocale;
}

/**
 * Get locale data by code
 */
export function getLocaleByCode(
  code: string,
  config: I18nConfig = defaultI18nConfig
): Locale | undefined {
  return config.locales.find((locale) => locale.code === code);
}

/**
 * Remove locale prefix from pathname
 *
 * @example
 * removeLocalePrefix('/en/posts', config) // '/posts'
 * removeLocalePrefix('/posts', config) // '/posts'
 */
export function removeLocalePrefix(
  pathname: string,
  config: I18nConfig = defaultI18nConfig
): string {
  const locale = getLocaleFromPath(pathname, config);

  // If it's default locale and prefix is not required, pathname has no prefix
  if (locale === config.defaultLocale && !config.routing.prefixDefaultLocale) {
    return pathname;
  }

  // Remove the locale prefix
  const prefix = `/${locale}`;
  if (pathname.startsWith(prefix)) {
    const rest = pathname.slice(prefix.length);
    return rest || '/';
  }

  return pathname;
}

/**
 * Get localized path for a given locale
 *
 * @example
 * getLocalizedPath('/posts', 'en', config) // '/en/posts'
 * getLocalizedPath('/en/posts', 'zh-CN', config) // '/posts' (if zh-CN is default)
 */
export function getLocalizedPath(
  pathname: string,
  targetLocale: string,
  config: I18nConfig = defaultI18nConfig
): string {
  // First, remove any existing locale prefix
  const basePath = removeLocalePrefix(pathname, config);

  // If target is default locale and prefix is not required
  if (
    targetLocale === config.defaultLocale &&
    !config.routing.prefixDefaultLocale
  ) {
    return basePath;
  }

  // Add locale prefix
  if (basePath === '/') {
    return `/${targetLocale}`;
  }

  return `/${targetLocale}${basePath}`;
}

/**
 * Get all alternate links for SEO (hreflang tags)
 *
 * @example
 * getAlternateLinks('/posts', 'https://example.com', config)
 * // Returns links for all locales
 */
export function getAlternateLinks(
  pathname: string,
  baseUrl: string,
  config: I18nConfig = defaultI18nConfig
): AlternateLink[] {
  const links: AlternateLink[] = [];

  for (const locale of config.locales) {
    const localizedPath = getLocalizedPath(pathname, locale.code, config);
    links.push({
      locale: locale.code,
      url: `${baseUrl.replace(/\/$/, '')}${localizedPath}`,
      hreflang: locale.htmlLang,
    });
  }

  // Add x-default pointing to default locale
  const defaultPath = getLocalizedPath(
    pathname,
    config.defaultLocale,
    config
  );
  links.push({
    locale: 'x-default',
    url: `${baseUrl.replace(/\/$/, '')}${defaultPath}`,
    hreflang: 'x-default',
  });

  return links;
}

/**
 * Deep merge two objects
 */
function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base };

  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      const overrideValue = override[key];
      const baseValue = base[key];

      if (
        typeof overrideValue === 'object' &&
        overrideValue !== null &&
        !Array.isArray(overrideValue) &&
        typeof baseValue === 'object' &&
        baseValue !== null &&
        !Array.isArray(baseValue)
      ) {
        (result as any)[key] = deepMerge(baseValue as object, overrideValue as object);
      } else if (overrideValue !== undefined) {
        (result as any)[key] = overrideValue;
      }
    }
  }

  return result;
}

/**
 * Get merged configuration for a specific locale
 * Combines default config with locale-specific overrides
 */
export function getLocaleConfig(
  locale: string,
  config: I18nConfig = defaultI18nConfig
): MergedLocaleConfig {
  const localeData = getLocaleByCode(locale, config);
  const localeOverrides = config.localeConfigs[locale] || {};

  // Get locale info (fallback to creating one from code)
  const localeInfo: Locale = localeData || {
    code: locale,
    name: locale,
    htmlLang: locale,
    dateLocale: locale,
    direction: 'ltr',
  };

  // Merge site config
  const site = deepMerge(defaultSiteConfig, localeOverrides.site || {});

  // Use locale-specific menu or default menu
  const menu = localeOverrides.menu || defaultMenu;

  // Merge footer config
  const footer = deepMerge(defaultFooterConfig, localeOverrides.footer || {});

  // Merge sidebar config
  const sidebar = localeOverrides.sidebar
    ? {
        ...defaultSidebarConfig,
        ...localeOverrides.sidebar,
        // Use locale-specific groups if provided, otherwise keep default
        groups: localeOverrides.sidebar.groups || defaultSidebarConfig.groups,
      }
    : defaultSidebarConfig;

  // Get UI translations
  const ui = getUITranslations(locale, config);

  return {
    locale: localeInfo,
    site,
    menu,
    footer,
    sidebar,
    ui,
  };
}

/**
 * Translation function - get a UI translation string
 *
 * @example
 * t('readMore', 'en') // 'Read more'
 * t('readMore', 'zh-CN') // '阅读更多'
 */
export function t(
  key: keyof UITranslations,
  locale: string,
  config?: I18nConfig
): string {
  const translations = getUITranslations(locale, config);
  return translations[key] || key;
}

/**
 * Format date according to locale
 *
 * @example
 * formatDate(new Date(), 'en') // 'January 1, 2024'
 * formatDate(new Date(), 'zh-CN') // '2024年1月1日'
 */
export function formatDate(
  date: Date | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
    dateObj
  );
}

/**
 * Format date in short format
 *
 * @example
 * formatDateShort(new Date(), 'en') // '1/1/2024'
 * formatDateShort(new Date(), 'zh-CN') // '2024/1/1'
 */
export function formatDateShort(
  date: Date | string,
  locale: string
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Check if a locale is RTL (right-to-left)
 */
export function isRTL(
  locale: string,
  config: I18nConfig = defaultI18nConfig
): boolean {
  const localeData = getLocaleByCode(locale, config);
  return localeData?.direction === 'rtl';
}

/**
 * Get the HTML dir attribute value
 */
export function getTextDirection(
  locale: string,
  config: I18nConfig = defaultI18nConfig
): 'ltr' | 'rtl' {
  return isRTL(locale, config) ? 'rtl' : 'ltr';
}

/**
 * Check if multi-language is enabled (more than one locale)
 */
export function isMultiLanguageEnabled(
  config: I18nConfig = defaultI18nConfig
): boolean {
  return config.locales.length > 1;
}

/**
 * Get prefix for a locale in routes
 * Returns empty string for default locale if prefixDefaultLocale is false
 */
export function getLocalePrefix(
  locale: string,
  config: I18nConfig = defaultI18nConfig
): string {
  if (locale === config.defaultLocale && !config.routing.prefixDefaultLocale) {
    return '';
  }
  return `/${locale}`;
}

/**
 * Get content path prefix for a specific locale
 * Returns the contentPathPrefix from locale config, or undefined if not set
 */
export function getContentPathPrefix(
  locale: string,
  config: I18nConfig = defaultI18nConfig
): string | undefined {
  const localeConfig = config.localeConfigs[locale];
  return localeConfig?.contentPathPrefix;
}

/**
 * Filter posts by locale based on contentPathPrefix
 * If contentPathPrefix is set, only return posts that start with that prefix
 * If not set, return all posts (backward compatible)
 *
 * @example
 * // If en locale has contentPathPrefix: 'blog_docs_en'
 * filterPostsByLocale(posts, 'en', config)
 * // Returns only posts with id starting with 'blog_docs_en/'
 */
export function filterPostsByLocale<T extends { id: string }>(
  posts: T[],
  locale: string,
  config: I18nConfig = defaultI18nConfig
): T[] {
  const contentPathPrefix = getContentPathPrefix(locale, config);

  // If no contentPathPrefix is set, return all posts (backward compatible)
  if (!contentPathPrefix) {
    return posts;
  }

  // Filter posts that start with the content path prefix
  return posts.filter((post) => {
    const postPath = post.id.toLowerCase();
    const prefix = contentPathPrefix.toLowerCase();
    return postPath.startsWith(prefix + '/') || postPath === prefix;
  });
}

// Re-export types and config functions
export type { I18nConfig, Locale, LocaleConfig, UITranslations } from '../config/i18n';
export {
  defaultI18nConfig,
  defineI18nConfig,
  getUITranslations,
  builtInTranslations,
  zhCNTranslations,
  enTranslations,
} from '../config/i18n';
