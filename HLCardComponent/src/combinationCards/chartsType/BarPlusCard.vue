<template>
  <div :class="['bar-plus', themeColor]">
    <!-- 渲染 HLCard 组件，并将所有非 prop 属性绑定到该组件上 -->
    <HLCard v-bind="$attrs" :themeColor="themeColor">
      <!-- 循环渲染过滤后的插槽 -->
      <template #[item] v-for="item in filtersSlots">
        <!-- 动态渲染具名插槽 -->
        <slot :name="item"></slot>
      </template>
      <!-- 渲染卡片主体顶部内容，使用 HorizontaSmallSquare 组件并传入 topList 数据 -->
      <template #bodyTop>
        <HorizontaSmallSquare
          v-if="!empty && topList.length"
          :themeColor="themeColor"
          :dataList="topList"
      /></template>
      <!-- 渲染卡片主体底部内容 -->
      <template #bodyBottom>
        <Loading v-if="loading" :themeColor="themeColor" />
        <BarEcharts
          v-else-if="!empty && bottomList.length"
          v-bind="$attrs"
          :themeColor="themeColor"
          :dataList="bottomList"
        />
        <Empty :themeColor="themeColor" v-else />
      </template>
    </HLCard>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import type { echartsListType, HorizonListType } from '../../dataType';
  import { HLCard } from '../../../../HLCard';

  import BarEcharts from '../../charts/bar/BarEcharts.vue';
  import Empty from '../../basicComponents/Empty.vue';
  import Loading from '../../basicComponents/Loading.vue';
  import HorizontaSmallSquare from '../../basicComponents/HorizontaSmallSquare.vue';
  import { useFilterSlots } from '../../hooks';
  // 设置组件选项，不继承父组件的非 prop 属性
  defineOptions({ inheritAttrs: false });
  defineProps({
    // 顶部数据列表，类型为 HorizonListType 数组，默认值为空数组
    topList: {
      type: Array as PropType<HorizonListType[]>,
      default: () => [
        {
          indexName: '',
          indexCode: '',
          unitName: '',
          value: '',
        },
      ],
    },
    // 底部数据列表，类型为 echartsListType 数组，默认值为空数组
    bottomList: {
      type: Array as PropType<echartsListType[]>,
      default: () => [],
    },
    //  数据是否为空 默认值为 false
    empty: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 是否显示 Loading 组件，类型为布尔值，默认值为 false
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 颜色模式
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });
  const { filtersSlots } = useFilterSlots();
</script>
<style lang="less" scoped>
  .bar-plus {
    width: 100%;
    height: 100%;
  }

  .Dark {
    color: #ffffff;
    // padding: 16px 8px 16px 16px;
    // height: calc(100% - 50px);
    // overflow-y: auto;
    // box-sizing: border-box;
  }

  .light {
    color: #333333;
  }

  .screenColor {
    color: #ffffff;
    background: transparent;
  }
</style>
