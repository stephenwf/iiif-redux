import {
  preprocessLinkedEntities,
  normalizeLinkedResources,
  normalizeLinkedResourceToObject,
  getSeeAlso,
  getService,
  getRelated,
  getRendering,
  getStartCanvas,
  getWithin,
} from '../../src/api/iiif-linking';

describe('api/iiif-linking', () => {
  describe('preprocessLinkedEntities', () => {
    it('should process seeAlso properties', () => {
      expect(
        preprocessLinkedEntities(
          'http://example.org/someResource.json',
          null,
          'seeAlso'
        )
      ).toEqual([{ '@id': 'http://example.org/someResource.json' }]);
    });
    it('should process service properties', () => {
      expect(
        preprocessLinkedEntities(
          'http://example.org/someResource.json',
          null,
          'service'
        )
      ).toEqual([{ '@id': 'http://example.org/someResource.json' }]);
    });
    it('should process related properties', () => {
      expect(
        preprocessLinkedEntities(
          'http://example.org/someResource.json',
          null,
          'related'
        )
      ).toEqual([{ '@id': 'http://example.org/someResource.json' }]);
    });
    it('should process rendering properties', () => {
      expect(
        preprocessLinkedEntities(
          'http://example.org/someResource.json',
          null,
          'rendering'
        )
      ).toEqual([{ '@id': 'http://example.org/someResource.json' }]);
    });
    it('should process within properties', () => {
      expect(
        preprocessLinkedEntities(
          'http://example.org/someResource.json',
          null,
          'within'
        )
      ).toEqual([{ '@id': 'http://example.org/someResource.json' }]);
    });
    it('should process startCanvas properties', () => {
      expect(
        preprocessLinkedEntities(
          'http://example.org/canvas/1.json',
          null,
          'startCanvas'
        )
      ).toEqual([{ '@id': 'http://example.org/canvas/1.json' }]);
    });
    it('should process string URIs', () => {
      expect(
        preprocessLinkedEntities(
          'http://example.org/canvas/1.json',
          null,
          'startCanvas'
        )
      ).toEqual([{ '@id': 'http://example.org/canvas/1.json' }]);
    });
    it('should process ignore invalid URIs', () => {
      expect(
        preprocessLinkedEntities('NOT A REAL URI', null, 'startCanvas')
      ).toEqual(null);

      expect(
        preprocessLinkedEntities(
          { 'not real': 'anything' },
          null,
          'startCanvas'
        )
      ).toEqual(null);
    });
    it('should process object links', () => {
      expect(
        preprocessLinkedEntities(
          { '@id': 'http://example.org/canvas/1.json' },
          null,
          'startCanvas'
        )
      ).toEqual([{ '@id': 'http://example.org/canvas/1.json' }]);
    });
    it('should process arrays of object links', () => {
      expect(
        preprocessLinkedEntities(
          [
            'http://example.org/canvas/1.json',
            { '@id': 'http://example.org/canvas/2.json' },
            { '@id': 'http://example.org/canvas/3.json' },
          ],
          null,
          'startCanvas'
        )
      ).toEqual([
        { '@id': 'http://example.org/canvas/1.json' },
        { '@id': 'http://example.org/canvas/2.json' },
        { '@id': 'http://example.org/canvas/3.json' },
      ]);
    });
    it('should ignore all other properties', () => {
      const noChanged = Symbol('not-changed');
      expect(preprocessLinkedEntities(noChanged, null, 'nope')).toEqual(
        noChanged
      );
    });
  });
  describe('normalizeLinkedResourceToObject', () => {
    it('should change strings to objects', () => {
      expect(
        normalizeLinkedResourceToObject('http://example.org/canvas/1.json')
      ).toEqual([
        {
          '@id': 'http://example.org/canvas/1.json',
        },
      ]);
    });
    it('should nullify falsey values', () => {
      expect(normalizeLinkedResourceToObject(false)).toEqual(null);
      expect(normalizeLinkedResourceToObject('')).toEqual(null);
    });
    it('should ignore invalid values', () => {
      expect(normalizeLinkedResourceToObject('NOT REAL')).toEqual(null);
    });
    it('should ignore best guess malformed values', () => {
      expect(
        normalizeLinkedResourceToObject([
          [['http://example.org/canvas/1.json']],
        ])
      ).toEqual([
        {
          '@id': 'http://example.org/canvas/1.json',
        },
      ]);
    });
  });
  describe('normalizeLinkedResource', () => {
    it('should ignore falsy values', () => {
      expect(normalizeLinkedResources(false)).toEqual([]);
    });
  });
  describe('getSeeAlso', () => {
    it('should getSeeAlso', () => {
      expect(
        getSeeAlso({ seeAlso: 'http://example.org/seeAlso.json' })
      ).toEqual('http://example.org/seeAlso.json');
    });
  });
  describe('getService', () => {
    it('should getService', () => {
      expect(
        getService({ service: 'http://example.org/service.json' })
      ).toEqual('http://example.org/service.json');
    });
  });
  describe('getRelated', () => {
    it('should getRelated', () => {
      expect(
        getRelated({ related: 'http://example.org/related.json' })
      ).toEqual('http://example.org/related.json');
    });
  });
  describe('getRendering', () => {
    it('should getRendering', () => {
      expect(
        getRendering({ rendering: 'http://example.org/rendering.json' })
      ).toEqual('http://example.org/rendering.json');
    });
  });
  describe('getStartCanvas', () => {
    it('should getStartCanvas', () => {
      expect(
        getStartCanvas({ startCanvas: 'http://example.org/startCanvas.json' })
      ).toEqual('http://example.org/startCanvas.json');
    });
  });
  describe('getWithin', () => {
    it('should getWithin', () => {
      expect(getWithin({ within: 'http://example.org/within.json' })).toEqual(
        'http://example.org/within.json'
      );
    });
  });
});
