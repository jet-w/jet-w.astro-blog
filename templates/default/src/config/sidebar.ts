/**
 * Sidebar Configuration
 *
 * Configure sidebar display options, groups, and widgets.
 *
 * NOTE: For multi-language support, sidebar groups (with titles)
 * should be configured in astro.config.mjs under localeConfigs.
 * This file contains shared settings that are not language-specific.
 */

import type { SidebarConfig } from '@jet-w/astro-blog';

/**
 * Sidebar configuration (shared settings)
 *
 * Language-specific groups are configured in astro.config.mjs
 */
export const sidebarConfig: SidebarConfig = {
  enabled: true,
  showSearch: true,
  showRecentPosts: true,
  recentPostsCount: 5,
  showPopularTags: true,
  popularTagsCount: 8,
  showArchives: true,
  archivesCount: 6,
  showFriendLinks: false,
  friendLinks: [],
  // Groups are configured per-language in astro.config.mjs localeConfigs
  groups: []
};
