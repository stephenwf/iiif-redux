import {
  getLabel,
  getDescription,
  getMetadata,
  getAttribution,
  getLicense,
  getLogo,
  getThumbnailId, getThumbnail,
} from '../../../src/api/current-manifest';

describe('api/current-manifest/descriptive', () => {
  const state = {
    routing: { currentManifest: 'http://iiif.com/manifest-1.json' },
    config: { defaultLanguage: 'en' },
    manifests: {
      'http://iiif.com/manifest-1.json': {
        '@id': 'http://iiif.com/manifest-1.json',
        '@type': 'sc:Manifest',
        label: 'Manifest label 1',
        description: 'Manifest description',
        metadata: [
          { label: 'test metadata label', value: 'test metadata value' },
        ],
        attribution: 'Some <b>attribution</b> for test manifest',
        license: 'http://rightsstatements.org/vocab/NoC-NC/1.0/',
        logo: 'http://example.org/logos/institution1.jpg',
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
  };

  /**
   * Descriptive properties
   *  - getLabel (Required)
   *  - getMetadata (Recommended)
   *  - getDescription (Recommended)
   *  - getThumbnailId (Recommended)
   *  - getAttribution (Optional)
   *  - getLicence (Optional)
   *  - getLogo (Optional)
   */
  describe('getLabel', () => {
    it('should load label from manifest', () => {
      expect(getLabel(state)).toEqual([
        { '@language': 'en', '@value': 'Manifest label 1' },
      ]);
    });
  });

  describe('getMetadata', () => {
    it('should load metadata from manifest', () => {
      expect(getMetadata(state)).toEqual([
        {
          label: [{ '@language': 'en', '@value': 'test metadata label' }],
          value: [{ '@language': 'en', '@value': 'test metadata value' }],
        },
      ]);
    });
  });

  describe('getDescription', () => {
    it('should load description from manifest', () => {
      expect(getDescription(state)).toEqual([
        { '@language': 'en', '@value': 'Manifest description' },
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
            imageResources: {}, // unset image resources.
          },
        })
      ).toEqual(
        'http://example.org/images/book1-page1/full/80,100/0/default.jpg'
      );
    });
  });
  describe('getAttribution', () => {
    it('should load attribution from manifest', () => {
      expect(getAttribution(state)).toEqual([
        {
          '@language': 'en',
          '@value': 'Some <b>attribution</b> for test manifest',
        },
      ]);
    });
  });

  describe('getLicense', () => {
    it('should load licence from manifest', () => {
      expect(getLicense(state)).toEqual([
        'http://rightsstatements.org/vocab/NoC-NC/1.0/',
      ]);
    });
  });

  describe('getLogo', () => {
    it('should load logo from manifest', () => {
      expect(getLogo(state)).toEqual(
        'http://example.org/logos/institution1.jpg'
      );
    });
  });
});
