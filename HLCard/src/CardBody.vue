<template>
  <div
    :style="bodyStyleDate ? bodyStyleDate : ''"
    :class="['card-body', bodyClassName ? bodyClassName : '', themeColor]"
  >
    <!-- 使用 v-for 指令遍历 cardBodyDate.slots 数组，动态渲染具名插槽 -->
    <template v-for="data in cardBodyDate.slots" :key="data">
      <!-- 渲染对应的具名插槽 -->
      <slot :name="data"> </slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { cardBodyDate } from './data';
  import { PropType } from 'vue';
  import type { CSSProperties } from 'vue';
  // 设置组件选项，不继承父组件的非 prop 属性
  defineOptions({ inheritAttrs: false });
  /**
   * 定义组件的 props
   */
  defineProps({
    // 卡片主体的额外类名，类型为字符串，默认值为空字符串
    bodyClassName: {
      type: String,
      default: '',
    },
    // 卡片主体的样式对象，类型为 CSSProperties，默认值为空对象
    bodyStyleDate: {
      type: Object as PropType<CSSProperties>,
      default: () => {},
    },
    // 深色模式 浅色 大屏等其他主题色
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });
</script>

<style lang="less" scoped>
  .card-body {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 16px;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
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
