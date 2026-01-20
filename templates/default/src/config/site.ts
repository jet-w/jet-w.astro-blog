/**
 * Site Configuration
 *
 * Basic site settings including title, description, author info, etc.
 */

import type { SiteConfig } from '@jet-w/astro-blog';

/**
 * Site configuration
 */
export const siteConfig: SiteConfig = {
  title: 'My Astro Blog',
  description: '基于 Astro + Vue + Tailwind 构建的个人技术博客',
  author: 'Author',
  email: 'email@example.com',
  avatar: '/images/avatar.svg',
  social: {
    github: 'https://github.com/username',
    twitter: '',
    linkedin: '',
    email: 'mailto:email@example.com'
  },
  menu: [
    {
      name: '首页',
      href: '/',
      icon: 'home'
    },
    {
      name: '博客教学',
      href: '/posts/blog_docs',
      icon: 'posts'
    },
    {
      name: '演示',
      href: '/slides',
      icon: 'slides'
    },
    {
      name: '关于',
      href: '/about',
      icon: 'about'
    }
  ]
};

/**
 * Default SEO settings
 */
export const defaultSEO = {
  title: siteConfig.title,
  description: siteConfig.description,
  image: '/images/og-image.jpg',
  type: 'website' as const
};
