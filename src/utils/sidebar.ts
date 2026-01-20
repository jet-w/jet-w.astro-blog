/**
 * 侧边栏工具函数
 * 处理配置解析和树形结构生成
 */

// 使用内联类型定义避免 astro:content 导入问题
interface PostEntry {
  id: string;
  data: {
    title?: string;
    icon?: string;
    pubDate?: Date;
    tags?: string[];
    draft?: boolean;
  };
}

import type {
  SidebarConfig,
  SidebarGroup,
  SidebarItem,
  ScanConfig,
  ManualConfig,
  MixedConfig,
} from '../config/sidebar';

// 树节点类型
export interface TreeNode {
  name: string;
  slug?: string;
  title?: string;
  displayName?: string;
  icon?: string;
  badge?: string;
  badgeType?: 'info' | 'success' | 'warning' | 'error';
  children: TreeNode[];
  isFolder: boolean;
  isReadme?: boolean;
  link?: string;
  collapsed?: boolean;
}

// 处理后的侧边栏组
export interface ProcessedGroup {
  type: 'tree' | 'items' | 'divider';
  title: string;
  icon?: string;
  collapsed?: boolean;
  tree?: TreeNode[];
  items?: SidebarItem[];
}

/**
 * 从文章集合构建树形结构
 */
export function buildTreeFromPosts(
  posts: PostEntry[],
  scanPath: string = '',
  options: {
    maxDepth?: number;
    exclude?: string[];
    include?: string[];
    sortBy?: 'name' | 'date' | 'title' | 'custom';
    sortOrder?: 'asc' | 'desc';
  } = {}
): TreeNode[] {
  const { maxDepth, exclude = [], include = [], sortBy = 'name', sortOrder = 'asc' } = options;

  // 过滤出指定路径下的文章
  const filteredPosts = posts.filter(post => {
    const postPath = post.id.toLowerCase();
    const targetPath = scanPath.toLowerCase();

    // 检查是否在指定路径下
    if (targetPath && !postPath.startsWith(targetPath + '/') && postPath !== targetPath) {
      return false;
    }

    // 检查排除规则
    const pathParts = post.id.split('/');
    for (const part of pathParts as string[]) {
      if (exclude.some((pattern: string) => matchPattern(part, pattern))) {
        return false;
      }
    }

    // 检查包含规则
    if (include.length > 0) {
      const matchesInclude = pathParts.some((part: string) =>
        include.some((pattern: string) => matchPattern(part, pattern))
      );
      if (!matchesInclude) {
        return false;
      }
    }

    return true;
  });

  // 收集文件夹的 README 标题和图标
  const folderTitles: Record<string, string> = {};
  const folderIcons: Record<string, string> = {};

  filteredPosts.forEach(post => {
    const pathParts = post.id.split('/');
    const fileName = pathParts[pathParts.length - 1].toLowerCase();

    if (fileName === 'readme' || fileName === 'readme.md') {
      const folderPath = pathParts.slice(0, -1).join('/');
      if (folderPath) {
        if (post.data.title) {
          folderTitles[folderPath] = post.data.title;
        }
        if (post.data.icon) {
          folderIcons[folderPath] = post.data.icon;
        }
      }
    }
  });

  // 构建树
  const tree: TreeNode[] = [];

  filteredPosts.forEach(post => {
    // 移除 scanPath 前缀
    let relativePath = post.id;
    if (scanPath) {
      const scanPathLower = scanPath.toLowerCase();
      const postIdLower = post.id.toLowerCase();
      if (postIdLower.startsWith(scanPathLower + '/')) {
        relativePath = post.id.slice(scanPath.length + 1);
      } else if (postIdLower === scanPathLower) {
        relativePath = post.id.split('/').pop() || post.id;
      }
    }

    const pathParts = relativePath.split('/');

    // 检查深度限制
    if (maxDepth !== undefined && pathParts.length > maxDepth) {
      return;
    }

    let currentLevel = tree;
    let currentPath = scanPath;

    pathParts.forEach((part: string, index: number) => {
      const isLast = index === pathParts.length - 1;
      const existing = currentLevel.find(n => n.name.toLowerCase() === part.toLowerCase());

      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isReadme = isLast && (part.toLowerCase() === 'readme' || part.toLowerCase() === 'readme.md');

      if (existing) {
        if (isLast) {
          existing.slug = post.id;
          existing.title = post.data.title;
          existing.icon = post.data.icon;
          existing.isReadme = isReadme;
        } else {
          // 更新文件夹信息
          const folderPath = scanPath ? `${scanPath}/${pathParts.slice(0, index + 1).join('/')}` : pathParts.slice(0, index + 1).join('/');
          if (folderTitles[folderPath]) {
            existing.displayName = folderTitles[folderPath];
          }
          if (folderIcons[folderPath]) {
            existing.icon = folderIcons[folderPath];
          }
        }
        currentLevel = existing.children;
      } else {
        const folderPath = scanPath ? `${scanPath}/${pathParts.slice(0, index + 1).join('/')}` : pathParts.slice(0, index + 1).join('/');
        const newNode: TreeNode = {
          name: part,
          slug: isLast ? post.id : undefined,
          title: isLast ? post.data.title : undefined,
          displayName: isLast ? post.data.title : folderTitles[folderPath],
          icon: isLast ? post.data.icon : folderIcons[folderPath],
          children: [],
          isFolder: !isLast,
          isReadme: isReadme,
        };
        currentLevel.push(newNode);
        currentLevel = newNode.children;
      }
    });
  });

  // 排序并过滤 README
  return sortTree(tree, sortBy, sortOrder);
}

/**
 * 排序树并过滤 README 文件
 */
function sortTree(
  nodes: TreeNode[],
  sortBy: 'name' | 'date' | 'title' | 'custom' = 'name',
  sortOrder: 'asc' | 'desc' = 'asc'
): TreeNode[] {
  const filtered = nodes.filter(node => !node.isReadme);

  const sorted = filtered.sort((a, b) => {
    // 文件夹优先
    if (a.isFolder && !b.isFolder) return -1;
    if (!a.isFolder && b.isFolder) return 1;

    let comparison = 0;
    switch (sortBy) {
      case 'title':
        comparison = (a.displayName || a.title || a.name).localeCompare(
          b.displayName || b.title || b.name,
          'zh-CN'
        );
        break;
      case 'name':
      default:
        comparison = a.name.localeCompare(b.name, 'zh-CN', { numeric: true });
        break;
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  return sorted.map(node => ({
    ...node,
    children: sortTree(node.children, sortBy, sortOrder),
  }));
}

/**
 * 简单的模式匹配（支持 * 通配符）
 */
function matchPattern(str: string, pattern: string): boolean {
  if (pattern === '*') return true;
  if (pattern.includes('*')) {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$', 'i');
    return regex.test(str);
  }
  return str.toLowerCase() === pattern.toLowerCase();
}

/**
 * 路径 glob 模式匹配
 * 支持:
 * - /posts/tech/** 匹配 /posts/tech 及其所有子路径
 * - /posts/tech/* 匹配 /posts/tech 的直接子路径
 * - /posts/tech 精确匹配
 */
export function matchPathPattern(currentPath: string, pattern: string): boolean {
  // 规范化路径
  const normalizedPath = currentPath.replace(/\/$/, '').toLowerCase();
  const normalizedPattern = pattern.replace(/\/$/, '').toLowerCase();

  // ** 匹配任意深度
  if (normalizedPattern.endsWith('/**')) {
    const basePath = normalizedPattern.slice(0, -3);
    return normalizedPath === basePath || normalizedPath.startsWith(basePath + '/');
  }

  // * 匹配单层
  if (normalizedPattern.endsWith('/*')) {
    const basePath = normalizedPattern.slice(0, -2);
    if (normalizedPath === basePath) return true;
    // 检查是否是直接子路径
    if (normalizedPath.startsWith(basePath + '/')) {
      const remaining = normalizedPath.slice(basePath.length + 1);
      return !remaining.includes('/');
    }
    return false;
  }

  // 精确匹配
  return normalizedPath === normalizedPattern;
}

/**
 * 检查侧边栏组是否应该在当前路径显示
 */
export function shouldShowGroup(
  group: { showForPaths?: string[]; hideForPaths?: string[] },
  currentPath: string
): boolean {
  // 如果没有配置路径规则，默认显示
  if (!group.showForPaths && !group.hideForPaths) {
    return true;
  }

  // 检查隐藏规则
  if (group.hideForPaths && group.hideForPaths.length > 0) {
    for (const pattern of group.hideForPaths) {
      if (matchPathPattern(currentPath, pattern)) {
        return false;
      }
    }
  }

  // 检查显示规则
  if (group.showForPaths && group.showForPaths.length > 0) {
    for (const pattern of group.showForPaths) {
      if (matchPathPattern(currentPath, pattern)) {
        return true;
      }
    }
    // 配置了 showForPaths 但没有匹配，则不显示
    return false;
  }

  // 默认显示
  return true;
}

/**
 * 根据当前路径过滤侧边栏组
 */
export function filterGroupsByPath(
  groups: SidebarGroup[],
  currentPath: string
): SidebarGroup[] {
  return groups.filter(group => shouldShowGroup(group, currentPath));
}

/**
 * 将手动配置的项目转换为树节点
 */
export function manualItemsToTree(items: SidebarItem[]): TreeNode[] {
  return items.map(item => ({
    name: item.title,
    slug: item.slug,
    title: item.title,
    displayName: item.title,
    icon: item.icon,
    badge: item.badge,
    badgeType: item.badgeType,
    link: item.link,
    children: item.children ? manualItemsToTree(item.children) : [],
    isFolder: !!(item.children && item.children.length > 0),
    collapsed: item.collapsed,
  }));
}

/**
 * 处理侧边栏配置，生成可渲染的数据结构
 */
export async function processSidebarConfig(
  config: SidebarConfig,
  posts: PostEntry[]
): Promise<ProcessedGroup[]> {
  const processedGroups: ProcessedGroup[] = [];

  for (const group of config.groups) {
    const processed = await processGroup(group, posts);
    if (processed) {
      processedGroups.push(processed);
    }
  }

  return processedGroups;
}

/**
 * 处理单个侧边栏组
 */
async function processGroup(
  group: SidebarGroup,
  posts: PostEntry[]
): Promise<ProcessedGroup | null> {
  switch (group.type) {
    case 'scan': {
      const scanConfig = group as ScanConfig;
      const tree = buildTreeFromPosts(posts, scanConfig.scanPath, {
        maxDepth: scanConfig.maxDepth,
        exclude: scanConfig.exclude,
        include: scanConfig.include,
        sortBy: scanConfig.sortBy,
        sortOrder: scanConfig.sortOrder,
      });

      return {
        type: 'tree',
        title: scanConfig.title,
        icon: scanConfig.icon,
        collapsed: scanConfig.collapsed,
        tree,
      };
    }

    case 'manual': {
      const manualConfig = group as ManualConfig;
      const tree = manualItemsToTree(manualConfig.items);

      return {
        type: 'tree',
        title: manualConfig.title,
        icon: manualConfig.icon,
        collapsed: manualConfig.collapsed,
        tree,
      };
    }

    case 'mixed': {
      const mixedConfig = group as MixedConfig;
      const combinedTree: TreeNode[] = [];

      for (const section of mixedConfig.sections) {
        const processed = await processGroup(section, posts);
        if (processed && processed.tree) {
          // 将每个子部分作为一个文件夹节点
          combinedTree.push({
            name: section.title,
            displayName: section.title,
            icon: section.icon,
            children: processed.tree,
            isFolder: true,
            collapsed: section.collapsed,
          });
        }
      }

      return {
        type: 'tree',
        title: mixedConfig.title,
        icon: mixedConfig.icon,
        collapsed: mixedConfig.collapsed,
        tree: combinedTree,
      };
    }

    case 'divider': {
      return {
        type: 'divider',
        title: group.title || '',
      };
    }

    default:
      return null;
  }
}

/**
 * 获取最新文章
 */
export function getRecentPosts(
  posts: PostEntry[],
  count: number = 5
): PostEntry[] {
  return posts
    .filter(p => p.data.pubDate)
    .sort((a, b) => (b.data.pubDate?.getTime() ?? 0) - (a.data.pubDate?.getTime() ?? 0))
    .slice(0, count);
}

/**
 * 获取热门标签
 */
export function getPopularTags(
  posts: PostEntry[],
  count: number = 8
): Array<{ name: string; count: number; slug: string }> {
  const tagCounts: Record<string, number> = {};

  posts.forEach(post => {
    (post.data.tags || []).forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }));
}

/**
 * 获取归档数据
 */
export function getArchives(
  posts: PostEntry[],
  count: number = 6
): Array<{ year: number; month: number; count: number }> {
  const archiveMap: Record<string, number> = {};

  posts.forEach(post => {
    if (post.data.pubDate) {
      const date = new Date(post.data.pubDate);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      archiveMap[key] = (archiveMap[key] || 0) + 1;
    }
  });

  return Object.entries(archiveMap)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, count)
    .map(([key, count]) => {
      const [year, month] = key.split('-').map(Number);
      return { year, month, count };
    });
}
