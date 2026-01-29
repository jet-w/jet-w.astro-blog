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
      scanPath: 'blog_docs_en/01.get-started',
      collapsed: false,
      showForPaths: ['/posts/blog_docs_en/01.get-started/**'],
    },
    {
      type: 'scan' as const,
      title: 'Documentation',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs_en/02.guide',
      collapsed: false,
      showForPaths: ['/posts/blog_docs_en/02.guide/**'],
    },
    {
      type: 'scan' as const,
      title: 'Documentation',
      icon: 'ri:book-open-line',
      scanPath: 'blog_docs_en/03.config',
      collapsed: false,
      showForPaths: ['/posts/blog_docs_en/03.config/**'],
    },
  ],
};
