import sequence from '../../../../src/api/2.x/sequence';

describe('api/2.x/sequence/structural', () => {
  const { getCanvases, getCanvasIds } = sequence(
    s => s.resources.sequences['http://iiif.com/sequence-1.json']
  );
  const state = {
    resources: {
      sequences: {
        'http://iiif.com/sequence-1.json': {
          '@id': 'http://iiif.com/sequence-1.json',
          label: 'Sequence 1',
          canvases: [
            'http://iiif.com/canvas-1.json',
            'http://iiif.com/canvas-2.json',
            'http://iiif.com/canvas-3.json',
            'http://iiif.com/canvas-4.json',
          ],
        },
      },
      canvases: {
        'http://iiif.com/canvas-1.json': {
          '@id': 'http://iiif.com/canvas-1.json',
          label: 'Canvas 1',
        },
        'http://iiif.com/canvas-2.json': {
          '@id': 'http://iiif.com/canvas-2.json',
          label: 'Canvas 2',
        },
        'http://iiif.com/canvas-3.json': {
          '@id': 'http://iiif.com/canvas-3.json',
          label: 'Canvas 3',
        },
        'http://iiif.com/canvas-4.json': {
          '@id': 'http://iiif.com/canvas-4.json',
          label: 'Canvas 4',
        },
      },
    },
  };

  it('should get canvas ids', () => {
    expect(getCanvasIds(state)).toEqual([
      'http://iiif.com/canvas-1.json',
      'http://iiif.com/canvas-2.json',
      'http://iiif.com/canvas-3.json',
      'http://iiif.com/canvas-4.json',
    ]);
  });

  it('should get all canvases', () => {
    expect(getCanvases(state).map(canvas => canvas.label)).toEqual([
      'Canvas 1',
      'Canvas 2',
      'Canvas 3',
      'Canvas 4',
    ]);
  });
});
