<template>
  <div
    :style="headerStyleDate ? headerStyleDate : ''"
    :class="[
      'base-header',
      { 'base-header_line': line },
      headerClassName ? headerClassName : '',
      themeColor,
    ]"
  >
    <!-- 左侧内容容器 -->
    <div class="header_left">
      <!-- 左侧内容前的插槽，可自定义内容 -->
      <slot name="headerLeftBefore"> </slot>
      <!-- 显示卡片标题，若 title 存在 -->
      <span class="text" v-if="title">
        {{ title }}
      </span>
      <!-- 左侧内容后的插槽，可自定义内容 -->
      <slot name="headerLeftAfter"> </slot>
    </div>
    <!-- 右侧内容插槽，可自定义内容 -->
    <slot name="headerRight"> </slot>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import type { CSSProperties } from 'vue';

  // 设置组件选项，不继承父组件的非 prop 属性
  defineOptions({ inheritAttrs: false });

  /**
   * 定义组件的 props
   */
  defineProps({
    // 卡片标题，类型为字符串
    title: {
      type: String,
    },
    // 是否显示底部分割线，类型为布尔值，默认显示
    line: {
      type: Boolean,
      default: true,
    },
    // 卡片头部的样式对象，类型为 CSSProperties，默认值为空对象
    headerStyleDate: {
      type: Object as PropType<CSSProperties>,
      default: () => {},
    },
    // 卡片头部的额外类名，类型为字符串，默认值为空字符串
    headerClassName: {
      type: String,
      default: '',
    },
    // 深色模式 浅色 大屏等其他主题色
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });
</script>

<style lang="less" scoped>
  .base-header {
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: #333333;
    min-height: 48px;
    justify-content: space-between;

    /* 底部分割线样式 */
    &_line {
      border-bottom: 1px solid #e9e9e9;
    }

    /* 左侧内容容器样式 */
    .header_left {
      display: flex;
      /* gap: 0 16px; */
      align-items: center;
    }

    /* 标题文本样式 */
    .text {
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
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
    background: transparent;
  }
</style>
