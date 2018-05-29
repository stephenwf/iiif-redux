import { imageResourceByIdSelector } from '../../src/api/image-resource';

describe('iiif/api/imageResource', () => {
  it('should be able to generate selector for any imageResource', () => {
    const state = {
      resources: {
        imageResources: {
          'http://iiif.com/image-resource-1.json': {
            '@id': 'http://iiif.com/image-resource-1.json',
            '@type': 'dctypes:Image',
            format: 'image/jpeg',
          },
        },
      },
    };

    const select = imageResourceByIdSelector(image => ({
      id: image.getId,
      type: image.getType,
    }));

    expect(
      select(state, { id: 'http://iiif.com/image-resource-1.json' })
    ).toEqual({
      id: 'http://iiif.com/image-resource-1.json',
      type: 'dctypes:Image',
    });

    const select2 = imageResourceByIdSelector(
      image => ({
        id: image.getId,
        type: image.getType,
        format: image.getFormat,
      }),
      () => 'http://iiif.com/image-resource-1.json'
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/image-resource-1.json',
      type: 'dctypes:Image',
      format: 'image/jpeg',
    });
  });
});
