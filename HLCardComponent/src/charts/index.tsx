import { withInstall } from '/@/utils';
import barEcharts from './bar/BarEcharts.vue';
import linEcharts from './line/lineEcharts.vue';
import pieEcharts from './pie/PieEcharts.vue';

export const BarEcharts = withInstall(barEcharts);
export const LinEcharts = withInstall(linEcharts);
export const PieEcharts = withInstall(pieEcharts);
// export { linEcharts } from './src/pieEcharts';
