/**
 * @jet-w/astro-blog Integration
 *
 * This integration injects the blog pages into your Astro project
 */

import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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

export function astroBlogIntegration(
  options: AstroBlogIntegrationOptions = {}
): AstroIntegration {
  const mergedOptions = {
    ...defaultOptions,
    routes: { ...defaultOptions.routes, ...options.routes },
  };

  // Get the directory where the integration is located
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  // Pages are in src/pages relative to dist
  const pagesDir = path.resolve(currentDir, '../src/pages');

  return {
    name: '@jet-w/astro-blog',
    hooks: {
      'astro:config:setup': ({ injectRoute, logger }) => {
        logger.info('Injecting @jet-w/astro-blog routes...');

        const routes = mergedOptions.routes!;

        // Posts routes
        if (routes.posts) {
          injectRoute({
            pattern: '/posts',
            entrypoint: `${pagesDir}/posts/index.astro`,
          });
          injectRoute({
            pattern: '/posts/page/[page]',
            entrypoint: `${pagesDir}/posts/page/[page].astro`,
          });
          injectRoute({
            pattern: '/posts/[...slug]',
            entrypoint: `${pagesDir}/posts/[...slug].astro`,
          });
        }

        // Tags routes
        if (routes.tags) {
          injectRoute({
            pattern: '/tags',
            entrypoint: `${pagesDir}/tags/index.astro`,
          });
          injectRoute({
            pattern: '/tags/[tag]',
            entrypoint: `${pagesDir}/tags/[tag].astro`,
          });
          injectRoute({
            pattern: '/tags/[tag]/page/[page]',
            entrypoint: `${pagesDir}/tags/[tag]/page/[page].astro`,
          });
        }

        // Categories routes
        if (routes.categories) {
          injectRoute({
            pattern: '/categories',
            entrypoint: `${pagesDir}/categories/index.astro`,
          });
          injectRoute({
            pattern: '/categories/[category]',
            entrypoint: `${pagesDir}/categories/[category].astro`,
          });
          injectRoute({
            pattern: '/categories/[category]/page/[page]',
            entrypoint: `${pagesDir}/categories/[category]/page/[page].astro`,
          });
        }

        // Archives routes
        if (routes.archives) {
          injectRoute({
            pattern: '/archives',
            entrypoint: `${pagesDir}/archives/index.astro`,
          });
          injectRoute({
            pattern: '/archives/[year]/[month]',
            entrypoint: `${pagesDir}/archives/[year]/[month].astro`,
          });
          injectRoute({
            pattern: '/archives/[year]/[month]/page/[page]',
            entrypoint: `${pagesDir}/archives/[year]/[month]/page/[page].astro`,
          });
        }

        // Slides routes
        if (routes.slides) {
          injectRoute({
            pattern: '/slides',
            entrypoint: `${pagesDir}/slides/index.astro`,
          });
          injectRoute({
            pattern: '/slides/[...slug]',
            entrypoint: `${pagesDir}/slides/[...slug].astro`,
          });
        }

        // Search routes
        if (routes.search) {
          injectRoute({
            pattern: '/search',
            entrypoint: `${pagesDir}/search.astro`,
          });
          injectRoute({
            pattern: '/search-index.json',
            entrypoint: `${pagesDir}/search-index.json.ts`,
          });
        }

        // RSS route
        if (routes.rss) {
          injectRoute({
            pattern: '/rss.xml',
            entrypoint: `${pagesDir}/rss.xml.ts`,
          });
        }

        // Content pages (index, about, etc.) - always inject
        injectRoute({
          pattern: '/[...slug]',
          entrypoint: `${pagesDir}/[...slug].astro`,
        });

        logger.info('Routes injected successfully!');
      },
    },
  };
}

export default astroBlogIntegration;
