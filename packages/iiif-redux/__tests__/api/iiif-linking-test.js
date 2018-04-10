import {
  getSeeAlso,
  getService,
  getRelated,
  getRendering,
  getStartCanvas,
  getWithin,
} from '../../src/api/iiif-linking';

describe('api/iiif-linking', () => {
  describe('getSeeAlso', () => {
    it('should getSeeAlso', () => {
      expect(
        getSeeAlso({ seeAlso: ['http://example.org/seeAlso.json'] })
      ).toEqual(['http://example.org/seeAlso.json']);

      expect(getSeeAlso({})).toEqual([]);
    });
  });
  describe('getService', () => {
    it('should getService', () => {
      expect(
        getService({ service: ['http://example.org/service.json'] })
      ).toEqual(['http://example.org/service.json']);

      expect(getService({})).toEqual([]);
    });
  });
  describe('getRelated', () => {
    it('should getRelated', () => {
      expect(
        getRelated({ related: ['http://example.org/related.json'] })
      ).toEqual(['http://example.org/related.json']);

      expect(getRelated({})).toEqual([]);
    });
  });
  describe('getRendering', () => {
    it('should getRendering', () => {
      expect(
        getRendering({ rendering: ['http://example.org/rendering.json'] })
      ).toEqual(['http://example.org/rendering.json']);

      expect(getRendering({})).toEqual([]);
    });
  });
  describe('getStartCanvas', () => {
    it('should getStartCanvas', () => {
      expect(
        getStartCanvas({ startCanvas: ['http://example.org/startCanvas.json'] })
      ).toEqual(['http://example.org/startCanvas.json']);

      expect(getStartCanvas({})).toEqual([]);
    });
  });
  describe('getWithin', () => {
    it('should getWithin', () => {
      expect(getWithin({ within: ['http://example.org/within.json'] })).toEqual(
        ['http://example.org/within.json']
      );

      expect(getWithin({})).toEqual([]);
    });
  });
});
