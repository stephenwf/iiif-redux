import { externalResourceByIdSelector } from '../../src/api/external-resource';

describe('iiif/api/externalResource', () => {
  it('should be able to generate selector for any externalResource', () => {
    const state = {
      resources: {
        externalResources: {
          'http://iiif.com/external-resource-1.json': {
            '@id': 'http://iiif.com/external-resource-1.json',
            '@type': 'dctypes:Text',
            format: 'text/plain',
          },
        },
      },
    };

    const select = externalResourceByIdSelector(image => ({
      id: image.getId,
      type: image.getType,
    }));

    expect(
      select(state, { id: 'http://iiif.com/external-resource-1.json' })
    ).toEqual({
      id: 'http://iiif.com/external-resource-1.json',
      type: 'dctypes:Text',
    });

    const select2 = externalResourceByIdSelector(
      image => ({
        id: image.getId,
        type: image.getType,
        format: image.getFormat,
      }),
      () => 'http://iiif.com/external-resource-1.json'
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/external-resource-1.json',
      type: 'dctypes:Text',
      format: 'text/plain',
    });
  });
});
