<template>
  <div :class="['ranking-plus', themeColor]">
    <!-- 渲染 HLCard 组件，将所有非 prop 属性传递给该组件 -->
    <HLCard v-bind="$attrs" :themeColor="themeColor">
      <template #[item] v-for="item in filtersSlots">
        <!-- 动态渲染具名插槽 -->
        <slot :name="item"></slot>
      </template>
      <!-- 渲染卡片默认主体内容 -->
      <template #defaultBody>
        <Loading v-if="loading" :themeColor="themeColor" />
        <Ranking
          @setItem="setItem"
          v-else-if="!empty"
          :themeColor="themeColor"
          v-bind="$attrs"
          :dataList="bottomList"
          :clickFlags="clickFlags"
        />
        <Empty v-else :themeColor="themeColor" />
      </template>
    </HLCard>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { HLCard } from '../../../../HLCard';
  import Ranking from '../../basicComponents/Ranking.vue';
  import Empty from '../../basicComponents/Empty.vue';
  import Loading from '../../basicComponents/Loading.vue';
  import type { pieDataListType } from '../../dataType';
  import { useFilterSlots } from '../../hooks';

  // 设置组件选项，不继承父组件的非 prop 属性
  defineOptions({ inheritAttrs: false });

  /**
   * 定义组件的 props
   */
  defineProps({
    // 底部排名数据列表，类型为 pieDataListType 数组，默认值为空数组
    bottomList: {
      type: Array as PropType<pieDataListType[]>,
      default: () => [],
    },
    // 数据是否为空 默认值为 false
    empty: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 点击标志位，控制排名项点击行为，类型为布尔值，默认值为 false
    clickFlags: {
      type: Boolean as PropType<boolean>,
      default: false,
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

  // 定义组件触发的事件
  const emit = defineEmits(['ranking']);

  /**
   * 当排名项被点击时触发，用于向外传递被点击的排名项数据
   * @param {pieDataListType} item - 被点击的排名项数据
   */
  const setItem = (item: pieDataListType) => {
    // 触发 ranking 事件并传递被点击的排名项数据
    emit('ranking', item);
  };
  const { filtersSlots } = useFilterSlots();
</script>

<style lang="less" scoped>
  .ranking-plus {
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
