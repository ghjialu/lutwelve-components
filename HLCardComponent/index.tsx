import { withInstall } from '../utils/index.js';
import ranking from './src/basicComponents/Ranking.vue';
import horizontaSmallSquare from './src/basicComponents/HorizontaSmallSquare.vue';
import energySummary from './src/basicComponents/EnergySummary.vue';
import drugSummary from './src/basicComponents/DrugSummary.vue';
import loading from './src/basicComponents/Loading.vue';
import empty from './src/basicComponents/Empty.vue';
import rankingSimple from './src/basicComponents/RankingSimple.vue';
// 基础组件--->start
export const Ranking = withInstall(ranking);
// 水平小方块
export const HorizontaSmallSquare = withInstall(horizontaSmallSquare);
// 统计组件(能耗)
export const EnergySummary = withInstall(energySummary);
// 统计组件(药耗)
export const DrugSummary = withInstall(drugSummary);
// 加载组件
export const Loading = withInstall(loading);
// 空状态组件
export const Empty = withInstall(empty);
// 排名组件
export const RankingSimple = withInstall(rankingSimple);
// 基础组件--->end

// 基础组件echarts---> start
// 柱状图
import BarEcharts from './src/charts/bar/BarEcharts.vue';
// 折线图
import LineEcharts from './src/charts/line/lineEcharts.vue';
// 饼图
import PieEcharts from './src/charts/pie/PieEcharts.vue';
// 基础组件echarts---> end

// 组合卡片 图表类组件
import PieSimpleCard from './src/combinationCards/chartsType/PieSimpleCard.vue';
import PiePlusCard from './src/combinationCards/chartsType/PiePlusCard.vue';
import LineSimpleCard from './src/combinationCards/chartsType/LineSimpleCard.vue';
import LinePlusCard from './src/combinationCards/chartsType/LinePlusCard.vue';
import BarSimpleCard from './src/combinationCards/chartsType/BarSimpleCard.vue';
import BarPlusCard from './src/combinationCards/chartsType/BarPlusCard.vue';
// 组合卡片 排名类组件
import RankingPlusCard from './src/combinationCards/rankingType/RankingPlusCard.vue';
import RankingSimpleCard from './src/combinationCards/rankingType/RankingSimpleCard.vue';
// 组合卡片 总结类组件
import SummarySimpleCard from './src/combinationCards/summaryType/SummarySimpleCard.vue';

export {
  BarEcharts,
  LineEcharts,
  PieEcharts,
  PieSimpleCard,
  PiePlusCard,
  BarPlusCard,
  LineSimpleCard,
  LinePlusCard,
  BarSimpleCard,
  RankingPlusCard,
  RankingSimpleCard,
  SummarySimpleCard,
};
