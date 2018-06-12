import {
  frameCreate,
  frameDisableExtension,
  frameEnableExtension,
  frameGoBack,
  frameGoToResource,
} from '../../../src/spaces/frames';
import { makeStateFromActions } from '../../../test-utils';
import frame from '../../../src/api/frame';

describe('iiif/api/frame extensions', () => {
  const defaultFrame = frame(s => s.frames.list['default-frame']);
  const enableDefaultExtension = frameEnableExtension('extension-id-1', {
    myConfig: { test: 'testing' },
  });

  describe('getAllExtensionIds', () => {
    test('empty extensions', () => {
      const state = makeStateFromActions(frameCreate());
      expect(defaultFrame.getAllExtensionIds(state)).toEqual([]);
    });

    test('loaded extensions', () => {
      const state = makeStateFromActions(frameCreate(), enableDefaultExtension);

      expect(defaultFrame.getAllExtensionIds(state)).toEqual([
        'extension-id-1',
      ]);
    });
  });

  describe('getAllExtensions', () => {
    test('empty extensions', () => {
      const state = makeStateFromActions(frameCreate());
      expect(defaultFrame.getAllExtensions(state)).toEqual([]);
    });

    test('loaded extensions', () => {
      const state = makeStateFromActions(frameCreate(), enableDefaultExtension);

      expect(defaultFrame.getAllExtensions(state)).toEqual([
        { config: { myConfig: { test: 'testing' } }, id: 'extension-id-1' },
      ]);
    });

    test('load standard extension', () => {
      const state = {
        ...makeStateFromActions(
          frameCreate(),
          frameEnableExtension(
            'some-standard-extension',
            'standard-extension--123'
          )
        ),
        ['some-standard-extension']: {
          ['standard-extension--123']: {
            id: 'standard-extension--123',
            myConfig: {
              test: 'testing',
            },
          },
        },
      };

      expect(defaultFrame.getAllExtensions(state)).toEqual([
        {
          config: {
            id: 'standard-extension--123',
            myConfig: { test: 'testing' },
          },
          id: 'some-standard-extension',
        },
      ]);
    });

    test('looks like standard extension, but is not', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension(
          'some-standard-extension',
          'standard-extension--123'
        )
      );

      expect(defaultFrame.getAllExtensions(state)).toEqual([
        { config: 'standard-extension--123', id: 'some-standard-extension' },
      ]);
    });

    test('no config', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension')
      );
      expect(defaultFrame.getAllExtensions(state)).toEqual([
        { id: 'some-standard-extension' },
      ]);
    });
  });

  describe('getExtensionById', () => {
    test('exists', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension')
      );
      expect(
        defaultFrame.getExtensionById('some-standard-extension')(state)
      ).toEqual({ id: 'some-standard-extension' });
    });

    test('exists multiple', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension-1'),
        frameEnableExtension('some-standard-extension-2'),
        frameEnableExtension('some-standard-extension-3')
      );
      expect(
        defaultFrame.getExtensionById('some-standard-extension-2')(state)
      ).toEqual({ id: 'some-standard-extension-2' });
    });

    test('not exist', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension')
      );
      // Strange, but expected, no configuration. Will not be true for isEnabled.
      expect(defaultFrame.getExtensionById('NOT_EXIST')(state)).toEqual({
        id: 'NOT_EXIST',
      });
    });
  });

  describe('isExtensionEnabled', () => {
    test('default', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension')
      );
      expect(
        defaultFrame.isExtensionEnabled('some-standard-extension')(state)
      ).toEqual(true);
    });

    test('default - disabled', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension'),
        frameDisableExtension('some-standard-extension')
      );
      expect(
        defaultFrame.isExtensionEnabled('some-standard-extension')(state)
      ).toEqual(false);
    });

    test('not exist', () => {
      const state = makeStateFromActions(frameCreate());
      expect(
        defaultFrame.isExtensionEnabled('some-standard-extension')(state)
      ).toEqual(false);
    });
  });

  describe('getDisabledExtensions', () => {
    test('default', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension')
      );
      expect(defaultFrame.getDisabledExtensions(state)).toEqual([]);
    });
    test('default - disabled', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension'),
        frameDisableExtension('some-standard-extension')
      );
      expect(defaultFrame.getDisabledExtensions(state)).toEqual([
        { id: 'some-standard-extension' },
      ]);
    });
  });

  describe('getEnabledExtensions', () => {
    test('default', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension')
      );
      expect(defaultFrame.getEnabledExtensions(state)).toEqual([
        { id: 'some-standard-extension' },
      ]);
    });
    test('default - disabled', () => {
      const state = makeStateFromActions(
        frameCreate(),
        frameEnableExtension('some-standard-extension'),
        frameDisableExtension('some-standard-extension')
      );
      expect(defaultFrame.getEnabledExtensions(state)).toEqual([]);
    });
  });
});
