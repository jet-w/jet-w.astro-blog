/**
 * 配置文件统一导出
 */

export { siteConfig, defaultSiteConfig, defaultSEO, defineSiteConfig } from './site';
export { menu, defaultMenu, defineMenu } from './menu';
export { sidebarConfig, defaultSidebarConfig, defineSidebarConfig } from './sidebar';
export { defaultIcons, socialLinks, defaultSocialLinks, defineSocialLinks } from './social';
export { footerConfig, defaultFooterConfig, defineFooterConfig } from './footer';

// i18n exports
export {
  defaultI18nConfig,
  defineI18nConfig,
  getUITranslations,
  builtInTranslations,
  zhCNTranslations,
  enTranslations,
  defaultLocales,
} from './i18n';

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

// i18n types
export type {
  I18nConfig,
  Locale,
  LocaleConfig,
  UITranslations,
  I18nRoutingConfig,
} from './i18n';
