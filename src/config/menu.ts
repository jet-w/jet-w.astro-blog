import type { NavigationItem } from '../types';

/**
 * Default menu configuration
 */
export const menu: NavigationItem[] = [
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
];

/**
 * Define custom menu items
 */
export function defineMenu(items: NavigationItem[]): NavigationItem[] {
  return items;
}

// 向后兼容
export const defaultMenu = menu;
