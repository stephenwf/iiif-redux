import collection from '../../../../src/api/3.x/collection';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/collection/structural', () => {
  fixtures.forEach((fixture, num) => {
    describe(`Collection number ${num}`, () => {
      const {
        result: { id },
        entities,
      } = normalize(fixture);
      const state = {
        resources: { ...DEFAULT_STATE.resources, ...entities },
      };
      const selectCollection = s => s.resources.collections[id];

      const {
        getItemIds,
        getItems,
        getManifestIds,
        getManifests,
        getCollectionIds,
        getCollections,
        getAnnotationIds,
        getAnnotations,
      } = collection(selectCollection);

      test('getItemIds', () => {
        expect(getItemIds(state)).toMatchSnapshot(`getItemIds ${num}`);
      });

      test('getItems', () => {
        expect(getItems(state)).toMatchSnapshot(`getItems ${num}`);
      });

      test('getManifestIds', () => {
        expect(getManifestIds(state)).toMatchSnapshot(`getManifestIds ${num}`);
      });

      test('getManifests', () => {
        expect(getManifests(state)).toMatchSnapshot(`getManifests ${num}`);
      });

      test('getCollectionIds', () => {
        expect(getCollectionIds(state)).toMatchSnapshot(
          `getCollectionIds ${num}`
        );
      });

      test('getCollections', () => {
        expect(getCollections(state)).toMatchSnapshot(`getCollections ${num}`);
      });

      test('getAnnotationIds', () => {
        expect(getAnnotationIds(state)).toMatchSnapshot(
          `getAnnotationIds ${num}`
        );
      });

      test('getAnnotations', () => {
        expect(getAnnotations(state)).toMatchSnapshot(`getAnnotations ${num}`);
      });
    });
  });
});
