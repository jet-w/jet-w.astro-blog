/**
 * Rehype 插件：修复 Markdown 中的相对链接
 * 将相对链接转换为正确的绝对路径
 */
import { visit } from 'unist-util-visit';

export function rehypeRelativeLinks(options = {}) {
  return (tree, file) => {
    // 获取当前文件的路径信息
    const filePath = file.history[0] || '';

    // 从文件路径中提取目录信息
    // 例如：/path/to/content/posts/blog_docs/README.md -> blog_docs
    const match = filePath.match(/content\/posts\/(.+?)\/[^/]+\.(md|mdx)$/i);
    if (!match) return;

    const dirPath = match[1]; // 例如：blog_docs 或 tech/subfolder

    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href;

        // 只处理相对链接（以 ./ 或不以 / # http 开头的链接）
        if (href.startsWith('./') ||
            (!href.startsWith('/') &&
             !href.startsWith('#') &&
             !href.startsWith('http://') &&
             !href.startsWith('https://') &&
             !href.startsWith('mailto:'))) {

          // 移除 ./ 前缀
          const cleanHref = href.replace(/^\.\//, '');

          // 构建新的绝对路径
          const newHref = `/posts/${dirPath}/${cleanHref}`;
          node.properties.href = newHref;
        }
      }
    });
  };
}

export default rehypeRelativeLinks;
