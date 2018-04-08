import { getImageService } from '../../../src/api/current-canvas';

describe('api/current-canvas/algorithms', () => {
  const state = {
    routing: { currentCanvas: 'http://iiif.com/canvas-1.json' },
    config: { defaultLanguage: 'en' },
    resources: {
      canvases: {
        'http://iiif.com/canvas-1.json': {
          '@id': 'http://iiif.com/canvas-1.json',
          label: 'canvas label',
          images: [
            'http://iiif.com/layer-1.json',
            'http://iiif.com/image-1.json',
            'http://iiif.com/image-find-me.json',
            'http://iiif.com/layer-2.json',
            'http://iiif.com/image-2.json',
          ],
        },
      },
      annotations: {
        'http://iiif.com/image-1.json': {
          '@id': 'http://iiif.com/image-1.json',
          resource: {
            id: 'http://iiif.com/image-resource-1.jpg',
            schema: 'imageResource',
          },
        },
        'http://iiif.com/image-2.json': {
          '@id': 'http://iiif.com/image-2.json',
          resource: {
            id: 'http://iiif.com/image-resource-3.jpg',
            schema: 'imageResource',
          },
        },
        'http://iiif.com/layer-1.json': {
          '@id': 'http://iiif.com/layer-1.json',
          resource: {
            id: 'http://iiif.com/layer-resource-1.json',
            schema: 'layer',
          },
        },
        'http://iiif.com/layer-2.json': {
          '@id': 'http://iiif.com/layer-2.json',
          resource: {
            id: 'http://iiif.com/layer-resource-2.json',
            schema: 'layer',
          },
        },
        'http://iiif.com/image-find-me.json': {
          '@id': 'http://iiif.com/image-find-me.json',
          resource: {
            id: 'http://iiif.com/image-find-me.jpg',
            schema: 'imageResource',
          },
        },
      },
      imageResources: {
        'http://iiif.com/image-find-me.jpg': {
          '@id': 'http://iiif.com/image-resource-1.jpg',
          '@type': 'dctypes:Image',
          format: 'image/jpeg',
          height: 1868,
          width: 2500,
          service: [
            'http://iiif.com/service-1.json',
            'http://iiif.com/image-service-find-me.json',
            'http://iiif.com/service-2.json',
          ],
        },
        'http://iiif.com/image-resource-1.jpg': {
          '@id': 'http://iiif.com/image-resource-1.jpg',
          '@type': 'dctypes:Image',
          format: 'image/jpeg',
          height: 1868,
          width: 2500,
          service: [
            'http://iiif.com/service-1.json',
            'http://iiif.com/service-2.json',
          ],
        },
        'http://iiif.com/image-resource-2.jpg': {
          '@id': 'http://iiif.com/image-resource-2.jpg',
          '@type': 'dctypes:Image',
          format: 'image/jpeg',
          height: 1868,
          width: 2500,
          service: [
            'http://iiif.com/service-1.json',
            'http://iiif.com/service-2.json',
          ],
        },
      },
      services: {
        'http://iiif.com/image-service-find-me.json': {
          '@id': 'http://iiif.com/image-service-1.json',
          label: 'Image service 1',
          profile: 'http://iiif.io/api/image/2/profiles/level2.json',
        },
        'http://iiif.com/service-1.json': {
          '@id': 'http://iiif.com/service-1.json',
          label: 'Service 1',
          profile: 'http://iiif.io/unsupported-service.json',
        },
        'http://iiif.com/service-2.json': {
          '@id': 'http://iiif.com/service-2.json',
          label: 'Service 2',
          profile: 'http://iiif.io/unsupported-service-2.json',
        },
      },
    },
  };

  it('should find search service', () => {
    expect(getImageService(state)).toEqual({
      '@id': 'http://iiif.com/image-service-1.json',
      label: 'Image service 1',
      profile: 'http://iiif.io/api/image/2/profiles/level2.json',
    });
  });
});
