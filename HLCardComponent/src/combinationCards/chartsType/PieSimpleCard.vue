<template>
  <div :class="['pie-simple', themeColor]">
    <!-- 渲染 HLCard 组件，将父组件中非 prop 属性传递给 HLCard 组件 -->
    <HLCard v-bind="$attrs" :themeColor="themeColor">
      <template #[item] v-for="item in filtersSlots">
        <!-- 动态渲染对应的具名插槽 -->
        <slot :name="item"></slot>
      </template>
      <!-- 渲染卡片的默认主体内容 -->
      <template #defaultBody>
        <Loading v-if="loading" :themeColor="themeColor" />
        <PieEcharts
          v-else-if="!empty"
          :themeColor="themeColor"
          v-bind="$attrs"
          :dataList="bottomList"
        />
        <Empty v-else :themeColor="themeColor" />
      </template>
    </HLCard>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, watch } from 'vue';
  import type { HorizonListType, pieDataListType } from '../../dataType';
  import { HLCard } from '../../../../HLCard';
  import PieEcharts from '../../charts/pie/PieEcharts.vue';
  import Empty from '../../basicComponents/Empty.vue';
  import Loading from '../../basicComponents/Loading.vue';
  // 从 hooks 导入过滤插槽的方法
  import { useFilterSlots } from '../../hooks';

  // 设置组件选项，不继承父组件的非 prop 属性
  defineOptions({ inheritAttrs: false });

  /**
   * 定义组件的 props
   */
  const props = defineProps({
    // 顶部数据列表，类型为 HorizonListType 数组，默认值为空数组
    topList: {
      type: Array as PropType<HorizonListType[]>,
      default: () => [],
    },
    // 底部数据列表，类型为 pieDataListType 数组，默认值为空数组
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
  watch(
    () => props.bottomList,
    () => {
      console.log('bottomList', props.bottomList);
    },
  );
  const { filtersSlots } = useFilterSlots();
</script>
<style lang="less" scoped>
  .pie-simple {
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
