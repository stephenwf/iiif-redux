import resource from '../../src/api/resource';

describe('iiif/api/resource', () => {
  test('can return resource', () => {
    const state = {
      dereferenced: {
        'https://iiif.com/collection-1.json': {
          loading: false,
        },
      },
      resources: {
        collections: {
          'https://iiif.com/collection-1.json': {
            '@id': 'https://iiif.com/collection-1.json',
            label: 'test collection',
          },
        },
      },
    };
    const selector = resource(
      () => ({
        id: 'https://iiif.com/collection-1.json',
        schema: 'collection',
      }),
      {
        collection: api => ({
          id: api.getId,
          label: api.getLabel,
        }),
      }
    );
    expect(selector(state)).toEqual({
      id: 'https://iiif.com/collection-1.json',
      label: 'test collection',
      schema: 'collection',
    });
  });

  test('returns null when loading', () => {
    const state = {
      dereferenced: {
        'https://iiif.com/collection-1.json': {
          loading: true,
        },
      },
      resources: {
        collections: {
          'https://iiif.com/collection-1.json': {
            '@id': 'https://iiif.com/collection-1.json',
            label: 'test collection',
          },
        },
      },
    };
    const selector = resource(
      () => ({
        id: 'https://iiif.com/collection-1.json',
        schema: 'collection',
      }),
      {
        collection: api => ({
          id: api.getId,
          label: api.getLabel,
        }),
      }
    );
    expect(selector(state)).toEqual(null);
  });

  test('returns null if it errors', () => {
    const state = {
      dereferenced: {
        'https://iiif.com/collection-1.json': {
          error: 'something went wrong',
        },
      },
      resources: {
        collections: {
          'https://iiif.com/collection-1.json': {
            '@id': 'https://iiif.com/collection-1.json',
            label: 'test collection',
          },
        },
      },
    };
    const selector = resource(
      () => ({
        id: 'https://iiif.com/collection-1.json',
        schema: 'collection',
      }),
      {
        collection: api => ({
          id: api.getId,
          label: api.getLabel,
        }),
      }
    );
    expect(selector(state)).toEqual({ error: 'something went wrong' });
  });

  test('returns null if no resource found.', () => {
    const state = {
      dereferenced: {},
      resources: {
        collections: {},
      },
    };
    const selector = resource(() => null, {
      collection: api => ({
        id: api.getId,
        label: api.getLabel,
      }),
    });
    expect(selector(state)).toEqual(null);
  });
});
