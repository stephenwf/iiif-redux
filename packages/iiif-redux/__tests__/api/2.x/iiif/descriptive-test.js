import {
  getLabel,
  getDescription,
  getAttribution,
  getMetadata,
  getThumbnailId,
  getLicense,
  getLogo,
} from '../../../../src/api/2.x/iiif/descriptive';

describe('api/iiif/descriptive', () => {
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
    it('handles missing licenses', () => {
      expect(
        getLicense({
          license: null,
        })
      ).toEqual(null);
    });
  });

  describe('getLogo', () => {
    it('should ignore missing logos', () => {
      expect(getLogo({})).toEqual(null);
    });
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
});
