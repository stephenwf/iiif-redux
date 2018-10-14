import manifest from '../../../../src/api/3.x/manifest';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/manifest/structural', () => {
  fixtures.forEach((fixture, num) => {
    describe(`Manifest number ${num}`, () => {
      const {
        result: { id },
        entities,
      } = normalize(fixture);
      const state = {
        resources: { ...DEFAULT_STATE.resources, ...entities },
      };
      const selectManifest = s => s.resources.manifests[id];

      const {
        getItemIds,
        getItems,
        getCanvasIds,
        getCanvases,
        getAnnotationIds,
        getAnnotations,
        getStructureIds,
        getStructures,
      } = manifest(selectManifest);

      test('getItemIds', () => {
        expect(getItemIds(state)).toMatchSnapshot(`getItemIds ${num}`);
      });

      test('getItems', () => {
        expect(getItems(state)).toMatchSnapshot(`getItems ${num}`);
      });

      test('getCanvasIds', () => {
        expect(getCanvasIds(state)).toMatchSnapshot(`getCanvasIds ${num}`);
      });

      test('getCanvases', () => {
        expect(getCanvases(state)).toMatchSnapshot(`getCanvases ${num}`);
      });

      test('getAnnotationIds', () => {
        expect(getAnnotationIds(state)).toMatchSnapshot(
          `getAnnotationIds ${num}`
        );
      });

      test('getAnnotations', () => {
        expect(getAnnotations(state)).toMatchSnapshot(`getAnnotations ${num}`);
      });

      test('getStructures', () => {
        expect(getStructures(state)).toMatchSnapshot(`getStructures ${num}`);
      });

      test('getStructureIds', () => {
        expect(getStructureIds(state)).toMatchSnapshot(
          `getStructureIds ${num}`
        );
      });
    });
  });
});
