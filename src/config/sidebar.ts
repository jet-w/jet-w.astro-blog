/**
 * 侧边栏配置系统
 *
 * 支持三种配置类型：
 * 1. scan - 扫描指定文件夹，自动生成树形结构
 * 2. manual - 手动配置显示特定内容
 * 3. mixed - 混合使用以上两种方式
 */

// 路径匹配配置
export interface PathMatchConfig {
  pattern: string;
  exact?: boolean;
}

// 侧边栏项目类型
export interface SidebarItem {
  title: string;
  slug?: string;
  link?: string;
  icon?: string;
  badge?: string;
  badgeType?: 'info' | 'success' | 'warning' | 'error';
  children?: SidebarItem[];
  collapsed?: boolean;
}

// 扫描配置
export interface ScanConfig {
  type: 'scan';
  title: string;
  icon?: string;
  scanPath: string;
  collapsed?: boolean;
  maxDepth?: number;
  exclude?: string[];
  include?: string[];
  sortBy?: 'name' | 'date' | 'title' | 'custom';
  sortOrder?: 'asc' | 'desc';
  showForPaths?: string[];
  hideForPaths?: string[];
}

// 手动配置
export interface ManualConfig {
  type: 'manual';
  title: string;
  icon?: string;
  collapsed?: boolean;
  items: SidebarItem[];
  showForPaths?: string[];
  hideForPaths?: string[];
}

// 混合配置
export interface MixedConfig {
  type: 'mixed';
  title: string;
  icon?: string;
  collapsed?: boolean;
  sections: (ScanConfig | ManualConfig)[];
  showForPaths?: string[];
  hideForPaths?: string[];
}

// 分隔符
export interface DividerConfig {
  type: 'divider';
  title?: string;
  showForPaths?: string[];
  hideForPaths?: string[];
}

// 侧边栏组配置
export type SidebarGroup = ScanConfig | ManualConfig | MixedConfig | DividerConfig;

// 完整侧边栏配置
export interface SidebarConfig {
  enabled: boolean;
  width?: string;
  position?: 'left' | 'right';
  showSearch?: boolean;
  showRecentPosts?: boolean;
  recentPostsCount?: number;
  showPopularTags?: boolean;
  popularTagsCount?: number;
  showArchives?: boolean;
  archivesCount?: number;
  showFriendLinks?: boolean;
  friendLinks?: Array<{
    title: string;
    url: string;
    icon?: string;
    description?: string;
  }>;
  groups: SidebarGroup[];
}

/**
 * 默认侧边栏配置
 */
export const sidebarConfig: SidebarConfig = {
  enabled: true,
  width: '280px',
  position: 'right',
  showSearch: true,
  showRecentPosts: true,
  recentPostsCount: 5,
  showPopularTags: true,
  popularTagsCount: 8,
  showArchives: true,
  archivesCount: 6,
  showFriendLinks: true,
  friendLinks: [
    { title: 'Astro 官网', url: 'https://astro.build' },
    { title: 'Tailwind CSS', url: 'https://tailwindcss.com' },
    { title: 'Vue.js', url: 'https://vuejs.org' },
  ],
  groups: [
    {
      type: 'scan',
      title: '文档目录',
      icon: 'folder',
      scanPath: '',
      collapsed: false,
    }
  ]
};

/**
 * Define sidebar configuration
 */
export function defineSidebarConfig(config: Partial<SidebarConfig>): SidebarConfig {
  return {
    ...sidebarConfig,
    ...config,
    groups: config.groups || sidebarConfig.groups
  };
}

// 向后兼容
export const defaultSidebarConfig = sidebarConfig;
