import {
  getFirst,
  getLast,
  getNext,
  getPrevious,
  getStartIndex,
  getTotal,
} from '../../../src/api/2.x/iiif/paging';

describe('api/iiif/paging', () => {
  describe('getFirst', () => {
    it('should get First property', () => {
      expect(
        getFirst({
          first: ['http://example.org/page/1.json'],
        })
      ).toEqual('http://example.org/page/1.json');
    });
    it('should ignore empty values', () => {
      expect(getFirst({})).toEqual(null);
      expect(getFirst({ first: [] })).toEqual(null);
    });
  });
  describe('getLast', () => {
    it('should get Last property', () => {
      expect(
        getLast({
          last: ['http://example.org/page/20.json'],
        })
      ).toEqual('http://example.org/page/20.json');
    });
    it('should ignore empty values', () => {
      expect(getLast({})).toEqual(null);
      expect(getLast({ last: [] })).toEqual(null);
    });
  });
  describe('getNext', () => {
    it('should get Next property', () => {
      expect(
        getNext({
          next: ['http://example.org/page/2.json'],
        })
      ).toEqual('http://example.org/page/2.json');
    });
    it('should ignore empty values', () => {
      expect(getNext({})).toEqual(null);
      expect(getNext({ next: [] })).toEqual(null);
    });
  });
  describe('getPrevious', () => {
    it('should get Previous property', () => {
      expect(
        getPrevious({
          prev: ['http://example.org/page/0.json'],
        })
      ).toEqual('http://example.org/page/0.json');
    });
    it('should ignore empty values', () => {
      expect(getPrevious({})).toEqual(null);
      expect(getPrevious({ prev: [] })).toEqual(null);
    });
  });
  describe('getStartIndex', () => {
    it('should get StartIndex property', () => {
      expect(
        getStartIndex({
          startIndex: 123,
        })
      ).toEqual(123);
    });
    it('should get StartIndex property (malformed)', () => {
      expect(
        getStartIndex({
          startIndex: '00123',
        })
      ).toEqual(123);
    });
    it('should default to 0', () => {
      expect(getStartIndex({})).toEqual(0);
    });
  });
  describe('getTotal', () => {
    it('should get Total property', () => {
      expect(
        getTotal({
          total: 293,
        })
      ).toEqual(293);
    });
    it('should get Total property (malformed)', () => {
      expect(
        getTotal({
          total: '293 things',
        })
      ).toEqual(293);
    });
    it('should default to null', () => {
      expect(getTotal({})).toEqual(null);
    });
  });
});
