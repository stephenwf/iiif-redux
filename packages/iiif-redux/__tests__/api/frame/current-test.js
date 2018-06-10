import {
  frameCreate,
  frameGoBack,
  frameGoToResource,
} from '../../../src/spaces/frames';
import frame from '../../../src/api/frame';
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
  });
});
