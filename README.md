# Lu Twelve Components UI 组件库

一个基于Vue 3的UI组件库，包含HLCard和HLCardComponent等组件，使用TypeScript开发，Vite打包。

## 安装

```bash
npm install lutwelve-components
```

## 使用方法

### 全量引入

```typescript
import { createApp } from 'vue'
import LuTwelveComponents from 'lutwelve-components'
import 'lutwelve-components/dist/style.css'

const app = createApp({})
app.use(LuTwelveComponents)
```

### 按需引入

```typescript
import { HLCard, CardHeader, CardBody } from 'lutwelve-components'
import 'lutwelve-components/dist/style.css'

// 在组件中使用
export default {
  components: {
    HLCard,
    CardHeader,
    CardBody
  }
}
```

## 组件列表

### HLCard 组件

- `HLCard` - 主卡片组件
- `CardHeader` - 卡片头部组件
- `CardBody` - 卡片主体组件

### HLCardComponent 基础组件

- `Ranking` - 排名组件
- `HorizontaSmallSquare` - 水平小方块组件
- `EnergySummary` - 能耗统计组件
- `DrugSummary` - 药耗统计组件
- `Loading` - 加载组件
- `Empty` - 空状态组件
- `RankingSimple` - 简单排名组件

### 图表组件

- `BarEcharts` - 柱状图组件
- `LineEcharts` - 折线图组件
- `PieEcharts` - 饼图组件

### 组合卡片组件

#### 图表类
- `PieSimpleCard` - 简单饼图卡片
- `PiePlusCard` - 增强饼图卡片
- `LineSimpleCard` - 简单折线图卡片
- `LinePlusCard` - 增强折线图卡片
- `BarSimpleCard` - 简单柱状图卡片
- `BarPlusCard` - 增强柱状图卡片

#### 排名类
- `RankingPlusCard` - 增强排名卡片
- `RankingSimpleCard` - 简单排名卡片

#### 总结类
- `SummarySimpleCard` - 简单总结卡片

## 示例

```vue
<template>
  <div>
    <HLCard>
      <CardHeader title="示例标题" />
      <CardBody>
        <EnergySummary :dataList="energyData" />
      </CardBody>
    </HLCard>
    
    <PieSimpleCard
      :echartsList="chartData"
      title="饼图示例"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  HLCard, 
  CardHeader, 
  CardBody, 
  EnergySummary,
  PieSimpleCard 
} from 'lu-twelve-components'

const energyData = ref([
  {
    value: 1234,
    preVal: 1100,
    indexName: '用电量',
    indexPreName: '上月用电量',
    ratioName: '环比',
    ratioVal: 12.2,
    indexCode: 'electricity',
    unitName: 'kWh'
  }
])

const chartData = ref([
  { name: '类型A', value: 30 },
  { name: '类型B', value: 45 },
  { name: '类型C', value: 25 }
])
</script>
```

## 依赖

本组件库依赖以下库：

- Vue 3.x
- Ant Design Vue 4.x
- ECharts 6.x
- VueUse Core
- Lodash ES
- MathJS

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check
```

## License

MIT License