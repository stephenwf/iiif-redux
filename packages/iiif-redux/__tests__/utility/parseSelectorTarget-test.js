import parseSelectorTarget from '../../src/utility/parseTargetSelector';

describe('parseSelectorTarget', () => {
  test('percent selector', () => {
    expect(
      parseSelectorTarget(
        'http://example.org/iiif/canvas/1?#xywh=percent:10,20,50,40'
      )
    ).toEqual({
      expanded: true,
      height: 40,
      id: 'http://example.org/iiif/canvas/1?',
      unit: 'percent',
      width: 50,
      x: 10,
      y: 20,
    });
  });

  test('invalid selector', () => {
    expect(parseSelectorTarget(null)).toEqual(null);
  });
});
