import {
  getSeeAlso,
  getService,
  getLogo,
  getHomepage,
  getRendering,
  getPartOf,
  getStart,
  getSupplementary,
} from '../../../../src/api/3.x/iiif/linking';

describe('api/3.x/iiif/linking', () => {
  test('seeAlso', () => {
    expect(
      getSeeAlso({
        seeAlso: ['https://example.org/library/catalog/book1.xml'],
      })
    ).toEqual(['https://example.org/library/catalog/book1.xml']);
  });

  test('service', () => {
    expect(
      getService({
        service: ['https://example.org/images/book1-page1'],
      })
    ).toEqual(['https://example.org/images/book1-page1']);
  });

  test('logo', () => {
    expect(
      getLogo({
        logo: ['https://example.org/logos/institution1.jpg'],
      })
    ).toEqual(['https://example.org/logos/institution1.jpg']);
  });

  test('homepage', () => {
    expect(
      getHomepage({
        homepage: 'https://example.org/info/book1/',
      })
    ).toEqual('https://example.org/info/book1/');
  });

  test('rendering', () => {
    expect(
      getRendering({
        rendering: ['https://example.org/iiif/book1.pdf'],
      })
    ).toEqual(['https://example.org/iiif/book1.pdf']);
  });

  test('partOf', () => {
    expect(
      getPartOf({
        partOf: [
          {
            schema: 'collection',
            id: 'https://example.org/collections/books/',
          },
        ],
      })
    ).toEqual([
      { schema: 'collection', id: 'https://example.org/collections/books/' },
    ]);
  });

  test('start', () => {
    expect(
      getStart({
        start: {
          schema: 'canvas',
          id: 'https://example.org/iiif/book1/canvas/p2',
        },
      })
    ).toEqual({
      schema: 'canvas',
      id: 'https://example.org/iiif/book1/canvas/p2',
    });
  });

  test('supplementary', () => {
    expect(
      getSupplementary({
        supplementary: {
          schema: 'annotationCollection',
          id: 'https://example.org/iiif/1/annos/1',
        },
      })
    ).toEqual({
      schema: 'annotationCollection',
      id: 'https://example.org/iiif/1/annos/1',
    });
  });
});
