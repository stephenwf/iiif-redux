import {
  frameCreate,
  frameFocus,
  frameGoBack,
  frameGoToResource,
} from '../../../src/spaces/frames';
import frame, { frames, focusedFrame } from '../../../src/api/frame';
import { makeStateFromActions } from '../../../test-utils';

describe('iiif/api/frame metadata', () => {
  const defaultFrame = frame(s => s.frames.list['default-frame']);

  test('getCurrentPath', () => {
    const state = makeStateFromActions(
      frameCreate({
        resourceId: 'https://iiif.com/collection-1.json',
        resourceType: 'collection',
      })
    );
    expect(defaultFrame.getCurrentPath(state)).toMatchSnapshot();
  });

  describe('getCurrentPathIndex', () => {
    test('initial index', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        })
      );
      expect(defaultFrame.getCurrentPathIndex(state)).toEqual(0);
    });

    test('after navigation', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/manifest-1.json',
          resourceType: 'manifest',
        })
      );
      expect(defaultFrame.getCurrentPathIndex(state)).toEqual(2);
    });

    test('after back', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/manifest-1.json',
          resourceType: 'manifest',
        }),
        frameGoBack()
      );
      expect(defaultFrame.getCurrentPathIndex(state)).toEqual(1);
    });
  });

  describe('getCurrentResource{Id,Type}', () => {
    test('initial current', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        })
      );

      expect(defaultFrame.getCurrentResource(state)).toEqual({
        id: 'https://iiif.com/collection-1.json',
        schema: 'collection',
      });
      expect(defaultFrame.getCurrentResourceType(state)).toEqual('collection');
      expect(defaultFrame.getCurrentResourceId(state)).toEqual(
        'https://iiif.com/collection-1.json'
      );
    });

    test('after navigation', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/manifest-1.json',
          resourceType: 'manifest',
        })
      );

      expect(defaultFrame.getCurrentResource(state)).toEqual({
        id: 'https://iiif.com/manifest-1.json',
        schema: 'manifest',
      });
      expect(defaultFrame.getCurrentResourceType(state)).toEqual('manifest');
      expect(defaultFrame.getCurrentResourceId(state)).toEqual(
        'https://iiif.com/manifest-1.json'
      );
    });
  });

  describe('getResourceByType', () => {
    test('get first collection', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        })
      );

      expect(
        defaultFrame.getCurrentResourceByType('collection')(state)
      ).toEqual({
        id: 'https://iiif.com/collection-2.json',
        schema: 'collection',
      });
    });

    test('get first collection when on manifest', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/manifest-1.json',
          resourceType: 'manifest',
        })
      );

      expect(
        defaultFrame.getCurrentResourceByType('collection')(state)
      ).toEqual({
        id: 'https://iiif.com/collection-2.json',
        schema: 'collection',
      });

      expect(defaultFrame.getCurrentResourceByType('manifest')(state)).toEqual({
        id: 'https://iiif.com/manifest-1.json',
        schema: 'manifest',
      });

      expect(defaultFrame.getCurrentResourceByType('NOT_EXIST')(state)).toEqual(
        null
      );
    });

    describe('focused frame', () => {
      test('focused frame without navigation', () => {
        const state = makeStateFromActions(
          frameCreate(
            {
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            },
            'frame-1'
          ),
          frameCreate(
            {
              resourceId: 'https://iiif.com/collection-2.json',
              resourceType: 'collection',
            },
            'frame-2'
          ),
          frameCreate(
            {
              resourceId: 'https://iiif.com/collection-3.json',
              resourceType: 'collection',
            },
            'frame-3'
          )
        );

        const selector = focusedFrame(api => ({
          id: api.getId,
        }));

        expect(selector(state)).toEqual({ id: 'frame-3' });
      });

      test('focused frame with navigation', () => {
        const state = makeStateFromActions(
          frameCreate(
            {
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            },
            'frame-1'
          ),
          frameCreate(
            {
              resourceId: 'https://iiif.com/collection-2.json',
              resourceType: 'collection',
            },
            'frame-2'
          ),
          frameCreate(
            {
              resourceId: 'https://iiif.com/collection-3.json',
              resourceType: 'collection',
            },
            'frame-3'
          ),
          frameFocus('frame-1')
        );

        const selector = focusedFrame(api => ({
          id: api.getId,
        }));

        expect(selector(state)).toEqual({ id: 'frame-1' });
      });
    });
  });

  test('all frames', () => {
    const state = makeStateFromActions(
      frameCreate(
        {
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        },
        'frame-1'
      ),
      frameCreate(
        {
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        },
        'frame-2'
      ),
      frameCreate(
        {
          resourceId: 'https://iiif.com/collection-3.json',
          resourceType: 'collection',
        },
        'frame-3'
      )
    );

    const selector = frames(
      () => ['frame-1', 'frame-2'],
      api => ({
        id: api.getId,
        resourceId: api.getCurrentResourceId,
      })
    );

    expect(selector(state)).toEqual([
      { id: 'frame-1', resourceId: 'https://iiif.com/collection-1.json' },
      { id: 'frame-2', resourceId: 'https://iiif.com/collection-2.json' },
    ]);
  });
});
