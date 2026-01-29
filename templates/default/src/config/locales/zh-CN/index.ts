/**
 * 中文 (zh-CN) 语言配置
 */
import { site } from './site';
import { menu } from './menu';
import { footer } from './footer';
import { sidebar } from './sidebar';
import { ui } from './ui';

export const zhCNConfig = {
  site,
  menu,
  footer,
  sidebar,
  ui,
  // 内容路径前缀，用于按语言过滤文章
  contentPathPrefix: 'blog_docs_zh',
};

export { site, menu, footer, sidebar, ui };
