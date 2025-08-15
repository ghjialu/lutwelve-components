<!-- 药耗统计块 -->
<template>
  <div :class="['card_in', themeColor]">
    <div class="container-list" v-if="dataList.length">
      <div class="list-item" v-for="(item, index) in dataList" :key="index">
        <div class="item">
          <div class="conten-box">
            <div class="name">
              <div class="text">{{ item.indexName }}</div>
            </div>
            <div class="value value-before">
              <div class="number-value" v-if="item.value === null" style="font-weight: 400">-</div>
              <Tooltip @mouseenter="showTooltip" v-else>
                <template #title>
                  {{ Number(item.value) ? Number(item.value) : '-' }}{{ item.unitName }}
                </template>
                <div class="number-value">
                  {{ Number(item.value) ? Number(item.value) : '-' }}
                </div>
              </Tooltip>
              <span class="unit" v-if="item.value !== null">{{ item.unitName }}</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="conten-box">
            <div class="name">
              <slot name="summaryIcon"></slot>
              <div class="text">{{ item.indexPreName }}</div>
            </div>
            <div class="value">
              <div class="number-value" v-if="item.preVal === null" style="font-weight: 400">-</div>
              <Tooltip @mouseenter="showTooltip" v-else>
                <template #title
                  >{{ Number(item.preVal) ? Number(item.preVal) : '-' }}{{ item.unitName }}
                </template>
                <div class="number-value">
                  {{ Number(item.preVal) ? Number(item.preVal) : '-' }}
                </div>
              </Tooltip>
              <span class="unit" v-if="item.preVal !== null">{{ item.unitName }}</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="conten-box">
            <div class="name">
              <slot name="summaryIconTwo"></slot>
              <div class="text">{{ item.ratioName }}</div>
            </div>
            <div class="value">
              <div class="number-value" v-if="item.ratioVal === null" style="font-weight: 400"
                >-</div
              >
              <Tooltip @mouseenter="showTooltip" v-else>
                <template #title
                  >{{ Number(item.ratioVal) ? Number(item.ratioVal) : '-' }}%</template
                >
                <div class="number-value">
                  {{ Number(item.ratioVal) ? Number(item.ratioVal) : '-' }}
                </div>
              </Tooltip>
              <span class="unit" v-if="item.ratioVal !== null">%</span>
              <div class="ups-icon" v-if="item.ratioVal">
                <img v-if="item.ratioVal > 0" :src="up" />
                <img v-else-if="item.ratioVal < 0" :src="down" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, PropType } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import up from '../assets/images/up.svg';
  import down from '../assets/images/down.svg';
  import type { summaryListType } from './dataType';

  const props = defineProps({
    dataList: {
      type: Array as PropType<summaryListType[]>,
      default: () => [],
    },
    // 小图标是否展示
    elect: {
      type: Boolean,
      default: false,
    },
    themeColor: {
      type: String,
      default: 'light', // Dark, light, screenColor
    },
  });
  const loading = ref(false);
  function showTooltip(e: MouseEvent) {
    if (e.target instanceof HTMLElement && e.target.clientWidth >= e.target.scrollWidth) {
      e.target.style.pointerEvents = 'none';
    }
  }
  watch(
    () => props.dataList,
    (newVal) => {
      if (!newVal) {
        loading.value = true;
      } else {
        loading.value = false;
      }
    },
  );
</script>
<style scoped>
  .card_in {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-list {
    display: flex;
    flex-direction: column;
    gap: 16px 0;
    height: 100%;
    width: 100%;
  }

  .container-list .list-item {
    padding: 0 12px 0 0;
    background: rgba(11, 98, 203, 0.08);
    border-radius: 4px 4px 4px 4px;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container-list .list-item .item {
    width: 100%;
    overflow: hidden;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .container-list .list-item .item:first-child::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 34px;
    background-color: #bebebe;
  }

  .container-list .list-item .item .conten-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    overflow: hidden;
    width: 100%;
  }

  .container-list .list-item .item .name {
    width: 100%;
    display: flex;
    padding-left: 24px;
    justify-content: flex-start;
    align-items: center;
  }

  .container-list .list-item .item .name .icon {
    width: 24px;
    height: 24px;
  }

  .container-list .list-item .item .name .icon img {
    width: 100%;
  }

  .container-list .list-item .item .name .text {
    font-size: 14px;
    color: #333;
    line-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .container-list .list-item .item .value {
    font-size: 1rem;
    font-weight: 600;
    color: #333333;
    display: flex;
    width: 100%;
    justify-content: start;
    padding-left: 24px;
    overflow: hidden;
    align-items: end;
  }

  .container-list .list-item .item .value .number-value {
    font-family: 'D-DIN-PRO, D-DIN-PRO';
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .container-list .list-item .item .value .unitLevel {
    display: inline-block;
    margin-left: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #666;
    margin-bottom: 3px;
  }

  .container-list .list-item .item .value .unit {
    display: inline-block;
    margin-left: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #666;
  }

  .container-list .list-item .item .value .ups-icon {
    display: inline-block;
    margin-left: 6px;
  }

  .container-list .list-item .item .value-before {
    margin: 0 0 0 0;
  }

  .container-list .list-item .item:nth-child(1) .conten-box {
    padding-left: 24px;
    padding-right: 24px;
  }

  .container-list .list-item .item:nth-child(1) .name {
    padding-left: 0;
  }

  .container-list .list-item .item:nth-child(1) .value {
    padding-left: 0;
  }

  .container-list .list-item .item:nth-child(2) .name .text,
  .container-list .list-item .item:nth-child(3) .name .text {
    /* padding-left: 4px; */
  }

  .container-list .list-item .item:nth-child(2) .value,
  .container-list .list-item .item:nth-child(3) .value {
    padding-left: 24px;
    /* padding-left: 41px; */
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
