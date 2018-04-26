import { imageByIdSelector } from '../../src/api/image';

describe('iiif/api/image', () => {
  it('should be able to generate selector for any image', () => {
    const state = {
      resources: {
        annotations: {
          'http://iiif.com/image-1.json': {
            '@id': 'http://iiif.com/image-1.json',
            '@type': 'sc:Canvas',
          },
        },
      },
    };

    const select = imageByIdSelector(image => ({
      id: image.getId,
      type: image.getType,
    }));

    expect(select(state, { id: 'http://iiif.com/image-1.json' })).toEqual({
      id: 'http://iiif.com/image-1.json',
      type: 'sc:Canvas',
    });

    const select2 = imageByIdSelector(
      image => ({
        id: image.getId,
        type: image.getType,
      }),
      () => 'http://iiif.com/image-1.json'
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/image-1.json',
      type: 'sc:Canvas',
    });
  });
});
