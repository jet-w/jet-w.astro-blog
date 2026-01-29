<template>
  <div class="fixed top-24 right-4 z-40">
    <!-- 触发按钮 -->
    <div
      class="relative"
      @mouseenter="showToc = true"
      @mouseleave="showToc = false"
    >
      <button
        class="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        :class="{ 'bg-primary-50 dark:bg-primary-900/30': showToc }"
        :aria-label="tocTitle"
      >
        <svg class="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>

      <!-- 目录面板 -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-x-2"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-2"
      >
        <div
          v-if="showToc && headings.length > 0"
          class="absolute top-0 right-14 w-72 max-h-[70vh] bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <!-- 标题 -->
          <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {{ tocTitle }}
            </h3>
          </div>

          <!-- 目录列表 -->
          <nav class="p-3 overflow-y-auto max-h-[calc(70vh-50px)]">
            <ul class="space-y-1">
              <li
                v-for="heading in headings"
                :key="heading.id"
                :class="getIndentClass(heading.level)"
              >
                <a
                  :href="`#${heading.id}`"
                  @click.prevent="scrollToHeading(heading.id)"
                  class="block px-3 py-2 text-sm rounded-lg transition-colors"
                  :class="[
                    activeId === heading.id
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
                  ]"
                >
                  <span class="line-clamp-2">{{ heading.text }}</span>
                </a>
              </li>
            </ul>
          </nav>

          <!-- 进度条 -->
          <div class="px-4 py-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>{{ progressTitle }}</span>
              <span>{{ Math.round(progress * 100) }}%</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
              <div
                class="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                :style="{ width: `${progress * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Heading {
  id: string
  text: string
  level: number
}

const props = withDefaults(defineProps<{
  tocTitle?: string
  progressTitle?: string
}>(), {
  tocTitle: 'Table of Contents',
  progressTitle: 'Reading Progress',
})

const showToc = ref(false)
const headings = ref<Heading[]>([])
const activeId = ref('')
const progress = ref(0)

// 获取缩进样式
function getIndentClass(level: number): string {
  switch (level) {
    case 2: return 'pl-0'
    case 3: return 'pl-3'
    case 4: return 'pl-6'
    default: return 'pl-0'
  }
}

// 滚动到指定标题
function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const offsetTop = element.offsetTop - 100
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

// 提取页面标题（只提取文章内容区域中有 id 的标题）
function extractHeadings() {
  // 只选择 article 内有 id 属性的标题
  const articleHeadings = document.querySelectorAll('article h2[id], article h3[id], article h4[id]')
  headings.value = Array.from(articleHeadings)
    .filter((heading) => heading.id) // 确保有 id
    .map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1))
    }))
}

// 更新当前激活的标题
function updateActiveHeading() {
  const articleHeadings = document.querySelectorAll('article h2[id], article h3[id], article h4[id]')
  let current = ''

  articleHeadings.forEach((heading) => {
    if (!heading.id) return
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 120) {
      current = heading.id
    }
  })

  activeId.value = current
}

// 更新阅读进度
function updateProgress() {
  const article = document.querySelector('article')
  if (!article) return

  const articleTop = article.offsetTop
  const articleHeight = article.offsetHeight
  const windowTop = window.pageYOffset
  const windowHeight = window.innerHeight

  progress.value = Math.min(
    Math.max((windowTop - articleTop + windowHeight / 2) / articleHeight, 0),
    1
  )
}

// 滚动处理
let ticking = false
function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveHeading()
      updateProgress()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  extractHeadings()
  updateActiveHeading()
  updateProgress()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
