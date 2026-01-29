<template>
  <div class="relative">
    <div class="relative">
      <input
        ref="searchInputRef"
        v-model="searchQuery"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        type="text"
        :placeholder="props.placeholder || '搜索文章...'"
        class="w-64 pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- 搜索结果 -->
    <transition name="fade">
      <div
        v-if="showResults && (searchResults.length > 0 || searchQuery.length > 0)"
        class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
      >
        <div v-if="searchResults.length === 0 && searchQuery.length > 0" class="p-4 text-center text-slate-500 dark:text-slate-400">
          {{ props.noResultsText || '没有找到相关文章' }}
        </div>
        <div v-else class="py-2">
          <a
            v-for="result in searchResults"
            :key="result.url"
            :href="result.url"
            class="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0"
            @click="handleResultClick"
          >
            <h4 class="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1" v-html="highlightText(result.title)"></h4>
            <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2" v-html="highlightText(result.description)"></p>
            <div class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="tag in result.tags.slice(0, 3)"
                :key="tag"
                class="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  placeholder?: string;
  searchLabel?: string;
  noResultsText?: string;
}>();

interface SearchResult {
  title: string
  description: string
  url: string
  content: string
  tags: string[]
  categories: string[]
}

const searchQuery = ref('')
const searchResults = ref<SearchResult[]>([])
const showResults = ref(false)
const searchIndex = ref<SearchResult[]>([])
const isLoading = ref(false)
const isLoaded = ref(false)

// 加载搜索索引
const loadSearchIndex = async () => {
  if (isLoaded.value || isLoading.value) return

  isLoading.value = true
  try {
    const response = await fetch('/search-index.json')
    if (response.ok) {
      searchIndex.value = await response.json()
      isLoaded.value = true
    }
  } catch (error) {
    console.error('Failed to load search index:', error)
  } finally {
    isLoading.value = false
  }
}

const handleInput = async () => {
  // 首次输入时加载索引
  if (!isLoaded.value) {
    await loadSearchIndex()
  }

  if (searchQuery.value.length === 0) {
    searchResults.value = []
    return
  }

  // 简单的文本搜索实现
  const query = searchQuery.value.toLowerCase()
  searchResults.value = searchIndex.value.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.content.toLowerCase().includes(query) ||
    item.tags.some(tag => tag.toLowerCase().includes(query))
  ).slice(0, 8) // 限制结果数量
}

const handleFocus = async () => {
  showResults.value = true
  // 聚焦时预加载索引
  if (!isLoaded.value) {
    await loadSearchIndex()
  }
}

const handleBlur = () => {
  // 延迟隐藏结果，允许点击结果
  setTimeout(() => {
    showResults.value = false
  }, 200)
}

const handleResultClick = () => {
  showResults.value = false
  searchQuery.value = ''
  searchResults.value = []
}

const highlightText = (text: string) => {
  if (!searchQuery.value || !text) return text || ''

  try {
    // 转义特殊字符
    const escapedQuery = searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
  } catch {
    return text
  }
}

// 键盘快捷键支持
const searchInputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  // Ctrl/Cmd + K 打开搜索
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      if (searchInputRef.value) {
        searchInputRef.value.focus()
      }
    }
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>