import {
  getItems,
  getStructures,
  getAnnotations,
} from '../../../../src/api/3.x/iiif/structural';

describe('api/3.x/iiif/structural', () => {
  test('items', () => {
    expect(
      getItems({
        items: [
          'https://example.org/iif/1/canvas/1',
          'https://example.org/iif/1/canvas/2',
        ],
      })
    ).toEqual([
      'https://example.org/iif/1/canvas/1',
      'https://example.org/iif/1/canvas/2',
    ]);

    expect(getItems({})).toEqual([]);
  });

  test('structures', () => {
    expect(
      getStructures({
        structures: [
          'https://example.org/iiif/range/1',
          'https://example.org/iiif/range/2',
        ],
      })
    ).toEqual([
      'https://example.org/iiif/range/1',
      'https://example.org/iiif/range/2',
    ]);
    expect(getStructures({})).toEqual([]);
  });

  test('annotations', () => {
    expect(
      getAnnotations({
        annotations: [
          'https://example.org/iiif/annotationPage/1',
          'https://example.org/iiif/annotationPage/2',
        ],
      })
    ).toEqual([
      'https://example.org/iiif/annotationPage/1',
      'https://example.org/iiif/annotationPage/2',
    ]);

    expect(getAnnotations({})).toEqual([]);
  });
});
