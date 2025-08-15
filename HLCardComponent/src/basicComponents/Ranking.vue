<!-- 排行榜(带img) -->
<template>
  <div :class="['ranking', className ? className : '', themeColor]">
    <div class="item-list">
      <div
        :key="index"
        @click="clickFlags ? setItem(item, index) : ''"
        :class="{
          item: true,
          activeItem: clickFlags && index === setIndex,
          hoverItem: clickFlags,
        }"
        v-for="(item, index) in props.dataList"
      >
        <div class="top-title">
          <div class="item-index">
            <!-- 添加背景图片 1234  设备用电时且时间为日才有点击、悬停效果 -->
            <div class="num-index">{{ index + 1 }}</div>
            <div class="label">{{ item.indexName }}</div>
          </div>
          <div class="item-content">
            <div class="value">{{ item.value || '-' }}</div>
            <div class="unit">{{ item.unitName }}</div>
          </div>
        </div>
        <div :class="['bar-box', index < 3 ? 'abar-box' : '']">
          <div
            :style="{ width: getWidth(index) }"
            :class="['bar-conter', index < 3 ? 'abar-conter' : '']"
          ></div>
        </div>
        <img class="img_box" v-if="clickFlags && index === setIndex" :src="enImg" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch, PropType } from 'vue';
  import enImg from '../assets/images/active_r.png';
  import type { rankingListType } from './dataType';
  const props = defineProps({
    className: {
      type: String,
      default: 'ranking',
    },
    dataList: {
      type: Array as PropType<rankingListType[]>,
      default: () => [],
    },
    // 是否点击联动
    clickFlags: {
      type: Boolean,
      default: true,
    },
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });
  const setIndex = ref<null | number>(null);
  const itemVal = ref<any>('');
  const emit = defineEmits(['setItem']);
  function setItem(item: rankingListType, index: number) {
    console.log('item', item);
    if (props.clickFlags) {
      itemVal.value = item.indexName;
      setIndex.value = index;
      emit('setItem', { value: itemVal.value });
    }
  }
  function getWidth(index: number) {
    const lengthN = props.dataList.length;
    if (lengthN > 0) {
      const setupN = Math.floor(100 / lengthN);
      const widthN = Math.floor(setupN * (lengthN - index));
      return `${widthN}%`;
    } else {
      return '100%';
    }
  }

  async function getTimeList() {}

  watch(
    () => props.dataList,
    async (val) => {
      setIndex.value = null;
      console.log('ranking123', val);
      // await getData();
    },
  );

  getTimeList();
</script>
<style scoped>
  /* Variables from ../styles/variables.less */
  /* @theme-color-88p has been replaced with rgba(11, 98, 203, 0.88) */
  .ranking {
    /* height: 100%; */
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .ranking .item-list {
    width: 100%;
    /* height: 100%; */
    /* overflow-y: auto; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;

      .activeItem {
          position: relative;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid rgba(11, 98, 203, 0.88) !important;
        }

        .activeItem .img_box {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 0;
          bottom: 0;
        }

        .hoverItem {
          cursor: pointer;
        }

        .hoverItem:hover {
          border: 1px solid rgba(11, 98, 203, 0.88);
        }

      .item {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 16px;
        border: 1px solid #d9d9d9;
        border-radius: 4px 4px 4px 4px;
        color: #ffffff;

        .top-title {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bar-box {
          width: 100%;
          margin-top: 12px;
          height: 12px;
          background: #eeeff1;
          border-radius: 4px 4px 4px 4px;

          .bar-conter {
            height: 12px;
            background: #999999;
            border-radius: 4px 4px 4px 4px;
          }

          .abar-conter {
            height: 12px;
            background: rgba(11, 98, 203, 0.88);
            border-radius: 4px 4px 4px 4px;
          }
        }

        .abar-box {
          background: rgba(11, 98, 203, 0.16);
        }

        .item-index {
          flex: 1;
          display: flex;
          align-items: center;
          font-weight: 400;
          font-size: 14px;
          color: #333333;
        }

        .item-index .num-index {
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          /* background: #999; */
          color: #ffffff;
          /* border-radius: 10px; */

          .label {
            padding-left: 8px;
            font-weight: 400;
            font-size: 14px;
            line-height: 14px;
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

        .num-index {
          color: #ffffff;
          background: url('/@zhcz/assets/images/item_fo.png') no-repeat center;
          background-size: 100% 100%;
        }

        .item:nth-child(1) .num-index {
          /* color: #ffffff; */
          /* background: var(--theme-color); */
          background: url('/@zhcz/assets/images/item_o.png') no-repeat center;
          background-size: 100% 100%;
        }

        .item:nth-child(2) .num-index {
          color: #ffffff;
          /* background: var(--theme-color); */
          background: url('/@zhcz/assets/images/item_tw.png') no-repeat center;
          background-size: 100% 100%;
        }

        .item:nth-child(3) .num-index {
          color: #ffffff;
          /* background: var(--theme-color); */
          background: url('/@zhcz/assets/images/item_th.png') no-repeat center;
          background-size: 100% 100%;
        }
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
