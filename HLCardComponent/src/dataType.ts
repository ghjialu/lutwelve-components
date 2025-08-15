import type {
  summaryListType, // 电耗统计数据类型
  drugSummaryListType, // 药耗统计数据类型
  rankingListType, // 排名数据类型
} from './basicComponents/dataType';

export type { summaryListType, drugSummaryListType, rankingListType };

export type pieDataListType = {
  indexName: string;
  indexCode: string;
  unitName: string;
  value: number;
  price?: number;
  total?: number;
};

export type ArrayListType = {
  indexName: string;
  indexCode: string;
  unitName: string;
  value: number | string | null;
  icon?: string;
  color?: string; // value值文字颜色
};
// echarts数据类型
export type echartsListType = {
  // echarts 标题
  title?: string;
  // 类目轴名
  indexName: string;
  // 类目轴码
  indexCode: string;
  // 单位
  unitName: string;
  type?: string;
  data?: any[];
  // X轴数据
  XAxis?: string[];
  seriesLabel?: Boolean;
};
// 小方块数据类型
export type HorizonListType = {
  indexName: string;
  indexCode: string;
  unitName: string;
  value: number | string | null;
  icon?: string;
  color?: string;
};
