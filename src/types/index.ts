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