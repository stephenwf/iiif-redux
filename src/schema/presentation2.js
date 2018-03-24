import { schema } from 'normalizr';

const image = new schema.Entity('images', {}, { idAttribute: '@id' });
const imageAnnotations = new schema.Entity(
  'imageAnnotations',
  {
    resource: image,
  },
  { idAttribute: '@id' }
);

const canvas = new schema.Entity(
  'canvases',
  {
    thumbnail: image,
    images: [imageAnnotations],
  },
  { idAttribute: '@id' }
);

const sequence = new schema.Entity(
  'sequences',
  {
    canvases: [canvas],
  },
  { idAttribute: '@id' }
);

const range = new schema.Entity(
  'ranges',
  {
    canvases: [canvas],
  },
  { idAttribute: '@id' }
);

const manifest = new schema.Entity(
  'manifests',
  {
    sequences: [sequence],
    structures: [range],
  },
  { idAttribute: '@id' }
);

const collection = new schema.Entity('collections');

collection.define({
  collections: [collection],
  manifests: [manifest],
});

export {
  image,
  imageAnnotations,
  canvas,
  sequence,
  range,
  manifest,
  collection,
};
