<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-label="ariaLabel"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <span>{{ currentLocaleName }}</span>
      <svg
        class="w-3 h-3 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none z-50"
        role="listbox"
        :aria-label="listLabel"
      >
        <div class="py-1">
          <a
            v-for="locale in locales"
            :key="locale.code"
            :href="getLocalizedUrl(locale.code)"
            class="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
            :class="[
              locale.code === currentLocale
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
            role="option"
            :aria-selected="locale.code === currentLocale"
            @click="closeDropdown"
          >
            <span
              v-if="locale.code === currentLocale"
              class="w-4 h-4 flex items-center justify-center"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span v-else class="w-4 h-4" />
            <span>{{ locale.name }}</span>
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface LocaleInfo {
  code: string;
  name: string;
}

interface Props {
  /** Available locales */
  locales: LocaleInfo[];
  /** Current locale code */
  currentLocale: string;
  /** Current page path (without locale prefix) */
  currentPath: string;
  /** Default locale code */
  defaultLocale: string;
  /** Whether to prefix the default locale in URLs */
  prefixDefaultLocale?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  prefixDefaultLocale: false,
});

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const currentLocaleName = computed(() => {
  const locale = props.locales.find((l) => l.code === props.currentLocale);
  return locale?.name || props.currentLocale;
});

const ariaLabel = computed(() => {
  return `Select language, current: ${currentLocaleName.value}`;
});

const listLabel = computed(() => {
  return 'Available languages';
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function getLocalizedUrl(targetLocale: string): string {
  // Normalize the path
  let basePath = props.currentPath;
  if (!basePath.startsWith('/')) {
    basePath = '/' + basePath;
  }

  // If target is default locale and prefix is not required
  if (targetLocale === props.defaultLocale && !props.prefixDefaultLocale) {
    return basePath === '/' ? '/' : basePath;
  }

  // Add locale prefix
  if (basePath === '/') {
    return `/${targetLocale}`;
  }

  return `/${targetLocale}${basePath}`;
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
}

// Close dropdown on escape key
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeyDown);
});
</script>
