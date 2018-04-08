import {
  getCollectionIds,
  getCollections,
  getManifestIds,
  getManifests,
  getMemberIds,
  getMembers,
  getOtherContent,
  getOtherContentIds,
} from '../../../src/api/current-collection';

describe('api/current-collection/structural', () => {
  const state = {
    routing: { currentCollection: 'http://iiif.com/collection-1.json' },
    config: { defaultLanguage: 'en' },
    resources: {
      collections: {
        'http://iiif.com/collection-1.json': {
          '@id': 'http://iiif.com/collection-1.json',
          label: 'Collection 1',
          collections: [
            { id: 'http://iiif.com/collection-2.json', schema: 'collection' },
            { id: 'http://iiif.com/collection-3.json', schema: 'collection' },
            { id: 'http://iiif.com/manifest-5.json', schema: 'manifest' },
            { id: 'http://iiif.com/manifest-6.json', schema: 'manifest' },
          ],
          members: [
            { id: 'http://iiif.com/collection-2.json', schema: 'collection' },
            { id: 'http://iiif.com/collection-3.json', schema: 'collection' },
            { id: 'http://iiif.com/manifest-1.json', schema: 'manifest' },
            { id: 'http://iiif.com/manifest-2.json', schema: 'manifest' },
          ],
          manifests: [
            'http://iiif.com/manifest-1.json',
            'http://iiif.com/manifest-2.json',
            'http://iiif.com/manifest-3.json',
            'http://iiif.com/manifest-4.json',
          ],
          otherContent: [
            {
              id: 'http://iiif.com/external-1.json',
              schema: 'externalResource',
            },
            {
              id: 'http://iiif.com/annotation-list-1.json',
              schema: 'annotationList',
            },
            {
              id: 'http://iiif.com/external-2.json',
              schema: 'externalResource',
            },
            {
              id: 'http://iiif.com/annotation-list-2.json',
              schema: 'annotationList',
            },
            {
              id: 'http://iiif.com/external-3.json',
              schema: 'externalResource',
            },
          ],
        },
        'http://iiif.com/collection-2.json': {
          '@id': 'http://iiif.com/collection-2.json',
          label: 'Collection 2',
        },
        'http://iiif.com/collection-3.json': {
          '@id': 'http://iiif.com/collection-3.json',
          label: 'Collection 3',
        },
        'http://iiif.com/collection-4.json': {
          '@id': 'http://iiif.com/collection-4.json',
          label: 'Collection 4',
        },
      },
      annotationLists: {
        'http://iiif.com/annotation-list-1.json': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          label: 'Annotation List 1',
        },
        'http://iiif.com/annotation-list-2.json': {
          '@id': 'http://iiif.com/annotation-list-2.json',
          label: 'Annotation List 2',
        },
      },
      externalResources: {
        'http://iiif.com/external-1.json': {
          '@id': 'http://iiif.com/external-1.json',
          label: 'External 1',
        },
        'http://iiif.com/external-2.json': {
          '@id': 'http://iiif.com/external-2.json',
          label: 'External 2',
        },
      },
      manifests: {
        'http://iiif.com/manifest-1.json': {
          '@id': 'http://iiif.com/manifest-1.json',
          label: 'Manifest 1',
        },
        'http://iiif.com/manifest-2.json': {
          '@id': 'http://iiif.com/manifest-2.json',
          label: 'Manifest 2',
        },
        'http://iiif.com/manifest-3.json': {
          '@id': 'http://iiif.com/manifest-3.json',
          label: 'Manifest 3',
        },
        'http://iiif.com/manifest-4.json': {
          '@id': 'http://iiif.com/manifest-4.json',
          label: 'Manifest 4',
        },
        'http://iiif.com/manifest-5.json': {
          '@id': 'http://iiif.com/manifest-5.json',
          label: 'Manifest 5',
        },
        'http://iiif.com/manifest-6.json': {
          '@id': 'http://iiif.com/manifest-6.json',
          label: 'Manifest 6',
        },
      },
    },
  };

  it('should getCollectionIds', () => {
    expect(getCollectionIds(state)).toEqual([
      'http://iiif.com/collection-2.json',
      'http://iiif.com/collection-3.json',
    ]);
  });

  it('should getManifestIds', () => {
    expect(getManifestIds(state)).toEqual([
      'http://iiif.com/manifest-1.json',
      'http://iiif.com/manifest-2.json',
      'http://iiif.com/manifest-3.json',
      'http://iiif.com/manifest-4.json',
      'http://iiif.com/manifest-5.json',
      'http://iiif.com/manifest-6.json',
    ]);
  });

  it('should getMemberIds', () => {
    expect(getMemberIds(state)).toEqual([
      'http://iiif.com/collection-2.json',
      'http://iiif.com/collection-3.json',
      'http://iiif.com/manifest-1.json',
      'http://iiif.com/manifest-2.json',
      'http://iiif.com/manifest-3.json',
      'http://iiif.com/manifest-4.json',
      'http://iiif.com/manifest-5.json',
      'http://iiif.com/manifest-6.json',
    ]);
  });

  it('should getCollections', () => {
    expect(getCollections(state).map(collection => collection.label)).toEqual([
      'Collection 2',
      'Collection 3',
    ]);
  });

  it('should getManifests', () => {
    expect(getManifests(state).map(manifest => manifest.label)).toEqual([
      'Manifest 1',
      'Manifest 2',
      'Manifest 3',
      'Manifest 4',
      'Manifest 5',
      'Manifest 6',
    ]);
  });

  it('should getMembers', () => {
    expect(getMembers(state).map(member => member.label)).toEqual([
      'Collection 2',
      'Collection 3',
      'Manifest 1',
      'Manifest 2',
      'Manifest 3',
      'Manifest 4',
      'Manifest 5',
      'Manifest 6',
    ]);
  });

  it('should get other content ids', () => {
    expect(getOtherContentIds(state)).toEqual([
      'http://iiif.com/external-1.json',
      'http://iiif.com/annotation-list-1.json',
      'http://iiif.com/external-2.json',
      'http://iiif.com/annotation-list-2.json',
      'http://iiif.com/external-3.json',
    ]);
  });

  it('should get Other content', () => {
    expect(
      getOtherContent(state).map(otherContent => otherContent.label)
    ).toEqual([
      'External 1',
      'Annotation List 1',
      'External 2',
      'Annotation List 2',
      'unknown',
    ]);
  });
});
