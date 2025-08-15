import { cardHeaderDate, filterAllowedSlots } from '../../../HLCard';
import { useSlots, computed } from 'vue';

/**
 * 计算属性，过滤出允许的插槽
 * @returns {string[]} 过滤后的插槽名称数组
 */
export function useFilterSlots() {
  const slots = useSlots();
  // 定义计算属性
  const filtersSlots = computed(() => {
    // 调用 filterAllowedSlots 方法过滤插槽
    return filterAllowedSlots(slots, cardHeaderDate);
  });

  // 返回计算属性
  return {
    filtersSlots,
  };
}
