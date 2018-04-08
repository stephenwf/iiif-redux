import preprocessLinkedEntities from '../../src/compat/preprocessLinkedEntities';

describe('preprocessLinkedEntities', () => {
  it('should process seeAlso properties', () => {
    expect(
      preprocessLinkedEntities({
        seeAlso: 'http://example.org/someResource.json',
      })
    ).toEqual({
      seeAlso: [{ '@id': 'http://example.org/someResource.json' }],
    });
  });
  it('should process service properties', () => {
    expect(
      preprocessLinkedEntities({
        service: 'http://example.org/someResource.json',
      })
    ).toEqual({
      service: [{ '@id': 'http://example.org/someResource.json' }],
    });
  });
  it('should process related properties', () => {
    expect(
      preprocessLinkedEntities({
        related: 'http://example.org/someResource.json',
      })
    ).toEqual({
      related: [{ '@id': 'http://example.org/someResource.json' }],
    });
  });
  it('should process rendering properties', () => {
    expect(
      preprocessLinkedEntities({
        rendering: 'http://example.org/someResource.json',
      })
    ).toEqual({
      rendering: [{ '@id': 'http://example.org/someResource.json' }],
    });
  });
  it('should process within properties', () => {
    expect(
      preprocessLinkedEntities({
        within: 'http://example.org/someResource.json',
      })
    ).toEqual({
      within: [{ '@id': 'http://example.org/someResource.json' }],
    });
  });
  it('should process startCanvas properties', () => {
    expect(
      preprocessLinkedEntities({
        startCanvas: 'http://example.org/canvas/1.json',
      })
    ).toEqual({
      startCanvas: { '@id': 'http://example.org/canvas/1.json' },
    });
  });
  it('should process string URIs', () => {
    expect(
      preprocessLinkedEntities({
        startCanvas: 'http://example.org/canvas/1.json',
      })
    ).toEqual({
      startCanvas: { '@id': 'http://example.org/canvas/1.json' },
    });
  });
  it('should process ignore invalid URIs', () => {
    expect(preprocessLinkedEntities({ startCanvas: 'NOT A REAL URI' })).toEqual(
      { startCanvas: null }
    );

    expect(preprocessLinkedEntities({ 'not real': 'anything' })).toEqual({
      'not real': 'anything',
    });
  });
  it('should process object links', () => {
    expect(
      preprocessLinkedEntities({ '@id': 'http://example.org/canvas/1.json' })
    ).toEqual({ '@id': 'http://example.org/canvas/1.json' });
  });
  it('should process arrays of object links', () => {
    expect(
      preprocessLinkedEntities({
        service: [
          'http://example.org/canvas/1.json',
          { '@id': 'http://example.org/canvas/2.json' },
          { '@id': 'http://example.org/canvas/3.json' },
        ],
      })
    ).toEqual({
      service: [
        { '@id': 'http://example.org/canvas/1.json' },
        { '@id': 'http://example.org/canvas/2.json' },
        { '@id': 'http://example.org/canvas/3.json' },
      ],
    });
  });
  it('should ignore all other properties', () => {
    const noChanged = Symbol('not-changed');
    expect(
      preprocessLinkedEntities({ notProcessed: noChanged }, null, 'nope')
    ).toEqual({ notProcessed: noChanged });
  });
});
