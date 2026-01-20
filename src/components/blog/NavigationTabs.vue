<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
    <!-- Tab 头部 -->
    <div class="flex border-b border-slate-200 dark:border-slate-700">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors"
        :class="activeTab === tab.id
          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-b-2 border-primary-500'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        <span>{{ tab.name }}</span>
        <span class="text-xs px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Tab 内容 -->
    <div class="p-4 max-h-80 overflow-y-auto">
      <!-- 标签 Tab -->
      <div v-if="activeTab === 'tags'" class="flex flex-wrap gap-2">
        <a
          v-for="tag in tags"
          :key="tag.name"
          :href="`/tags/${encodeTag(tag.name)}`"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors"
          :class="getTagColorClass(tag.count)"
        >
          <span>#{{ tag.name }}</span>
          <span class="text-xs opacity-70">({{ tag.count }})</span>
        </a>
      </div>

      <!-- 归档 Tab -->
      <div v-if="activeTab === 'archives'" class="space-y-3">
        <a
          v-for="archive in archives"
          :key="archive.key"
          :href="`/archives/${archive.year}/${archive.month}`"
          class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
        >
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-slate-400 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              {{ archive.year }}年{{ archive.month }}月
            </span>
          </div>
          <span class="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
            {{ archive.count }}篇
          </span>
        </a>
      </div>

      <!-- 分类 Tab -->
      <div v-if="activeTab === 'categories'" class="space-y-2">
        <a
          v-for="category in categories"
          :key="category.name"
          :href="`/categories/${encodeCategory(category.name)}`"
          class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
        >
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-slate-400 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span class="text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              {{ category.name }}
            </span>
          </div>
          <span class="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
            {{ category.count }}篇
          </span>
        </a>
      </div>

      <!-- 时间轴 Tab -->
      <div v-if="activeTab === 'timeline'" class="relative">
        <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
        <div class="space-y-4">
          <div v-for="item in timeline" :key="item.slug" class="relative pl-10">
            <div class="absolute left-2.5 w-3 h-3 rounded-full bg-primary-500 border-2 border-white dark:border-slate-800"></div>
            <a
              :href="`/posts/${item.slug}`"
              class="block p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
            >
              <div class="text-xs text-slate-400 mb-1">{{ formatDate(item.pubDate) }}</div>
              <div class="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1">
                {{ item.title }}
              </div>
            </a>
          </div>
        </div>
        <a
          href="/archives"
          class="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <span>查看全部时间轴</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'

interface TagItem {
  name: string
  count: number
}

interface ArchiveItem {
  year: string
  month: string
  key: string
  count: number
}

interface CategoryItem {
  name: string
  count: number
}

interface TimelineItem {
  slug: string
  title: string
  pubDate: string
}

interface Props {
  tags: TagItem[]
  archives: ArchiveItem[]
  categories: CategoryItem[]
  timeline: TimelineItem[]
}

const props = defineProps<Props>()

const activeTab = ref('tags')

// 图标组件
const TagIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
      })
    ])
  }
}

const ArchiveIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
      })
    ])
  }
}

const CategoryIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
      })
    ])
  }
}

const TimelineIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  }
}

const tabs = computed(() => [
  { id: 'tags', name: '标签', count: props.tags.length, icon: TagIcon },
  { id: 'archives', name: '归档', count: props.archives.length, icon: ArchiveIcon },
  { id: 'categories', name: '分类', count: props.categories.length, icon: CategoryIcon },
  { id: 'timeline', name: '时间轴', count: props.timeline.length, icon: TimelineIcon },
])

const encodeTag = (tag: string) => {
  return encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))
}

const encodeCategory = (category: string) => {
  return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))
}

const getTagColorClass = (count: number) => {
  if (count >= 10) {
    return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50'
  } else if (count >= 5) {
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
  } else {
    return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
