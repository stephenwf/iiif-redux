import normalizeLinkedResources from '../../src/compat/normalizeLinkedResources';

describe('normalizeLinkedResource', () => {
  it('should ignore false-y values', () => {
    expect(normalizeLinkedResources(false)).toEqual([]);
  });
});
