import collection, { collectionByIdSelector } from '../../src/api/collection';

describe('api/collection', () => {
  test('Presentation 2 and 3 collections with single selector', () => {
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
          'http://iiif.com/collection-3.json': {},
        },
        schemaVersions: {
          'http://iiif.com/collection-1.json': 2,
          'http://iiif.com/collection-2.json': 3,
          'http://iiif.com/collection-3.json': 3,
        },
      },
    };

    const selectLabelById = id =>
      collection(s => s.resources.collections[id], api => api.getLabel);

    const selectorP2 = selectLabelById('http://iiif.com/collection-1.json');
    expect(selectorP2(state)).toEqual([
      { '@language': 'en', '@value': 'Test collection label' },
    ]);

    const selectorP3 = selectLabelById('http://iiif.com/collection-2.json');
    expect(selectorP3(state)).toEqual({ en: ['Test collection label'] });

    const selectorNonExistant = selectLabelById('I DO NOT EXIST');
    expect(selectorNonExistant(state)).toEqual({
      error: true,
      fetched: false,
      message: 'Resource not found.',
    });

    const selectorNoId = collectionByIdSelector(
      api => (
        {
          label: api.getLabel,
          nope: null,
        },
        { getId: () => null }
      )
    );

    expect(selectorNoId(state)).toEqual({
      error: true,
      fetched: false,
      message: 'No ID found on resource',
    });

    const selectFunky = id =>
      collection(
        s => s.resources.collections[id],
        api => ({
          id: api.getId,
          nope: null,
          staticValue: 'testing static value.',
        })
      );

    expect(selectFunky('http://iiif.com/collection-1.json')(state)).toEqual({
      id: 'http://iiif.com/collection-1.json',
      nope: null,
      staticValue: 'testing static value.',
    });
  });

  test('Presentation 3 loading states - fetched: false, loading true', () => {
    const state = {
      dereferenced: {
        'http://iiif.com/collection-1.json': {
          id: 'http://iiif.com/collection-1.json',
          loading: true,
        },
      },
      resources: {
        collections: {},
        schemaVersions: {},
      },
    };

    const selectLabelById = id =>
      collection(s => s.resources.collections[id], api => api.getLabel);

    expect(selectLabelById('http://iiif.com/collection-1.json')(state)).toEqual(
      {
        error: true,
        fetched: false,
        message: 'Resource not found.',
      }
    );
  });
});
