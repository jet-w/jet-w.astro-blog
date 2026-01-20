import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'config/index': 'src/config/index.ts',
    'types/index': 'src/types/index.ts',
    'utils/sidebar': 'src/utils/sidebar.ts',
    'integration': 'src/integration.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  external: [
    'astro',
    'astro:content',
    'astro/loaders',
    '@astrojs/mdx',
    '@astrojs/tailwind',
    '@astrojs/vue',
    'vue',
    'tailwindcss'
  ],
  noExternal: [
    'unist-util-visit',
    'fuse.js',
    'gray-matter',
    'marked',
    'prismjs'
  ]
});
