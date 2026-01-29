/**
 * 中文 UI 翻译
 *
 * 在此覆盖任何 UI 字符串。库已提供默认中文翻译，
 * 所以您只需要添加想要自定义的字符串。
 *
 * 可用的翻译键请参考 UITranslations 接口：
 * - 导航: home, blog, about, search
 * - 文章: posts, postList, noPostsFound, readMore, readingTime, minuteRead
 * - 标签和分类: tags, categories, allTags, allCategories, taggedWith, inCategory
 * - 归档: archives, postsInArchive
 * - 侧边栏: recentPosts, popularTags, friendLinks, documentTree
 * - 页脚: quickLinks, contact
 * - 搜索: searchPlaceholder, searchResults, noResults, searching, searchArticles 等
 * - Hero 区域: browsePosts, aboutMe
 * - 分页: previousPage, nextPage, page, of
 * - 文章详情: publishedOn, updatedOn, author, tableOfContents, relatedPosts 等
 * - 其他: backToTop, copyCode, copied, expand, collapse, viewMode, sortBy 等
 * - 演示: slides, slidesList
 * - RSS: rssFeed
 */
import type { UITranslations } from '@jet-w/astro-blog';

export const ui: Partial<UITranslations> = {
  // 示例覆盖：
  // browsePosts: '浏览文章',
  // aboutMe: '关于我',
  // searchPlaceholder: '搜索文章...',
};
