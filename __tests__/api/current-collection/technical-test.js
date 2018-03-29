import {
  getId,
  getType,
  getViewingHint,
  getNavDate,
} from '../../../src/api/current-collection';

describe('api/current-collection/descriptive', () => {
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

  describe('getViewingHint', () => {
    it('should load a valid viewing hint from collection', () => {
      expect(getViewingHint(state1)).toEqual('individuals');
      expect(
        getViewingHint(
          createStateWithCustomProperties({
            viewingHint: 'http://iiif.com/custom/viewinghint',
          })
        )
      ).toEqual('http://iiif.com/custom/viewinghint');
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
