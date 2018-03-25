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
  getViewingDirection,
} from '../../src/api/current-collection';

describe('api/current-collection', () => {
  const createStateWithCustomProperties = props => ({
    routing: { currentCollection: 'http://iiif.com/collection-1.json' },
    config: { defaultLanguage: 'en' },
    collections: {
      'http://iiif.com/collection-1.json': {
        '@id': 'http://iiif.com/collection-1.json',
        ...props,
      },
    },
  });

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
        description: 'Test collection <strong>description</strong>',
        metadata: [
          { label: 'test metadata label', value: 'test metadata value' },
        ],
        logo: 'http://example.org/logos/institution1.jpg',
        license: 'http://rightsstatements.org/vocab/NoC-NC/1.0/',
        attribution: 'Some <strong>attribution</strong> for test collection',
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

  describe('getId', () => {
    it('should load id from collection', () => {
      expect(getId(state1)).toEqual('http://iiif.com/collection-1.json');
    });
  });

  describe('getType', () => {
    it('should load type from collection', () => {
      expect(getType(state1)).toEqual('sc:Collection');
    });
  });

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
          '@value': 'Test collection <strong>description</strong>',
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
          '@value': 'Some <strong>attribution</strong> for test collection',
        },
      ]);
    });
  });

  describe('getViewingHint', () => {
    it('should load a valid viewing hint from collection', () => {
      expect(getViewingHint(state1)).toEqual('individuals');
    });
    it('should ignore an invalid viewing hint from collection', () => {
      expect(
        getViewingHint(
          createStateWithCustomProperties({
            viewingHint: 'something-invalid',
          })
        )
      ).toEqual(null);
      expect(
        getViewingHint(
          createStateWithCustomProperties({
            viewingHint: 0 / 0,
          })
        )
      ).toEqual(null);
    });
  });

  describe('getNavDate', () => {
    it('should load navDate from collection', () => {
      expect(getNavDate(state1)).toEqual('1856-01-01T00:00:00Z');
    });
  });
});
