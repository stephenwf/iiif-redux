import annotationCollection, {
  mappings as annotationCollectionMapping,
} from './annotation-collection';
import annotationPage, {
  mappings as annotationPageMapping,
} from './annotation-page';
import annotation, { mappings as annotationMapping } from './annotation';
import canvas, { mappings as canvasMapping } from './canvas';
import collection, { mappings as collectionMapping } from './collection';
import contentResource, {
  mappings as contentResourceMapping,
} from './content-resource';
import manifest, { mappings as manifestMapping } from './manifest';
import range, { mappings as rangeMapping } from './range';

export const mappings = {
  annotationCollection: annotationCollectionMapping,
  annotationPage: annotationPageMapping,
  annotation: annotationMapping,
  canvas: canvasMapping,
  collection: collectionMapping,
  contentResource: contentResourceMapping,
  manifest: manifestMapping,
  range: rangeMapping,
};

export {
  annotationCollection,
  annotationPage,
  annotation,
  canvas,
  collection,
  contentResource,
  manifest,
  range,
};
