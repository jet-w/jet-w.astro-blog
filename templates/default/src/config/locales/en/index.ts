/**
 * English (en) locale configuration
 */
import { site } from './site';
import { menu } from './menu';
import { footer } from './footer';
import { sidebar } from './sidebar';
import { ui } from './ui';

export const enConfig = {
  site,
  menu,
  footer,
  sidebar,
  ui,
  // Content path prefix for filtering posts by locale
  contentPathPrefix: 'blog_docs_en',
};

export { site, menu, footer, sidebar, ui };
