import {
  getId,
  getType,
  getViewingHint,
  getNavDate,
  getViewingDirection,
  getFormat,
  getHeight,
  getWidth,
  VIEWING_HINTS,
  VIEWING_DIRECTIONS,
} from '../../src/api/iiif-technical';

describe('api/iiif-technical', () => {
  describe('getId', () => {
    it('should get Id fields', () => {
      expect(getId({ '@id': 'http://example.org/resource.json' })).toEqual(
        'http://example.org/resource.json'
      );
    });
  });
  describe('getType', () => {
    it('should get type fields', () => {
      expect(getType({ '@type': 'sc:Manifest' })).toEqual('sc:Manifest');
    });
  });
  describe('getViewingHint', () => {
    it('should return all viewing hints', () => {
      [
        VIEWING_HINTS.CONTINUOUS,
        VIEWING_HINTS.FACING_PAGES,
        VIEWING_HINTS.INDIVIUALS,
        VIEWING_HINTS.MULTI_PART,
        VIEWING_HINTS.NON_PAGES,
        VIEWING_HINTS.PAGED,
        VIEWING_HINTS.TOP,
      ].forEach(viewingHint => {
        expect(getViewingHint({ viewingHint })).toEqual(viewingHint);
      });
    });
    it('should return a valid URI viewint hint', () => {
      expect(
        getViewingHint({ viewingHint: 'http://example.org/viewing/hint' })
      ).toEqual('http://example.org/viewing/hint');
    });
    it('should ignore invalid viewing hints', () => {
      [
        0 / 0,
        'i dont exist',
        '907132',
        {},
        ['paged'],
        'reallylongforformattingreasons',
      ].forEach(viewingHint => {
        expect(getViewingHint({ viewingHint })).toEqual(null);
      });
    });
    it('should handle slightly invalid viewing hints', () => {
      ['Paged', 'pAgEd', ' Paged '].forEach(viewingHint => {
        expect(getViewingHint({ viewingHint })).toEqual(VIEWING_HINTS.PAGED);
      });
    });
  });
  describe('getNavDate', () => {
    it('should load navDate from manifest', () => {
      expect(getNavDate({ navDate: '1856-01-01T00:00:00Z' })).toEqual(
        '1856-01-01T00:00:00Z'
      );
    });
  });
  describe('getViewingDirection', () => {
    it('should load all valid viewing directions', () => {
      [
        VIEWING_DIRECTIONS.BOTTOM_TO_TOP,
        VIEWING_DIRECTIONS.LEFT_TO_RIGHT,
        VIEWING_DIRECTIONS.RIGHT_TO_LEFT,
        VIEWING_DIRECTIONS.TOP_TO_BOTTOM,
      ].forEach(viewingDirection => {
        expect(
          getViewingDirection({
            viewingDirection,
          })
        ).toEqual(viewingDirection);
      });
    });

    it('should default to left-to-right', () => {
      expect(getViewingDirection({})).toEqual(VIEWING_DIRECTIONS.LEFT_TO_RIGHT);
    });

    it('should default invalid input to left-to-right', () => {
      [
        0 / 0,
        'i dont exist',
        '907132',
        {},
        ['paged'],
        'reallylongforformattingreasons',
      ].forEach(viewingDirection => {
        expect(getViewingDirection({ viewingDirection })).toEqual(
          VIEWING_DIRECTIONS.LEFT_TO_RIGHT
        );
      });
    });
  });
  describe('getFormat', () => {
    it('should return format', () => {
      expect(getFormat({ format: 'text/plain' })).toEqual('text/plain');
    });
  });
  describe('getHeight', () => {
    it('should return height', () => {
      expect(getHeight({ height: 2000 })).toEqual(2000);
    });

    it('should parse irregular values', () => {
      expect(getHeight({ height: '2000' })).toEqual(2000);
      expect(getHeight({ height: '2000px' })).toEqual(2000);
      expect(getHeight({ height: '2000.0' })).toEqual(2000);
    });
    it('should always return a number', () => {
      expect(getHeight({})).toEqual(0);
    });
  });
  describe('getWidth', () => {
    it('should return width', () => {
      expect(getWidth({ width: 2000 })).toEqual(2000);
    });

    it('should parse irregular values', () => {
      expect(getWidth({ width: '2000' })).toEqual(2000);
      expect(getWidth({ width: '2000px' })).toEqual(2000);
      expect(getWidth({ width: '2000.0' })).toEqual(2000);
    });

    it('should always return a number', () => {
      expect(getWidth({})).toEqual(0);
    });
  });
});
