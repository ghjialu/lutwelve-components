import * as echarts from 'echarts';
import {
  colorRgba,
  colorRgbaStar,
  colorRgbaEnd,
  colorRgbaNightEnd,
  colorRgbaNightStar,
  colorNightRgba,
} from '../../data';
import { truncateAndConvert, roundAndConvert, hasMax, getEchartFontSize } from '../../utils/number';
import { uniqBy } from 'lodash-es';
/**
 * 颜色
 */
const colorBox = [...colorRgba];
const colorBoxStar = [...colorRgbaStar];
const colorBoxEnd = [...colorRgbaEnd];
const colorBoxNight = [...colorNightRgba];
const colorBoxNightStar = [...colorRgbaNightStar];
const colorBoxNightEnd = [...colorRgbaNightEnd];
// title: '近12小时余氯曲线',
//       chartOptions: {
//         xAxis: {
//           data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00'],
//         },
//         series: [
//           {
//             name: '进水量',
//             color: '#2D82FE',
//             data: [5, 11, 8, 9, 7, 10, 12],
//             unitName: 'm³',
//             areaColor: ['rgba(45, 130, 254, 0.3)', 'transparent'],
//           },
//         ],
//       },
function getMaxValue(arr: any) {
  const max = Math.max(...arr);
  // 这样处理是为了不让最大值刚好到坐标轴最顶部
  return Math.ceil(max / 8) * 10;
}
function getMinValue(arr: any) {
  const min = Math.min(...arr);
  // 这样处理是为了不让最大值刚好到坐标轴最底部
  return Math.floor(min / 12) * 10;
}
// 返回字符串ascii码
function getStrAscii(str: string) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i);
  }
  return Number(result);
}
export function renderChart(props: any) {
  try {
    const chartOptions = props.dataList;
    // console.log( chartOptions);
    if (chartOptions && chartOptions.data) {
      const isW = hasMax(chartOptions.data);
      let yAxis: any = {
        type: 'value',
        offset: -5,
        nameTextStyle: {
          fontSize: getEchartFontSize(14),
          color: '#fff',
          // padding: chartOptions.yAxis ? chartOptions.yAxis.nameTextStyle.padding : [0, 0, -5, 0],
        },
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)',
            type: 'dashed',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: getEchartFontSize(14),
          },
          formatter(value: any) {
            const val = isW ? `${truncateAndConvert(value / 10000, 2)}万` : value;
            return val;
          },
        },
      };
      let yAxisData: any[] = uniqBy(chartOptions.data, 'unitName').sort(
        (a: any, b: any) => getStrAscii(a.unitName) - getStrAscii(b.unitName),
      );
      // console.log('yAxisData', yAxisData);
      const Data1Merge = chartOptions.data
        .filter((i: any) => i.unitName === yAxisData[0].unitName)
        .map((item: any) => item.data)
        .flatMap((arr: any) => arr);
      let max1 = 0;
      let max2 = 0;
      if (yAxisData.length >= 2) {
        const Data2Merge = chartOptions.data
          .filter((i: any) => i.unitName === yAxisData[1].unitName)
          .map((item: any) => item.data)
          .flatMap((arr: any) => arr);
        // const min1 = getMinValue(Data1Merge, 'y1');
        // max1 = getMaxValue(Data1Merge, 'y1') || 1;
        // const min2 = getMinValue(Data2Merge, 'y2');
        // max2 = getMaxValue(Data2Merge, 'y2') || 1;
        const min1 = getMinValue(Data1Merge);
        max1 = getMaxValue(Data1Merge) || 1;
        const min2 = getMinValue(Data2Merge);
        max2 = getMaxValue(Data2Merge) || 1;
        yAxis = [];
        // console.log('max1', max1, 'max2', max2);
        yAxisData = yAxisData.filter((item) => item.unitName);
        const y1 = {
          type: 'value',
          // name: yAxisData[0].unitName ? `${yAxisData[0].unitName}` : '',
          nameTextStyle: {
            fontSize: getEchartFontSize(14),
            color: '#fff',
            align: 'center',
            // padding: [0, 0, 0, 0],
          },
          min: min1,
          max: max1,
          splitNumber: 4,
          interval: (max1 - min1) / 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
              type: 'dashed',
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: getEchartFontSize(14),
            },
            formatter(value: any) {
              const val = isW ? `${truncateAndConvert(value / 10000, 2)}万` : value;
              return val;
            },
          },
        };
        const y2 = {
          type: 'value',
          // name: yAxisData[1].unitName ? `${yAxisData[1].unitName}` : '',
          nameTextStyle: {
            fontSize: getEchartFontSize(14),
            color: '#fff',
            align: 'center',
            // padding: [0, 0, -5, 0],
          },
          splitNumber: 4,
          interval: (max2 - min2) / 4,
          min: min2,
          max: max2,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
              type: 'dashed',
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: getEchartFontSize(14),
            },
            formatter(value: any) {
              const val = isW ? `${truncateAndConvert(value / 10000, 2)}万` : value;
              return val;
            },
          },
        };
        yAxis.push(...[y1, y2]);
      } else {
        // yAxis.name = yAxisData[0]?.unitName ? `${yAxisData[0].unitName}` : '';
      }
      const series = chartOptions.data.map((item: any, inx: number) => {
        const index = yAxisData.findIndex((i) => i.unitName === item.unitName);
        const result: any = {
          name: item.indexName,
          color: colorBoxNight[inx],
          data: item.data.map((i: any) => (i !== null ? roundAndConvert(Number(i), 2) : null)),
          type: item.type ? item.type : 'line',
          smooth: true,
          // data.symbol = 'none';
          symbol: 'none',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorBoxNightStar[inx],
              },
              {
                offset: 1,
                color: colorBoxNightEnd[inx],
              },
            ]),
          },
        };
        if (index !== -1) {
          result.yAxisIndex = index;
        }
        return result;
      });

      // console.log('series', series);
      const option = {
        title: {
          left: 0,
          // text: title,
          textStyle: {
            color: '#ffffff',
            fontWeight: '400',
            fontSize: getEchartFontSize(14),
          },
          padding: [8, 0, 5, 0],
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#132b4e',
          borderColor: '#132b4e',
          textStyle: {
            color: '#fff',
          },
          formatter: (params: any) => {
            // console.log('params', params);
            let item;
            if (Array.isArray(params)) {
              // 适用折线柱状堆叠的多条数据
              item = params.filter((item) => item.value !== undefined);
            } else {
              item = [params];
            }
            // console.log('item', item);
            if (item.length) {
              let htmlStr = ``;
              item.forEach((val, index) => {
                const isW = hasMax(Number(val.value) ? Number(val.value) : 0);
                const value = isW ? `${truncateAndConvert(val.value / 10000, 2)}万` : val.value;
                if (Array.isArray(params)) {
                  // 适用折线柱状堆叠的多条数据
                  const unitName =
                    chartOptions.data.find((i: any) => val.seriesName === i.indexName)?.unitName || '';
                  htmlStr += `<div>${index === 0 ? val.name : ''}</div>
                    ${val.marker} <span style="display: inline-block; width: 30px;">${
                    val.seriesName
                  }</span><span  style="display: inline-block; width: ${
                    props.tooltipWidth ? props.tooltipWidth + 'px' : '100px'
                  }; font-weight: bold; text-align: right;">${value}</span><span  style="padding-left: 4px">${unitName}</span>`;
                } else {
                  // 饼图
                  const unitName =
                    chartOptions.data[0].data.find((i: any) => val.name === i.indexName)?.unitName || '';
                  htmlStr += `
                    ${val.marker} <span style="display: inline-block; width: 30px;">${
                    val.name
                  }</span><span  style="display: inline-block; width: ${
                    props.tooltipWidth ? props.tooltipWidth + 'px' : '100px'
                  }; font-weight: bold; text-align: right;">${value}</span><span  style="padding-left: 4px">${unitName}</span>`;
                }
              });
              return htmlStr;
            }
            return;
          },
        },
        legend: {
          show: true,
          type: 'scroll',
          icon: 'circle',
          top: -5,
          left: Array.isArray(yAxis) ? 'center' : yAxis.name ? 120 : 'center',
          itemGap: 16,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: getEchartFontSize(14),
            color: '#fff',
            // padding: [3, 5]
          },
          pageTextStyle: {
            color: '#fff',
          },
          pageIconColor: '#fff',
          pageIconInactiveColor: 'rgba(255,255,255, 0.56)',
        },
        grid: {
          left: Array.isArray(yAxis) ? 0 : yAxis.name ? 0 : 10,
          right: Array.isArray(yAxis) && yAxis.length === 2 ? 0 : 25,
          top: 30,
          // top: Array.isArray(yAxis) ? 80 : 70,
          bottom: 0,
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: chartOptions.xAxis.data,
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.8)',
                type: 'solid',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: getEchartFontSize(14),
              },
            },
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: yAxis,
        series: series,
      };
      return option;
      // console.log('option', series, option);
    }
  } catch (error) {
    console.log('error', error);
  }
}
export function optionFormate(props: any) {
  const unitName = props.dataList.length ? `单位（${props.dataList[0].unitName}）` : '';
  const unitNameBox = props.dataList.length
    ? Array.from(new Set(props.dataList.map((item: any) => item.unitName)))
    : [];
  let yAxisBox = unitNameBox.length
    ? unitNameBox.map((item, index) => {
        return {
          type: 'value',
          name: `单位（${item}）`,
          // offset: -5,
          // splitNumber: 5,
          nameTextStyle: {
            color: '#333333',
            fontSize: 14,
            align: index === 0 ? 'left' : 'right',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#E9E9E9',
              type: 'solid',
            },
          },
          splitLine: {
            show: index === 0 ? true : false,
            lineStyle: {
              color: '#E9E9E9',
              type: 'dashed',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666666',
              fontSize: 14,
            },
          },
        };
      })
    : [
        {
          type: 'value',
          name: unitName,
          // offset: -5,
          nameTextStyle: {
            color: '#333333',
            fontSize: 14,
            align: 'left',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#E9E9E9',
              type: 'solid',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#E9E9E9',
              type: 'dashed',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666666',
              fontSize: 14,
            },
          },
        },
      ];
  if (yAxisBox.length > 2) {
    yAxisBox = [
      {
        type: 'value',
        name: '',
        // offset: -5,
        nameTextStyle: {
          color: '#333333',
          fontSize: 14,
          align: 'left',
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#E9E9E9',
            type: 'solid',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#E9E9E9',
            type: 'dashed',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#666666',
            fontSize: 14,
          },
        },
      },
    ];
  }
  // console.log('unitNameBox', unitNameBox, yAxisBox);
  return {
    color: [...colorBox],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#333',
        fontSize: 14,
        lineHeight: 28,
        height: 28,
        fontWeight: 400,
      },
      borderColor: 'transparent',
      formatter: (params: any) => {
        // console.log(params, 'params');
        const htmlStrBefor = `<div style="color: #999;">${params[0].name}</div>`;
        const htmlStrAfter = params
          .map((item: any, index: number) => {
            return `${item.marker} <span style="display: inline-block; width: 60px;">${
              item.seriesName
            }</span><span style="display: inline-block; width: 200px; font-weight: bold; text-align: right;">${
              item.value ? item.value : '-'
            }&nbsp;${props.dataList.length ? props.dataList[index].unitName : ''}</span>
                `;
          })
          .join('<br/>');
        return htmlStrBefor + htmlStrAfter;
      },
    },
    legend: {
      icon: 'circle',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 24,
      color: [...colorBox],
      top: 21,
      data: props.dataList.length ? props.dataList.map((i: any) => i.indexName) : [],
      textStyle: {
        fontSize: 14,
        color: '#333333',
      },
    },
    grid: {
      top: '25%',
      left: '0',
      right: '0',
      bottom: '1%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: props.dataList[0].XAxis,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#E9E9E9',
            type: 'solid',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#666666',
            fontSize: 14,
          },
        },
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: yAxisBox,
    series: props.dataList.map((item: any, index: number) => {
      return {
        name: item.indexName,
        type: item.type ? item.type : 'line',
        barMaxWidth: item.type === 'bar' ? 20 : '',
        barGap: item.type === 'bar' ? '-100%' : '',
        symbol: 'none',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: `${colorBoxStar[index]}`, // 0% 处的颜色
              },
              {
                offset: 1,
                color: `${colorBoxEnd[index]}`, // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        color: [colorBox[index]],
        yAxisIndex:
          unitNameBox.length && unitNameBox.length < 3 ? unitNameBox.indexOf(item.unitName) : 0,
        data: item.data,
      };
    }),
    animation: false,
  };
}
