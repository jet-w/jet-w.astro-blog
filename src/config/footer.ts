/**
 * Footer 配置
 */

import type { SocialLink } from './social';

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterConfig {
  quickLinksTitle: string;
  quickLinks: FooterLink[];
  contactTitle: string;
  socialLinks: SocialLink[];
  showRss: boolean;
  rssUrl: string;
  copyright: string;
  poweredBy: {
    text: string;
    url: string;
  };
}

export const footerConfig: FooterConfig = {
  quickLinksTitle: '快速链接',
  quickLinks: [
    { name: '首页', href: '/' },
    { name: '文章', href: '/posts' },
    { name: '标签', href: '/tags' },
    { name: '分类', href: '/categories' },
    { name: '归档', href: '/archives' },
    { name: '关于', href: '/about' }
  ],
  contactTitle: '联系方式',
  socialLinks: [],
  showRss: true,
  rssUrl: '/rss.xml',
  copyright: '© {year} {author}. All rights reserved.',
  poweredBy: {
    text: 'Astro',
    url: 'https://astro.build'
  }
};

/**
 * Define footer configuration
 */
export function defineFooterConfig(config: Partial<FooterConfig>): FooterConfig {
  return {
    ...footerConfig,
    ...config
  };
}

// 向后兼容
export const defaultFooterConfig = footerConfig;
