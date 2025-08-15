import { ref, Ref, nextTick, unref, computed } from 'vue'
import type { EChartsOption } from 'echarts'
import { useTimeoutFn } from '@vueuse/core'
import * as echarts from 'echarts'

export interface UseEChartsContext {
  setOptions: (options: EChartsOption, clear?: boolean) => void
  getInstance: () => echarts.ECharts | undefined
  resize: () => void
  dispose: () => void
}

export function useECharts(elRef: Ref<HTMLDivElement | undefined>): UseEChartsContext {
  const chartInstance = ref<echarts.ECharts>()
  
  const getOptions = computed(() => {
    return {
      backgroundColor: 'transparent',
    }
  })

  function initCharts(t = 0) {
    const { start } = useTimeoutFn(() => {
      const el = unref(elRef)
      if (!el) return
      
      chartInstance.value = echarts.init(el)
    }, t)
    start()
  }

  function setOptions(options: EChartsOption, clear = true) {
    if (!chartInstance.value) {
      initCharts(30)
      return
    }
    clear && chartInstance.value?.clear()
    chartInstance.value?.setOption(unref(options))
  }

  function resize() {
    chartInstance.value?.resize()
  }

  function getInstance(): echarts.ECharts | undefined {
    if (!chartInstance.value) {
      initCharts()
    }
    return chartInstance.value
  }

  function dispose() {
    if (!chartInstance.value) return
    chartInstance.value.dispose()
    chartInstance.value = undefined
  }

  nextTick(() => {
    initCharts()
  })

  return {
    setOptions,
    getInstance,
    resize,
    dispose,
  }
}