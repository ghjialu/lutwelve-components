<template>
  <div :class="['card_empty', themeColor]">
    <img :src="emptyImg" />
    <div class="text-center"> 暂无数据</div>
  </div>
</template>

<script lang="ts" setup>
  import { watch } from 'vue';
  import emptyImg from '../assets/images/table-empty.png';
  const props = defineProps({
    // 主题class
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });
  watch(
    () => props.themeColor,
    () => {
      // 图片动态更改
      console.log('themeColor', props.themeColor);
    },
  );
</script>
<style scoped>
  .card_empty {
    color: #999999;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .text-center {
      margin-top: 8px;
      font-size: 12px;
      text-align: center;
    }
  }

  .Dark {
    color: #ffffff;
    /* padding: 16px 8px 16px 16px; */
    /* height: calc(100% - 50px); */
    /* overflow-y: auto; */
    /* box-sizing: border-box; */
  }

  .light {
    color: #333333;
  }

  .screenColor {
    color: #ffffff;
    background: transparent;
  }
</style>
