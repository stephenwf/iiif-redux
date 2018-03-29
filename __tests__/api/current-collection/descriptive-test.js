import {
  getLabel,
  getDescription,
  getMetadata,
  getLogo,
  getLicense,
  getAttribution,
  getThumbnail,
  getId,
  getType,
  getViewingHint,
  getNavDate,
} from '../../../src/api/current-collection';

describe('api/current-collection/descriptive', () => {
  const state1 = {
    routing: { currentCollection: 'http://iiif.com/collection-1.json' },
    config: { defaultLanguage: 'en' },
    collections: {
      'http://iiif.com/collection-1.json': {
        '@id': 'http://iiif.com/collection-1.json',
        '@type': 'sc:Collection',
        label: 'Test collection label',
        viewingDirection: 'top-to-bottom',
        viewingHint: 'individuals',
        navDate: '1856-01-01T00:00:00Z',
        description: 'Test collection <b>description</b>',
        metadata: [
          {
            label: 'test metadata label',
            value: '<script>test</script> metadata value',
          },
        ],
        logo: 'http://example.org/logos/institution1.jpg',
        license: 'http://rightsstatements.org/vocab/NoC-NC/1.0/',
        attribution: 'Some <b>attribution</b> for test collection',
        thumbnail: {
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
      expect(getLabel(state1)).toEqual([
        { '@language': 'en', '@value': 'Test collection label' },
      ]);
    });
  });

  describe('getDescription', () => {
    it('should load description from collection', () => {
      expect(getDescription(state1)).toEqual([
        {
          '@language': 'en',
          '@value': 'Test collection <b>description</b>',
        },
      ]);
    });
  });

  describe('getMetadata', () => {
    it('should load metadata from collection', () => {
      expect(getMetadata(state1)).toEqual([
        {
          label: [{ '@language': 'en', '@value': 'test metadata label' }],
          value: [{ '@language': 'en', '@value': 'test metadata value' }],
        },
      ]);
    });
  });

  describe('getLogo', () => {
    it('should load logo from collection', () => {
      expect(getLogo(state1)).toEqual(
        'http://example.org/logos/institution1.jpg'
      );
    });
  });

  describe('getLicense', () => {
    it('should load licence from collection', () => {
      expect(getLicense(state1)).toEqual([
        'http://rightsstatements.org/vocab/NoC-NC/1.0/',
      ]);
    });
  });

  describe('getThumbnail', () => {
    it('should load thumbnail from collection', () => {
      expect(getThumbnail(state1)).toEqual({
        '@id':
          'http://example.org/images/book1-page1/full/80,100/0/default.jpg',
        service: {
          '@context': 'http://iiif.io/api/image/2/context.json',
          '@id': 'http://example.org/images/book1-page1',
          profile: 'http://iiif.io/api/image/2/level1.json',
        },
      });
    });
  });

  describe('getAttribution', () => {
    it('should load attribution from collection', () => {
      expect(getAttribution(state1)).toEqual([
        {
          '@language': 'en',
          '@value': 'Some <b>attribution</b> for test collection',
        },
      ]);
    });
  });
});
