import collection from '../../../../src/api/2.x/collection';

describe('api/2.x/collection/descriptive', () => {
  const {
    getLabel,
    getDescription,
    getMetadata,
    getLogo,
    getLicense,
    getAttribution,
    getThumbnailId,
    getThumbnail,
  } = collection(
    s => s.resources.collections['http://iiif.com/collection-1.json']
  );
  const state = {
    resources: {
      collections: {
        'http://iiif.com/collection-1.json': {
          '@id': 'http://iiif.com/collection-1.json',
          '@type': 'sc:Collection',
          label: [{ '@value': 'Test collection label', '@language': 'en' }],
          viewingDirection: 'top-to-bottom',
          viewingHint: 'individuals',
          navDate: '1856-01-01T00:00:00Z',
          description: [
            {
              '@value': 'Test collection <b>description</b>',
              '@language': 'en',
            },
          ],
          metadata: [
            {
              label: [{ '@value': 'test metadata label', '@language': 'en' }],
              value: [
                {
                  '@value': 'test metadata value',
                  '@language': 'en',
                },
              ],
            },
          ],
          logo: 'http://example.org/logos/institution1.jpg',
          license: 'http://rightsstatements.org/vocab/NoC-NC/1.0/',
          attribution: [
            {
              '@value': 'Some <b>attribution</b> for test collection',
              '@language': 'en',
            },
          ],
          thumbnail:
            'http://example.org/images/book1-page1/full/80,100/0/default.jpg',
        },
      },
      imageResources: {
        'http://example.org/images/book1-page1/full/80,100/0/default.jpg': {
          '@id':
            'http://example.org/images/book1-page1/full/80,100/0/default.jpg',
          service: {
            '@context': 'http://iiif.io/api/image/2/context.json',
            '@id': 'http://example.org/images/book1-page1',
            profile: 'http://iiif.io/api/image/2/level1.json',
          },
        },
      },
    },
  };

  describe('getLabel', () => {
    it('should load label from collection', () => {
      expect(getLabel(state)).toEqual([
        { '@language': 'en', '@value': 'Test collection label' },
      ]);
    });
  });

  describe('getDescription', () => {
    it('should load description from collection', () => {
      expect(getDescription(state)).toEqual([
        {
          '@language': 'en',
          '@value': 'Test collection <b>description</b>',
        },
      ]);
    });
  });

  describe('getMetadata', () => {
    it('should load metadata from collection', () => {
      expect(getMetadata(state)).toEqual([
        {
          label: [{ '@language': 'en', '@value': 'test metadata label' }],
          value: [{ '@language': 'en', '@value': 'test metadata value' }],
        },
      ]);
    });
  });

  describe('getLogo', () => {
    it('should load logo from collection', () => {
      expect(getLogo(state)).toEqual(
        'http://example.org/logos/institution1.jpg'
      );
    });
  });

  describe('getLicense', () => {
    it('should load license from collection', () => {
      expect(getLicense(state)).toEqual([
        'http://rightsstatements.org/vocab/NoC-NC/1.0/',
      ]);
    });
  });

  describe('getThumbnailId', () => {
    it('should load thumbnail id from collection', () => {
      expect(getThumbnailId(state)).toEqual(
        'http://example.org/images/book1-page1/full/80,100/0/default.jpg'
      );
    });
  });

  describe('getThumbnail', () => {
    it('should load thumbnail from canvas', () => {
      expect(getThumbnail(state)).toEqual({
        '@id':
          'http://example.org/images/book1-page1/full/80,100/0/default.jpg',
        service: {
          '@context': 'http://iiif.io/api/image/2/context.json',
          '@id': 'http://example.org/images/book1-page1',
          profile: 'http://iiif.io/api/image/2/level1.json',
        },
      });
    });
    it('should load thumbnail without service', () => {
      expect(
        getThumbnail({
          ...state,
          ...{
            resources: {
              ...state.resources,
              imageResources: {}, // unset image resources.
            },
          },
        })
      ).toEqual(
        'http://example.org/images/book1-page1/full/80,100/0/default.jpg'
      );
    });
  });

  describe('getAttribution', () => {
    it('should load attribution from collection', () => {
      expect(getAttribution(state)).toEqual([
        {
          '@language': 'en',
          '@value': 'Some <b>attribution</b> for test collection',
        },
      ]);
    });
  });
});
