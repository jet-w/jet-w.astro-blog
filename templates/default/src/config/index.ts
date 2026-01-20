/**
 * Blog Configuration
 *
 * This file re-exports all configuration modules for easy access.
 * Each configuration is in its own file for better organization:
 *
 * - site.ts    : Site title, description, author, menu
 * - sidebar.ts : Sidebar display options and groups
 * - social.ts  : Social media links
 * - footer.ts  : Footer links and copyright
 */

// Re-export all configurations
export { siteConfig, defaultSEO } from './site';
export { sidebarConfig } from './sidebar';
export { socialLinks } from './social';
export { footerConfig } from './footer';
