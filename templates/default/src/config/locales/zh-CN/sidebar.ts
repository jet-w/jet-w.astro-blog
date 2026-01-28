/**
 * 中文侧边栏配置
 *
 * 当英语是默认语言时 (prefixDefaultLocale: false)，
 * 中文路径需要 /zh-CN 前缀
 */
export const sidebar = {
  groups: [
    {
      type: 'scan' as const,
      title: '博客指南',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs',
      collapsed: true,
      showForPaths: ['/zh-CN/posts/blog_docs/**'],
    },
  ],
};
