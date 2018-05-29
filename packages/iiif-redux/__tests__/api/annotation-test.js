import { annotationByIdSelector } from '../../src/api/annotation';

describe('iiif/api/annotation', () => {
  it('should be able to generate selector for any annotation', () => {
    const state = {
      resources: {
        canvases: {},
        annotations: {
          'http://iiif.com/image-1.json': {
            '@id': 'http://iiif.com/image-1.json',
            '@type': 'sc:Canvas',
            on: 'http://iiif.com/canvas-1.json',
          },
        },
      },
    };

    const select = annotationByIdSelector(image => ({
      id: image.getId,
      type: image.getType,
    }));

    expect(select(state, { id: 'http://iiif.com/image-1.json' })).toEqual({
      id: 'http://iiif.com/image-1.json',
      type: 'sc:Canvas',
    });

    const select2 = annotationByIdSelector(
      image => ({
        id: image.getId,
        type: image.getType,
        on: image.getOn,
      }),
      () => 'http://iiif.com/image-1.json'
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/image-1.json',
      type: 'sc:Canvas',
      on: null,
    });
  });
});
