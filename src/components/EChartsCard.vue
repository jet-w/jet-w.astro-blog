<template>
  <div ref="chartContainer" :style="containerStyle" class="echarts-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  // 图表配置项
  option: {
    type: Object,
    required: true
  },
  // 图表宽度
  width: {
    type: String,
    default: '100%'
  },
  // 图表高度
  height: {
    type: String,
    default: '400px'
  },
  // 主题：'light' | 'dark'
  theme: {
    type: String,
    default: 'light'
  },
  // 是否自动调整大小
  autoResize: {
    type: Boolean,
    default: true
  }
})

const chartContainer = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const containerStyle = computed(() => ({
  width: props.width,
  height: props.height
}))

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) {
    console.error('[ECharts] Container not found')
    return
  }

  // 如果已存在实例，先销毁
  if (chartInstance) {
    chartInstance.dispose()
  }

  try {
    // 创建新实例
    chartInstance = echarts.init(chartContainer.value, props.theme)
    chartInstance.setOption(props.option)
    console.log('[ECharts] Chart initialized successfully')
  } catch (error) {
    console.error('[ECharts] Error initializing chart:', error)
  }
}

// 更新图表配置
const updateChart = () => {
  if (chartInstance) {
    chartInstance.setOption(props.option, true)
  }
}

// 调整图表大小
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(async () => {
  await nextTick()
  initChart()

  if (props.autoResize) {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (props.autoResize) {
    window.removeEventListener('resize', handleResize)
  }

  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

// 监听配置变化
watch(() => props.option, updateChart, { deep: true })

// 监听主题变化
watch(() => props.theme, initChart)

// 暴露方法供外部调用
defineExpose({
  getInstance: () => chartInstance,
  resize: handleResize
})
</script>

<style scoped>
.echarts-container {
  min-height: 200px;
}
</style>
