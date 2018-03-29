/**
 * Presentation 2 - schema definition
 * ============================================================================
 *
 * - Collection
 * - Manifest
 * - Sequence
 * - Canvas
 * - Annotation
 * - AnnotationList
 * - Range
 * - Layer
 * - Image Content (Annotation)
 * - Other Content (Annotation List)
 *
 * - External resources
 * - Services
 */

// @todo Image Service API.

import { schema } from 'normalizr';
import {
  normalizeLinkedResources,
  preprocessLinkedEntities,
} from '../api/iiif-linking';

function createEntity(name, hasLinked = true) {
  const options = { idAttribute: '@id' };
  if (hasLinked) {
    options.processStrategy = preprocessLinkedEntities;
  }
  return new schema.Entity(name, {}, options);
}

const collection = createEntity('collections');
const manifest = createEntity('manifests');
const sequence = createEntity('sequences');
const canvas = createEntity('canvases');
const annotation = createEntity('annotations');
const annotationList = createEntity('annotationLists');
const range = createEntity('range');
const layer = createEntity('layers');
const imageResource = createEntity('imageResources'); // thumbnails + image service

// Unofficial types?
const externalResource = createEntity('externalResources', false);
const service = createEntity('services', false);
const within = new schema.Array(
  {
    externalResource,
    layer,
  },
  entity => (entity['@type'] === 'sc:Layer' ? 'layer' : 'externalResource')
);

// ===========================================================================
// 1) Collections
// ===========================================================================
collection.define({
  collections: new schema.Array(
    {
      collection,
      manifest,
    },
    entity => (entity['@type'] === 'sc:Manifest' ? 'manifest' : 'collection')
  ),
  manifests: [manifest],
  members: new schema.Array(
    {
      collection,
      manifest,
    },
    entity => (entity['@type'] === 'sc:Manifest' ? 'manifest' : 'collection')
  ),

  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: [within],

  // Extra
  thumbnail: imageResource,
});

// ===========================================================================
// 2) Manifests
// ===========================================================================
manifest.define({
  sequences: [sequence],
  structures: [range],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: [within],

  // Extra
  thumbnail: imageResource,
});

// ===========================================================================
// 3) Sequences
// ===========================================================================
sequence.define({
  canvases: [canvas],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: [within],
  startCanvas: canvas,

  // Extra
  thumbnail: imageResource,
});

// ===========================================================================
// 4) Canvases
// ===========================================================================
canvas.define({
  images: [annotation],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: [within],

  // Extra
  thumbnail: imageResource,
});

// ===========================================================================
// 5) Annotation
// ===========================================================================
annotation.define({
  resource: new schema.Union(
    {
      imageResource,
      externalResource,
    },
    input =>
      input['@type'] === 'dctypes:Image' ? 'imageResource' : 'externalResource'
  ),
  on: canvas,

  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: [within],

  // Extra
  thumbnail: imageResource,
});

// ===========================================================================
// 6) Annotation List
// ===========================================================================
annotationList.define({
  resources: [annotation],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: [within],

  // Extra
  thumbnail: imageResource,
});

// ===========================================================================
// 7) Range
// ===========================================================================
range.define({
  resources: [annotation],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: [within],
  startCanvas: canvas,
  contentLayer: layer,

  // Extra
  thumbnail: imageResource,
});

// ===========================================================================
// 8) Layer
// ===========================================================================
layer.define({
  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: [within],
});

export {
  collection,
  manifest,
  sequence,
  canvas,
  annotation,
  annotationList,
  range,
  layer,
  imageResource,
  externalResource,
  within,
  service,
};
