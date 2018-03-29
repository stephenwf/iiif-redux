import {
  getViewingDirection,
  getNavDate,
  getId,
  getType,
  getViewingHint,
} from '../../../src/api/current-manifest';

describe('api/current-manifest/technical', () => {
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
  const state = {
    routing: { currentManifest: 'http://iiif.com/manifest-1.json' },
    config: { defaultLanguage: 'en' },
    manifests: {
      'http://iiif.com/manifest-1.json': {
        '@id': 'http://iiif.com/manifest-1.json',
        '@type': 'sc:Manifest',
        navDate: '1856-01-01T00:00:00Z',
        viewingDirection: 'top-to-bottom',
        viewingHint: 'individuals',
      },
    },
  };

  describe('getId', () => {
    it('should load id from manifest', () => {
      expect(getId(state)).toEqual('http://iiif.com/manifest-1.json');
    });
  });

  describe('getType', () => {
    it('should load type from manifest', () => {
      expect(getType(state)).toEqual('sc:Manifest');
    });
  });

  describe('getViewingDirection', () => {
    it('should load viewingDirection from manifest', () => {
      expect(getViewingDirection(state)).toEqual('top-to-bottom');
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
      expect(
        getViewingHint(
          createStateWithCustomProperties({
            viewingHint: 'http://example.org/viewingHint',
          })
        )
      ).toEqual('http://example.org/viewingHint');
      expect(getViewingHint(state)).toEqual('individuals');
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
      expect(getNavDate(state)).toEqual('1856-01-01T00:00:00Z');
    });
  });
});
