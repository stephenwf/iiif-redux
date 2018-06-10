import {
  frameCreate,
  frameSetInitialResource,
  frameGoToResource,
  frameGoBack,
  frameGoBackToType,
  frameGoForward,
  frameEnableExtension,
  frameConfigureExtension,
  frameDisableExtension,
  frameNextCanvas,
  framePreviousCanvas,
  frameFocus,
  reducer,
  DEFAULT_STATE,
} from '../../src/spaces/frames';

describe('spaces/services', () => {
  describe('actions', () => {
    test('frameCreate', () => {
      expect(frameCreate()).toMatchSnapshot();

      expect(
        frameCreate({
          resourceId: 'https://iiif.com/collection-1.json',
          resourceType: 'collection',
        })
      ).toMatchSnapshot();

      expect(
        frameCreate(
          {
            resourceId: 'https://iiif.com/collection-1.json',
            resourceType: 'collection',
          },
          'my-custom-frame'
        )
      ).toMatchSnapshot();

      expect(
        frameCreate(
          {
            resourceId: 'https://iiif.com/collection-1.json',
            resourceType: 'collection',
            someConfigProp: { someBool: true },
          },
          'my-custom-frame'
        )
      ).toMatchSnapshot();
    });
    test('frameSetInitialResource', () => {
      expect(
        frameSetInitialResource({
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        })
      ).toMatchSnapshot();

      expect(() => frameSetInitialResource()).toThrowErrorMatchingSnapshot();

      expect(
        frameSetInitialResource(
          {
            resourceId: 'https://iiif.com/collection-2.json',
            resourceType: 'collection',
          },
          'my-custom-frame'
        )
      ).toMatchSnapshot();
    });
    test('frameGoToResource', () => {
      expect(
        frameGoToResource({
          resourceId: 'https://iiif.com/collection-2.json',
          resourceType: 'collection',
        })
      ).toMatchSnapshot();

      expect(() => frameGoToResource()).toThrowErrorMatchingSnapshot();

      expect(
        frameGoToResource(
          {
            resourceId: 'https://iiif.com/collection-2.json',
            resourceType: 'collection',
          },
          'my-custom-frame'
        )
      ).toMatchSnapshot();

      expect(
        frameGoToResource(
          {
            resourceId: 'https://iiif.com/collection-2.json',
            resourceType: 'collection',
            smartJump: false,
          },
          'my-custom-frame'
        )
      ).toMatchSnapshot();
    });
    test('frameGoBack', () => {
      expect(frameGoBack()).toMatchSnapshot();

      expect(frameGoBack('my-custom-frame')).toMatchSnapshot();
    });
    test('frameGoBackToType', () => {
      expect(() => frameGoBackToType()).toThrowErrorMatchingSnapshot();

      expect(frameGoBackToType('collection')).toMatchSnapshot();

      expect(
        frameGoBackToType('manifest', 'my-custom-frame')
      ).toMatchSnapshot();
    });
    test('frameGoForward', () => {
      expect(frameGoForward()).toMatchSnapshot();

      expect(frameGoForward('my-custom-frame')).toMatchSnapshot();
    });
    test('frameEnableExtension', () => {
      expect(() => frameEnableExtension()).toThrowErrorMatchingSnapshot();

      expect(frameEnableExtension('extension-id-1')).toMatchSnapshot();

      expect(
        frameEnableExtension('extension-id-1', { someConfig: 'someValue' })
      ).toMatchSnapshot();

      expect(
        frameEnableExtension('extension-id-1', {}, 'my-custom-frame')
      ).toMatchSnapshot();
    });
    test('frameConfigureExtension', () => {
      expect(() => frameConfigureExtension()).toThrowErrorMatchingSnapshot();

      expect(frameConfigureExtension('extension-id-1')).toMatchSnapshot();

      expect(
        frameConfigureExtension('extension-id-1', { someConfig: 'someValue' })
      ).toMatchSnapshot();

      expect(
        frameConfigureExtension('extension-id-1', {}, 'my-custom-frame')
      ).toMatchSnapshot();
    });
    test('frameDisableExtension', () => {
      expect(() => frameDisableExtension()).toThrowErrorMatchingSnapshot();

      expect(frameDisableExtension('my-extension')).toMatchSnapshot();

      expect(
        frameDisableExtension('my-extension', 'my-custom-frame')
      ).toMatchSnapshot();
    });
    test('frameNextCanvas', () => {
      expect(frameNextCanvas()).toMatchSnapshot();

      expect(frameNextCanvas('my-custom-frame')).toMatchSnapshot();
    });
    test('framePreviousCanvas', () => {
      expect(framePreviousCanvas()).toMatchSnapshot();

      expect(framePreviousCanvas('my-custom-frame')).toMatchSnapshot();
    });
    test('frameFocus', () => {
      expect(frameFocus()).toMatchSnapshot();

      expect(frameFocus('my-custom-frame')).toMatchSnapshot();
    });
  });

  describe('reducers', () => {
    const runActions = actions => actions.reduce(reducer, DEFAULT_STATE);

    test('default state', () => {
      expect(runActions([])).toMatchSnapshot();
    });
    describe('frameCreate', () => {
      test('simple create', () =>
        expect(runActions([frameCreate()])).toMatchSnapshot());

      test('create multiple', () =>
        expect(
          runActions([
            frameCreate({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
            frameCreate(
              {
                resourceId: 'https://iiif.com/manifest-1.json',
                resourceType: 'manifest',
              },
              'manifest-frame'
            ),
          ])
        ).toMatchSnapshot());
    });
    describe('frameSetInitialResource', () => {
      test('set single resource', () =>
        expect(
          runActions([
            frameCreate(),
            frameSetInitialResource({
              resourceId: 'https://iiif.com/manifest-1.json',
              resourceType: 'manifest',
            }),
          ])
        ).toMatchSnapshot());

      test('set custom resource', () =>
        expect(
          runActions([
            frameCreate({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
            frameCreate({}, 'my-custom-frame'),
            frameSetInitialResource(
              {
                resourceId: 'https://iiif.com/manifest-1.json',
                resourceType: 'manifest',
              },
              'my-custom-frame'
            ),
          ])
        ).toMatchSnapshot());
    });
    describe('frameGoToResource', () => {
      test('go to simple', () =>
        expect(
          runActions([
            frameCreate(),
            frameGoToResource({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
          ])
        ).toMatchSnapshot());

      test('go to deep', () =>
        expect(
          runActions([
            frameCreate(),
            frameGoToResource({
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
          ])
        ).toMatchSnapshot());

      test('go to back-track (smart=true)', () =>
        expect(
          runActions([
            frameCreate(),
            frameGoToResource({
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
            frameGoToResource({
              resourceId: 'https://iiif.com/collection-2.json',
              resourceType: 'collection',
            }),
          ])
        ).toMatchSnapshot());

      test('go to back-track (smart=false)', () =>
        expect(
          runActions([
            frameCreate(),
            frameGoToResource({
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
            frameGoToResource({
              resourceId: 'https://iiif.com/collection-2.json',
              resourceType: 'collection',
              smartJump: false,
            }),
          ])
        ).toMatchSnapshot());
    });
    describe('frameGoBack/Forward', () => {
      test('go back simple', () =>
        expect(
          runActions([
            frameCreate(),
            frameGoToResource({
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
            frameGoBack(),
          ])
        ).toMatchSnapshot());

      test('go back too far', () =>
        expect(
          runActions([
            frameCreate(),
            frameGoToResource({
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
            frameGoBack(),
            frameGoBack(),
            frameGoBack(),
            frameGoBack(),
            frameGoBack(),
          ])
        ).toMatchSnapshot());

      test('go back and forward', () =>
        expect(
          runActions([
            frameCreate(),
            frameGoToResource({
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
            frameGoBack(),
            frameGoBack(),
            frameGoForward(),
          ])
        ).toMatchSnapshot());

      test('go forward too far', () =>
        expect(
          runActions([
            frameCreate(),
            frameGoToResource({
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
            frameGoBack(),
            frameGoForward(),
            frameGoForward(),
            frameGoForward(),
            frameGoForward(),
          ])
        ).toMatchSnapshot());
    });
    describe('extensions', () => {
      test('enable extension', () =>
        expect(
          runActions([
            frameCreate({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
            frameEnableExtension('my-awesome-extension'),
          ])
        ).toMatchSnapshot());

      test('enable with string config', () =>
        expect(
          runActions([
            frameCreate({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
            frameEnableExtension(
              'my-awesome-extension',
              'instance-id-of-extension'
            ),
          ])
        ).toMatchSnapshot());

      test('enable with js config', () =>
        expect(
          runActions([
            frameCreate({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
            frameEnableExtension('my-awesome-extension', {
              inlineConfig: 'something value',
            }),
          ])
        ).toMatchSnapshot());

      test('disable extension', () =>
        expect(
          runActions([
            frameCreate({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
            frameEnableExtension('my-awesome-extension', {
              inlineConfig: 'something value',
            }),
            frameDisableExtension('my-awesome-extension'),
          ])
        ).toMatchSnapshot());

      test('disable non-existent extension', () =>
        expect(
          runActions([
            frameCreate({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
            frameEnableExtension('my-awesome-extension', {
              inlineConfig: 'something value',
            }),
            frameDisableExtension('my-awesome-extension-NOT_REAL'),
          ])
        ).toMatchSnapshot());

      test('disable enable twice - act like config', () =>
        expect(
          runActions([
            frameCreate({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
            frameEnableExtension('my-awesome-extension', {
              inlineConfig: 'something value',
            }),
            frameEnableExtension('my-awesome-extension', {
              someOtherValue: 'something value',
            }),
          ])
        ).toMatchSnapshot());

      test('configure', () =>
        expect(
          runActions([
            frameCreate({
              resourceId: 'https://iiif.com/collection-1.json',
              resourceType: 'collection',
            }),
            frameEnableExtension('my-awesome-extension'),
            frameConfigureExtension('my-awesome-extension', {
              inlineConfig: 'something value',
              loaded: true,
            }),
          ])
        ).toMatchSnapshot());
    });
    test('focus frame', () => {
      expect(
        runActions([
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
          frameFocus('frame-2'),
        ])
      ).toMatchSnapshot();
    });
  });
});
