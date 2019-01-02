import canvas from '../../../../src/api/3.x/canvas';

describe('api/3.x/canvas/algorithms', () => {
  const { getImageService } = canvas(
    s => s.resources.canvases['http://iiif.com/canvas-1.json']
  );

  const state = {
    resources: {
      canvases: {
        'http://iiif.com/canvas-1.json': {
          id: 'http://iiif.com/canvas-1.json',
          type: 'Canvas',
          label: 'canvas label',
          items: [
            'http://iiif.com/annotation-page-1.json',
            'http://iiif.com/annotation-page-empty.json',
          ],
        },
      },
      annotationPages: {
        'http://iiif.com/annotation-page-1.json': {
          id: 'http://iiif.com/annotation-page-1.json',
          type: 'AnnotationPage',
          items: [
            'http://iiif.com/image-1.json',
            'http://iiif.com/empty-body.json',
            'http://iiif.com/image-2.json',
            'http://iiif.com/image-find-me.json',
            'http://iiif.com/image-2.json',
          ],
        },
        'http://iiif.com/annotation-page-empty.json': {
          id: 'http://iiif.com/annotation-page-empty.json',
          type: 'AnnotationPage',
        },
      },
      annotations: {
        'http://iiif.com/image-1.json': {
          id: 'http://iiif.com/image-1.json',
          type: 'Annotation',
          motivation: 'painting',
          body: [
            {
              id: 'http://iiif.com/image-resource-1.jpg',
              schema: 'contentResource',
            },
          ],
        },
        'http://iiif.com/image-2.json': {
          id: 'http://iiif.com/image-2.json',
          type: 'Annotation',
          motivation: 'painting',
          body: [
            {
              id: 'http://iiif.com/image-resource-2.jpg',
              schema: 'contentResource',
            },
          ],
        },
        'http://iiif.com/image-find-me.json': {
          id: 'http://iiif.com/image-find-me.json',
          type: 'Annotation',
          motivation: 'painting',
          body: [
            {
              id: 'http://iiif.com/image-find-me.jpg',
              schema: 'contentResource',
            },
          ],
        },
        'http://iiif.com/empty-body.json': {
          id: 'http://iiif.com/empty-body.json',
          type: 'Annotation',
          motivation: 'painting',
          body: [
            {
              id: 'http://iiif.com/not-an-image',
              schema: 'layer',
            },
          ],
        },
      },
      contentResources: {
        'http://iiif.com/image-find-me.jpg': {
          id: 'http://iiif.com/image-resource-1.jpg',
          type: 'Image',
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
          id: 'http://iiif.com/image-resource-1.jpg',
          type: 'Image',
          format: 'image/jpeg',
          height: 1868,
          width: 2500,
          service: [
            'http://iiif.com/service-1.json',
            'http://iiif.com/service-2.json',
          ],
        },
        'http://iiif.com/image-resource-2.jpg': {
          id: 'http://iiif.com/image-resource-2.jpg',
          type: 'Image',
          format: 'image/jpeg',
          height: 1868,
          width: 2500,
        },
      },
      services: {
        'http://iiif.com/image-service-find-me.json': {
          id: 'http://iiif.com/image-service-1.json',
          label: 'Image service 1',
          profile: 'level2',
        },
        'http://iiif.com/service-1.json': {
          id: 'http://iiif.com/service-1.json',
          label: 'Service 1',
          profile: 'http://iiif.io/unsupported-service.json',
        },
        'http://iiif.com/service-2.json': {
          id: 'http://iiif.com/service-2.json',
          label: 'Service 2',
          profile: 'http://iiif.io/unsupported-service-2.json',
        },
      },
    },
  };

  it('should find search service', () => {
    expect(getImageService(state)).toEqual({
      id: 'http://iiif.com/image-service-1.json',
      label: 'Image service 1',
      profile: 'level2',
    });
  });
});
