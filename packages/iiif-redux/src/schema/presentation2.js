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
import { compose } from 'redux';
import { schema, normalize } from 'normalizr';
import moveStartCanvasToSequence from '../compat/moveStartCanvasToSequence';
import preprocessLinkedEntities from '../compat/preprocessLinkedEntities';
import addMissingIds from '../compat/addMissingIds';

function createEntity(name) {
  const options = {
    idAttribute: '@id',
  };

  return new schema.Entity(name, {}, options);
}

const collection = createEntity('collections');
const manifest = createEntity('manifests');
const sequence = createEntity('sequences');
const canvas = createEntity('canvases');
const annotation = createEntity('annotations');
const annotationList = createEntity('annotationLists');
const range = createEntity('ranges');
const layer = createEntity('layers');
const imageResource = createEntity('imageResources'); // thumbnails + image service
const choice = createEntity('choices');

// Unofficial types?
const externalResource = createEntity('externalResources');
const service = createEntity('services', true);
const within = new schema.Array(
  {
    collection,
    manifest,
    externalResource,
    layer,
  },
  entity => {
    switch (entity['@type']) {
      case 'sc:Collection':
        return 'collection';
      case 'sc:Manifest':
        return 'manifest';
      case 'sc:Layer':
        return 'layer';
      default:
        return 'externalResource';
    }
  }
);

const rangeMember = new schema.Union(
  {
    canvas,
    range,
  },
  input => (input['@type'] === 'sc:Canvas' ? 'canvas' : 'range')
);

/**
 * Dereferencable resources:
 *
 * - Collection (Required)
 * - Manifest (Required)
 * - First Sequence (Optional)
 * - Nth Sequence (Required)
 * - Canvas (Optional)
 * - Annotation (Recommended)
 * - AnnotationList (Required)
 * - Range (Optional)
 * - Layer (Optional)
 * - Image Content (Required)
 * - Other Content (Required)
 */
const RESOURCE_TYPE_MAP = {
  'sc:Collection': 'collection',
  'sc:Sequence': 'sequence',
  'sc:Manifest': 'manifest',
  'sc:Canvas': 'canvas',
  'sc:AnnotationList': 'annotationList',
  'sc:Annotation': 'annotation',
  'sc:Range': 'range',
  'sc:Layer': 'layer',
  'dctypes:Image': 'imageResource',
};
const resource = new schema.Union(
  {
    collection,
    sequence,
    manifest,
    canvas,
    annotationList,
    annotation,
    range,
    layer,
    imageResource,
    service,
  },
  entity => {
    if (RESOURCE_TYPE_MAP[entity['@type']]) {
      return RESOURCE_TYPE_MAP[entity['@type']];
    }
    if (entity.profile) {
      return 'service';
    }
    throw Error('Unknown entity type');
  }
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
  otherContent: [annotationList],
  within: within,

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
  otherContent: [annotationList],
  within: within,

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
  otherContent: [annotationList],
  within: within,
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
  otherContent: [annotationList],
  within: within,

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
      choice,
    },
    input => {
      switch (input['@type']) {
        case 'dctypes:Image':
          return 'imageResource';
        case 'oa:Choice':
          return 'choice';
        default:
          return 'externalResource';
      }
    }
  ),
  on: canvas,

  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: within,

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
  within: within,

  // Extra
  thumbnail: imageResource,
});

// ===========================================================================
// 7) Range
// ===========================================================================
range.define({
  resources: [annotation],
  members: [rangeMember],
  canvases: [canvas],
  ranges: [range],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  related: [externalResource],
  rendering: [externalResource],
  within: within,
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
  within: within,
});

// ===========================================================================
// 9) Image resource
// ===========================================================================
imageResource.define({
  service: [service],
});

// ===========================================================================
// 10) Choice
// ===========================================================================
choice.define({
  default: annotation,
  item: [annotation],
});

const preprocess = compose(
  moveStartCanvasToSequence,
  preprocessLinkedEntities,
  addMissingIds
);

const normalizeResource = (rawResource, customSchema = resource) =>
  normalize(preprocess(rawResource), customSchema);

export {
  normalizeResource as normalize,
  preprocess,
  resource,
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
