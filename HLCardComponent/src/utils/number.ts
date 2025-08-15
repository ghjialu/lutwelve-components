import { multiply, bignumber } from 'mathjs';
// 1536 1920x125%
const LAPTOP_WIDTH_SCALE_125 = 1536;

/**
 * 截取小数并根据级别转换，不进行四舍五入
 * @param {number} num - 要处理的数字
 * @param {number} decimalPlaces - 保留的小数位数
 * @param {boolean} [abs] - 是否取绝对值，可选
 * @param {boolean} [automatic] - 是否自动获取转换级别（亿、千万、百万、十万、千），可选
 * @param {string} [level] - 转换级别（亿、千万、百万、十万、千），可选
 * @returns {string} - 格式化后的数字
 * @throws {TypeError} - 如果输入参数类型不正确
 * @throws {RangeError} - 如果保留的小数位数超出合理范围
 */
export function truncateAndConvert(
  num: any,
  decimalPlaces: number,
  abs?: boolean,
  automatic?: boolean,
  level?: string,
) {
  // 输入验证
  if (num == null) {
    return num;
  }
  num = +num;

  if (typeof num !== 'number' || isNaN(num)) {
    throw new TypeError('参数 num 必须是有效的数字');
  }
  if (
    typeof decimalPlaces !== 'number' ||
    !Number.isInteger(decimalPlaces) ||
    decimalPlaces < 0 ||
    decimalPlaces > 20
  ) {
    throw new RangeError('参数 decimalPlaces 必须是非负整数，且不超过 20');
  }

  if (automatic !== undefined && typeof automatic !== 'boolean') {
    throw new TypeError('参数 automatic 必须是布尔值');
  }

  if (level !== undefined && typeof level !== 'string') {
    throw new TypeError('参数 level 必须是字符串');
  }

  if (automatic) {
    level = getNumberLevel(num);
  }

  // 如果 level 未传，则直接返回 num 的格式化值
  if (level === undefined) {
    const factor = Math.pow(10, decimalPlaces);
    const result = Number(multiply(bignumber(num), bignumber(factor)));
    const truncatedValue = abs
      ? Math.abs(Math.floor(result) / factor)
      : Math.floor(result) / factor;
    return truncatedValue.toFixed(decimalPlaces);
  }

  // 根据级别进行转换
  let factor;
  switch (level) {
    case '亿':
      factor = 1e8; // 转换为亿
      break;
    case '千万':
      factor = 1e7; // 转换为千万
      break;
    case '百万':
      factor = 1e6; // 转换为百万
      break;
    case '十万':
      factor = 1e5; // 转换为十万
      break;
    case '万':
      factor = 1e4; // 转换为万
      break;
    default:
      factor = Math.pow(10, decimalPlaces);
      const result = Number(multiply(bignumber(num), bignumber(factor)));
      const truncatedValue = abs
        ? Math.abs(Math.floor(result) / factor)
        : Math.floor(result) / factor;
      return truncatedValue.toFixed(decimalPlaces);
  }

  // 进行转换
  const convertedValue = num / factor;

  // 截取小数，不进行四舍五入
  const result = Number(
    multiply(bignumber(convertedValue), bignumber(Math.pow(10, decimalPlaces))),
  );
  const truncatedValue = abs
    ? Math.abs(Math.floor(result) / Math.pow(10, decimalPlaces))
    : Math.floor(result) / Math.pow(10, decimalPlaces);

  // 返回格式化后的数字
  return truncatedValue.toFixed(decimalPlaces);
}

/**
 * 截取小数并根据级别转换，进行四舍五入
 * @param {number} num - 要处理的数字
 * @param {number} decimalPlaces - 保留的小数位数
 * @param {boolean} [abs] - 是否取绝对值，可选
 * @param {boolean} [automatic] - 是否自动获取转换级别（亿、千万、百万、十万、千），可选
 * @param {string} level - 转换级别（亿、千万、百万、十万、千），可选
 * @returns {string} - 格式化后的数字
 * @throws {TypeError} - 如果输入参数类型不正确
 * @throws {RangeError} - 如果保留的小数位数超出合理范围
 */
export function roundAndConvert(
  num: number,
  decimalPlaces: number,
  abs?: boolean,
  automatic?: boolean,
  level?: string,
) {
  // 输入验证
  if (typeof num !== 'number' || isNaN(num)) {
    throw new TypeError('参数 num 必须是有效的数字');
  }

  if (
    typeof decimalPlaces !== 'number' ||
    !Number.isInteger(decimalPlaces) ||
    decimalPlaces < 0 ||
    decimalPlaces > 20
  ) {
    throw new RangeError('参数 decimalPlaces 必须是非负整数，且不超过 20');
  }

  if (automatic !== undefined && typeof automatic !== 'boolean') {
    throw new TypeError('参数 automatic 必须是布尔值');
  }

  if (level !== undefined && typeof level !== 'string') {
    throw new TypeError('参数 level 必须是字符串');
  }

  if (automatic) {
    level = getNumberLevel(num);
  }

  // 如果 level 未传，则直接返回 num 的格式化值
  if (level === undefined) {
    const factor = Math.pow(10, decimalPlaces);
    const result = Number(multiply(bignumber(num), bignumber(factor)));
    const roundedValue = abs ? Math.abs(Math.round(result) / factor) : Math.round(result) / factor;
    return roundedValue.toFixed(decimalPlaces);
  }

  // 根据级别进行转换
  let factor;
  switch (level) {
    case '亿':
      factor = 1e8; // 转换为亿
      break;
    case '千万':
      factor = 1e7; // 转换为千万
      break;
    case '百万':
      factor = 1e6; // 转换为百万
      break;
    case '十万':
      factor = 1e5; // 转换为十万
      break;
    case '万':
      factor = 1e4; // 转换为万
      break;
    default:
      factor = Math.pow(10, decimalPlaces);
      const result = Number(multiply(bignumber(num), bignumber(factor)));
      const roundedValue = abs
        ? Math.abs(Math.round(result) / factor)
        : Math.round(result) / factor;
      return roundedValue.toFixed(decimalPlaces);
  }

  // 进行转换并处理精度
  const convertedValue = num / factor;

  // 处理四舍五入
  const result = Number(
    multiply(bignumber(convertedValue), bignumber(Math.pow(10, decimalPlaces))),
  );
  const roundedValue = abs
    ? Math.abs(Math.round(result) / Math.pow(10, decimalPlaces))
    : Math.round(result) / Math.pow(10, decimalPlaces);

  // 返回格式化后的数字
  return roundedValue.toFixed(decimalPlaces);
}

/**
/**
 * 截取小数并根据级别转换，进行四舍五入
 * @param {number} num - 要处理的数字
 * @param {number} decimalPlaces - 保留的小数位数
 * @param {boolean} [abs] - 是否取绝对值，可选
 * @param {boolean} [automatic] - 是否自动获取转换级别（亿、千万、百万、十万、千），可选
 * @param {string} level - 转换级别（亿、千万、百万、十万、千），可选
 * @returns {string} - 格式化后的数字
 * @throws {TypeError} - 如果输入参数类型不正确
 * @throws {RangeError} - 如果保留的小数位数超出合理范围
 */
export function roundAndConvertCheckNullAndUnDef(
  num: any,
  decimalPlaces: number,
  abs?: boolean,
  automatic?: boolean,
  level?: string,
) {
  if (num == null || num === '') {
    return num;
  }
  num = +num;

  // 输入验证
  if (typeof num !== 'number' || isNaN(num)) {
    throw new TypeError('参数 num 必须是有效的数字');
  }

  if (
    typeof decimalPlaces !== 'number' ||
    !Number.isInteger(decimalPlaces) ||
    decimalPlaces < 0 ||
    decimalPlaces > 20
  ) {
    throw new RangeError('参数 decimalPlaces 必须是非负整数，且不超过 20');
  }

  if (automatic !== undefined && typeof automatic !== 'boolean') {
    throw new TypeError('参数 automatic 必须是布尔值');
  }

  if (level !== undefined && typeof level !== 'string') {
    throw new TypeError('参数 level 必须是字符串');
  }

  if (automatic) {
    level = getNumberLevel(num);
  }

  // 如果 level 未传，则直接返回 num 的格式化值
  if (level === undefined) {
    const factor = Math.pow(10, decimalPlaces);
    const result = Number(multiply(bignumber(num), bignumber(factor)));
    const roundedValue = abs ? Math.abs(Math.round(result) / factor) : Math.round(result) / factor;

    return roundedValue.toFixed(decimalPlaces);
  }

  // 根据级别进行转换
  let factor;
  switch (level) {
    case '亿':
      factor = 1e8; // 转换为亿
      break;
    case '千万':
      factor = 1e7; // 转换为千万
      break;
    case '百万':
      factor = 1e6; // 转换为百万
      break;
    case '十万':
      factor = 1e5; // 转换为十万
      break;
    case '万':
      factor = 1e4; // 转换为万
      break;
    default:
      factor = Math.pow(10, decimalPlaces);
      const roundedValue = abs
        ? Math.abs(Math.round(num * factor) / factor)
        : Math.round(num * factor) / factor;
      return roundedValue.toFixed(decimalPlaces);
  }

  // 进行转换并处理精度
  const convertedValue = num / factor;
  const result = Number(
    multiply(bignumber(convertedValue), bignumber(Math.pow(10, decimalPlaces))),
  );

  // 处理四舍五入
  const roundedValue = abs
    ? Math.abs(Math.round(result) / Math.pow(10, decimalPlaces))
    : Math.round(result) / Math.pow(10, decimalPlaces);

  // 返回格式化后的数字
  return roundedValue.toFixed(decimalPlaces);
}

/**
 * 获取数字的级别
 * @param {number} num - 要处理的数字
 * @returns {string} - 数字的级别
 * @throws {TypeError} - 如果输入参数类型不正确
 */
export function getNumberLevel(num: number) {
  // 输入验证
  if (typeof num !== 'number') {
    throw new TypeError('输入必须是一个数字');
  }

  // 定义级别
  const levels = [
    { threshold: 1e8, label: '亿' }, // 1亿 = 100,000,000
    { threshold: 1e7, label: '千万' }, // 1千万 = 10,000,000
    { threshold: 1e6, label: '百万' }, // 1百万 = 1,000,000
    { threshold: 1e5, label: '十万' }, // 10万 = 100,000
    { threshold: 1e4, label: '万' }, // 1万 = 10,000
    { threshold: 1, label: '' }, // 小于1,000
  ];

  // 处理负数，取绝对值
  num = Math.abs(num);

  // 遍历级别并返回对应的级别
  for (const level of levels) {
    if (num >= level.threshold) {
      return level.label;
    }
  }

  return ''; // 如果小于千，返回空字符串
}

/**
 * 计算数组中每个元素占总和的百分比，并校正误差使总和等于100%
 * @param parts - 数值组成的数组
 * @param decimalPlaces - 保留的小数位数（可选，默认2位）
 * @returns 每个元素及其百分比组成的对象数组
 */
export function calculatePercentages(
  parts: number[],
  decimalPlaces = 2,
): Array<{ value: number; percentage: string }> {
  // 参数验证：确保输入是数组且元素为合法数值
  if (!Array.isArray(parts)) {
    throw new TypeError('The input must be an array of numbers.');
  }

  const filteredParts = parts.filter((value) => typeof value === 'number' && !isNaN(value));

  if (filteredParts.length === 0) {
    return [{ value: 0, percentage: '0' }];
  }

  const total = filteredParts.reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return filteredParts.map((value) => ({ value, percentage: '0' }));
  }

  // 初始百分比计算
  const percentages = filteredParts.map((value) => +((value / total) * 100).toFixed(decimalPlaces));

  // 校正误差
  const totalPercentage = percentages.reduce((sum, p) => sum + p, 0);
  const difference = +(100 - totalPercentage).toFixed(decimalPlaces);

  // 将误差分配给最大值的项
  const maxIndex = percentages.indexOf(Math.max(...percentages));
  percentages[maxIndex] = +(percentages[maxIndex] + difference).toFixed(decimalPlaces);

  // 补零处理，确保百分比格式为 "xx.xx%"
  const formatPercentage = (value: number): string => {
    return value.toFixed(decimalPlaces);
  };

  // 返回结果
  return filteredParts.map((value, index) => ({
    value,
    percentage: formatPercentage(percentages[index]),
  }));
}

/**
 * 获取echarts字体大小
 * @param {number} size 字体大小
 * @param {number} max [14] 最大值
 * @param {number} min [12] 最小值
 */
export const getEchartFontSize = (size: number, max = 14, min = 12) => {
  const clientWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return;
  const fontSize = 100 * (clientWidth / 1920);

  const result = size * fontSize;
  let _size_ = size * fontSize;

  if (result > max) {
    _size_ = 14;
  } else if (result < min) {
    _size_ = 12;
  }

  if (clientWidth <= LAPTOP_WIDTH_SCALE_125) {
    _size_ = 12;
  }

  return _size_;
};
/**
 * 判断数据是否含有最大数， 默认万
 * @param {string} series 数据
 * @param {number} level 级别
 */
export function hasMax(...arg: any[]) {
  const type = Object.prototype.toString.call(arg[0]);
  const [series, level = 10 ** 4] = arg;

  if (type === '[object Array]') {
    const maxArr = (series as any[]).map((item: any) => Math.max(...item.data));
    return !!maxArr.find((item: number) => item > level);
  } else if (type === '[object Number]') {
    return series > level;
  }
}
