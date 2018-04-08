import normalizeLinkedResourceToObject from '../../src/compat/normalizeLinkedResourceToObject';

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
  it('should nullify false-y values', () => {
    expect(normalizeLinkedResourceToObject(false)).toEqual(null);
    expect(normalizeLinkedResourceToObject('')).toEqual(null);
  });
  it('should ignore invalid values', () => {
    expect(normalizeLinkedResourceToObject('NOT REAL')).toEqual(null);
  });
  it('should ignore best guess malformed values', () => {
    expect(
      normalizeLinkedResourceToObject([[['http://example.org/canvas/1.json']]])
    ).toEqual([
      {
        '@id': 'http://example.org/canvas/1.json',
      },
    ]);
  });
  it('should ignore all other properties', () => {
    expect(normalizeLinkedResourceToObject(123)).toEqual(null);
  });
});
