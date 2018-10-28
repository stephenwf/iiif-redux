import annotation from '../../../../src/api/2.x/annotation';

describe('api/2.x/annotation/descriptive', () => {
  const state = {
    resources: {
      annotations: {
        'http://iiif.com/annotation-1.json': {
          '@id': 'http://iiif.com/annotation-1.json',
          '@type': 'sc:Annotation',
          label: [{ '@value': 'Annotation label 1', '@language': 'en' }],
          description: [
            { '@value': 'Annotation description', '@language': 'en' },
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
          attribution: [
            {
              '@value': 'Some <b>attribution</b> for test annotation',
              '@language': 'en',
            },
          ],
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
    },
  };

  const {
    getLabel,
    getDescription,
    getMetadata,
    getAttribution,
    getLicense,
    getLogo,
    getThumbnailId,
    getThumbnail,
  } = annotation(
    s => s.resources.annotations['http://iiif.com/annotation-1.json']
  );

  /**
   * Descriptive properties
   *  - getLabel (Required)
   *  - getMetadata (Recommended)
   *  - getDescription (Recommended)
   *  - getThumbnailId (Recommended)
   *  - getAttribution (Optional)
   *  - getLicense (Optional)
   *  - getLogo (Optional)
   */
  describe('getLabel', () => {
    it('should load label from annotation', () => {
      expect(getLabel(state)).toEqual([
        { '@language': 'en', '@value': 'Annotation label 1' },
      ]);
    });
  });

  describe('getMetadata', () => {
    it('should load metadata from annotation', () => {
      expect(getMetadata(state)).toEqual([
        {
          label: [{ '@language': 'en', '@value': 'test metadata label' }],
          value: [{ '@language': 'en', '@value': 'test metadata value' }],
        },
      ]);
    });
  });

  describe('getDescription', () => {
    it('should load description from annotation', () => {
      expect(getDescription(state)).toEqual([
        { '@language': 'en', '@value': 'Annotation description' },
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
    it('should load attribution from annotation', () => {
      expect(getAttribution(state)).toEqual([
        {
          '@language': 'en',
          '@value': 'Some <b>attribution</b> for test annotation',
        },
      ]);
    });
  });

  describe('getLicense', () => {
    it('should load license from annotation', () => {
      expect(getLicense(state)).toEqual([
        'http://rightsstatements.org/vocab/NoC-NC/1.0/',
      ]);
    });
  });

  describe('getLogo', () => {
    it('should load logo from annotation', () => {
      expect(getLogo(state)).toEqual([
        'http://example.org/logos/institution1.jpg',
      ]);
    });
  });
});
