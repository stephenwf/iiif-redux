import byIdSelectorFactory from '../utility/byIdSelectorFactory';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import presentation2Annotation from './2.x/annotation';
import { getAllAnnotations } from './all';

const annotation = presentation2Annotation;

export default annotation;

export const annotations = resourceListSelectorFactory(
  getAllAnnotations,
  annotation
);

export const annotationByIdSelector = byIdSelectorFactory(
  annotation,
  'annotations'
);
