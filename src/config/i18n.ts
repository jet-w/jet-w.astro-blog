/**
 * i18n Configuration Module
 *
 * Provides multi-language support configuration for the blog.
 */

import type { NavigationItem, SiteConfig } from '../types';
import type { FooterConfig } from './footer';
import type { SidebarConfig } from './sidebar';

/**
 * Locale definition
 */
export interface Locale {
  /** Language code (e.g., 'en', 'zh-CN', 'ja') */
  code: string;
  /** Display name (e.g., 'English', '中文') */
  name: string;
  /** HTML lang attribute value */
  htmlLang: string;
  /** Locale for Intl.DateTimeFormat */
  dateLocale: string;
  /** Text direction */
  direction?: 'ltr' | 'rtl';
}

/**
 * UI translation strings
 */
export interface UITranslations {
  // Navigation
  home: string;
  blog: string;
  about: string;
  search: string;

  // Posts
  posts: string;
  postList: string;
  noPostsFound: string;
  readMore: string;
  readingTime: string;
  minuteRead: string;

  // Tags & Categories
  tags: string;
  categories: string;
  allTags: string;
  allCategories: string;
  taggedWith: string;
  inCategory: string;

  // Archives
  archives: string;
  postsInArchive: string;

  // Sidebar
  recentPosts: string;
  popularTags: string;
  friendLinks: string;
  documentTree: string;

  // Footer
  quickLinks: string;
  contact: string;

  // Search
  searchPlaceholder: string;
  searchResults: string;
  noResults: string;
  searching: string;

  // Pagination
  previousPage: string;
  nextPage: string;
  page: string;
  of: string;

  // Article details
  publishedOn: string;
  updatedOn: string;
  author: string;
  tableOfContents: string;
  relatedPosts: string;
  sharePost: string;
  previousPost: string;
  nextPost: string;

  // Misc
  backToTop: string;
  copyCode: string;
  copied: string;
  expand: string;
  collapse: string;
  expandCode: string;
  collapseCode: string;
  lines: string;
  viewMode: string;
  cardView: string;
  listView: string;
  sortBy: string;
  sortByDate: string;
  sortByTitle: string;
  filterByTag: string;
  filterByCategory: string;
  clearFilter: string;
  allPosts: string;
  draft: string;

  // Slides
  slides: string;
  slidesList: string;

  // RSS
  rssFeed: string;
}

/**
 * Locale-specific configuration
 */
export interface LocaleConfig {
  /** Site configuration overrides */
  site?: Partial<SiteConfig>;
  /** Navigation menu items */
  menu?: NavigationItem[];
  /** Footer configuration overrides */
  footer?: Partial<FooterConfig>;
  /** Sidebar configuration overrides */
  sidebar?: Partial<SidebarConfig>;
  /** UI translation overrides */
  ui?: Partial<UITranslations>;
}

/**
 * i18n routing configuration
 */
export interface I18nRoutingConfig {
  /** Whether to add prefix for default locale (e.g., /zh-CN/posts vs /posts) */
  prefixDefaultLocale: boolean;
}

/**
 * Complete i18n configuration
 */
export interface I18nConfig {
  /** Default locale code */
  defaultLocale: string;
  /** Available locales */
  locales: Locale[];
  /** Locale-specific configurations */
  localeConfigs: Record<string, LocaleConfig>;
  /** Routing configuration */
  routing: I18nRoutingConfig;
}

/**
 * Default Chinese (Simplified) UI translations
 */
export const zhCNTranslations: UITranslations = {
  // Navigation
  home: '首页',
  blog: '博客',
  about: '关于',
  search: '搜索',

  // Posts
  posts: '文章',
  postList: '文章列表',
  noPostsFound: '暂无文章',
  readMore: '阅读更多',
  readingTime: '阅读时间',
  minuteRead: '分钟',

  // Tags & Categories
  tags: '标签',
  categories: '分类',
  allTags: '全部标签',
  allCategories: '全部分类',
  taggedWith: '标签',
  inCategory: '分类',

  // Archives
  archives: '归档',
  postsInArchive: '篇文章',

  // Sidebar
  recentPosts: '最新文章',
  popularTags: '热门标签',
  friendLinks: '友情链接',
  documentTree: '文档目录',

  // Footer
  quickLinks: '快速链接',
  contact: '联系方式',

  // Search
  searchPlaceholder: '搜索文章标题、内容、标签...',
  searchResults: '搜索结果',
  noResults: '没有找到相关结果',
  searching: '搜索中...',

  // Pagination
  previousPage: '上一页',
  nextPage: '下一页',
  page: '第',
  of: '页，共',

  // Article details
  publishedOn: '发布于',
  updatedOn: '更新于',
  author: '作者',
  tableOfContents: '目录',
  relatedPosts: '相关文章',
  sharePost: '分享文章',
  previousPost: '上一篇',
  nextPost: '下一篇',

  // Misc
  backToTop: '回到顶部',
  copyCode: '复制',
  copied: '已复制',
  expand: '展开',
  collapse: '收起',
  expandCode: '展开代码',
  collapseCode: '收起代码',
  lines: '行',
  viewMode: '视图模式',
  cardView: '卡片视图',
  listView: '列表视图',
  sortBy: '排序',
  sortByDate: '按日期',
  sortByTitle: '按标题',
  filterByTag: '按标签筛选',
  filterByCategory: '按分类筛选',
  clearFilter: '清除筛选',
  allPosts: '全部文章',
  draft: '草稿',

  // Slides
  slides: '演示',
  slidesList: '演示列表',

  // RSS
  rssFeed: 'RSS 订阅',
};

/**
 * Default English UI translations
 */
export const enTranslations: UITranslations = {
  // Navigation
  home: 'Home',
  blog: 'Blog',
  about: 'About',
  search: 'Search',

  // Posts
  posts: 'Posts',
  postList: 'All Posts',
  noPostsFound: 'No posts found',
  readMore: 'Read more',
  readingTime: 'Reading time',
  minuteRead: 'min',

  // Tags & Categories
  tags: 'Tags',
  categories: 'Categories',
  allTags: 'All Tags',
  allCategories: 'All Categories',
  taggedWith: 'Tagged with',
  inCategory: 'In category',

  // Archives
  archives: 'Archives',
  postsInArchive: 'posts',

  // Sidebar
  recentPosts: 'Recent Posts',
  popularTags: 'Popular Tags',
  friendLinks: 'Friend Links',
  documentTree: 'Document Tree',

  // Footer
  quickLinks: 'Quick Links',
  contact: 'Contact',

  // Search
  searchPlaceholder: 'Search posts, tags, content...',
  searchResults: 'Search Results',
  noResults: 'No results found',
  searching: 'Searching...',

  // Pagination
  previousPage: 'Previous',
  nextPage: 'Next',
  page: 'Page',
  of: 'of',

  // Article details
  publishedOn: 'Published on',
  updatedOn: 'Updated on',
  author: 'Author',
  tableOfContents: 'Table of Contents',
  relatedPosts: 'Related Posts',
  sharePost: 'Share',
  previousPost: 'Previous',
  nextPost: 'Next',

  // Misc
  backToTop: 'Back to Top',
  copyCode: 'Copy',
  copied: 'Copied',
  expand: 'Expand',
  collapse: 'Collapse',
  expandCode: 'Expand code',
  collapseCode: 'Collapse code',
  lines: 'lines',
  viewMode: 'View Mode',
  cardView: 'Card View',
  listView: 'List View',
  sortBy: 'Sort by',
  sortByDate: 'Date',
  sortByTitle: 'Title',
  filterByTag: 'Filter by tag',
  filterByCategory: 'Filter by category',
  clearFilter: 'Clear filter',
  allPosts: 'All Posts',
  draft: 'Draft',

  // Slides
  slides: 'Slides',
  slidesList: 'All Slides',

  // RSS
  rssFeed: 'RSS Feed',
};

/**
 * Built-in translations for common languages
 */
export const builtInTranslations: Record<string, UITranslations> = {
  'zh-CN': zhCNTranslations,
  'zh': zhCNTranslations,
  'en': enTranslations,
  'en-US': enTranslations,
  'en-GB': enTranslations,
};

/**
 * Default locales
 */
export const defaultLocales: Locale[] = [
  {
    code: 'zh-CN',
    name: '中文',
    htmlLang: 'zh-CN',
    dateLocale: 'zh-CN',
    direction: 'ltr',
  },
];

/**
 * Default i18n configuration (Chinese only, backward compatible)
 */
export const defaultI18nConfig: I18nConfig = {
  defaultLocale: 'zh-CN',
  locales: defaultLocales,
  localeConfigs: {},
  routing: {
    prefixDefaultLocale: false,
  },
};

/**
 * Helper function to define i18n configuration with type safety
 */
export function defineI18nConfig(config: Partial<I18nConfig>): I18nConfig {
  return {
    defaultLocale: config.defaultLocale || 'zh-CN',
    locales: config.locales || defaultLocales,
    localeConfigs: config.localeConfigs || {},
    routing: {
      prefixDefaultLocale: config.routing?.prefixDefaultLocale ?? false,
    },
  };
}

/**
 * Get UI translations for a specific locale
 * Falls back to built-in translations, then to English
 */
export function getUITranslations(
  locale: string,
  config?: I18nConfig
): UITranslations {
  // Check locale-specific config first
  const localeConfig = config?.localeConfigs?.[locale];
  const customTranslations = localeConfig?.ui;

  // Get built-in translations as base
  const baseTranslations =
    builtInTranslations[locale] ||
    builtInTranslations[locale.split('-')[0]] ||
    builtInTranslations['en'];

  // Merge custom translations over base
  if (customTranslations) {
    return { ...baseTranslations, ...customTranslations };
  }

  return baseTranslations;
}

// Re-export for convenience
export type { NavigationItem, SiteConfig } from '../types';
export type { FooterConfig } from './footer';
export type { SidebarConfig } from './sidebar';
