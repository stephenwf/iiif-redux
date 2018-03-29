import {
  getViewingDirection,
  getNavDate,
  getId,
  getLabel,
  getDescription,
  getMetadata,
  getType,
  getAttribution,
  getLicense,
  getLogo,
  getThumbnail,
  getViewingHint,
} from '../../src/api/current-manifest';

describe('api/current-manifest', () => {
  const createStateWithCustomProperties = props => ({
    routing: { currentManifest: 'http://iiif.com/manifest-1.json' },
    config: { defaultLanguage: 'en' },
    manifests: {
      'http://iiif.com/manifest-1.json': {
        '@id': 'http://iiif.com/manifest-1.json',
        ...props,
      },
    },
  });
  const state1 = {
    routing: { currentManifest: 'http://iiif.com/manifest-1.json' },
    config: { defaultLanguage: 'en' },
    manifests: {
      'http://iiif.com/manifest-1.json': {
        '@id': 'http://iiif.com/manifest-1.json',
        '@type': 'sc:Manifest',
        label: 'Manifest label 1',
        description: 'Manifest description',
        navDate: '1856-01-01T00:00:00Z',
        viewingDirection: 'top-to-bottom',
        viewingHint: 'individuals',
        metadata: [
          { label: 'test metadata label', value: 'test metadata value' },
        ],
        attribution: 'Some <b>attribution</b> for test manifest',
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
    it('should load label from manifest', () => {
      expect(getLabel(state1)).toEqual([
        { '@language': 'en', '@value': 'Manifest label 1' },
      ]);
    });
  });

  describe('getMetadata', () => {
    it('should load metadata from manifest', () => {
      expect(getMetadata(state1)).toEqual([
        {
          label: [{ '@language': 'en', '@value': 'test metadata label' }],
          value: [{ '@language': 'en', '@value': 'test metadata value' }],
        },
      ]);
    });
  });

  describe('getDescription', () => {
    it('should load description from manifest', () => {
      expect(getDescription(state1)).toEqual([
        { '@language': 'en', '@value': 'Manifest description' },
      ]);
    });
  });

  describe('getThumbnail', () => {
    it('should load thumbnail from manifest', () => {
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
    it('should load attribution from manifest', () => {
      expect(getAttribution(state1)).toEqual([
        {
          '@language': 'en',
          '@value': 'Some <b>attribution</b> for test manifest',
        },
      ]);
    });
  });

  describe('getLicense', () => {
    it('should load licence from manifest', () => {
      expect(getLicense(state1)).toEqual([
        'http://rightsstatements.org/vocab/NoC-NC/1.0/',
      ]);
    });
  });

  describe('getLogo', () => {
    it('should load logo from manifest', () => {
      expect(getLogo(state1)).toEqual(
        'http://example.org/logos/institution1.jpg'
      );
    });
  });

  /**
   * Technical properties
   * - getId (Required)
   * - getType (Required - probably not needed for this)
   * - getViewingDirection (Optional)
   * - getViewingHint (Optional)
   * - getNavDate (Optional)
   */
  describe('getId', () => {
    it('should load id from manifest', () => {
      expect(getId(state1)).toEqual('http://iiif.com/manifest-1.json');
    });
  });

  describe('getType', () => {
    it('should load type from manifest', () => {
      expect(getType(state1)).toEqual('sc:Manifest');
    });
  });

  describe('getViewingDirection', () => {
    it('should load viewingDirection from manifest', () => {
      expect(getViewingDirection(state1)).toEqual('top-to-bottom');
    });

    it('should load top-to-bottom', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'top-to-bottom',
          })
        )
      ).toEqual('top-to-bottom');
    });

    it('should load bottom-to-top', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'bottom-to-top',
          })
        )
      ).toEqual('bottom-to-top');
    });

    it('should load left-to-right', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'left-to-right',
          })
        )
      ).toEqual('left-to-right');
    });

    it('should load right-to-left', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'right-to-left',
          })
        )
      ).toEqual('right-to-left');
    });

    it('should load default to left-to-right when invalid', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'NOT REAL',
          })
        )
      ).toEqual('left-to-right');
    });
  });

  describe('getViewingHint', () => {
    it('should load a valid viewing hint from manifest', () => {
      expect(getViewingHint(state1)).toEqual('individuals');
    });
    it('should ignore an invalid viewing hint', () => {
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
    it('should load navDate from manifest', () => {
      expect(getNavDate(state1)).toEqual('1856-01-01T00:00:00Z');
    });
  });
});
