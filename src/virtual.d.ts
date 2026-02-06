/**
 * Type declarations for virtual modules
 */

declare module 'virtual:astro-blog-i18n' {
  import type { I18nConfig } from './config/i18n';
  export const i18nConfig: I18nConfig;
}

declare module 'virtual:astro-blog-social' {
  import type { SocialLink } from './config/social';
  export const socialLinks: SocialLink[];
  export const defaultIcons: Record<string, string>;
}

declare module 'virtual:astro-blog-assets' {
  import type { CustomAssetsConfig } from './types';
  export const customAssetsConfig: CustomAssetsConfig;
}
