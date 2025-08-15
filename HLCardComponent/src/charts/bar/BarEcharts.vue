<template>
  <div style="height: 100%; width: 100%; flex: 1">
    <div ref="chartRef" style="height: 100%; width: 100%"></div>
  </div>
</template>
<script setup lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import { ref, watch, PropType } from 'vue';
  import { echartsListType } from '../../dataType';
  import { optionFormate } from './data';
  const props = defineProps({
    dataList: {
      type: Array as PropType<echartsListType[]>,
      default: () => [],
    },
    stack: {
      type: String, // 堆叠类型
      default: '',
    },
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });

  const chartRef = ref<any>(null);
  const { setOptions } = useECharts(chartRef);
  function handleSetVisitChart() {
    if (props.dataList instanceof Array && props.dataList.length) {
      // 颜色模式
      // if (props.themeColor) {
      // } else {
      // }
      setOptions(optionFormate(props) as any);
    }
  }

  watch(
    () => props.dataList,
    () => {
      handleSetVisitChart();
    },
    { immediate: true },
  );
</script>
<style lang="less" scoped></style>
