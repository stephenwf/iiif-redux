import { getAllSequences } from './all';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';
import presentation2Sequence from './2.x/sequence';

const sequence = presentation2Sequence;

export default sequence;

export const sequences = resourceListSelectorFactory(getAllSequences, sequence);

export const sequenceByIdSelector = byIdSelectorFactory(sequence, 'sequences');
