import annotation from '../../../src/api/annotation';
import canvas from '../../../src/api/canvas';

describe('api/annotation/structural', () => {
  const state = {
    resources: {
      annotations: {
        'http://iiif.com/image-1.json': {
          '@id': 'http://iiif.com/image-1.json',
          resource: {
            id: 'http://iiif.com/image-resource-1.jpg',
            schema: 'imageResource',
          },
          on: 'http://iiif.com/canvas-1.json',
        },
        'http://iiif.com/image-2.json': {
          '@id': 'http://iiif.com/image-2.json',
          resource: {
            id: 'http://iiif.com/image-resource-3.jpg',
            schema: 'imageResource',
          },
          on: 'http://iiif.com/canvas-2.json',
        },
        'http://iiif.com/layer-1.json': {
          '@id': 'http://iiif.com/layer-1.json',
          resource: {
            id: 'http://iiif.com/layer-resource-1.json',
            schema: 'layer',
          },
          on: 'http://iiif.com/canvas-3.json',
        },
        'http://iiif.com/layer-2.json': {
          '@id': 'http://iiif.com/layer-2.json',
          resource: [
            {
              id: 'http://iiif.com/layer-resource-2.json',
              schema: 'layer',
            },
            {
              id: 'http://iiif.com/image-find-me.jpg',
              schema: 'imageResource',
            },
          ],
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
      canvases: {
        'http://iiif.com/canvas-1.json': {
          '@id': 'http://iiif.com/canvas-1.json',
          label: [{ '@language': 'none', '@value': 'canvas label' }],
        },
        'http://iiif.com/canvas-3.json': {
          '@id': 'http://iiif.com/canvas-3.json',
        },
      },
    },
  };

  it('should get image ids', () => {
    const { getResourceId } = annotation(
      s => s.resources.annotations['http://iiif.com/image-1.json']
    );
    expect(getResourceId(state)).toEqual(
      'http://iiif.com/image-resource-1.jpg'
    );
  });

  it('should get image', () => {
    const { getResource } = annotation(
      s => s.resources.annotations['http://iiif.com/image-1.json']
    );
    expect(getResource(state)).toEqual({
      '@id': 'http://iiif.com/image-resource-1.jpg',
      '@type': 'dctypes:Image',
      format: 'image/jpeg',
      height: 1868,
      service: [
        'http://iiif.com/service-1.json',
        'http://iiif.com/service-2.json',
      ],
      width: 2500,
    });
  });

  it('should return null when image does not exist', () => {
    const { getResource } = annotation(
      s => s.resources.annotations['http://iiif.com/layer-1.json']
    );
    expect(getResource(state)).toEqual(null);
  });

  it('should not return image service if not valid service', () => {
    const { getImageService } = annotation(
      s => s.resources.annotations['http://iiif.com/image-1.json']
    );
    expect(getImageService(state)).toEqual(null);
  });

  it('should not return image service if no service', () => {
    const { getImageService } = annotation(
      s => s.resources.annotations['http://iiif.com/image-2.json']
    );
    expect(getImageService(state)).toEqual(null);
  });

  it('should not return image service if image does not exist', () => {
    const { getImageService } = annotation(
      s => s.resources.annotations['http://iiif.com/image-3.json']
    );
    expect(getImageService(state)).toEqual(null);
  });

  it('should return image service', () => {
    const { getImageService } = annotation(
      s => s.resources.annotations['http://iiif.com/image-find-me.json']
    );
    expect(getImageService(state)).toEqual({
      '@id': 'http://iiif.com/image-service-1.json',
      label: 'Image service 1',
      profile: 'http://iiif.io/api/image/2/profiles/level2.json',
    });
  });

  it('should get canvas id from on property', () => {
    const { getOnId } = annotation(
      s => s.resources.annotations['http://iiif.com/image-1.json']
    );
    expect(getOnId(state)).toEqual('http://iiif.com/canvas-1.json');
  });

  it('should get canvas from on property', () => {
    const { getOn } = annotation(
      s => s.resources.annotations['http://iiif.com/image-1.json']
    );

    const { getLabel } = canvas(getOn);

    expect(getLabel(state)).toEqual([
      { '@language': 'none', '@value': 'canvas label' },
    ]);
  });

  it('should get canvas id from on property (de-reference)', () => {
    const { getOnId } = annotation(
      s => s.resources.annotations['http://iiif.com/image-2.json']
    );
    expect(getOnId(state)).toEqual('http://iiif.com/canvas-2.json');
  });

  it('should get handle missing canvases (should never happen, ID should always be available)', () => {
    const { getOn } = annotation(
      s => s.resources.annotations['http://iiif.com/image-2.json']
    );

    expect(getOn(state)).toEqual(null);
  });

  it('should handle dereferenced canvases', () => {
    const { getOn } = annotation(
      s => s.resources.annotations['http://iiif.com/layer-1.json']
    );

    const { getLabel } = canvas(getOn);

    expect(getLabel(state)).toEqual(null);
  });
});
