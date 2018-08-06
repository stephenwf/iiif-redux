import { collectionByIdSelector } from '../../../../src/api/collection';

describe('api/2.x/collection/collection-by-id', () => {
  it('should be able to generate selector for any collection', () => {
    const state = {
      resources: {
        collections: {
          'http://iiif.com/collection-1.json': {
            '@id': 'http://iiif.com/collection-1.json',
            '@type': 'sc:Collection',
          },
        },
      },
    };

    const select = collectionByIdSelector(collection => ({
      id: collection.getId,
      type: collection.getType,
    }));

    expect(select(state, { id: 'http://iiif.com/collection-1.json' })).toEqual({
      id: 'http://iiif.com/collection-1.json',
      type: 'sc:Collection',
    });

    const select2 = collectionByIdSelector(
      collection => ({
        id: collection.getId,
        type: collection.getType,
      }),
      {
        getId: () => 'http://iiif.com/collection-1.json',
      }
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/collection-1.json',
      type: 'sc:Collection',
    });
  });
});
