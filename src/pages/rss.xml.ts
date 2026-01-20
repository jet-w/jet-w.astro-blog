import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@jet-w/astro-blog/config';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  // 按日期排序，最新的在前
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.data.date || 0);
    const dateB = new Date(b.data.date || 0);
    return dateB.getTime() - dateA.getTime();
  });

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date ? new Date(post.data.date) : new Date(),
      description: post.data.description || '',
      link: `/posts/${post.id.toLowerCase()}/`,
      categories: [...(post.data.categories || []), ...(post.data.tags || [])]
    })),
    customData: `<language>zh-CN</language>`
  });
}
