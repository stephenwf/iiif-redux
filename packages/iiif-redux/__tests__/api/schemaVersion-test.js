import { getSchemaVersionForResource } from '../../src/api/schema-version';

describe('api/schema-version', () => {
  const state = {
    resources: {
      collections: {
        'http://example.org/iiif/collection-1.json': {
          id: 'http://example.org/iiif/collection-1.json',
          label: 'Testing presentation 3',
        },
        'http://example.org/iiif/collection-2.json': {
          '@id': 'http://example.org/iiif/collection-2.json',
          label: 'Testing presentation 2',
        },
        'http://example.org/iiif/collection-3.json': {
          id: 'http://example.org/iiif/collection-3.json',
          label: 'Unknown version, sad path',
        },
        'http://example.org/iiif/collection-4.json': {
          label: 'I am just invalid.',
        },
      },
      schemaVersions: {
        'http://example.org/iiif/collection-1.json': 3,
        'http://example.org/iiif/collection-2.json': 2,
      },
    },
  };
  test('getSchemaVersionForResource will return correct version for presentation 3', () => {
    const version = getSchemaVersionForResource(
      s => s.resources.collections['http://example.org/iiif/collection-1.json']
    )(state);

    expect(version).toEqual(3);
  });

  test('getSchemaVersionForResource will return correct version for presentation 2', () => {
    const version = getSchemaVersionForResource(
      s => s.resources.collections['http://example.org/iiif/collection-2.json']
    )(state);

    expect(version).toEqual(2);
  });

  test('getSchemaVersionForResource will null when version unknown', () => {
    const version = getSchemaVersionForResource(
      s => s.resources.collections['http://example.org/iiif/collection-3.json']
    )(state);

    expect(version).toEqual(null);
  });
  test('getSchemaVersionForResource will null when id not available on resource', () => {
    const version = getSchemaVersionForResource(
      s => s.resources.collections['http://example.org/iiif/collection-4.json']
    )(state);

    expect(version).toEqual(null);
  });

  test('getSchemaVersionForResource will null when resource does not exist', () => {
    const version = getSchemaVersionForResource(
      s => s.resources.collections['http://example.org/iiif/collection-5.json']
    )(state);

    expect(version).toEqual(null);
  });
});
