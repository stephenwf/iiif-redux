import collection from '../../src/api/collection';

describe('collection combined', () => {
  test('collections combined', () => {
    const state = {
      dereferenced: {
        'http://iiif.com/collection-1.json': {
          id: 'http://iiif.com/collection-1.json',
          loading: false,
        },
        'http://iiif.com/collection-2.json': {
          id: 'http://iiif.com/collection-2.json',
          loading: false,
        },
      },
      resources: {
        collections: {
          'http://iiif.com/collection-1.json': {
            '@id': 'http://iiif.com/collection-1.json',
            '@type': 'sc:Collection',
            label: [{ '@value': 'Test collection label', '@language': 'en' }],
          },
          'http://iiif.com/collection-2.json': {
            id: 'http://iiif.com/collection-2.json',
            type: 'Collection',
            label: { en: ['Test collection label'] },
          },
        },
      },
      schemaVersions: {
        'http://iiif.com/collection-1.json': 2,
        'http://iiif.com/collection-2.json': 3,
      },
    };

    const selectorP2 = collection(
      s => s.resources.collections['http://iiif.com/collection-1.json'],
      api => api.getLabel
    );

    expect(selectorP2(state)).toEqual([
      { '@language': 'en', '@value': 'Test collection label' },
    ]);

    const selectorP3 = collection(
      s => s.resources.collections['http://iiif.com/collection-2.json'],
      api => api.getLabel
    );

    expect(selectorP3(state)).toEqual({ en: ['Test collection label'] });
  });
});
