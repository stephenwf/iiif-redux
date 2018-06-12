import {
  frameCreate,
  frameGoBack,
  frameGoToResource,
} from '../../../src/spaces/frames';
import { makeStateFromActions } from '../../../test-utils';
import frame from '../../../src/api/frame';

describe('iiif/api/frame history', () => {
  const defaultFrame = frame(s => s.frames.list['default-frame']);

  describe('getTopLevel', () => {
    test('empty frame', () => {
      const state = makeStateFromActions(frameCreate());
      expect(defaultFrame.getTopLevel(state)).toEqual(null);
    });

    test('from initial resource', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        })
      );
      expect(defaultFrame.getTopLevel(state)).toEqual({
        id: 'https://iiif.com/collection-1.json',
        schema: 'collection',
      });
    });

    test('from navigated resource', () => {
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
      expect(defaultFrame.getTopLevel(state)).toEqual({
        id: 'https://iiif.com/collection-1.json',
        schema: 'collection',
      });
    });
  });

  describe('getAllTypes', () => {
    test('single type', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        })
      );

      expect(defaultFrame.getAllTypes(state)).toEqual(['collection']);
    });

    test('multiple types', () => {
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
      expect(defaultFrame.getAllTypes(state)).toEqual([
        'collection',
        'manifest',
      ]);
    });
  });

  describe('canGoBack', () => {
    test('empty frame', () => {
      const state = makeStateFromActions(frameCreate());
      expect(defaultFrame.canGoBack(state)).toEqual(false);
    });

    test('single resource', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        })
      );
      expect(defaultFrame.canGoBack(state)).toEqual(false);
    });

    test('multiple resources', () => {
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
      expect(defaultFrame.canGoBack(state)).toEqual(true);
    });

    test('multiple resources - nav back', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        }),
        frameGoBack()
      );

      expect(defaultFrame.canGoBack(state)).toEqual(false);
    });
  });

  describe('canGoForward', () => {
    test('empty frame', () => {
      const state = makeStateFromActions(frameCreate());
      expect(defaultFrame.canGoForward(state)).toEqual(false);
    });

    test('single resource', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        })
      );
      expect(defaultFrame.canGoForward(state)).toEqual(false);
    });

    test('multiple resources', () => {
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
      expect(defaultFrame.canGoForward(state)).toEqual(false);
    });

    test('multiple resources - nav back', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        }),
        frameGoBack(),
        frameGoBack()
      );

      expect(defaultFrame.canGoForward(state)).toEqual(true);
    });

    test('multiple resources - nav back but not all the way', () => {
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
          resourceId: 'https://iiif.com/collection-3.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/collection-4.json',
          resourceType: 'collection',
        }),
        frameGoBack(),
        frameGoBack()
      );

      expect(defaultFrame.canGoForward(state)).toEqual(true);
    });
  });

  describe('getHistory', () => {
    test('nav forward', () => {
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
      expect(defaultFrame.getHistory(state)).toEqual([
        { id: 'https://iiif.com/collection-1.json', schema: 'collection' },
      ]);
    });
    test('nav backward', () => {
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
          resourceId: 'https://iiif.com/collection-3.json',
          resourceType: 'collection',
        }),
        frameGoBack()
      );
      expect(defaultFrame.getHistory(state)).toEqual([
        { id: 'https://iiif.com/collection-1.json', schema: 'collection' },
      ]);
    });
  });

  describe('getFullHistory', () => {
    test('nav forward', () => {
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
      expect(defaultFrame.getFullHistory(state)).toEqual([
        { id: 'https://iiif.com/collection-1.json', schema: 'collection' },
        { id: 'https://iiif.com/collection-2.json', schema: 'collection' },
      ]);
    });
    test('nav backward', () => {
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
          resourceId: 'https://iiif.com/collection-3.json',
          resourceType: 'collection',
        }),
        frameGoBack()
      );
      expect(defaultFrame.getFullHistory(state)).toEqual([
        { id: 'https://iiif.com/collection-1.json', schema: 'collection' },
        { id: 'https://iiif.com/collection-2.json', schema: 'collection' },
        { id: 'https://iiif.com/collection-3.json', schema: 'collection' },
      ]);
    });
  });

  describe('canGoBackToType', () => {
    test('empty frame', () => {
      const state = makeStateFromActions(frameCreate());
      expect(defaultFrame.canGoBackToType('collection')(state)).toEqual(false);
    });

    test('single resource - true', () => {
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
      expect(defaultFrame.canGoBackToType('collection')(state)).toEqual(true);
    });

    test('single resource - false', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        })
      );
      expect(defaultFrame.canGoBackToType('manifest')(state)).toEqual(false);
    });

    test('multiple resource', () => {
      const state = makeStateFromActions(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/manifest-1.json',
          resourceType: 'manifest',
        }),
        frameGoToResource({
          resourceId: 'https://iiif.com/canvas-1.json',
          resourceType: 'canvas',
        })
      );
      expect(defaultFrame.canGoBackToType('collection')(state)).toEqual(true);
      expect(defaultFrame.canGoBackToType('manifest')(state)).toEqual(true);
      expect(defaultFrame.canGoBackToType('canvas')(state)).toEqual(false);
      expect(defaultFrame.canGoBackToType('sequence')(state)).toEqual(false);
    });
  });
});
