import { schema, normalize } from 'normalizr';
import { compose } from 'redux';
import addMissingIds from '../compat/addMissingIds';
import parseSelectorTarget from '../utility/parseTargetSelector';

function createEntity(name, processStrategy) {
  const options = {
    idAttribute: 'id',
  };
  if (processStrategy) {
    options.processStrategy = processStrategy;
  }

  return new schema.Entity(name, {}, options);
}

const collection = createEntity('collections'); // 1
const manifest = createEntity('manifests'); // 2
const canvas = createEntity('canvases'); // 3
const annotation = createEntity('annotations', original => {
  const body = Array.isArray(original.body) ? original.body : [original.body];
  const target = Array.isArray(original.target)
    ? original.target
    : [original.target];
  const newObj = { ...original };
  if (original.body) {
    newObj.body = body;
  }
  if (original.target) {
    newObj.target = target;
  }
  return newObj;
}); // 4
const annotationPage = createEntity('annotationPages'); // 5
const annotationCollection = createEntity('annotationCollections'); // 6
const range = createEntity('ranges'); // 7
const contentResource = createEntity('contentResources'); // 8
const choice = createEntity('choices'); // 9
const canvasReference = createEntity('canvasReferences'); // 10
const selector = new schema.Entity(
  'selectors',
  {
    id: canvas,
  },
  {
    processStrategy(value, parent, key) {
      // @todo This is an impossible path to hit. The process strategy is a strange function that
      // doesn't always hit the containing code. Will need to review at a later date.
      // if (typeof value === 'string') {
      //   return parseSelectorTarget(value);
      // }
      const id = value['@id'] || value.id;
      if (id) {
        return parseSelectorTarget(id);
      }
      return value;
    },
  }
);

// Unofficial types.
const service = createEntity('services');

// Union types
const partOf = new schema.Array(
  {
    collection,
    manifest,
    contentResource,
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
        return 'contentResource';
    }
  }
);

const canvasOrReference = new schema.Union(
  {
    selector,
    canvasReference,
    canvas,
  },
  entity => {
    if (entity && entity.id && entity.id.indexOf('#') !== -1) {
      return 'selector';
    }
    if (entity.type === 'SpecificResource') {
      return 'canvasReference';
    }
    return 'canvas';
  }
);

const annotationBodyMappings = {
  Choice: 'choice',
  Application: 'contentResource',
  Dataset: 'contentResource',
  Image: 'contentResource',
  Sound: 'contentResource',
  Text: 'contentResource',
  Video: 'contentResource',
  TextualBody: 'contentResource',
};
const annotationBody = new schema.Union(
  {
    contentResource,
    choice,
  },
  input => {
    if (annotationBodyMappings[input.type]) {
      return annotationBodyMappings[input.type];
    }
    return 'contentResource';
  }
);

const rangeItem = new schema.Union(
  {
    canvas,
    selector,
    range,
    canvasReference,
  },
  input => {
    if (input && input.id && input.id.indexOf('#') !== -1) {
      return 'selector';
    }

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
  seeAlso: [contentResource],
  service: [service],
  logo: [contentResource],
  homepage: contentResource,
  rendering: [contentResource],
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
  seeAlso: [contentResource],
  service: [service],
  logo: [contentResource],
  homepage: contentResource,
  rendering: [contentResource],
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
  seeAlso: [contentResource],
  service: [service],
  logo: [contentResource],
  homepage: contentResource,
  rendering: [contentResource],
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
  body: [annotationBody],
  target: [selector],

  // Linking
  seeAlso: [contentResource],
  service: [service],
  logo: [contentResource],
  homepage: contentResource,
  rendering: [contentResource],
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
  seeAlso: [contentResource],
  service: [service],
  logo: [contentResource],
  homepage: contentResource,
  rendering: [contentResource],
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
  seeAlso: [contentResource],
  service: [service],
  logo: [contentResource],
  homepage: contentResource,
  rendering: [contentResource],
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
  annotations: [annotationPage],

  // Linking
  seeAlso: [contentResource],
  service: [service],
  logo: [contentResource],
  homepage: contentResource,
  rendering: [contentResource],
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
  seeAlso: [contentResource],
  service: [service],
  logo: [contentResource],
  rendering: [contentResource],
  partOf: partOf,
  // Structural
  annotations: [annotationPage],
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
  service,
  partOf,
  annotationBody,
  rangeItem,
  RESOURCE_TYPE_MAP,
  resource,
  preprocess,
  normalizeResource as normalize,
};
