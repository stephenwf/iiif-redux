import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';
import { getAllRanges } from './all';
import presentation2Range from './2.x/range';

const range = presentation2Range;

export default range;

export const ranges = resourceListSelectorFactory(getAllRanges, range);

export const rangeByIdSelector = byIdSelectorFactory(range, 'ranges');
