/**
 * 配置文件统一导出
 */

export { siteConfig, defaultSiteConfig, defaultSEO, defineSiteConfig } from './site';
export { menu, defaultMenu, defineMenu } from './menu';
export { sidebarConfig, defaultSidebarConfig, defineSidebarConfig } from './sidebar';
export { defaultIcons, socialLinks, defaultSocialLinks, defineSocialLinks } from './social';
export { footerConfig, defaultFooterConfig, defineFooterConfig } from './footer';

export type {
  SidebarConfig,
  SidebarGroup,
  SidebarItem,
  ScanConfig,
  ManualConfig,
  MixedConfig,
  DividerConfig,
  PathMatchConfig
} from './sidebar';
export type { SocialLink } from './social';
export type { FooterConfig, FooterLink } from './footer';
