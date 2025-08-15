<template>
  <div :class="['line-plus', themeColor]">
    <!-- 渲染 HLCard 组件，将所有非 prop 属性传递给该组件 -->
    <HLCard v-bind="$attrs" :themeColor="themeColor">
      <template #[item] v-for="item in filtersSlots">
        <!-- 动态渲染具名插槽 -->
        <slot :name="item"></slot>
      </template>
      <template #bodyTop>
        <HorizontaSmallSquare
          v-bind="$attrs"
          v-if="!empty && topList.length"
          :themeColor="themeColor"
          :dataList="topList"
        />
      </template>
      <!-- 渲染卡片主体底部内容 -->
      <template #bodyBottom>
        <!-- 当 loading 为 true 时，显示加载状态组件 -->
        <Loading v-if="loading" :themeColor="themeColor" />
        <LineEcharts
          v-else-if="!empty"
          v-bind="$attrs"
          :themeColor="themeColor"
          :dataList="bottomList"
        />
        <!-- 当 loading 和 empty 都为 false 时，显示空状态组件 -->
        <Empty v-else :themeColor="themeColor" />
      </template>
    </HLCard>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import type { echartsListType, HorizonListType } from '../../dataType';
  import { HLCard } from '../../../../HLCard';
  import LineEcharts from '../../charts/line/lineEcharts.vue';
  import Empty from '../../basicComponents/Empty.vue';
  import Loading from '../../basicComponents/Loading.vue';
  import HorizontaSmallSquare from '../../basicComponents/HorizontaSmallSquare.vue';
  import { useFilterSlots } from '../../hooks';
  // 设置组件选项，不继承父组件的非 prop 属性
  defineOptions({ inheritAttrs: false });

  /**
   * 定义组件的 props
   */
  defineProps({
    // 顶部数据列表，类型为 HorizonListType 数组，默认值为空数组
    topList: {
      type: Array as PropType<HorizonListType[]>,
      default: () => [],
    },
    // 底部数据列表，类型为 echartsListType 数组，默认值为空数组
    bottomList: {
      type: Array as PropType<echartsListType[]>,
      default: () => [],
    },
    //  数据是否为空 默认值为 false ，类型为布尔值
    empty: {
      type: Boolean as PropType<boolean>,
      default: () => false,
    },
    // 是否显示加载状态组件，类型为布尔值，默认值为 false
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
  .line-plus {
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
