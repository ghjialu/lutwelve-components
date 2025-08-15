import { Slots } from 'vue';
/**
 * 定义卡片配置数据的接口，包含允许的插槽名数组
 */
export interface CardData {
  // 允许的插槽名数组
  slots: string[];
}
/**
 * 卡片头部允许的插槽名常量
 */
export const cardHeaderDate: CardData = {
  slots: ['headerLeftBefore', 'headerLeftAfter', 'headerRight'],
};
/**
 * 卡片主体允许的插槽名常量
 */
export const cardBodyDate: CardData = {
  slots: ['defaultBody', 'bodyTop', 'bodyBottom'],
};

/**
 * 过滤出允许的插槽名
 * @param slots - 组件的所有插槽
 * @param cardHeaderDate - 包含允许插槽名的配置对象
 * @returns 过滤后的插槽名数组
 */
export function filterAllowedSlots(slots: Slots, cardHeaderDate: CardData) {
  const allowedSlots = new Set(cardHeaderDate.slots);
  return Object.keys(slots).filter(allowedSlots.has, allowedSlots);
}
