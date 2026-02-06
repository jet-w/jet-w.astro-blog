/**
 * @jet-w/astro-blog Integration
 *
 * This integration injects the blog pages into your Astro project
 * with multi-language support.
 */

import type { AstroIntegration } from 'astro';
import type { Plugin } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import type { I18nConfig } from './config/i18n';
import { defaultI18nConfig } from './config/i18n';
import type { SocialLink } from './config/social';
import { defaultSocialLinks, defaultIcons } from './config/social';
import type { CustomAssetsConfig } from './types';
import { defaultCustomAssetsConfig } from './config/assets';

// Virtual module ID for i18n config
const VIRTUAL_I18N_MODULE_ID = 'virtual:astro-blog-i18n';
const RESOLVED_VIRTUAL_I18N_MODULE_ID = '\0' + VIRTUAL_I18N_MODULE_ID;

// Virtual module ID for social config
const VIRTUAL_SOCIAL_MODULE_ID = 'virtual:astro-blog-social';
const RESOLVED_VIRTUAL_SOCIAL_MODULE_ID = '\0' + VIRTUAL_SOCIAL_MODULE_ID;

// Virtual module ID for custom assets config
const VIRTUAL_ASSETS_MODULE_ID = 'virtual:astro-blog-assets';
const RESOLVED_VIRTUAL_ASSETS_MODULE_ID = '\0' + VIRTUAL_ASSETS_MODULE_ID;

export interface AstroBlogIntegrationOptions {
  /**
   * Enable/disable specific page routes
   */
  routes?: {
    posts?: boolean;
    tags?: boolean;
    categories?: boolean;
    archives?: boolean;
    slides?: boolean;
    search?: boolean;
    rss?: boolean;
  };

  /**
   * i18n configuration for multi-language support
   */
  i18n?: I18nConfig;

  /**
   * Social links configuration
   */
  socialLinks?: SocialLink[];

  /**
   * Custom assets configuration (CSS/JS files to load)
   */
  customAssets?: CustomAssetsConfig;
}

const defaultOptions: AstroBlogIntegrationOptions = {
  routes: {
    posts: true,
    tags: true,
    categories: true,
    archives: true,
    slides: true,
    search: true,
    rss: true,
  },
};

/**
 * Get the locale prefix for a given locale
 */
function getLocalePrefix(locale: string, i18nConfig: I18nConfig): string {
  if (
    locale === i18nConfig.defaultLocale &&
    !i18nConfig.routing.prefixDefaultLocale
  ) {
    return '';
  }
  return `/${locale}`;
}

export function astroBlogIntegration(
  options: AstroBlogIntegrationOptions = {}
): AstroIntegration {
  const mergedOptions = {
    ...defaultOptions,
    routes: { ...defaultOptions.routes, ...options.routes },
  };

  const i18nConfig = options.i18n || defaultI18nConfig;
  const socialLinksConfig = options.socialLinks || defaultSocialLinks;
  const customAssetsConfig = options.customAssets || defaultCustomAssetsConfig;

  // Get the directory where the integration is located
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  // Pages are in src/pages relative to dist
  const pagesDir = path.resolve(currentDir, '../src/pages');

  // Create Vite plugin for virtual modules
  const vitePluginVirtualModules = (): Plugin => ({
    name: 'astro-blog-virtual-modules',
    resolveId(id) {
      if (id === VIRTUAL_I18N_MODULE_ID) {
        return RESOLVED_VIRTUAL_I18N_MODULE_ID;
      }
      if (id === VIRTUAL_SOCIAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_SOCIAL_MODULE_ID;
      }
      if (id === VIRTUAL_ASSETS_MODULE_ID) {
        return RESOLVED_VIRTUAL_ASSETS_MODULE_ID;
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_I18N_MODULE_ID) {
        return `export const i18nConfig = ${JSON.stringify(i18nConfig)};`;
      }
      if (id === RESOLVED_VIRTUAL_SOCIAL_MODULE_ID) {
        return `export const socialLinks = ${JSON.stringify(socialLinksConfig)};
export const defaultIcons = ${JSON.stringify(defaultIcons)};`;
      }
      if (id === RESOLVED_VIRTUAL_ASSETS_MODULE_ID) {
        return `export const customAssetsConfig = ${JSON.stringify(customAssetsConfig)};`;
      }
    },
  });

  return {
    name: '@jet-w/astro-blog',
    hooks: {
      'astro:config:setup': ({ injectRoute, logger, updateConfig }) => {
        logger.info('Injecting @jet-w/astro-blog routes...');

        // Add Vite plugin for virtual modules
        updateConfig({
          vite: {
            plugins: [vitePluginVirtualModules()],
          },
        });

        const routes = mergedOptions.routes!;
        const locales = i18nConfig.locales;

        // Helper function to inject route for all locales
        const injectLocalizedRoute = (
          pattern: string,
          entrypoint: string
        ) => {
          for (const locale of locales) {
            const prefix = getLocalePrefix(locale.code, i18nConfig);
            const localizedPattern = prefix ? `${prefix}${pattern}` : pattern;

            injectRoute({
              pattern: localizedPattern,
              entrypoint,
            });
          }
        };

        // Posts routes
        if (routes.posts) {
          injectLocalizedRoute('/posts', `${pagesDir}/posts/index.astro`);
          injectLocalizedRoute(
            '/posts/page/[page]',
            `${pagesDir}/posts/page/[page].astro`
          );
          injectLocalizedRoute(
            '/posts/[...slug]',
            `${pagesDir}/posts/[...slug].astro`
          );
        }

        // Tags routes
        if (routes.tags) {
          injectLocalizedRoute('/tags', `${pagesDir}/tags/index.astro`);
          injectLocalizedRoute('/tags/[tag]', `${pagesDir}/tags/[tag].astro`);
          injectLocalizedRoute(
            '/tags/[tag]/page/[page]',
            `${pagesDir}/tags/[tag]/page/[page].astro`
          );
        }

        // Categories routes
        if (routes.categories) {
          injectLocalizedRoute(
            '/categories',
            `${pagesDir}/categories/index.astro`
          );
          injectLocalizedRoute(
            '/categories/[category]',
            `${pagesDir}/categories/[category].astro`
          );
          injectLocalizedRoute(
            '/categories/[category]/page/[page]',
            `${pagesDir}/categories/[category]/page/[page].astro`
          );
        }

        // Archives routes
        if (routes.archives) {
          injectLocalizedRoute('/archives', `${pagesDir}/archives/index.astro`);
          injectLocalizedRoute(
            '/archives/[year]/[month]',
            `${pagesDir}/archives/[year]/[month].astro`
          );
          injectLocalizedRoute(
            '/archives/[year]/[month]/page/[page]',
            `${pagesDir}/archives/[year]/[month]/page/[page].astro`
          );
        }

        // Slides routes
        if (routes.slides) {
          injectLocalizedRoute('/slides', `${pagesDir}/slides/index.astro`);
          injectLocalizedRoute(
            '/slides/[...slug]',
            `${pagesDir}/slides/[...slug].astro`
          );
        }

        // Search routes
        if (routes.search) {
          injectLocalizedRoute('/search', `${pagesDir}/search.astro`);
          injectLocalizedRoute(
            '/search-index.json',
            `${pagesDir}/search-index.json.ts`
          );
        }

        // RSS route
        if (routes.rss) {
          injectLocalizedRoute('/rss.xml', `${pagesDir}/rss.xml.ts`);
        }

        // Content pages (index, about, etc.) - always inject for all locales
        injectLocalizedRoute('/[...slug]', `${pagesDir}/[...slug].astro`);

        const localeCount = locales.length;
        logger.info(
          `Routes injected successfully for ${localeCount} locale(s): ${locales.map((l) => l.code).join(', ')}`
        );
      },
    },
  };
}

export default astroBlogIntegration;

// Re-export types for convenience
export type { I18nConfig } from './config/i18n';
export type { SocialLink } from './config/social';
export type { AssetConfig, CustomAssetsConfig } from './types';
