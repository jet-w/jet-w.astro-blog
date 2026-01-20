<template>
  <div ref="mermaidContainer" class="mermaid-container"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import mermaid from 'mermaid'

const props = defineProps({
  chart: {
    type: String,
    required: true
  }
})

const mermaidContainer = ref()

// 配置mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif'
})

const renderChart = async () => {
  if (!mermaidContainer.value) return

  try {
    // 清空容器
    mermaidContainer.value.innerHTML = ''

    // 生成唯一ID
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

    // 渲染图表
    const { svg } = await mermaid.render(id, props.chart)
    mermaidContainer.value.innerHTML = svg
  } catch (error) {
    console.error('Mermaid rendering error:', error)
    mermaidContainer.value.innerHTML = `
      <div class="text-red-600 border border-red-300 rounded p-4">
        <h4 class="font-semibold">Mermaid渲染错误</h4>
        <pre class="text-sm mt-2">${error.message}</pre>
      </div>
    `
  }
}

onMounted(() => {
  renderChart()
})

// 监听chart属性变化
watch(() => props.chart, () => {
  renderChart()
})
</script>

<style scoped>
.mermaid-container {
  @apply flex justify-center my-4;
}

.mermaid-container :deep(svg) {
  @apply max-w-full h-auto;
}

/* 深色主题适配 */
.dark .mermaid-container :deep(svg) {
  @apply invert;
}
</style>