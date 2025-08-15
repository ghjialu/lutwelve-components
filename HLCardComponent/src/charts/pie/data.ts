import { roundAndConvert } from '../../utils/number';
import { useWindowSize } from '@vueuse/core';

export type dataListType = {
  indexName: string;
  indexCode?: string;
  unitName: string;
  value: number;
  price?: number;
};

export const dataListDefault: dataListType[] = [
  {
    indexName: '总用电',
    indexCode: 'zyd',
    unitName: 'Kwh',
    value: 300,
    price: 1,
  },
  {
    indexName: '商用电',
    indexCode: 'zyd',
    unitName: 'Kwh',
    value: 220,
    price: 2,
  },
  { indexName: '其他用电', indexCode: 'zyd', unitName: 'Kwh', value: 80, price: 3 },
];

const colorList = [
  'rgba(46, 140, 255, 1)',
  'rgba(46, 196, 255, 1)',
  'rgba(129, 67, 255, 1)',
  'rgba(34, 205, 128, 1)',
  'rgba(118, 195, 31, 1)',
  'rgba(255, 140, 46, 1)',
];
export function optionFormate(props: any, chartHeight: number, chartWidth: number) {
  const { width } = useWindowSize();
  let copyList;
  if (props.dataList?.length) {
    copyList = props.dataList;
  } else {
    copyList = dataListDefault;
  }
  const sum = copyList
    .map((item: any) => (item.value == null || !item.value ? 0 : Number(roundAndConvert(item.value, 0))))
    .reduce((prev: any, cur: any) => {
      return prev + cur;
    }, 0);

  const commonLeft = 15;
  if (props.pieType === 'vertical') {
    const color = [
      '#2E7BFF',
      '#2EC4FF',
      '#435CFF',
      '#8143FF',
      '#22CD80',
      '#76C31F',
      '#FF8C2E',
      '#FEC52D',
    ];
    copyList.forEach((i: any) => {
      i.percentVal = !i.value ? 0 : ((i.value / sum) * 100).toFixed(0);
    });
    const legendXPadding = 10;
    const itemGap = -10;
    const itemWidth = 8;
    // let top = 35;
    let legendItemWidth =
      (chartWidth -
        legendXPadding * 2 -
        (itemGap > 0 ? itemGap : 0) * 3 -
        (itemWidth + 6) * 4) /
      4;
    legendItemWidth = Math.floor(legendItemWidth);

    const legendHeight = copyList.length > 4 ? 100 : 55;
    const topCenter = (chartHeight - legendHeight) / 2;
    return {
      animation: false,
      color,
      title: [
        {
          text: `${sum}`,
          left: `${50 - 1}%`,
          top: topCenter - 25,
          textAlign: 'center',
          textStyle: {
            fontSize: 26,
            fontWeight: 600,
            height: 50,
            color: '#333333',
          },
        },
        {
          text: `${props.titleText}`,
          left: `${50 - 1}%`,
          top: topCenter + 10,
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
            fontWeight: 400,
            color: '#666666',
          },
        },
      ],
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 1)',

        formatter: (data: any) => {
          const { name } = data;
          const { percentVal, value, unitName } = data.data;

          // const seriesIndex = data.seriesIndex;

          return `${data.marker} <span>${name}</span> <span>${
            value === null ? '-' : roundAndConvert(Number(value), 0)
          }</span><span>${unitName}</span> <span>${percentVal}%</span>`;
        },

        textStyle: {
          color: '#333',
          fontSize: 14,
          lineHeight: 28,
          height: 28,
          fontWeight: 400,
        },
        borderColor: 'transparent',
      },
      legend: {
        icon: 'circle',
        itemWidth,
        itemHeight: 8,
        bottom: 0,
        left: 'center',
        // right: 0,
        itemGap,
        textStyle: {
          fontSize: 14,
          color: '#333333',
          width: legendItemWidth,
          borderWidth: 1,
          borderColor: 'transparent',
          padding: [20, 0, 0, 0],
          rich: {
            title: {
              color: '#666666',
              fontSize: 14,
              fontWeight: 400,
              padding: [0, 0, 0, 0],
            },
            num: {
              padding: [4, 0, 0, 0],
              color: '#333',
              fontSize: 16,
              fontWeight: 600,
              align: 'left',
            },
          },
        },
        formatter: (name: string) => {
          console.log('name', name);
          const item = copyList.find((i: any) => i.indexName === name);
          if (!item) return 'not find name';
          const { percentVal } = item;
          return [`{title|${name}}`, `{num|${percentVal}%}`].join('\n');
        },
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true,
      },

      series: {
        type: 'pie',
        // radius: ['50%', `${top * 2}%`],
        radius: ['65%', `90%`],
        bottom: legendHeight,
        top: 10,
        center: ['50%', `50%`],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emptyCircleStyle: {
          color: 'lightgray',
        },
        labelLine: {
          show: false,
        },
        data: copyList.map((i: any, index: number) => ({
          value: i.value !== null ? (i.value ? roundAndConvert(i.value, 0) : '0') : '-',
          name: i.indexName,
          originValue: i.value,
          percentVal: i.percentVal,
          unitName: i.unitName,
          itemStyle: {
            color: color[index % color.length],
          },
        })),
      },
    };
  } else if (props.pieType === 'horizontal') {
    return {
      title: [
        {
          text: `${sum}`,
          left: commonLeft - 0.25 + '%',

          top: '40%',
          textAlign: 'center',
          textStyle: {
            fontSize: 26,
            fontWeight: 600,
            height: 50,
            color: '#333333',
          },
        },
        {
          text: props.titleText || '',
          left: commonLeft + '%',
          top: '52%',
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
            fontWeight: 400,
            color: '#999999',
          },
        },
      ],
      tooltip: {
        trigger: 'item',
        formatter: (data: any) => {
          const seriesIndex = data.seriesIndex;
          let price = '';
          let unit = '';
          if (props.priceList?.[0]) {
            price = roundAndConvert(
              Number(props.priceList[seriesIndex].value * data.data.value),
              0,
            );
            unit = props.priceList[seriesIndex].unit;
          }
          // console.log('药耗占比tootipData', data);
          return `${data.marker} <span>${data.name}</span><br /> <span>${
            data.data.value === null ? '-' : roundAndConvert(Number(data.data.value), 2)
          }</span><span>${data.data.unit}</span><br /> <span>${
            data.percent
          }%</span><br /><span>${price}${unit}</span>`;
        },
        backgroundColor: '#ffffff',
        textStyle: {
          color: '#333',
          fontSize: 14,
          lineHeight: 28,
          height: 28,
          fontWeight: 400,
        },
        borderColor: 'transparent',
      },
      legend: {
        icon: 'circle',
        left: '30%',
        top: 'middle',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 15,
        textStyle: {
          color: '#77899c',
          overflow: 'truncate',
          rich: {
            title: {
              width: width.value <= 1366 ? 65 : width.value <= 1440 ? 80 : 120,
              color: '#666666',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 66,
              padding: [25, 0, 25, 0],
            },
            num: {
              width: props.legendNumWidth ? props.legendNumWidth : 85,
              padding: [25, 8, 25, 0],
              color: '#333',
              fontSize: 16,
              lineHeight: 66,
              fontWeight: 600,
              align: 'left',
            },
            // unit: {
            //   padding: [3, 16, 0, 4],
            //   color: '#666',
            //   fontSize: 14,
            //   lineHeight: 14,
            // },
            tag: {
              color: '#333',
              fontSize: 16,
              width: width.value <= 1366 ? 100 : width.value <= 1920 ? 120 : 200,
              lineHeight: 66,
              fontWeight: 600,
              align: 'left',
              padding: [25, 0, 25, 0],
            },
          },
        },
        formatter: (name: string) => {
          // let percentage;
          let value = '';
          let unit = '';
          let tag = '()';
          const data = copyList.map((item: any) => ({
            ...item,
            value: Number(roundAndConvert(Number(item.value), 0)),
          }));
          // const values = data.map((i) => i.value);
          // const percentageResult = calculatePercentages(values, 1);

          data.forEach((item: any, index: number) => {
            if (name === item.indexName) {
              value = item.value === null || item.value === undefined ? '-' : `${item.value}`;
              unit = item.value === null || item.value === undefined ? '' : `${item.unitName}`;
              // const index = percentageResult.findIndex((i) => i.value == item.value);
              let unitName = '';
              if (props.priceList?.[0]) {
                unitName = props.priceList[index].unit;
              }
              tag = `(${roundAndConvert(Number(item.price * item.value), 0)}${unitName})`;
            }
          });

          // return `{title|${name}}`;
          return `{title|${name}}{num|${value + unit}}{tag|${props.tagFlag ? tag : ''}}`;
          // {tag|${percentage}%}
        },
      },
      series: {
        type: 'pie',
        radius: ['50%', '80%'],
        center: [commonLeft + '%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emptyCircleStyle: {
          color: 'lightgray',
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          color: function (colors: any) {
            return colorList[colors.dataIndex % colorList.length];
          },
        },
        data: copyList.map((i: any) => ({
          value: i.value !== null ? (i.value ? roundAndConvert(i.value, 0) : '0.0000001') : '-',
          name: i.indexName,
          originValue: i.value,
          unit: i.unitName,
        })),
      },
      animation: false,
    };
  }
  return {};
}
