/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './content/**/*.{md,mdx}',
    './node_modules/@jet-w/astro-blog/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  darkMode: 'class',
  safelist: [
    'bg-primary-100', 'bg-primary-900/30', 'text-primary-300', 'text-primary-500', 'text-primary-700',
    'bg-secondary-100', 'bg-secondary-900/30', 'text-secondary-300', 'text-secondary-500', 'text-secondary-700',
    'bg-accent-100', 'bg-accent-900/30', 'text-accent-300', 'text-accent-500', 'text-accent-700',
    'bg-green-100', 'bg-green-900/30', 'text-green-300', 'text-green-700',
    'bg-yellow-100', 'bg-yellow-900/30', 'text-yellow-300', 'text-yellow-700',
    'bg-red-100', 'bg-red-900/30', 'text-red-300', 'text-red-700',
    'bg-cyan-100', 'bg-cyan-900/30', 'text-cyan-300', 'text-cyan-700',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        }
      },
      fontFamily: {
        'sans': ['"Inter"', '"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', '"Fira Code"', '"Monaco"', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgb(30 41 59)',
            '[data-theme="dark"] &': {
              color: 'rgb(241 245 249)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
