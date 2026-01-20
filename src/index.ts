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
