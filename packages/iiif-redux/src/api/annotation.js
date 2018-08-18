import { PRESENTATION_2, PRESENTATION_3 } from '../constants/presentation';
import byIdSelectorFactory from '../utility/new/byIdSelectorFactory';
import resourceListSelectorFactory from '../utility/new/resourceListSelectorFactory';
import resourceSelectorFactory from '../utility/new/resourceSelectorFactory';
import presentation2Annotation from './2.x/annotation';
import presentation3Annotation from './3.x/annotation';
import { getAllAnnotations } from './all';

const annotation = resourceSelectorFactory(
  'annotations',
  {
    [PRESENTATION_2]: presentation2Annotation,
    [PRESENTATION_3]: presentation3Annotation,
  },
  PRESENTATION_2
);

export default annotation;

export const annotations = resourceListSelectorFactory(
  getAllAnnotations,
  annotation
);

export const annotationByIdSelector = byIdSelectorFactory(
  annotation,
  'annotations'
);
