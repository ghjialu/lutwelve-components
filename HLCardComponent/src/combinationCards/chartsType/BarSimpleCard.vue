<template>
  <div :class="['bar-simple', themeColor]">
    <!-- 渲染 HLCard 组件，并将所有非 prop 属性绑定到该组件上 -->
    <HLCard v-bind="$attrs" :themeColor="themeColor">
      <!-- 循环渲染过滤后的插槽 -->
      <template #[item] v-for="item in filtersSlots">
        <!-- 动态渲染具名插槽 -->
        <slot :name="item"></slot>
      </template>
      <!-- 渲染卡片默认主体内容 -->
      <template #defaultBody>
        <Loading v-if="loading" :themeColor="themeColor" />
        <BarEcharts
          v-else-if="!empty"
          v-bind="$attrs"
          :themeColor="themeColor"
          :dataList="bottomList"
        />
        <Empty v-else :themeColor="themeColor" />
      </template>
    </HLCard>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import type { echartsListType } from '../../dataType';
  import { HLCard } from '../../../../HLCard';
  import BarEcharts from '../../charts/bar/BarEcharts.vue';
  import Empty from '../../basicComponents/Empty.vue';
  import Loading from '../../basicComponents/Loading.vue';
  import { useFilterSlots } from '../../hooks';

  // 设置组件选项，不继承父组件的非 prop 属性
  defineOptions({ inheritAttrs: false });

  /**
   * 定义组件的 props
   */
  defineProps({
    // 底部数据列表，类型为 echartsListType 数组，默认值为空数组
    bottomList: {
      type: Array as PropType<echartsListType[]>,
      default: () => [],
    },
    //  数据是否为空 类型为布尔值，默认值为 true
    empty: {
      type: Boolean as PropType<boolean>,
      default: () => false,
    },
    // 是否显示加载组件，类型为布尔值，默认值为 false
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
  .bar-simple {
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
