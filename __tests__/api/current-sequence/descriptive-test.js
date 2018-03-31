import {
  getLabel,
  getDescription,
  getMetadata,
  getAttribution,
  getLicense,
  getLogo,
  getThumbnail,
} from '../../../src/api/current-sequence';

describe('api/current-sequence/descriptive', () => {
  const state = {
    routing: { currentSequence: 'http://iiif.com/sequence-1.json' },
    config: { defaultLanguage: 'en' },
    sequences: {
      'http://iiif.com/sequence-1.json': {
        '@id': 'http://iiif.com/sequence-1.json',
        '@type': 'sc:Sequence',
        label: 'Sequence label 1',
        description: 'Sequence description',
        metadata: [
          { label: 'test metadata label', value: 'test metadata value' },
        ],
        attribution: 'Some <b>attribution</b> for test sequence',
        license: 'http://rightsstatements.org/vocab/NoC-NC/1.0/',
        logo: 'http://example.org/logos/institution1.jpg',
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

  /**
   * Descriptive properties
   *  - getLabel (Required)
   *  - getMetadata (Recommended)
   *  - getDescription (Recommended)
   *  - getThumbnail (Recommended)
   *  - getAttribution (Optional)
   *  - getLicence (Optional)
   *  - getLogo (Optional)
   */
  describe('getLabel', () => {
    it('should load label from sequence', () => {
      expect(getLabel(state)).toEqual([
        { '@language': 'en', '@value': 'Sequence label 1' },
      ]);
    });
  });

  describe('getMetadata', () => {
    it('should load metadata from sequence', () => {
      expect(getMetadata(state)).toEqual([
        {
          label: [{ '@language': 'en', '@value': 'test metadata label' }],
          value: [{ '@language': 'en', '@value': 'test metadata value' }],
        },
      ]);
    });
  });

  describe('getDescription', () => {
    it('should load description from sequence', () => {
      expect(getDescription(state)).toEqual([
        { '@language': 'en', '@value': 'Sequence description' },
      ]);
    });
  });

  describe('getThumbnail', () => {
    it('should load thumbnail from sequence', () => {
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
  });

  describe('getAttribution', () => {
    it('should load attribution from sequence', () => {
      expect(getAttribution(state)).toEqual([
        {
          '@language': 'en',
          '@value': 'Some <b>attribution</b> for test sequence',
        },
      ]);
    });
  });

  describe('getLicense', () => {
    it('should load licence from sequence', () => {
      expect(getLicense(state)).toEqual([
        'http://rightsstatements.org/vocab/NoC-NC/1.0/',
      ]);
    });
  });

  describe('getLogo', () => {
    it('should load logo from sequence', () => {
      expect(getLogo(state)).toEqual(
        'http://example.org/logos/institution1.jpg'
      );
    });
  });
});
