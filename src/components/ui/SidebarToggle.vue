<template>
  <button
    @click="toggleSidebar"
    :title="isCollapsed ? '显示侧边栏' : '隐藏侧边栏'"
    class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400"
  >
    <svg
      class="w-4 h-4 transition-transform duration-200"
      :class="{ 'rotate-180': isCollapsed }"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const isCollapsed = ref(false);

// 从localStorage恢复状态
onMounted(() => {
  setTimeout(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved) {
      isCollapsed.value = JSON.parse(saved);
    }
    applySidebarState();
  }, 100);
});

// 监听状态变化
watch(isCollapsed, (newValue) => {
  localStorage.setItem('sidebar-collapsed', JSON.stringify(newValue));
  applySidebarState();
});

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}

function applySidebarState() {
  if (isCollapsed.value) {
    document.body.classList.add('sidebar-collapsed');
  } else {
    document.body.classList.remove('sidebar-collapsed');
  }
}
</script>