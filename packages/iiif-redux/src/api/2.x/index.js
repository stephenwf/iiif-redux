import annotationList, {
  mappings as annotationListMapping,
} from './annotation-list';
import annotation, { mappings as annotationMapping } from './annotation';
import canvas, { mappings as canvasMapping } from './canvas';
import collection, { mappings as collectionMapping } from './collection';
import externalResource, {
  mappings as externalResourceMapping,
} from './external-resource';
import imageResource, {
  mappings as imageResourceMapping,
} from './image-resource';
import manifest, { mappings as manifestMapping } from './manifest';
import range, { mappings as rangeMapping } from './range';
import sequence, { mappings as sequenceMapping } from './sequence';

export const mappings = {
  annotationList: annotationListMapping,
  annotation: annotationMapping,
  canvas: canvasMapping,
  collection: collectionMapping,
  externalResource: externalResourceMapping,
  imageResource: imageResourceMapping,
  manifest: manifestMapping,
  range: rangeMapping,
  sequence: sequenceMapping,

  // Aliases.
  annotationPage: annotationListMapping,
  contentResources: imageResourceMapping, // @todo change when image/external get merged.
};

export {
  annotationCollection,
  annotationList,
  annotation,
  canvas,
  collection,
  externalResource,
  imageResource,
  manifest,
  range,
  sequence,
};
