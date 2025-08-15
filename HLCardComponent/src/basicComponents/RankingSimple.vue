<!-- 排行榜 -->
<template>
  <div :class="['item-list', themeColor]" v-if="dataList.length">
    <div
      :key="index"
      :class="['item', indexType ? 'item-t' : '']"
      v-for="(item, index) in dataList"
    >
      <div class="item-index">
        <div v-if="indexType" class="num-index">{{ index + 1 }}</div>
        <div :style="{ paddingLeft: indexType ? '8px' : 0 }" class="label">{{
          item.indexName
        }}</div>
      </div>
      <div class="item-content">
        <div class="value">{{ item.value }}</div>
        <div class="unit">{{ item.unitName }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import type { rankingListType } from './dataType';
  const props = defineProps({
    dataList: {
      type: Array as PropType<rankingListType[]>,
      default: () => [],
    },
    // 是否显示序号
    indexType: {
      type: Boolean,
      default: false,
    },
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });
  console.log('dataList', props);
</script>

<style scoped>
  .item-list {
    width: 100%;
    /* height: 100%; */
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 18px 16px;
      /* cursor: pointer; */
      border-radius: 4px 4px 4px 4px;
      background: #f2f3f5;
      color: #ffffff;

      .item-index {
        flex: 1;
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 14px;
        color: #333333;

        .num-index {
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          background: #999;
          color: #fff;
          border-radius: 10px;
        }

        .label {
          font-weight: 400;
          font-size: 14px;
          width: 120px;
          white-space: nowrap; /* 让文本不换行 */
          overflow: hidden; /* 超出部分隐藏 */
          text-overflow: ellipsis; /* 使用省略号代替超出部分 */
        }
      }

      .item-content {
        flex: 1;
        display: flex;
        align-items: baseline;
        justify-content: end;

        .value {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          display: inline-block;
          max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          /* text-overflow: ellipsis; */
          /* .number-value { */
          /* } */
        }

        .unit {
          font-weight: 400;
          font-size: 14px;
          color: #666666;
          margin-left: 8px;
        }
      }

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        background: rgba(11, 98, 203, 0.08);

        .num-index {
          color: #ffffff;
          background: var(--theme-color);
        }
      }
    }
  }

  .item-t {
    background: rgba(11, 98, 203, 0.08);

    .num-index {
      color: #ffffff;
      background: var(--theme-color);
    }
  }

  .empty-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #999;
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
