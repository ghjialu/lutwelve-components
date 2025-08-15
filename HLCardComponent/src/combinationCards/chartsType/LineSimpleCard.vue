<template>
  <div :class="['line-simple', themeColor]">
    <HLCard v-bind="$attrs" :themeColor="themeColor">
      <template #[item] v-for="item in filtersSlots">
        <!-- 动态渲染具名插槽，插槽名称由循环项决定 -->
        <slot :name="item"></slot>
      </template>
      <!-- 渲染卡片的默认主体内容 -->
      <template #defaultBody>
        <Loading v-if="loading" :themeColor="themeColor" />
        <LineEcharts
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
  import LineEcharts from '../../charts/line/lineEcharts.vue';
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
    // 数据是否为空，类型为布尔值，默认值为 false
    empty: {
      type: Boolean as PropType<boolean>,
      default: false,
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
  .line-simple {
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
