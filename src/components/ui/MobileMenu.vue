<template>
  <div>
    <!-- 菜单按钮 -->
    <button
      @click="isOpen = !isOpen"
      class="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
      aria-label="菜单"
    >
      <transition name="rotate" mode="out-in">
        <svg
          v-if="!isOpen"
          key="menu"
          class="w-5 h-5 text-slate-700 dark:text-slate-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          key="close"
          class="w-5 h-5 text-slate-700 dark:text-slate-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </transition>
    </button>

    <!-- 使用 Teleport 将菜单渲染到 body -->
    <Teleport to="body" v-if="isMounted">
      <!-- 遮罩层 -->
      <transition name="fade">
        <div
          v-if="isOpen"
          @click="isOpen = false"
          class="mobile-menu-overlay"
        ></div>
      </transition>

      <!-- 侧边菜单 -->
      <transition name="slide">
        <div
          v-if="isOpen"
          class="mobile-menu-panel"
        >
        <div class="p-6">
          <!-- 头部 -->
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">菜单</h2>
            <button
              @click="isOpen = false"
              class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 搜索框 -->
          <div class="mb-6">
            <SearchBox />
          </div>

          <!-- 导航链接 -->
          <nav class="space-y-2">
            <a
              v-for="item in navigation"
              :key="item.href"
              :href="withBase(item.href)"
              @click="isOpen = false"
              class="flex items-center px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              :class="{ 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400': isActive(item.href) }"
            >
              <span class="font-medium">{{ item.name }}</span>
            </a>
          </nav>

          <!-- 分隔线 -->
          <hr class="my-6 border-slate-200 dark:border-slate-700" />

          <!-- 快捷功能 -->
          <div class="space-y-4">
            <!-- 语言切换 -->
            <div v-if="showLanguageSwitcher" class="space-y-2">
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300">语言 / Language</span>
              <div class="flex flex-wrap gap-2">
                <a
                  v-for="locale in locales"
                  :key="locale.code"
                  :href="getLocalizedUrl(locale.code)"
                  @click="isOpen = false"
                  class="px-3 py-1.5 text-sm rounded-lg transition-colors"
                  :class="[
                    locale.code === currentLocale
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  ]"
                >
                  {{ locale.name }}
                </a>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300">深色模式</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, withDefaults } from 'vue'
import type { NavigationItem } from '@jet-w/astro-blog/types'
import SearchBox from './SearchBox.vue'
import ThemeToggle from './ThemeToggle.vue'

interface LocaleInfo {
  code: string;
  name: string;
}

interface Props {
  navigation: NavigationItem[]
  /** Base URL for the site (e.g., '/jet-w.astro-blog') */
  base?: string
  /** Available locales for language switching */
  locales?: LocaleInfo[]
  /** Current locale code */
  currentLocale?: string
  /** Current page path (without locale prefix and without base) */
  currentPath?: string
  /** Default locale code */
  defaultLocale?: string
  /** Whether to prefix the default locale in URLs */
  prefixDefaultLocale?: boolean
  /** Whether to show language switcher */
  showLanguageSwitcher?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  base: '/',
  locales: () => [],
  currentLocale: '',
  currentPath: '/',
  defaultLocale: 'en',
  prefixDefaultLocale: false,
  showLanguageSwitcher: false,
})

// Helper function to add base URL to paths
function withBase(path: string): string {
  const baseUrl = props.base?.replace(/\/$/, '') || '';
  if (!baseUrl || baseUrl === '') {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedPath === '/') {
    return `${baseUrl}/`;
  }
  return `${baseUrl}${normalizedPath}`;
}

// Get localized URL for language switching
function getLocalizedUrl(targetLocale: string): string {
  let pagePath = props.currentPath;
  if (!pagePath.startsWith('/')) {
    pagePath = '/' + pagePath;
  }

  const baseUrl = props.base?.replace(/\/$/, '') || '';

  let localePrefix = '';
  if (targetLocale !== props.defaultLocale || props.prefixDefaultLocale) {
    localePrefix = `/${targetLocale}`;
  }

  if (pagePath === '/') {
    if (localePrefix) {
      return baseUrl ? `${baseUrl}${localePrefix}/` : `${localePrefix}/`;
    }
    return baseUrl ? `${baseUrl}/` : '/';
  }

  return `${baseUrl}${localePrefix}${pagePath}`;
}
const isOpen = ref(false)
const currentPath = ref('')
const isMounted = ref(false)

const isActive = (href: string) => {
  return currentPath.value === href || (href !== '/' && currentPath.value.startsWith(href))
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  isMounted.value = true
  currentPath.value = window.location.pathname
  document.addEventListener('keydown', handleEscape)

  // 监听路由变化（如果使用客户端路由）
  window.addEventListener('popstate', () => {
    currentPath.value = window.location.pathname
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.2s ease;
}

.rotate-enter-from,
.rotate-leave-to {
  transform: rotate(90deg);
}
</style>

<style>
/* 非 scoped 样式，用于 Teleport 渲染的内容 */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99998;
}

.mobile-menu-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 20rem;
  max-width: 80vw;
  background-color: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 99999;
  overflow-y: auto;
}

.dark .mobile-menu-panel {
  background-color: rgb(15 23 42);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>