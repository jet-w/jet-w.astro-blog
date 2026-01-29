/**
 * English UI translations
 *
 * Override any UI strings here. The library provides default English translations,
 * so you only need to add strings you want to customize.
 *
 * See UITranslations interface for all available keys:
 * - Navigation: home, blog, about, search
 * - Posts: posts, postList, noPostsFound, readMore, readingTime, minuteRead
 * - Tags & Categories: tags, categories, allTags, allCategories, taggedWith, inCategory
 * - Archives: archives, postsInArchive
 * - Sidebar: recentPosts, popularTags, friendLinks, documentTree
 * - Footer: quickLinks, contact
 * - Search: searchPlaceholder, searchResults, noResults, searching, searchArticles, etc.
 * - Hero: browsePosts, aboutMe
 * - Pagination: previousPage, nextPage, page, of
 * - Article: publishedOn, updatedOn, author, tableOfContents, relatedPosts, etc.
 * - Misc: backToTop, copyCode, copied, expand, collapse, viewMode, sortBy, etc.
 * - Slides: slides, slidesList
 * - RSS: rssFeed
 */
import type { UITranslations } from '@jet-w/astro-blog';

export const ui: Partial<UITranslations> = {
  // Example overrides:
  // browsePosts: 'Browse Posts',
  // aboutMe: 'About Me',
  // searchPlaceholder: 'Search articles...',
};
