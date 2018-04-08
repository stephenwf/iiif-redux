import {
  getLabel,
  getDescription,
  getAttribution,
  getMetadata,
  getThumbnailId,
  getLicense,
  getLogo,
  filterHtmlTags,
} from '../../src/api/iiif-descriptive';

describe('api/iiif-descriptive', () => {
  describe('getLabel', () => {
    const getEnglishLabel = getLabel('en');

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
    const getEnglishDescription = getDescription('en');
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
    const getEnglishAttribution = getAttribution('en');
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

  describe('getMetadata', () => {
    const getEnglishMetadata = getMetadata('en');

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
          value: [{ '@language': 'en', '@value': 'Text of note 1' }],
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

  describe('getThumbnailId', () => {
    it('should parse image service thumbnails', () => {
      expect(
        getThumbnailId({
          thumbnail: {
            '@id':
              'http://example.org/images/book1-page1/full/80,100/0/default.jpg',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id': 'http://example.org/images/book1-page1',
              profile: 'http://iiif.io/api/image/2/level1.json',
            },
          },
        })
      ).toEqual({
        '@id':
          'http://example.org/images/book1-page1/full/80,100/0/default.jpg',
        service: {
          '@context': 'http://iiif.io/api/image/2/context.json',
          '@id': 'http://example.org/images/book1-page1',
          profile: 'http://iiif.io/api/image/2/level1.json',
        },
      });
    });

    it('should parse string thumbnails', () => {
      expect(
        getThumbnailId({
          thumbnail:
            'http://example.org/images/book1-page1/full/80,100/0/default.jpg',
        })
      ).toEqual(
        'http://example.org/images/book1-page1/full/80,100/0/default.jpg'
      );
    });
    it('should return the first', () => {
      expect(
        getThumbnailId({
          thumbnail: [
            'http://example.org/images/book1-page1/full/80,100/0/default.jpg',
          ],
        })
      ).toEqual(
        'http://example.org/images/book1-page1/full/80,100/0/default.jpg'
      );
    });
  });

  describe('getLicense', () => {
    it('should normalize license to array', () => {
      expect(
        getLicense({
          license: 'http://rightsstatements.org/vocab/NoC-NC/1.0/',
        })
      ).toEqual(['http://rightsstatements.org/vocab/NoC-NC/1.0/']);
      expect(
        getLicense({
          license: ['http://rightsstatements.org/vocab/NoC-NC/1.0/'],
        })
      ).toEqual(['http://rightsstatements.org/vocab/NoC-NC/1.0/']);
      expect(
        getLicense({
          license: [
            'http://rightsstatements.org/vocab/NoC-NC/1.0/',
            'http://rightsstatements.org/vocab/NoC-NC/1.1/',
          ],
        })
      ).toEqual([
        'http://rightsstatements.org/vocab/NoC-NC/1.0/',
        'http://rightsstatements.org/vocab/NoC-NC/1.1/',
      ]);
    });
    it('handles missing licences', () => {
      expect(
        getLicense({
          licence: null,
        })
      ).toEqual(null);
    });
  });

  describe('getLogo', () => {
    it('should unwrap service to ID', () => {
      expect(
        getLogo({
          logo: {
            '@id': 'http://example.org/logos/institution1.jpg',
            service: {
              '@context': 'http://iiif.io/api/image/2/context.json',
              '@id': 'http://example.org/service/inst1',
              profile: 'http://iiif.io/api/image/2/level2.json',
            },
          },
        })
      ).toEqual('http://example.org/logos/institution1.jpg');
      expect(
        getLogo({
          logo: 'http://example.org/logos/institution1.jpg',
        })
      ).toEqual('http://example.org/logos/institution1.jpg');
    });
    it('should return the first service', () => {
      expect(
        getLogo({
          logo: [
            'http://example.org/logos/institution1.jpg',
            'http://example.org/logos/institution2.jpg',
          ],
        })
      ).toEqual('http://example.org/logos/institution1.jpg');
      expect(
        getLogo({
          logo: [
            {
              '@id': 'http://example.org/logos/institution1.jpg',
              service: {
                '@context': 'http://iiif.io/api/image/2/context.json',
                '@id': 'http://example.org/service/inst1',
                profile: 'http://iiif.io/api/image/2/level2.json',
              },
            },
            {
              '@id': 'http://example.org/logos/institution2.jpg',
              service: {
                '@context': 'http://iiif.io/api/image/2/context.json',
                '@id': 'http://example.org/service/inst1',
                profile: 'http://iiif.io/api/image/2/level2.json',
              },
            },
          ],
        })
      ).toEqual('http://example.org/logos/institution1.jpg');
    });
  });

  describe('filterHtmlTags', () => {
    it('should not filter some tags', () => {
      const notFiltered = [
        '<a href="#">not filtered</a>',
        '<b>not filtered</b>',
        '<p class="center">not filtered</p>',
        'not<br/>filtered',
        'not <i>filtered</i>',
        'not <img src="#"/> filtered',
      ];

      notFiltered.forEach(str => {
        expect(filterHtmlTags(str)).toEqual(str);
      });
    });
    it('should filter some tags', () => {
      expect(filterHtmlTags('<script>filterMe();</script>')).toEqual(
        'filterMe();'
      );
      expect(filterHtmlTags('<ul><li>filter</li> <li>me</li></ul>')).toEqual(
        'filter me'
      );
    });
    it('should filter arrays', () => {
      expect(
        filterHtmlTags([
          'filter me',
          '<strong>filter</strong> me',
          'filter <hr/>me',
        ])
      ).toEqual(['filter me', 'filter me', 'filter me']);
    });
  });
});
