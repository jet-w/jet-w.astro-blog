/**
 * Sidebar Configuration
 *
 * Configure sidebar display options, groups, and widgets
 */

import type { SidebarConfig } from '@jet-w/astro-blog';

/**
 * Sidebar configuration
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
  groups: [
    {
      type: 'scan',
      title: '博客指南',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs',
      collapsed: true,
      showForPaths: ['/posts/blog_docs/**']
    }
  ]
};
