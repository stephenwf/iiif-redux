import {
  getLabel,
  getDescription,
  getMetadata,
  getLogo,
  getLicense,
  getAttribution,
  getThumbnailId,
  getThumbnail,
} from '../../../src/api/current-canvas';

describe('api/current-canvas/descriptive', () => {
  const state = {
    routing: { currentCanvas: 'http://iiif.com/canvas-1.json' },
    config: { defaultLanguage: 'en' },
    canvases: {
      'http://iiif.com/canvas-1.json': {
        '@id': 'http://iiif.com/canvas-1.json',
        '@type': 'sc:Canvas',
        label: 'Test canvas label',
        viewingDirection: 'top-to-bottom',
        viewingHint: 'individuals',
        navDate: '1856-01-01T00:00:00Z',
        description: 'Test canvas <b>description</b>',
        metadata: [
          {
            label: 'test metadata label',
            value: '<script>test</script> metadata value',
          },
        ],
        logo: 'http://example.org/logos/institution1.jpg',
        license: 'http://rightsstatements.org/vocab/NoC-NC/1.0/',
        attribution: 'Some <b>attribution</b> for test canvas',
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

  describe('getLabel', () => {
    it('should load label from canvas', () => {
      expect(getLabel(state)).toEqual([
        { '@language': 'en', '@value': 'Test canvas label' },
      ]);
    });
  });

  describe('getDescription', () => {
    it('should load description from canvas', () => {
      expect(getDescription(state)).toEqual([
        {
          '@language': 'en',
          '@value': 'Test canvas <b>description</b>',
        },
      ]);
    });
  });

  describe('getMetadata', () => {
    it('should load metadata from canvas', () => {
      expect(getMetadata(state)).toEqual([
        {
          label: [{ '@language': 'en', '@value': 'test metadata label' }],
          value: [{ '@language': 'en', '@value': 'test metadata value' }],
        },
      ]);
    });
  });

  describe('getLogo', () => {
    it('should load logo from canvas', () => {
      expect(getLogo(state)).toEqual(
        'http://example.org/logos/institution1.jpg'
      );
    });
  });

  describe('getLicense', () => {
    it('should load licence from canvas', () => {
      expect(getLicense(state)).toEqual([
        'http://rightsstatements.org/vocab/NoC-NC/1.0/',
      ]);
    });
  });

  describe('getThumbnailId', () => {
    it('should load thumbnail id from canvas', () => {
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
    it('should load attribution from canvas', () => {
      expect(getAttribution(state)).toEqual([
        {
          '@language': 'en',
          '@value': 'Some <b>attribution</b> for test canvas',
        },
      ]);
    });
  });
});
