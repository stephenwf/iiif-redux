import {
  getHeight,
  getId,
  getType,
  getViewingHint,
  getWidth,
} from '../../../src/api/current-canvas';

describe('api/current-canvas/technical', () => {
  const createStateWithCustomProperties = props => ({
    routing: { currentCanvas: 'http://iiif.com/canvas-1.json' },
    config: { defaultLanguage: 'en' },
    resources: {
      canvases: {
        'http://iiif.com/canvas-1.json': {
          '@id': 'http://iiif.com/canvas-1.json',
          ...props,
        },
      },
    },
  });

  const state = {
    routing: { currentCanvas: 'http://iiif.com/canvas-1.json' },
    config: { defaultLanguage: 'en' },
    resources: {
      canvases: {
        'http://iiif.com/canvas-1.json': {
          '@id': 'http://iiif.com/canvas-1.json',
          '@type': 'sc:Canvas',
          label: 'Test canvas label',
          viewingDirection: 'top-to-bottom',
          viewingHint: 'non-paged',
          navDate: '1856-01-01T00:00:00Z',
          height: 2000,
          width: 3000,
        },
      },
    },
  };

  describe('getId', () => {
    it('should load id from canvas', () => {
      expect(getId(state)).toEqual('http://iiif.com/canvas-1.json');
    });
  });

  describe('getType', () => {
    it('should load type from canvas', () => {
      expect(getType(state)).toEqual('sc:Canvas');
    });
  });

  describe('getViewingHint', () => {
    it('should load a valid viewing hint from canvas', () => {
      expect(getViewingHint(state)).toEqual('non-paged');
      expect(
        getViewingHint(
          createStateWithCustomProperties({
            viewingHint: 'http://iiif.com/custom/viewinghint',
          })
        )
      ).toEqual('http://iiif.com/custom/viewinghint');
    });
    it('should ignore an invalid viewing hint from canvas', () => {
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

  describe('get height', () => {
    it('should return height', () => {
      expect(getHeight(state)).toEqual(2000);
    });
  });

  describe('get width', () => {
    it('should return width', () => {
      expect(getWidth(state)).toEqual(3000);
    });
  });
});
