import { withInstall } from '/@/utils/index.js';
import cardHeader from './src/CardHeader.vue';
import cardBody from './src/CardBody.vue';
import index from './src/index.vue';
import { filterAllowedSlots, cardBodyDate, cardHeaderDate } from './src/data';
export { filterAllowedSlots, cardBodyDate, cardHeaderDate };

export const CardHeader = withInstall(cardHeader);
export const CardBody = withInstall(cardBody);
export const HLCard = withInstall(index);
