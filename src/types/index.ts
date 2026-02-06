export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  categories: string[];
  author?: string;
  image?: string;
  draft?: boolean;
  readingTime?: number;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  tags?: string[];
  categories?: string[];
  author?: string;
  image?: string;
  draft?: boolean;
}

export interface Tag {
  name: string;
  count: number;
  slug: string;
}

export interface Category {
  name: string;
  count: number;
  slug: string;
}

export interface SearchResult {
  title: string;
  description: string;
  url: string;
  content: string;
  tags: string[];
  categories: string[];
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface LayoutConfig {
  /** Maximum width of the content area. Can be 'narrow' (768px), 'normal' (1024px), 'wide' (1280px), 'full' (100%), or a custom value like '900px' */
  contentWidth?: 'narrow' | 'normal' | 'wide' | 'full' | string;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  email?: string;
  avatar?: string;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
  menu: NavigationItem[];
  /** Layout configuration */
  layout?: LayoutConfig;
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

/**
 * Custom asset configuration for loading external CSS/JS files
 */
export interface AssetConfig {
  /** Asset type: 'css' for stylesheets, 'js' for scripts */
  type: 'css' | 'js';
  /** URL or path to the asset */
  src: string;
  /** Optional: Load position - 'head' (default) or 'body' (only for js) */
  position?: 'head' | 'body';
  /** Optional: For JS - load asynchronously */
  async?: boolean;
  /** Optional: For JS - defer loading */
  defer?: boolean;
  /** Optional: For JS - load as ES module */
  module?: boolean;
  /** Optional: Crossorigin attribute */
  crossorigin?: 'anonymous' | 'use-credentials';
  /** Optional: Integrity hash for SRI */
  integrity?: string;
}

/**
 * Custom assets configuration
 */
export interface CustomAssetsConfig {
  /** List of custom CSS/JS assets to load */
  assets: AssetConfig[];
}