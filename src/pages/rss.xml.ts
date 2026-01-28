import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@jet-w/astro-blog/config';
import { defaultI18nConfig } from '../config/i18n';
import { getLocaleFromPath, getLocaleConfig, getLocalePrefix } from '../utils/i18n';

export async function GET(context: { site: URL; request: Request }) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  // Get locale from URL path
  const url = new URL(context.request.url);
  const i18nConfig = defaultI18nConfig; // In real usage, this would be passed from integration
  const currentLocale = getLocaleFromPath(url.pathname, i18nConfig);
  const localeConfig = getLocaleConfig(currentLocale, i18nConfig);
  const localePrefix = getLocalePrefix(currentLocale, i18nConfig);

  // Use locale-specific site config
  const localeSiteConfig = localeConfig.site;

  // Sort by date, newest first
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.data.date || 0);
    const dateB = new Date(b.data.date || 0);
    return dateB.getTime() - dateA.getTime();
  });

  return rss({
    title: localeSiteConfig.title || siteConfig.title,
    description: localeSiteConfig.description || siteConfig.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date ? new Date(post.data.date) : new Date(),
      description: post.data.description || '',
      link: `${localePrefix}/posts/${post.id.toLowerCase()}/`,
      categories: [...(post.data.categories || []), ...(post.data.tags || [])]
    })),
    customData: `<language>${localeConfig.locale.htmlLang}</language>`
  });
}
