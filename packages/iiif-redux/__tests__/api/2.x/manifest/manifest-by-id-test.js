import { manifestByIdSelector } from '../../../../src/api/manifest';

describe('api/2.x/manifest/manifest-by-id', () => {
  it('should be able to generate selector for any manifest', () => {
    const state = {
      dereferenced: {
        'http://iiif.com/manifest-1.json': {
          loading: false,
        },
      },
      resources: {
        manifests: {
          'http://iiif.com/manifest-1.json': {
            '@id': 'http://iiif.com/manifest-1.json',
            '@type': 'sc:Manifest',
          },
        },
      },
    };

    const select = manifestByIdSelector(manifest => ({
      id: manifest.getId,
      type: manifest.getType,
    }));

    expect(select(state, { id: 'http://iiif.com/manifest-1.json' })).toEqual({
      id: 'http://iiif.com/manifest-1.json',
      type: 'sc:Manifest',
    });

    const select2 = manifestByIdSelector(
      manifest => ({
        id: manifest.getId,
        type: manifest.getType,
      }),
      {
        getId: () => 'http://iiif.com/manifest-1.json',
      }
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/manifest-1.json',
      type: 'sc:Manifest',
    });
  });

  it('should be load correct loading status (loading: false)', () => {
    const state = {
      dereferenced: {
        'http://iiif.com/manifest-1.json': {
          loading: false,
        },
      },
      resources: {
        manifests: {
          'http://iiif.com/manifest-1.json': {
            '@id': 'http://iiif.com/manifest-1.json',
            '@type': 'sc:Manifest',
          },
        },
      },
    };

    const select = manifestByIdSelector(
      manifest => ({
        id: manifest.getId,
        type: manifest.getType,
      }),
      {
        getId: () => 'http://iiif.com/manifest-1.json',
        dereference: true,
      }
    );

    expect(select(state)).toEqual({
      id: 'http://iiif.com/manifest-1.json',
      type: 'sc:Manifest',
      loading: false,
      fetched: true,
    });
  });

  it('should be load correct loading status - graceful error', () => {
    const state = {
      dereferenced: {},
      resources: {
        manifests: {
          'http://iiif.com/manifest-1.json': {
            '@id': 'http://iiif.com/manifest-1.json',
            '@type': 'sc:Manifest',
          },
        },
      },
    };

    const select = manifestByIdSelector(
      manifest => ({
        id: manifest.getId,
        type: manifest.getType,
      }),
      {
        getId: () => 'http://iiif.com/manifest-1.json',
        dereference: true,
      }
    );

    expect(select(state)).toEqual({ fetched: false, loading: false });
  });

  it('should be load correct loading status (loading: true)', () => {
    const state = {
      dereferenced: {
        'http://iiif.com/manifest-1.json': {
          loading: true,
        },
      },
      resources: {
        manifests: {
          'http://iiif.com/manifest-1.json': {
            '@id': 'http://iiif.com/manifest-1.json',
            '@type': 'sc:Manifest',
          },
        },
      },
    };

    const select = manifestByIdSelector(
      manifest => ({
        id: manifest.getId,
        type: manifest.getType,
      }),
      {
        getId: () => 'http://iiif.com/manifest-1.json',
        dereference: true,
      }
    );

    expect(select(state)).toEqual({
      id: 'http://iiif.com/manifest-1.json',
      type: 'sc:Manifest',
      loading: true,
      fetched: true,
    });
  });
});
