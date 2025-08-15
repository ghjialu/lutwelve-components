<template>
  <div
    :style="Object.keys(styleData).length ? styleData : ''"
    :class="['card_in', className ? className : '', themeColor]"
  >
    <!-- 默认插槽，可用于插入自定义内容 -->
    <slot></slot>
    <!-- 渲染卡片头部组件，将所有非 prop 属性传递给该组件 -->
    <CardHeader v-bind="$attrs" :themeColor="themeColor">
      <!-- 循环渲染过滤后的卡片头部插槽 -->
      <template #[item] v-for="item in filterCardHeader" :key="item">
        <!-- 动态渲染具名插槽 -->
        <slot :name="item"> </slot>
      </template>
    </CardHeader>
    <!-- 卡片内容容器 -->
    <div class="container-content">
      <!-- 渲染卡片主体组件，将所有非 prop 属性传递给该组件 -->
      <CardBody v-bind="$attrs" :themeColor="themeColor">
        <!-- 循环渲染过滤后的卡片主体插槽 -->
        <template #[item] v-for="item in filterCardBody" :key="item">
          <!-- 动态渲染具名插槽 -->
          <slot :name="item"> </slot>
        </template>
      </CardBody>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // 导入卡片头部组件
  import CardHeader from './CardHeader.vue';
  // 导入卡片主体组件
  import CardBody from './CardBody.vue';
  import { PropType, computed, useSlots } from 'vue';
  import type { CSSProperties } from 'vue';
  // 从当前目录下的 data 文件导入卡片主体和头部的插槽数据以及过滤插槽的方法
  import { cardBodyDate, cardHeaderDate, filterAllowedSlots } from './data';

  // 设置组件选项，不继承父组件的非 prop 属性
  defineOptions({ inheritAttrs: false });

  /**
   * 定义组件的 props
   */
  defineProps({
    // 卡片的额外类名，类型为字符串，默认值为空字符串
    className: {
      type: String,
      default: '',
    },
    // 卡片的样式对象，类型为 CSSProperties，默认值为空对象
    styleData: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    // 深色模式 浅色 大屏等其他主题色
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });

  const slots = useSlots();

  /**
   * 计算属性，用于过滤出允许使用的卡片头部插槽
   * @returns {string[]} 过滤后的卡片头部插槽名称数组
   */
  const filterCardHeader = computed(() => {
    // 调用 filterAllowedSlots 方法，根据卡片头部等其他配置过滤插槽
    return filterAllowedSlots(slots, cardHeaderDate);
  });

  /**
   * 计算属性，用于过滤出允许使用的卡片主体插槽
   * @returns {string[]} 过滤后的卡片主体插槽名称数组
   */
  const filterCardBody = computed(() => {
    // 调用 filterAllowedSlots 方法，根据卡片主体等其他配置过滤插槽
    return filterAllowedSlots(slots, cardBodyDate);
  });
</script>
<style lang="less" scoped>
  /* 卡片基础样式 */
  .card_in {
    width: 100%;
    background-color: #fcfcfc;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    /* 卡片内容容器样式 */
    .container-content {
      flex: 1;
      overflow: hidden;
    }
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
    background-color: transparent;
  }
</style>
