import { schema, normalize } from 'normalizr';
import { compose } from 'redux';
import addMissingIds from '../compat/addMissingIds';

function createEntity(name) {
  const options = {
    idAttribute: 'id',
  };

  return new schema.Entity(name, {}, options);
}

const collection = createEntity('collections'); // 1
const manifest = createEntity('manifests'); // 2
const canvas = createEntity('canvases'); // 3
const annotation = createEntity('annotations'); // 4
const annotationPage = createEntity('annotationPages'); // 5
const annotationCollection = createEntity('annotationCollection'); // 6
const range = createEntity('ranges'); // 7
const contentResource = createEntity('contentResources'); // 8
const choice = createEntity('choices'); // 9
const canvasReference = createEntity('canvasReference'); // 10

// Unofficial types.
const externalResource = createEntity('externalResources');
const service = createEntity('services');

// Union types
const partOf = new schema.Array(
  {
    collection,
    manifest,
    externalResource,
    annotationCollection,
  },
  entity => {
    switch (entity.type) {
      case 'Collection':
        return 'collection';
      case 'Manifest':
        return 'manifest';
      case 'AnnotationCollection':
        return 'annotationCollection';
      default:
        return 'externalResource';
    }
  }
);

const canvasOrReference = new schema.Union(
  {
    canvasReference,
    canvas,
  },
  entity => {
    if (entity.type === 'SpecificResource') {
      return 'canvasReference';
    }
    return 'canvas';
  }
);

const annotationBody = new schema.Union(
  {
    contentResource,
    externalResource,
    choice,
  },
  input => {
    switch (input.type) {
      case 'Application':
      case 'Dataset':
      case 'Image':
      case 'Sound':
      case 'Text':
      case 'Video':
      case 'TextualBody':
        return 'contentResource';
      case 'Choice':
        return 'choice';

      // @todo more content to add.
      default:
        return 'externalResource';
    }
  }
);

const rangeItem = new schema.Union(
  {
    canvas,
    range,
    canvasReference,
  },
  input => {
    switch (input.type) {
      case 'Canvas':
        return 'canvas';
      case 'Range':
        return 'range';
      case 'SpecificResource':
      default:
        // @todo default?
        return 'canvasReference';
    }
  }
);

// Root resource
/**
 * Dereferencable resources:
 *
 * - Collection (Required)
 * - Manifest (Required)
 * - Canvas (Recommended)
 * - Annotation (Recommended)
 * - AnnotationPage (Required)
 * - AnnotationCollection (Optional)
 * - Content Resource (Required)
 * - Range (Optional)
 */
const RESOURCE_TYPE_MAP = {
  Collection: 'collection',
  Sequence: 'sequence',
  Manifest: 'manifest',
  Canvas: 'canvas',
  AnnotationCollection: 'annotationCollection',
  AnnotationPage: 'annotationPage',
  Annotation: 'annotation',
  Range: 'range',
  // Content resources.
  Application: 'contentResource',
  Dataset: 'contentResource',
  Image: 'contentResource',
  Sound: 'contentResource',
  Text: 'contentResource',
  Video: 'contentResource',
  TextualBody: 'contentResource',
};
const resource = new schema.Union(
  {
    collection,
    manifest,
    canvas,
    annotationCollection,
    annotationPage,
    annotation,
    range,
    contentResource,
    service,
  },
  entity => {
    if (RESOURCE_TYPE_MAP[entity.type]) {
      return RESOURCE_TYPE_MAP[entity.type];
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
  // Structural
  items: new schema.Array(
    {
      collection,
      manifest,
    },
    entity => (entity.type === 'Manifest' ? 'manifest' : 'collection')
  ),
  annotations: [annotationPage],

  // Linking.
  seeAlso: [externalResource],
  service: [service],
  logo: [contentResource],
  homepage: externalResource,
  rendering: [externalResource],
  partOf: partOf,

  // Extra.
  thumbnail: [contentResource],
  posterCanvas: canvas,
});

// ===========================================================================
// 2) Manifests
// ===========================================================================
manifest.define({
  items: [canvas],
  structures: [range],
  annotations: [annotationPage],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  logo: [contentResource],
  homepage: externalResource,
  rendering: [externalResource],
  partOf: partOf,
  start: canvasOrReference,

  // Extra
  thumbnail: [contentResource],
  posterCanvas: canvas,
});

// ===========================================================================
// 3) Canvases
// ===========================================================================
canvas.define({
  // Structural.
  items: [annotationPage],
  annotations: [annotationPage],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  logo: [contentResource],
  homepage: externalResource,
  rendering: [externalResource],
  partOf: partOf,

  // Extra
  thumbnail: [contentResource],
  posterCanvas: canvas,
});

// ===========================================================================
// 4) Annotation
// ===========================================================================
annotation.define({
  // Structural.
  body: annotationBody,
  target: canvas,

  // Linking
  seeAlso: [externalResource],
  service: [service],
  logo: [contentResource],
  homepage: externalResource,
  rendering: [externalResource],
  partOf: partOf,

  // Extra
  thumbnail: [contentResource],
});

// ===========================================================================
// 5) Annotation Collection
// ===========================================================================
annotationCollection.define({
  // Structural.
  items: [annotationPage],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  logo: [contentResource],
  homepage: externalResource,
  rendering: [externalResource],
  partOf: partOf,

  // extra
  thumbnail: [contentResource],

  // Paging.
  first: annotationPage,
  last: annotationPage,
});

// ===========================================================================
// 6) Annotation Page
// ===========================================================================
annotationPage.define({
  // Structural.
  items: [annotation],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  logo: [contentResource],
  homepage: externalResource,
  rendering: [externalResource],
  partOf: partOf,

  // Extra
  thumbnail: [contentResource],

  // Paging.
  next: annotationPage,
  previous: annotationPage,
});

// ===========================================================================
// 7) Range
// ===========================================================================
range.define({
  // Structural.
  items: [rangeItem],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  logo: [contentResource],
  homepage: externalResource,
  rendering: [externalResource],
  partOf: partOf,
  start: canvasOrReference,
  supplementary: annotationCollection,

  // Extra
  thumbnail: [contentResource],
});

// ===========================================================================
// 8) Content Resource
// ===========================================================================
contentResource.define({
  // Linking.
  seeAlso: [externalResource],
  service: [service],
  logo: [contentResource],
  rendering: [externalResource],
  partOf: partOf,
});

// ===========================================================================
// 9) Choice
// ===========================================================================
choice.define({
  default: annotation,
  item: [annotation],
});

// ===========================================================================
// 10) Canvas Reference
// ===========================================================================
canvasReference.define({
  source: canvas,
});

const preprocess = compose(addMissingIds(3.0));

const normalizeResource = (rawResource, customSchema = resource) =>
  normalize(preprocess(rawResource), customSchema);

export {
  collection,
  manifest,
  canvas,
  annotation,
  annotationPage,
  annotationCollection,
  range,
  contentResource,
  choice,
  canvasReference,
  externalResource,
  service,
  partOf,
  annotationBody,
  rangeItem,
  RESOURCE_TYPE_MAP,
  resource,
  preprocess,
  normalizeResource as normalize,
};
