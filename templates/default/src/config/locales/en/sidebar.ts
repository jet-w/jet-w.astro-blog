/**
 * English sidebar configuration
 *
 * When English is the default locale (prefixDefaultLocale: false),
 * paths should NOT have /en/ prefix
 */
export const sidebar = {
  groups: [
    {
      type: 'scan' as const,
      title: 'Documentation',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs_en',
      collapsed: false,
      showForPaths: ['/posts/blog_docs_en/**'],
    },
  ],
};
