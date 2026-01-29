/**
 * 中文侧边栏配置
 *
 * 当英文是默认语言且 prefixDefaultLocale: false 时，
 * 中文路径需要包含 /zh-CN/ 前缀
 */
export const sidebar = {
  groups: [
    {
      type: 'scan' as const,
      title: '快速入门',
      icon: 'ri:rocket-line',
      scanPath: 'blog_docs_zh/01.get-started',
      collapsed: false,
      showForPaths: ['/zh-CN/posts/blog_docs_zh/01.get-started/**'],
    },
    {
      type: 'scan' as const,
      title: '使用指南',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs_zh/02.guide',
      collapsed: false,
      showForPaths: ['/zh-CN/posts/blog_docs_zh/02.guide/**'],
    },
    {
      type: 'scan' as const,
      title: '配置文档',
      icon: 'ri:settings-3-line',
      scanPath: 'blog_docs_zh/03.config',
      collapsed: false,
      showForPaths: ['/zh-CN/posts/blog_docs_zh/03.config/**'],
    },
  ],
};
