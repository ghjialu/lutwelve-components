<template>
  <div :class="['pie-plus', themeColor]">
    <!-- 渲染 HLCard 组件，将所有非 prop 属性传递给该组件 -->
    <HLCard v-bind="$attrs" :themeColor="themeColor">
      <template #[item] v-for="item in filtersSlots">
        <!-- 动态渲染具名插槽 -->
        <slot :name="item"></slot>
      </template>
      <!-- 渲染卡片主体顶部内容 -->
      <template #bodyTop>
        <HorizontaSmallSquare
          v-if="!empty && topList.length"
          :themeColor="themeColor"
          :dataList="topList"
        />
      </template>
      <!-- 渲染卡片主体底部内容 -->
      <template #bodyBottom>
        <Loading v-if="loading" :themeColor="themeColor" />
        <PieEcharts
          v-else-if="!empty"
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
  import type { HorizonListType, pieDataListType } from '../../dataType';
  import { HLCard } from '../../../../HLCard';
  import PieEcharts from '../../charts/pie/PieEcharts.vue';
  import HorizontaSmallSquare from '../../basicComponents/HorizontaSmallSquare.vue';
  import Empty from '../../basicComponents/Empty.vue';
  import Loading from '../../basicComponents/Loading.vue';
  // 从 hooks 导入过滤插槽的方法
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
    // 底部数据列表，类型为 pieDataListType 数组，默认值为空数组
    // 注意：此处原代码存在拼写错误 tyepe，应改为 type
    bottomList: {
      type: Array as PropType<pieDataListType[]>,
      default: () => [],
    },
    // 数据是否为空，类型为布尔值，默认值为 false
    empty: {
      type: Boolean as PropType<boolean>,
      default: () => false,
    },
    // 是否处于加载状态，类型为布尔值，默认值为 false
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
  .pie-plus {
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
