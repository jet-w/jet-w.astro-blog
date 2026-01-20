import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const searchIndex = posts.map(post => ({
    title: post.data.title,
    description: post.data.description || '',
    url: `/posts/${post.id.toLowerCase()}`,
    content: post.body?.substring(0, 500) || '', // 取前500字符作为搜索内容
    tags: post.data.tags || [],
    categories: post.data.categories || []
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
