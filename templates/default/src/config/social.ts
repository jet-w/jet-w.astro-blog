/**
 * Social Links Configuration
 *
 * Configure social media links for the blog
 */

import type { SocialLink } from '@jet-w/astro-blog';

/**
 * Social links
 */
export const socialLinks: SocialLink[] = [
  { type: 'github', url: 'https://github.com/username', label: 'GitHub' },
  { type: 'email', url: 'mailto:email@example.com', label: 'Email' }
];
