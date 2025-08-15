// 导入工具函数
import { withInstall } from '../utils/index.js'

// 导入HLCard相关组件
import cardHeader from '/@/HLCard/src/CardHeader.vue'
import cardBody from '/@/HLCard/src/CardBody.vue'
import hlCard from '/@/HLCard/src/index.vue'
import { filterAllowedSlots, cardBodyDate, cardHeaderDate } from '/@/HLCard/src/data'

// 导入HLCardComponent基础组件
import ranking from '/@/HLCardComponent/src/basicComponents/Ranking.vue'
import horizontaSmallSquare from '/@/HLCardComponent/src/basicComponents/HorizontaSmallSquare.vue'
import energySummary from '/@/HLCardComponent/src/basicComponents/EnergySummary.vue'
import drugSummary from '/@/HLCardComponent/src/basicComponents/DrugSummary.vue'
import loading from '/@/HLCardComponent/src/basicComponents/Loading.vue'
import empty from '/@/HLCardComponent/src/basicComponents/Empty.vue'
import rankingSimple from '/@/HLCardComponent/src/basicComponents/RankingSimple.vue'

// 导入HLCardComponent图表组件
import BarEcharts from '/@/HLCardComponent/src/charts/bar/BarEcharts.vue'
import LineEcharts from '/@/HLCardComponent/src/charts/line/lineEcharts.vue'
import PieEcharts from '/@/HLCardComponent/src/charts/pie/PieEcharts.vue'

// 导入HLCardComponent组合卡片组件
import PieSimpleCard from '/@/HLCardComponent/src/combinationCards/chartsType/PieSimpleCard.vue'
import PiePlusCard from '/@/HLCardComponent/src/combinationCards/chartsType/PiePlusCard.vue'
import LineSimpleCard from '/@/HLCardComponent/src/combinationCards/chartsType/LineSimpleCard.vue'
import LinePlusCard from '/@/HLCardComponent/src/combinationCards/chartsType/LinePlusCard.vue'
import BarSimpleCard from '/@/HLCardComponent/src/combinationCards/chartsType/BarSimpleCard.vue'
import BarPlusCard from '/@/HLCardComponent/src/combinationCards/chartsType/BarPlusCard.vue'
import RankingPlusCard from '/@/HLCardComponent/src/combinationCards/rankingType/RankingPlusCard.vue'
import RankingSimpleCard from '/@/HLCardComponent/src/combinationCards/rankingType/RankingSimpleCard.vue'
import SummarySimpleCard from '/@/HLCardComponent/src/combinationCards/summaryType/SummarySimpleCard.vue'

// HLCard组件
export const CardHeader = withInstall(cardHeader)
export const CardBody = withInstall(cardBody)
export const HLCard = withInstall(hlCard)

// HLCardComponent基础组件
export const Ranking = withInstall(ranking)
export const HorizontaSmallSquare = withInstall(horizontaSmallSquare)
export const EnergySummary = withInstall(energySummary)
export const DrugSummary = withInstall(drugSummary)
export const Loading = withInstall(loading)
export const Empty = withInstall(empty)
export const RankingSimple = withInstall(rankingSimple)

// HLCardComponent图表组件
export { BarEcharts, LineEcharts, PieEcharts }

// HLCardComponent组合卡片组件
export {
  PieSimpleCard,
  PiePlusCard,
  LineSimpleCard,
  LinePlusCard,
  BarSimpleCard,
  BarPlusCard,
  RankingPlusCard,
  RankingSimpleCard,
  SummarySimpleCard
}

// 导出数据和工具函数
export { filterAllowedSlots, cardBodyDate, cardHeaderDate }

// 所有组件数组
const components = [
  CardHeader,
  CardBody,
  HLCard,
  Ranking,
  HorizontaSmallSquare,
  EnergySummary,
  DrugSummary,
  Loading,
  Empty,
  RankingSimple,
  BarEcharts,
  LineEcharts,
  PieEcharts,
  PieSimpleCard,
  PiePlusCard,
  LineSimpleCard,
  LinePlusCard,
  BarSimpleCard,
  BarPlusCard,
  RankingPlusCard,
  RankingSimpleCard,
  SummarySimpleCard
]

// 定义 install 函数
const install = function(app: any) {
  components.forEach(component => {
    if (component.install) {
      app.use(component)
    }
  })
}

// 默认导出，用于全量导入
const HLUIComponents = {
  install,
  CardHeader,
  CardBody,
  HLCard,
  Ranking,
  HorizontaSmallSquare,
  EnergySummary,
  DrugSummary,
  Loading,
  Empty,
  RankingSimple,
  BarEcharts,
  LineEcharts,
  PieEcharts,
  PieSimpleCard,
  PiePlusCard,
  LineSimpleCard,
  LinePlusCard,
  BarSimpleCard,
  BarPlusCard,
  RankingPlusCard,
  RankingSimpleCard,
  SummarySimpleCard
}

export default HLUIComponents

// 类型定义
export * from '/@/HLCard/src/data'
export * from '/@/HLCardComponent/src/dataType'