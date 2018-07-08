import { schema, normalize } from 'normalizr';

function createEntity(name) {
  const options = {
    idAttribute: '@id',
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
const imageContent = createEntity('imageContents'); // 8
const otherContent = createEntity('otherContents'); // 9
const service = createEntity('services');

// Unofficial types.
const externalResource = createEntity('externalResources');
const choice = createEntity('choices');
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

const rangeMember = new schema.Union(
  {
    canvas,
    range,
  },
  input => (input['@type'] === 'sc:Canvas' ? 'canvas' : 'range')
);

const canvasReference = createEntity('canvasReference');

// @todo add in choice.

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
  homepage: [externalResource],
  rendering: [externalResource],
  partOf: partOf,

  // Extra.
  thumbnail: [imageContent],
  posterCanvas: canvas,
});

// ===========================================================================
// 2) Manifests
// ===========================================================================
manifest.define({
  items: [canvases],
  structures: [range],
  annotations: [annotationPage],

  // Linking
  seeAlso: [externalResource],
  service: [service],
  homepage: [externalResource],
  rendering: [externalResource],
  otherContent: [annotationPage],
  partOf: partOf,

  // Extra
  thumbnail: [imageContent],
  start: canvas,
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
  homepage: [externalResource],
  rendering: [externalResource],
  otherContent: [annotationPage],
  partOf: partOf,

  // Extra
  thumbnail: [imageContent],
  posterCanvas: canvas,
});

// ===========================================================================
// 4) Annotation
// ===========================================================================
annotation.define({
  // Structural.
  body: new schema.Union(
    {
      imageContent,
      externalResource,
      choice,
    },
    input => {
      switch (input.type) {
        case 'Image':
          return 'imageContent';
        case 'Choice':
          return 'choice';

        // @todo more content to add.
        default:
          return 'externalResource';
      }
    }
  ),
  target: canvas,

  // Linking
  seeAlso: [externalResource],
  service: [service],
  homepage: [externalResource],
  rendering: [externalResource],
  partOf: partOf,

  // Extra
  thumbnail: [imageContent],
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
  homepage: [externalResource],
  rendering: [externalResource],
  partOf: partOf,

  // extra
  thumbnail: [imageContent],
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
  homepage: [externalResource],
  rendering: [externalResource],
  partOf: partOf,
});

// ===========================================================================
// 7) Range
// ===========================================================================

// Range: posterCanvas: canvas,
// Range: supplementary: annotationCollection

// ===========================================================================
// 8) Image Content
// ===========================================================================

// ===========================================================================
// 9) Other Content
// ===========================================================================

// ===========================================================================
// 10) Service
// ===========================================================================

// ===========================================================================
// 11) External Resource
// ===========================================================================

// ===========================================================================
// 12) Choice
// ===========================================================================

// ===========================================================================
// 13) Canvas Reference
// ===========================================================================
canvasReference.define({
  source: canvas,
});
