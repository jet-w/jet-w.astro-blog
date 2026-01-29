import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './content/posts',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    tag: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    category: z.union([z.string(), z.array(z.string())]).optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    icon: z.string().optional(),
    draft: z.boolean().default(false),
    index: z.boolean().default(true),
    star: z.boolean().default(false),
    layout: z.enum(['default', 'slides']).default('default'),
    theme: z.string().default('black'),
    transition: z.string().default('slide'),
    controls: z.boolean().default(true),
    progress: z.boolean().default(true),
    center: z.boolean().default(true),
    slideNumber: z.boolean().default(false),
  }).transform((data) => {
    const pubDate = data.pubDate ?? data.date;
    let categories = data.categories;
    if (data.category) {
      const categoryArray = Array.isArray(data.category) ? data.category : [data.category];
      categories = categories.length > 0 ? categories : categoryArray;
    }
    const tags = data.tags.length > 0 ? data.tags : data.tag;
    return {
      title: data.title,
      description: data.description,
      pubDate,
      date: data.date,
      updatedDate: data.updatedDate,
      tags,
      categories,
      author: data.author,
      image: data.image,
      icon: data.icon,
      draft: data.draft,
      index: data.index,
      star: data.star,
      layout: data.layout,
      theme: data.theme,
      transition: data.transition,
      controls: data.controls,
      progress: data.progress,
      center: data.center,
      slideNumber: data.slideNumber,
    };
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './content/pages',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const slides = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './content/slides',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    theme: z.string().default('black'),
    transition: z.string().default('slide'),
    controls: z.boolean().default(true),
    progress: z.boolean().default(true),
    center: z.boolean().default(true),
    hash: z.boolean().default(true),
    slideNumber: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts,
  pages,
  slides,
};
