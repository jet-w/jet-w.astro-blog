/**
 * Rehype 插件：修复 Markdown 中的相对链接和图片链接
 * 将相对链接转换为正确的绝对路径，支持 base URL
 * 同时处理绝对路径链接，添加 base URL 前缀
 */
import { visit } from 'unist-util-visit';

/**
 * Helper function to check if a path is a relative link
 * @param {string} path - The path to check
 * @returns {boolean} - True if the path is relative
 */
function isRelativePath(path) {
  return (
    path.startsWith('./') ||
    path.startsWith('../') ||
    (!path.startsWith('/') &&
     !path.startsWith('#') &&
     !path.startsWith('http://') &&
     !path.startsWith('https://') &&
     !path.startsWith('mailto:') &&
     !path.startsWith('data:'))
  );
}

/**
 * Helper function to check if a path is an internal absolute path
 * (starts with / but not an external URL or special protocol)
 * @param {string} path - The path to check
 * @returns {boolean} - True if the path is an internal absolute path
 */
function isInternalAbsolutePath(path) {
  return (
    path.startsWith('/') &&
    !path.startsWith('//') // Exclude protocol-relative URLs like //example.com
  );
}

/**
 * Helper function to normalize the base URL
 * @param {string} base - The base URL
 * @returns {string} - Normalized base URL (with leading slash, without trailing slash)
 */
function normalizeBase(base) {
  if (!base || base === '/') return '';
  // Ensure leading slash, remove trailing slash
  let normalized = base.startsWith('/') ? base : `/${base}`;
  normalized = normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
  return normalized;
}

/**
 * Rehype plugin to fix relative links in Markdown
 * @param {Object} options - Plugin options
 * @param {string} options.base - The base URL path (e.g., '/blog')
 * @returns {Function} - The plugin function
 */
export function rehypeRelativeLinks(options = {}) {
  const base = normalizeBase(options.base || process.env.BASE_PATH || '');

  return (tree, file) => {
    // 获取当前文件的路径信息
    const filePath = file.history[0] || '';

    // 从文件路径中提取目录信息
    // 例如：/path/to/content/posts/blog_docs/README.md -> blog_docs
    const match = filePath.match(/content\/posts\/(.+?)\/[^/]+\.(md|mdx)$/i);

    // dirPath 用于相对链接的解析
    const dirPath = match ? match[1] : ''; // 例如：blog_docs 或 tech/subfolder

    visit(tree, 'element', (node) => {
      // Handle anchor links
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href;

        if (isRelativePath(href) && dirPath) {
          // 移除 ./ 前缀
          const cleanHref = href.replace(/^\.\//, '');

          // 构建新的绝对路径（包含 base URL）
          const newHref = `${base}/posts/${dirPath}/${cleanHref}`;
          node.properties.href = newHref;
        } else if (isInternalAbsolutePath(href) && base) {
          // 处理内部绝对路径：添加 base URL 前缀
          // 例如：/posts/xxx -> /blog/posts/xxx
          // 避免重复添加 base（如果已经包含）
          if (!href.startsWith(base + '/') && href !== base) {
            node.properties.href = base + href;
          }
        }
      }

      // Handle image links
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;

        if (isRelativePath(src) && dirPath) {
          // 移除 ./ 前缀
          const cleanSrc = src.replace(/^\.\//, '');

          // 构建新的绝对路径（包含 base URL）
          // 图片通常相对于当前文档，保持目录结构
          const newSrc = `${base}/posts/${dirPath}/${cleanSrc}`;
          node.properties.src = newSrc;
        } else if (isInternalAbsolutePath(src) && base) {
          // 处理内部绝对路径图片：添加 base URL 前缀
          // 例如：/images/xxx.png -> /blog/images/xxx.png
          // 避免重复添加 base（如果已经包含）
          if (!src.startsWith(base + '/') && src !== base) {
            node.properties.src = base + src;
          }
        }
      }
    });
  };
}

export default rehypeRelativeLinks;
