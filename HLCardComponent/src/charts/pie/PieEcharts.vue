<template>
  <div ref="wrapperRef" style="height: 100%; width: 100%; flex: 1">
    <div ref="chartRef" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script setup lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import { ref, PropType, watch, nextTick } from 'vue';
  import { useResizeObserver } from '@vueuse/core';
  import { dataListType, optionFormate } from './data';
  const chartRef = ref<HTMLDivElement>();
  const wrapperRef = ref<HTMLDivElement>();
  // 会立即执行
  let chartWidth = ref(0);
  let chartHeight = ref(0);
  useResizeObserver(wrapperRef, (entries) => {
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    chartWidth.value = width;
    chartHeight.value = height;
  });
  const props = defineProps({
    dataList: {
      type: Array as PropType<dataListType[]>,
      default: () => [],
    },
    // 图例num宽度
    legendNumWidth: {
      type: Number,
      default: 0,
    },
    // 饼图标题
    titleText: {
      type: String,
      default: '',
    },
    // 饼图类型
    pieType: {
      type: String, // vertical || horizontal
      default: 'horizontal',
    },
    // 是否展示图例中的总价标签
    tagFlag: {
      type: Boolean, // true || false
      default: false,
    },
    // 价格列表
    priceList: {
      type: Array as PropType<{ label: string; value: number; remarks: number; unit: string }[]>,
      default: () => [],
    },
    // 颜色模式
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });

  const { setOptions } = useECharts(chartRef);
  async function handleSetVisitChart() {
    if (props.dataList instanceof Array && props.dataList.length) {
      await nextTick();
      // 深色模式
      // if (props.themeColor === 'Dark') {
      // } else if(){
      // }
      setOptions(optionFormate(props, chartHeight.value, chartWidth.value) as any);
    }
  }

  watch(
    () => props.dataList,
    (val) => {
      if (val instanceof Array && val.length) {
        handleSetVisitChart();
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );
</script>

<style lang="less" scoped></style>
