import normalizeLanguageProperty from '../../src/compat/normalizeLanguageProperty';

describe('normalizeLanguageProperty', () => {
  describe('getLabel', () => {
    const getEnglishLabel = obj => normalizeLanguageProperty(obj.label, 'en');

    it('should accept strings', () => {
      expect(
        getEnglishLabel({
          label: 'Book 1',
        })
      ).toEqual([{ '@language': 'en', '@value': 'Book 1' }]);
    });

    it('should accept arrays of strings', () => {
      expect(
        getEnglishLabel({
          label: ['Book 1', 'An unexpected journey'],
        })
      ).toEqual([
        { '@language': 'en', '@value': 'Book 1' },
        { '@language': 'en', '@value': 'An unexpected journey' },
      ]);
      expect(
        getEnglishLabel({
          label: ['Book 1'],
        })
      ).toEqual([{ '@language': 'en', '@value': 'Book 1' }]);
    });

    it('should ignore invalid values', () => {
      expect(
        getEnglishLabel({
          label: [['Book 1', 'An unexpected journey']],
        })
      ).toEqual([]);
      expect(
        getEnglishLabel({
          label: [null, ['Book 1', 'An unexpected journey']],
        })
      ).toEqual([]);
      expect(
        getEnglishLabel({
          label: [null, 'Book 1'],
        })
      ).toEqual([{ '@language': 'en', '@value': 'Book 1' }]);
      expect(
        getEnglishLabel({
          label: [123, 'Book 1'],
        })
      ).toEqual([{ '@language': 'en', '@value': 'Book 1' }]);
      expect(
        getEnglishLabel({
          label: 0 / 0,
        })
      ).toEqual([]);
    });

    it('should leave well formatted languages', () => {
      expect(
        getEnglishLabel({
          label: { '@language': 'en', '@value': 'Book 1' },
        })
      ).toEqual([{ '@language': 'en', '@value': 'Book 1' }]);
    });
    it('should leave well formatted languages when given a single array value', () => {
      expect(
        getEnglishLabel({
          label: [{ '@language': 'en', '@value': 'Book 1' }],
        })
      ).toEqual([{ '@language': 'en', '@value': 'Book 1' }]);
    });

    it('should leave well formatted languages (multiple)', () => {
      expect(
        getEnglishLabel({
          label: [
            { '@language': 'en', '@value': 'Book 1' },
            { '@language': 'cy', '@value': 'lyfrau 1' },
          ],
        })
      ).toEqual([
        { '@language': 'en', '@value': 'Book 1' },
        { '@language': 'cy', '@value': 'lyfrau 1' },
      ]);
    });

    it('should handle presentation 3', () => {
      expect(
        getEnglishLabel({ label: { en: ['Example Object Title'] } })
      ).toEqual([{ '@language': 'en', '@value': 'Example Object Title' }]);
    });
    it('should handle presentation 3 (multiple)', () => {
      expect(
        getEnglishLabel({
          label: {
            en: ['Example Object Title'],
            cy: ['Example welsh title'],
            '@none': 'nothing',
          },
        })
      ).toEqual([
        { '@language': 'en', '@value': 'Example Object Title' },
        { '@language': 'cy', '@value': 'Example welsh title' },
        { '@language': 'en', '@value': 'nothing' },
      ]);
    });
  });

  describe('getDescription', () => {
    const getEnglishDescription = obj =>
      normalizeLanguageProperty(obj.description, 'en');
    it('should accept strings', () => {
      expect(
        getEnglishDescription({
          description: 'Description of book',
        })
      ).toEqual([{ '@language': 'en', '@value': 'Description of book' }]);
    });

    it('should leave well formatted languages', () => {
      expect(
        getEnglishDescription({
          description: {
            '@language': 'en',
            '@value': 'Description of book',
          },
        })
      ).toEqual([{ '@language': 'en', '@value': 'Description of book' }]);
    });
    it('should leave well formatted languages when given a single array value', () => {
      expect(
        getEnglishDescription({
          description: [{ '@language': 'en', '@value': 'Description of book' }],
        })
      ).toEqual([{ '@language': 'en', '@value': 'Description of book' }]);
    });

    it('should leave well formatted languages (multiple)', () => {
      expect(
        getEnglishDescription({
          description: [
            { '@language': 'en', '@value': 'Description of book' },
            { '@language': 'cy', '@value': 'lyfrau' },
          ],
        })
      ).toEqual([
        { '@language': 'en', '@value': 'Description of book' },
        { '@language': 'cy', '@value': 'lyfrau' },
      ]);
    });
  });

  describe('getAttribution', () => {
    const getEnglishAttribution = obj =>
      normalizeLanguageProperty(obj.attribution, 'en');
    it('should accept strings', () => {
      expect(
        getEnglishAttribution({
          attribution: 'Some Attribution text',
        })
      ).toEqual([{ '@language': 'en', '@value': 'Some Attribution text' }]);
    });

    it('should leave well formatted languages', () => {
      expect(
        getEnglishAttribution({
          attribution: {
            '@language': 'en',
            '@value': 'Some Attribution text',
          },
        })
      ).toEqual([{ '@language': 'en', '@value': 'Some Attribution text' }]);
    });
    it('should leave well formatted languages when given a single array value', () => {
      expect(
        getEnglishAttribution({
          attribution: [
            { '@language': 'en', '@value': 'Some Attribution text' },
          ],
        })
      ).toEqual([{ '@language': 'en', '@value': 'Some Attribution text' }]);
    });

    it('should leave well formatted languages (multiple)', () => {
      expect(
        getEnglishAttribution({
          attribution: [
            { '@language': 'en', '@value': 'Some Attribution text' },
            { '@language': 'cy', '@value': 'lyfrau' },
          ],
        })
      ).toEqual([
        { '@language': 'en', '@value': 'Some Attribution text' },
        { '@language': 'cy', '@value': 'lyfrau' },
      ]);
    });
  });
});
