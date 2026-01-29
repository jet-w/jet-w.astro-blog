import type { SiteConfig } from '../types';

/**
 * Default site configuration
 * Users should override this in their own config
 */
export const siteConfig: SiteConfig = {
  title: 'My Astro Blog',
  description: '',
  author: 'Author',
  email: '',
  avatar: '/images/avatar.svg',
  social: {
    github: '',
    twitter: '',
    linkedin: '',
    email: ''
  },
  menu: [
    {
      name: '首页',
      href: '/',
      icon: 'home'
    },
    {
      name: '博客',
      href: '/posts',
      icon: 'posts'
    },
    {
      name: '关于',
      href: '/about',
      icon: 'about'
    }
  ]
};

export const defaultSEO = {
  title: siteConfig.title,
  description: siteConfig.description,
  image: '/images/og-image.jpg',
  type: 'website' as const
};

/**
 * Create site config with user overrides
 */
export function defineSiteConfig(config: Partial<SiteConfig>): SiteConfig {
  return {
    ...siteConfig,
    ...config,
    social: {
      ...siteConfig.social,
      ...config.social
    },
    menu: config.menu || siteConfig.menu
  };
}

// 向后兼容的别名
export const defaultSiteConfig = siteConfig;
