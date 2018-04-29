import normalizeMetadataProperty from '../../src/compat/normalizeMetadataProperty';

describe('normalizeMetadataProperty', () => {
  const getEnglishMetadata = obj =>
    normalizeMetadataProperty(obj.metadata, 'en');

  it('Should handle string values', () => {
    expect(
      getEnglishMetadata({
        metadata: [{ label: 'test label 1', value: 'test value 1' }],
      })
    ).toEqual([
      {
        label: [{ '@language': 'en', '@value': 'test label 1' }],
        value: [{ '@language': 'en', '@value': 'test value 1' }],
      },
    ]);
  });

  it('Should handle well formatted language values', () => {
    expect(
      getEnglishMetadata({
        metadata: [
          {
            label: [{ '@language': 'en', '@value': 'test label 1' }],
            value: [{ '@language': 'en', '@value': 'test value 1' }],
          },
        ],
      })
    ).toEqual([
      {
        label: [{ '@language': 'en', '@value': 'test label 1' }],
        value: [{ '@language': 'en', '@value': 'test value 1' }],
      },
    ]);
  });

  it('Should handle well formatted language values (multiple)', () => {
    expect(
      getEnglishMetadata({
        metadata: [
          {
            label: [
              { '@language': 'en', '@value': 'test label 1' },
              { '@language': 'en-US', '@value': 'test label 2 (USA)' },
            ],
            value: [
              { '@language': 'en', '@value': 'test value 1' },
              { '@language': 'en-US', '@value': 'test value 2 (USA)' },
            ],
          },
        ],
      })
    ).toEqual([
      {
        label: [
          { '@language': 'en', '@value': 'test label 1' },
          { '@language': 'en-US', '@value': 'test label 2 (USA)' },
        ],
        value: [
          { '@language': 'en', '@value': 'test value 1' },
          { '@language': 'en-US', '@value': 'test value 2 (USA)' },
        ],
      },
    ]);
  });
  it('should handle presentation 3', () => {
    expect(
      getEnglishMetadata({
        metadata: [
          {
            label: { en: ['Creator'] },
            value: { en: ['Anne Artist (1776-1824)'] },
          },
        ],
      })
    ).toEqual([
      {
        label: [{ '@language': 'en', '@value': 'Creator' }],
        value: [{ '@language': 'en', '@value': 'Anne Artist (1776-1824)' }],
      },
    ]);
  });

  it('should handle presentation 3 (extended example)', () => {
    expect(
      getEnglishMetadata({
        metadata: [
          {
            label: { en: 'Author' }, // not well formatted p3
            value: { '@none': ['Anne Author'] },
          },
          {
            label: { en: ['Published'] },
            value: {
              en: ['Paris, circa 1400'],
              fr: ['Paris, environ 1400'],
              '@none': ['1400'],
            },
          },
          {
            label: { en: ['Notes'] },
            value: {
              en: ['Text of note 1', 'Text of note 2'],
            },
          },
          {
            label: { en: ['Source'] },
            value: {
              '@none': [
                '<span>From: <a href="https://example.org/db/1.html">Some Collection</a></span>',
              ],
            },
          },
        ],
      })
    ).toEqual([
      {
        label: [{ '@language': 'en', '@value': 'Author' }],
        value: [{ '@language': 'en', '@value': 'Anne Author' }],
      },
      {
        label: [{ '@language': 'en', '@value': 'Published' }],
        value: [
          { '@language': 'en', '@value': 'Paris, circa 1400' },
          { '@language': 'fr', '@value': 'Paris, environ 1400' },
          { '@language': 'en', '@value': '1400' },
        ],
      },
      {
        label: [{ '@language': 'en', '@value': 'Notes' }],
        value: [
          { '@language': 'en', '@value': 'Text of note 1' },
          { '@language': 'en', '@value': 'Text of note 2' },
        ],
      },
      {
        label: [{ '@language': 'en', '@value': 'Source' }],
        value: [
          {
            '@language': 'en',
            '@value':
              'From: <a href="https://example.org/db/1.html">Some Collection</a>',
          },
        ],
      },
    ]);
  });
  it('Should ignore invalid values', () => {
    expect(getEnglishMetadata({})).toEqual([]);
    expect(
      getEnglishMetadata({
        metadata: [[[]]],
      })
    ).toEqual([]);
    expect(
      getEnglishMetadata({
        metadata: [{}],
      })
    ).toEqual([]);
    expect(
      getEnglishMetadata({
        metadata: 1235,
      })
    ).toEqual([]);
  });
});
