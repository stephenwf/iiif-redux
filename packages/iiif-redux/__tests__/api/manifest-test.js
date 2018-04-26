import { manifestByIdSelector } from '../../src/api/manifest';

describe('iiif/api/manifest', () => {
  it('should be able to generate selector for any manifest', () => {
    const state = {
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
      () => 'http://iiif.com/manifest-1.json'
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/manifest-1.json',
      type: 'sc:Manifest',
    });
  });
});
