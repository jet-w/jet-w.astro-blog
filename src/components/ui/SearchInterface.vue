<template>
  <div class="space-y-8">
    <!-- 搜索框 -->
    <div class="relative">
      <div class="relative">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="搜索文章标题、内容、标签..."
          class="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors shadow-sm"
          autofocus
        />
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-4 flex items-center">
          <button
            @click="clearSearch"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 筛选器 -->
    <div class="flex flex-wrap gap-4">
      <!-- 标签筛选 -->
      <div class="flex items-center space-x-2">
        <label class="text-sm font-medium text-slate-700 dark:text-slate-300">标签:</label>
        <select
          v-model="selectedTag"
          @change="handleSearch"
          class="text-sm px-3 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">全部</option>
          <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>

      <!-- 分类筛选 -->
      <div class="flex items-center space-x-2">
        <label class="text-sm font-medium text-slate-700 dark:text-slate-300">分类:</label>
        <select
          v-model="selectedCategory"
          @change="handleSearch"
          class="text-sm px-3 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">全部</option>
          <option v-for="category in allCategories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <!-- 排序 -->
      <div class="flex items-center space-x-2">
        <label class="text-sm font-medium text-slate-700 dark:text-slate-300">排序:</label>
        <select
          v-model="sortBy"
          @change="handleSearch"
          class="text-sm px-3 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="relevance">相关性</option>
          <option value="date">发布时间</option>
          <option value="title">标题</option>
        </select>
      </div>
    </div>

    <!-- 搜索状态 -->
    <div class="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
      <div>
        <span v-if="isSearching">正在搜索...</span>
        <span v-else-if="searchQuery">
          找到 {{ searchResults.length }} 个结果
          <span v-if="searchQuery">包含 "{{ searchQuery }}"</span>
        </span>
        <span v-else>输入关键词开始搜索</span>
      </div>
      <div v-if="searchTime">
        搜索用时: {{ searchTime }}ms
      </div>
    </div>

    <!-- 搜索结果 -->
    <div v-if="searchResults.length > 0" class="space-y-6">
      <article
        v-for="result in paginatedResults"
        :key="result.url"
        class="card hover:shadow-lg transition-shadow duration-200"
      >
        <a :href="result.url" class="block group">
          <div class="flex flex-col lg:flex-row lg:items-center gap-4">
            <!-- 文章信息 -->
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-500 transition-colors mb-2" v-html="highlightText(result.title)"></h3>

              <p class="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2" v-html="highlightText(result.description)"></p>

              <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <time :datetime="result.date">{{ formatDate(result.date) }}</time>
                <span v-if="result.readingTime">{{ result.readingTime }}分钟阅读</span>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in result.tags.slice(0, 3)"
                    :key="tag"
                    class="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 相关度评分 -->
            <div class="lg:w-20 text-center">
              <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">相关度</div>
              <div class="flex items-center justify-center">
                <div class="w-12 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary-500 rounded-full transition-all duration-300"
                    :style="{ width: `${Math.round(result.score * 100)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </article>
    </div>

    <!-- 空状态 -->
    <div v-else-if="searchQuery && !isSearching" class="text-center py-16">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
        没有找到相关结果
      </h3>
      <p class="text-slate-600 dark:text-slate-400 mb-6">
        尝试使用不同的关键词或调整筛选条件
      </p>
      <button
        @click="clearSearch"
        class="btn-secondary"
      >
        清除搜索
      </button>
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="currentPage === 1
            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'"
        >
          上一页
        </button>

        <div class="flex items-center space-x-1">
          <button
            v-for="page in getPageNumbers()"
            :key="page"
            @click="currentPage = page"
            class="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="page === currentPage
              ? 'bg-primary-500 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="currentPage === totalPages
            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'"
        >
          下一页
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { SearchResult } from '@jet-w/astro-blog/types'

const searchQuery = ref('')
const selectedTag = ref('')
const selectedCategory = ref('')
const sortBy = ref('relevance')
const searchResults = ref<(SearchResult & { score: number; date: string; readingTime?: number })[]>([])
const isSearching = ref(false)
const searchTime = ref(0)
const currentPage = ref(1)
const resultsPerPage = 10

// 模拟搜索数据
const mockSearchData = [
  {
    title: '欢迎来到Astro技术博客',
    description: '这是使用Astro构建的现代化技术博客的第一篇文章，介绍博客的特性和使用方法。',
    url: '/posts/welcome-to-astro',
    content: 'Astro Vue TypeScript Tailwind CSS 博客 技术分享 现代化 静态站点生成',
    tags: ['Astro', 'Blog', 'TypeScript', 'Tailwind CSS'],
    categories: ['技术分享'],
    date: '2025-01-08',
    readingTime: 5
  },
  {
    title: 'Astro vs Next.js：静态站点生成器的对比',
    description: '深入比较Astro和Next.js在性能、开发体验和生态系统方面的差异。',
    url: '/posts/astro-vs-nextjs',
    content: 'Astro Next.js 对比 性能 SSG 静态站点生成 开发体验',
    tags: ['Astro', 'Next.js', 'SSG'],
    categories: ['技术比较'],
    date: '2025-01-07',
    readingTime: 8
  },
  {
    title: 'Tailwind CSS最佳实践指南',
    description: '总结使用Tailwind CSS开发时的最佳实践和常见问题解决方案。',
    url: '/posts/tailwind-best-practices',
    content: 'Tailwind CSS 最佳实践 响应式设计 工具类 优化',
    tags: ['Tailwind CSS', 'CSS', '最佳实践'],
    categories: ['前端开发'],
    date: '2025-01-06',
    readingTime: 6
  }
]

const allTags = computed(() => {
  const tags = new Set<string>()
  mockSearchData.forEach(item => {
    item.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const allCategories = computed(() => {
  const categories = new Set<string>()
  mockSearchData.forEach(item => {
    item.categories.forEach(category => categories.add(category))
  })
  return Array.from(categories).sort()
})

const totalPages = computed(() => {
  return Math.ceil(searchResults.value.length / resultsPerPage)
})

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * resultsPerPage
  const end = start + resultsPerPage
  return searchResults.value.slice(start, end)
})

const performSearch = () => {
  const startTime = performance.now()
  isSearching.value = true

  // 模拟搜索延迟
  setTimeout(() => {
    let results = [...mockSearchData]

    // 文本搜索
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      results = results.map(item => {
        let score = 0

        // 标题匹配 (权重最高)
        if (item.title.toLowerCase().includes(query)) {
          score += 10
        }

        // 描述匹配
        if (item.description.toLowerCase().includes(query)) {
          score += 5
        }

        // 内容匹配
        if (item.content.toLowerCase().includes(query)) {
          score += 3
        }

        // 标签匹配
        if (item.tags.some(tag => tag.toLowerCase().includes(query))) {
          score += 7
        }

        // 分类匹配
        if (item.categories.some(category => category.toLowerCase().includes(query))) {
          score += 6
        }

        return { ...item, score: Math.min(score / 10, 1) }
      }).filter(item => item.score > 0)
    } else {
      results = results.map(item => ({ ...item, score: 1 }))
    }

    // 标签筛选
    if (selectedTag.value) {
      results = results.filter(item => item.tags.includes(selectedTag.value))
    }

    // 分类筛选
    if (selectedCategory.value) {
      results = results.filter(item => item.categories.includes(selectedCategory.value))
    }

    // 排序
    switch (sortBy.value) {
      case 'date':
        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'relevance':
      default:
        results.sort((a, b) => b.score - a.score)
        break
    }

    searchResults.value = results
    isSearching.value = false
    searchTime.value = Math.round(performance.now() - startTime)
    currentPage.value = 1
  }, 200)
}

const handleSearch = () => {
  performSearch()
}

const clearSearch = () => {
  searchQuery.value = ''
  selectedTag.value = ''
  selectedCategory.value = ''
  searchResults.value = []
  currentPage.value = 1
}

const highlightText = (text: string) => {
  if (!searchQuery.value) return text

  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

const getPageNumbers = () => {
  const maxPages = 5
  const half = Math.floor(maxPages / 2)
  let start = Math.max(1, currentPage.value - half)
  let end = Math.min(totalPages.value, start + maxPages - 1)

  if (end - start < maxPages - 1) {
    start = Math.max(1, end - maxPages + 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
}

onMounted(() => {
  // 如果URL中有搜索参数，自动执行搜索
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get('q')
  if (query) {
    searchQuery.value = query
    performSearch()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>