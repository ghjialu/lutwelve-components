import { colorRgba } from '../../data';
import { roundAndConvert } from '../../utils/number';
export function optionFormate(props: any) {
  type dataList = {
    name: string;
    type: string;
    label: Object;
    barWidth?: number;
    barGap: string;
    itemStyle: Object;
    data: any[];
    yAxisIndex: number;
    step?: string;
    symbol?: string;
    stack: string;
    barMaxWidth?: string | number;
  };
  let totalNum = 0;
  props.dataList.forEach((item: any) => {
    totalNum += item.data.reduce((a: any, b: any) => {
      let ac = a;
      let bc = b;
      if (isNaN(a)) {
        ac = 0;
      }
      if (isNaN(b)) {
        bc = 0;
      }
      return Number(ac) + Number(bc);
    }, 0);
  });
  const unitName = props.dataList.length ? `单位（${props.dataList[0].unitName}）` : '';
  const unitNameBox = props.dataList.length
    ? Array.from(new Set(props.dataList.map((item: any) => item.unitName)))
    : [];
  const tooltipNameBox: {
    unitName: string;
    indexName: string;
  }[] = props.dataList.length
    ? Array.from(
        new Set(
          props.dataList.map((item: any) => ({ unitName: item.unitName, indexName: item.indexName })),
        ),
      )
    : [];
  const yAxisBox = unitNameBox.length
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
  return {
    color: colorRgba,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#333',
        fontSize: 14,
        // lineHeight: 28,
        // height: 28,
        fontWeight: 400,
      },
      borderColor: 'transparent',
      formatter: (params: any) => {
        const item = params.filter((item: any) => item.value !== undefined);
        if (item.length) {
          let htmlStr = ``;
          item.forEach((val: any, index: any) => {
            htmlStr += `<div style="color: #999;">${index === 0 ? val.name : ''}</div>
              ${val.marker} <span style="display: inline-block; width: 30px;">${
              val.seriesName
            }</span><span  style="display: inline-block; width: 150px; font-weight: bold; text-align: right;">${
              val.value
            }${
              tooltipNameBox.find((item: any) => item.indexName === val.seriesName)?.unitName ?? ''
            }</span>`;
          });
          return htmlStr;
        }
        return;
      },
    },
    legend: {
      icon: 'circle',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 24,
      color: colorRgba,
      top: 21,
      data: props.dataList.map((item: any) => item.indexName),
      textStyle: {
        fontSize: 14,
        color: '#333',
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
    series: props.dataList.map((item: any, index: any) => {
      const data: dataList = {
        name: item.indexName,
        type: item.type ? item.type : 'bar',
        stack: props.stack,
        label: {
          show: item.seriesLabel ? item.seriesLabel : false,
          position: 'top',
          // fontWeight: 600,
          // fontSize: 16,
          color: '#333333',
          formatter: (params: any) => {
            console.log('params', params.value);
            if (!isNaN(params.value && totalNum > 0)) {
              console.log('params', params.value, Number(params.value) / totalNum);
              return `${roundAndConvert((Number(params.value) / totalNum) * 100, 2)}%`;
            }
          },
        },
        // barWidth: 20,
        barMaxWidth: '20%',
        barGap: '10%',
        itemStyle: {
          color: colorRgba[index],
          barBorderRadius: [2, 2, 0, 0],
        },
        data: item.data
          ? item.data.map((i: any) => (i == null ? null : roundAndConvert(Number(i), 2)))
          : [],
        yAxisIndex: 0,
      };
      if (item.type === 'line') {
        data.step = 'start';
        // data.smooth = true;
        data.symbol = 'none';
        data.type = 'line';
        data.yAxisIndex = 1;
        data.barWidth = 0;
        data.barGap = '%';
        // data.areaStyle = {
        //   color: {
        //     type: 'linear',
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 1,
        //     colorStops: [
        //       {
        //         offset: 0,
        // color: 'rgba(255, 82, 43,0.16)', // 0% 处的颜色
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgba(255, 82, 43,0.04)', // 100% 处的颜色
        //       },
        //     ],
        //     global: false, // 缺省为 false
        //   },
        // };
      }
      return data;
    }),
    animation: false,
  };
}
