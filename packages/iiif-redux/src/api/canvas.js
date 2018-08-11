import { getAllCanvases } from './all';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';
import presentation2Canvas from './2.x/canvas';

const canvas = presentation2Canvas;

export default canvas;

export const canvases = resourceListSelectorFactory(getAllCanvases, canvas);

export const canvasByIdSelector = byIdSelectorFactory(canvas, 'canvases');
