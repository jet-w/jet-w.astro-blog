/**
 * Footer Configuration
 *
 * Configure footer links, copyright, and display options.
 *
 * NOTE: For multi-language support, language-specific settings
 * (quickLinksTitle, quickLinks, contactTitle) should be configured
 * in astro.config.mjs under localeConfigs.
 * This file contains shared settings that are not language-specific.
 */

import type { FooterConfig } from '@jet-w/astro-blog';
import { socialLinks } from './social';

/**
 * Footer configuration (shared settings)
 *
 * Language-specific quickLinks and titles are configured in astro.config.mjs
 */
export const footerConfig: FooterConfig = {
  // These are fallback values; language-specific values are in astro.config.mjs
  quickLinksTitle: 'Quick Links',
  quickLinks: [],
  contactTitle: 'Contact',
  // Shared settings (not language-specific)
  socialLinks: socialLinks,
  showRss: true,
  rssUrl: '/rss.xml',
  copyright: '© {year} {author}. All rights reserved.',
  poweredBy: {
    text: 'Astro',
    url: 'https://astro.build'
  }
};
