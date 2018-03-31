import { normalize } from '../../../src/schema/presentation2';

describe('schema/presentation-2/smoke-tests', () => {
  it('should load external resources when attached to annotation', () => {
    expect(
      normalize({
        '@id': 'http://example.org/annotation-1.json',
        '@type': 'sc:Annotation',
        resource: {
          '@context': 'http://iiif.io/api/image/2/context.json',
          '@id': 'https://view.nls.uk/iiif/7443/74438561.5',
          profile: 'http://iiif.io/api/image/2/profiles/level2.json',
        },
      })
    ).toEqual({
      entities: {
        annotations: {
          'http://example.org/annotation-1.json': {
            '@id': 'http://example.org/annotation-1.json',
            '@type': 'sc:Annotation',
            resource: {
              id: 'https://view.nls.uk/iiif/7443/74438561.5',
              schema: 'externalResource',
            },
          },
        },
        externalResources: {
          'https://view.nls.uk/iiif/7443/74438561.5': {
            '@context': 'http://iiif.io/api/image/2/context.json',
            '@id': 'https://view.nls.uk/iiif/7443/74438561.5',
            profile: 'http://iiif.io/api/image/2/profiles/level2.json',
          },
        },
      },
      result: {
        id: 'http://example.org/annotation-1.json',
        schema: 'annotation',
      },
    });
  });
  it('should throw error when invalid resource', () => {
    expect(() => normalize({ nothing: 'I am invalid' })).toThrow(
      'Unknown entity type'
    );
  });
  it('should be able to load services', () => {
    const normalized = normalize({
      '@context': 'http://iiif.io/api/image/2/context.json',
      '@id': 'https://view.nls.uk/iiif/7443/74438561.5',
      profile: 'http://iiif.io/api/image/2/profiles/level2.json',
    });

    expect(normalized).toEqual({
      entities: {
        services: {
          'https://view.nls.uk/iiif/7443/74438561.5': {
            '@context': 'http://iiif.io/api/image/2/context.json',
            '@id': 'https://view.nls.uk/iiif/7443/74438561.5',
            profile: 'http://iiif.io/api/image/2/profiles/level2.json',
          },
        },
      },
      result: {
        id: 'https://view.nls.uk/iiif/7443/74438561.5',
        schema: 'service',
      },
    });
  });

  it('should load manifests and collections from a collections members', () => {
    const normalized = normalize({
      '@id': 'http://example.org/collection-1.json',
      '@type': 'sc:Collection',
      members: [
        {
          '@id': 'http://example.org/collection-2.json',
          '@type': 'sc:Collection',
        },
        { '@id': 'http://example.org/manifest-1.json', '@type': 'sc:Manifest' },
        {
          '@id': 'http://example.org/collection-3.json',
          '@type': 'sc:Collection',
        },
        { '@id': 'http://example.org/manifest-2.json', '@type': 'sc:Manifest' },
      ],
    });

    expect(normalized).toEqual({
      entities: {
        collections: {
          'http://example.org/collection-1.json': {
            '@id': 'http://example.org/collection-1.json',
            '@type': 'sc:Collection',
            members: [
              {
                id: 'http://example.org/collection-2.json',
                schema: 'collection',
              },
              { id: 'http://example.org/manifest-1.json', schema: 'manifest' },
              {
                id: 'http://example.org/collection-3.json',
                schema: 'collection',
              },
              { id: 'http://example.org/manifest-2.json', schema: 'manifest' },
            ],
          },
          'http://example.org/collection-2.json': {
            '@id': 'http://example.org/collection-2.json',
            '@type': 'sc:Collection',
          },
          'http://example.org/collection-3.json': {
            '@id': 'http://example.org/collection-3.json',
            '@type': 'sc:Collection',
          },
        },
        manifests: {
          'http://example.org/manifest-1.json': {
            '@id': 'http://example.org/manifest-1.json',
            '@type': 'sc:Manifest',
          },
          'http://example.org/manifest-2.json': {
            '@id': 'http://example.org/manifest-2.json',
            '@type': 'sc:Manifest',
          },
        },
      },
      result: {
        id: 'http://example.org/collection-1.json',
        schema: 'collection',
      },
    });
  });

  it('should differentiate between within layers and within external (within)', () => {
    const normalized = normalize({
      '@id': 'http://example.org/collection-1.json',
      '@type': 'sc:Collection',
      within: {
        '@id': 'http://example.org/layer-1.json',
        '@type': 'sc:Layer',
      },
    });

    expect(normalized).toEqual({
      entities: {
        collections: {
          'http://example.org/collection-1.json': {
            '@id': 'http://example.org/collection-1.json',
            '@type': 'sc:Collection',
            within: [
              { id: 'http://example.org/layer-1.json', schema: 'layer' },
            ],
          },
        },
        layers: {
          'http://example.org/layer-1.json': [
            { '@id': 'http://example.org/layer-1.json', '@type': 'sc:Layer' },
          ],
        },
      },
      result: {
        id: 'http://example.org/collection-1.json',
        schema: 'collection',
      },
    });
  });
  it('should differentiate between within layers and within external (external)', () => {
    const normalized = normalize({
      '@id': 'http://example.org/collection-1.json',
      '@type': 'sc:Collection',
      within: {
        '@id': 'http://example.org/service-1.json',
        profile: 'http://example.org/service/1',
      },
    });

    expect(normalized).toEqual({
      entities: {
        collections: {
          'http://example.org/collection-1.json': {
            '@id': 'http://example.org/collection-1.json',
            '@type': 'sc:Collection',
            within: [
              {
                id: 'http://example.org/service-1.json',
                schema: 'externalResource',
              },
            ],
          },
        },
        externalResources: {
          'http://example.org/service-1.json': {
            '@id': 'http://example.org/service-1.json',
            profile: 'http://example.org/service/1',
          },
        },
      },
      result: {
        id: 'http://example.org/collection-1.json',
        schema: 'collection',
      },
    });
  });
});
