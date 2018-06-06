import { canvasByIdSelector } from '../../src/api/canvas';

describe('iiif/api/canvas', () => {
  it('should be able to generate selector for any canvas', () => {
    const state = {
      resources: {
        canvases: {
          'http://iiif.com/canvas-1.json': {
            '@id': 'http://iiif.com/canvas-1.json',
            '@type': 'sc:Canvas',
          },
        },
      },
    };

    const select = canvasByIdSelector(canvas => ({
      id: canvas.getId,
      type: canvas.getType,
    }));

    expect(select(state, { id: 'http://iiif.com/canvas-1.json' })).toEqual({
      id: 'http://iiif.com/canvas-1.json',
      type: 'sc:Canvas',
    });

    const select2 = canvasByIdSelector(
      canvas => ({
        id: canvas.getId,
        type: canvas.getType,
      }),
      {
        getId: () => 'http://iiif.com/canvas-1.json',
      }
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/canvas-1.json',
      type: 'sc:Canvas',
    });
  });
});
