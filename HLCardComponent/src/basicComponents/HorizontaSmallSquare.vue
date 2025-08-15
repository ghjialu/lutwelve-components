<!-- 横向小方块 -->
<template>
  <div :class="['horizonta-small-square', className ? className : '', themeColor]">
    <div class="total-list">
      <div class="item" v-for="(item, index) in dataList" :key="index">
        <div :class="['content', classType ? 'content-column' : '']">
          <div :class="['name', nameBefore ? `beforecor_${index}` : '']">
            {{ item.indexName }}
          </div>
          <div :class="['value', pleftType ? `value_pleft` : '']">
            <div class="number-value" v-if="item.value === null" style="font-weight: 400">-</div>
            <Tooltip @mouseenter="showTooltip" v-else>
              <template #title>{{ item.value }}{{ item.unitName }}</template>
              <div class="number-value" :style="{ color: item.color ? item.color : 'unset' }">
                {{ item.value ? item.value : '' }}
              </div>
            </Tooltip>
            <span class="unit" v-if="item.value !== null">{{ item.unitName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {
    watch,
    // computed,
    onMounted,
    onUnmounted,
    onActivated,
    onDeactivated,
    PropType,
  } from 'vue';
  import { useIntervalFn } from '@vueuse/core';
  import { Tooltip } from 'ant-design-vue';
  // import { horizontaSmallSquareData } from '../data';
  import type { HorizonListType } from '../dataType';

  const props = defineProps({
    className: {
      type: String,
      default: 'horizonta-small-square',
    },
    pleftType: {
      type: Boolean, // value是否有左内间距
      default: false,
    },
    classType: {
      type: Boolean, // value name是否有换行
      default: false,
    },
    nameBefore: {
      // name 左边是否有小圆圈
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Array as PropType<HorizonListType[]>,
      default: () => [],
    },
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });

  function showTooltip(e: MouseEvent) {
    if (e.target instanceof HTMLElement && e.target.clientWidth >= e.target.scrollWidth) {
      e.target.style.pointerEvents = 'none';
    }
  }
  async function getIndicatorList() {}

  const { pause, resume } = useIntervalFn(getIndicatorList, 60 * 1000);
  // const userStore = useUserStore();
  // const token = computed(() => userStore.getToken);
  watch(
    () => props.dataList,
    (newVal) => {
      if (!newVal) {
        pause();
      }
    },
  );

  onMounted(() => {
    resume();
  });

  onActivated(() => {
    resume();
  });

  onUnmounted(() => {
    pause();
  });

  onDeactivated(() => {
    pause();
  });
</script>
<style scoped>
  .horizonta-small-square {
    /* height: 100%; */
    width: 100%;
    display: flex;
    flex-direction: column;

    .extra-wrap {
      :deep(.ant-select) {
        margin-right: 16px;
      }
    }

    .total-list {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 17px;
      overflow-x: auto;

      .item {
        height: 100%;
        flex: 1;
        background: rgba(11, 98, 203, 0.08);
        border-radius: 4px 4px 4px 4px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;

        .icon {
          width: 40px;
          height: 40px;
        }

        .content-column {
          flex-direction: column;
        }

        .content {
          display: flex;
          flex: 1;
          padding: 16px;
          justify-content: space-between;
          align-items: start;
          gap: 8px 0;

          .name {
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 14px;
            color: #333333;
            line-height: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .beforecor_0::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            margin-right: 8px;
            vertical-align: middle;
            background: rgba(46, 196, 255, 0.8);
          }

          .beforecor_1::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            margin-right: 8px;
            vertical-align: middle;
            background: rgba(67, 92, 255, 0.8);
          }

          .beforecor_2::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            margin-right: 8px;
            vertical-align: middle;
            background: rgba(34, 205, 128, 0.8);
          }

          .beforecor_3::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            margin-right: 8px;
            vertical-align: middle;
            background: rgba(255, 140, 46, 0.8);
          }

          .beforecor_4::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            margin-right: 8px;
            vertical-align: middle;
            background: rgba(237, 210, 38, 0.8);
          }

          .beforecor_5::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            margin-right: 8px;
            vertical-align: middle;
            background: rgba(255, 82, 43, 0.8);
          }

          .value_pleft {
            padding-left: 14px;
          }

          .value {
            font-size: 1rem;

            font-weight: 600;
            color: #333333;
            display: flex;
            align-items: flex-end;
            line-height: 1;

            .number-value {
              font-family: D-DIN-PRO;
              display: inline-block;
              max-width: 120px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .unit {
              margin-left: 8px;
              display: inline-block;
              font-size: 14px;
              font-weight: 400;
              color: #666;
            }
          }
        }
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
