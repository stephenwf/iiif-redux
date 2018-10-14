import {
  doesResourceExist,
  hasResourceBeenFetched,
  isResourceLoading,
} from '../../src/api/dereferenced';

describe('api/dereferenced', () => {
  describe('resource not yet loaded', () => {
    const state = {
      dereferenced: {
        'https://wellcomelibrary.org/iiif/b18035723/manifest': {
          resourceId: 'https://wellcomelibrary.org/iiif/b18035723/manifest',
          ttl: 600,
          requested: '2018-10-14T14:48:03.991Z',
          loading: false,
        },
      },
      resources: {
        manifests: {},
      },
    };
    const selector = s =>
      s.resources.manifests[
        'https://wellcomelibrary.org/iiif/b18035723/manifest'
      ];

    test('doesResourceExist', () => {
      expect(doesResourceExist(selector)(state)).toEqual(false);
    });

    test('hasResourceBeenFetched', () => {
      expect(hasResourceBeenFetched(selector, 'manifests')(state)).toEqual(
        false
      );
    });

    test('isResourceLoading', () => {
      expect(isResourceLoading(selector)(state)).toEqual(false);
    });
  });

  describe('resource loading', () => {
    const state = {
      dereferenced: {
        'https://wellcomelibrary.org/iiif/b18035723/manifest': {
          resourceId: 'https://wellcomelibrary.org/iiif/b18035723/manifest',
          ttl: 600,
          requested: '2018-10-14T14:48:03.991Z',
          loading: true,
        },
      },
      resources: {
        manifests: {},
      },
    };
    const selector = s =>
      s.resources.manifests[
        'https://wellcomelibrary.org/iiif/b18035723/manifest'
      ];

    test('doesResourceExist', () => {
      expect(doesResourceExist(selector)(state)).toEqual(false);
    });

    test('hasResourceBeenFetched', () => {
      expect(hasResourceBeenFetched(selector, 'manifests')(state)).toEqual(
        false
      );
    });

    test('isResourceLoading', () => {
      expect(isResourceLoading(selector)(state)).toEqual(false);
    });

    test('isResourceLoading - with ID', () => {
      expect(
        isResourceLoading(
          selector,
          'https://wellcomelibrary.org/iiif/b18035723/manifest'
        )(state)
      ).toEqual(true);
    });

    test('isResourceLoading - with ID selector', () => {
      expect(
        isResourceLoading(
          () => 'https://wellcomelibrary.org/iiif/b18035723/manifest'
        )(state)
      ).toEqual(true);
    });
  });

  describe('resource exists', () => {
    const state = {
      dereferenced: {
        'https://wellcomelibrary.org/iiif/b18035723/manifest': {
          resourceId: 'https://wellcomelibrary.org/iiif/b18035723/manifest',
          ttl: 600,
          requested: '2018-10-14T14:48:03.991Z',
          loading: false,
        },
      },
      resources: {
        manifests: {
          'https://wellcomelibrary.org/iiif/b18035723/manifest': {
            '@id': 'https://wellcomelibrary.org/iiif/b18035723/manifest',
            type: 'sc:Manifest',
            label: [{ language: 'en', value: ['Test manifest'] }],
          },
        },
      },
    };

    const stateP3 = {
      ...state,
      resources: {
        manifests: {
          'https://wellcomelibrary.org/iiif/b18035723/manifest': {
            id: 'https://wellcomelibrary.org/iiif/b18035723/manifest',
            type: 'Manifest',
            label: { en: ['Test manifest'] },
          },
        },
      },
    };
    const selector = s =>
      s.resources.manifests[
        'https://wellcomelibrary.org/iiif/b18035723/manifest'
      ];

    test('doesResourceExist', () => {
      expect(doesResourceExist(selector)(state)).toEqual(true);
      expect(doesResourceExist(selector)(stateP3)).toEqual(true);
      expect(
        doesResourceExist(
          () => 'https://wellcomelibrary.org/iiif/b18035723/manifest'
        )(stateP3)
      ).toEqual(true);
      expect(
        doesResourceExist(
          () => 'https://wellcomelibrary.org/iiif/b18035723/manifest'
        )(stateP3)
      ).toEqual(true);
    });

    test('hasResourceBeenFetched', () => {
      expect(hasResourceBeenFetched(selector, 'manifests')(state)).toEqual(
        true
      );
      expect(hasResourceBeenFetched(selector, 'manifests')(stateP3)).toEqual(
        true
      );
      expect(
        hasResourceBeenFetched(
          () => 'https://wellcomelibrary.org/iiif/b18035723/manifest',
          'manifests'
        )(state)
      ).toEqual(true);
      expect(
        hasResourceBeenFetched(
          () => 'https://wellcomelibrary.org/iiif/b18035723/manifest',
          'manifests'
        )(stateP3)
      ).toEqual(true);
    });
    test('isResourceLoading', () => {
      expect(isResourceLoading(selector)(state)).toEqual(false);
      expect(isResourceLoading(selector)(stateP3)).toEqual(false);
    });
  });
});
