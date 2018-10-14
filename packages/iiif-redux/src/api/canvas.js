import { PRESENTATION_2, PRESENTATION_3 } from '../constants/presentation';
import resourceSelectorFactory from '../utility/new/resourceSelectorFactory';
import { getAllCanvases } from './all';
import resourceListSelectorFactory from '../utility/new/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/new/byIdSelectorFactory';
import presentation2Canvas from './2.x/canvas';
import presentation3Canvas from './3.x/canvas';

const canvas = resourceSelectorFactory(
  'canvases',
  {
    [PRESENTATION_2]: presentation2Canvas,
    [PRESENTATION_3]: presentation3Canvas,
  },
  PRESENTATION_2
);

export default canvas;

export const canvases = resourceListSelectorFactory(getAllCanvases, canvas);

export const canvasByIdSelector = byIdSelectorFactory(canvas, 'canvases');
