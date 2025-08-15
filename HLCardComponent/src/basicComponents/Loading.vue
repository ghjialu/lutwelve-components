<template>
  <div :class="['card_loading', themeColor]">
    <Loading3QuartersOutlined
      style="font-size: 24px; color: var(--theme-color); margin: 0 auto; display: block"
      spin
    />
  </div>
</template>

<script lang="ts" setup>
  import { Loading3QuartersOutlined } from '@ant-design/icons-vue';
  defineProps({
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });
</script>
<style scoped>
  .card_loading {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
