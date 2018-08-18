import range from '../../../../src/api/2.x/range';

describe('api/2.x/range/structural', () => {
  const {
    getCanvases,
    getCanvasIds,
    getMemberIds,
    getMembers,
    getRanges,
    getRangeIds,
  } = range(s => s.resources.ranges['http://iiif.com/range-1.json']);
  const t = text => [{ '@value': text, '@language': 'en' }];
  const state = {
    resources: {
      ranges: {
        'http://iiif.com/range-1.json': {
          '@id': 'http://iiif.com/range-1.json',
          label: t('Range 1'),
          ranges: [
            'http://iiif.com/range-2.json',
            'http://iiif.com/range-4.json',
          ],
          members: [
            { id: 'http://iiif.com/canvas-1.json', schema: 'canvas' },
            { id: 'http://iiif.com/canvas-3.json', schema: 'canvas' },
            { id: 'http://iiif.com/range-2.json', schema: 'range' },
            { id: 'http://iiif.com/range-3.json', schema: 'range' },
          ],
          canvases: [
            'http://iiif.com/canvas-1.json',
            'http://iiif.com/canvas-2.json',
            'http://iiif.com/canvas-external.json',
          ],
        },
        'http://iiif.com/range-2.json': {
          '@id': 'http://iiif.com/range-1.json',
          label: t('Range 2'),
        },
        'http://iiif.com/range-3.json': {
          '@id': 'http://iiif.com/range-1.json',
          label: t('Range 3'),
        },
        'http://iiif.com/range-4.json': {
          '@id': 'http://iiif.com/range-1.json',
          label: t('Range 4'),
        },
      },
      canvases: {
        'http://iiif.com/canvas-1.json': {
          '@id': 'http://iiif.com/canvas-1.json',
          label: t('Canvas 1'),
        },
        'http://iiif.com/canvas-2.json': {
          '@id': 'http://iiif.com/canvas-2.json',
          label: t('Canvas 2'),
        },
        'http://iiif.com/canvas-3.json': {
          '@id': 'http://iiif.com/canvas-3.json',
          label: t('Canvas 3'),
        },
        'http://iiif.com/canvas-4.json': {
          '@id': 'http://iiif.com/canvas-4.json',
          label: t('Canvas 4'),
        },
      },
    },
  };

  it('should get canvas ids', () => {
    expect(getCanvasIds(state)).toEqual([
      'http://iiif.com/canvas-1.json',
      'http://iiif.com/canvas-3.json',
      'http://iiif.com/canvas-2.json',
      'http://iiif.com/canvas-external.json',
    ]);
  });

  it('should get all canvases', () => {
    expect(getCanvases(state).map(canvas => canvas.label[0]['@value'])).toEqual(
      ['Canvas 1', 'Canvas 3', 'Canvas 2', 'unknown']
    );
  });

  it('should get range ids', () => {
    expect(getRangeIds(state)).toEqual([
      'http://iiif.com/range-2.json',
      'http://iiif.com/range-3.json',
      'http://iiif.com/range-4.json',
    ]);
  });

  it('should get all ranges', () => {
    expect(getRanges(state).map(canvas => canvas.label[0]['@value'])).toEqual([
      'Range 2',
      'Range 3',
      'Range 4',
    ]);
  });

  it('should get member ids', () => {
    expect(getMemberIds(state)).toEqual([
      'http://iiif.com/canvas-1.json',
      'http://iiif.com/canvas-3.json',
      'http://iiif.com/range-2.json',
      'http://iiif.com/range-3.json',
      'http://iiif.com/canvas-2.json',
      'http://iiif.com/canvas-external.json',
      'http://iiif.com/range-4.json',
    ]);
  });

  it('should return empty array for member ids', () => {
    expect(
      getMemberIds({
        resources: {
          ranges: {
            'http://iiif.com/range-1.json': {
              '@id': 'http://iiif.com/range-1.json',
              label: t('Range 1'),
            },
          },
        },
      })
    ).toEqual([]);
  });

  it('should return empty array for range ids', () => {
    expect(
      getRangeIds({
        resources: {
          ranges: {
            'http://iiif.com/range-1.json': {
              '@id': 'http://iiif.com/range-1.json',
              label: t('Range 1'),
            },
          },
        },
      })
    ).toEqual([]);
  });

  it('should return empty array for canvas ids', () => {
    expect(
      getCanvasIds({
        resources: {
          ranges: {
            'http://iiif.com/range-1.json': {
              '@id': 'http://iiif.com/range-1.json',
              label: t('Range 1'),
            },
          },
        },
      })
    ).toEqual([]);
  });

  it('should get all members', () => {
    expect(getMembers(state).map(canvas => canvas.label[0]['@value'])).toEqual([
      'Canvas 1',
      'Canvas 3',
      'Range 2',
      'Range 3',
      'Canvas 2',
      'unknown',
      'Range 4',
    ]);
  });
});
