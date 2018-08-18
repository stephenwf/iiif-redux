import canvas from '../../../../src/api/3.x/canvas';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/canvas/structural', () => {
  fixtures.forEach(({ fixture, name }) => {
    describe(`Canvas: ${name}`, () => {
      const {
        result: { id },
        entities,
      } = normalize(fixture);
      const state = {
        resources: { ...DEFAULT_STATE.resources, ...entities },
      };
      const selectCanvas = s => s.resources.canvases[id];

      const {
        getItemIds,
        getItems,
        getPaintingAnnotationIds,
        getPaintingAnnotations,
        getAnnotationIds,
        getAnnotations,
      } = canvas(selectCanvas);

      // Structural

      test('getItemIds', () => {
        expect(getItemIds(state)).toMatchSnapshot(`getItemIds ${name}`);
      });

      test('getItems', () => {
        expect(getItems(state)).toMatchSnapshot(`getItems ${name}`);
      });

      test('getPaintingAnnotationIds', () => {
        expect(getPaintingAnnotationIds(state)).toMatchSnapshot(
          `getPaintingAnnotationIds ${name}`
        );
      });

      test('getPaintingAnnotations', () => {
        expect(getPaintingAnnotations(state)).toMatchSnapshot(
          `getPaintingAnnotations ${name}`
        );
      });

      test('getAnnotationIds', () => {
        expect(getAnnotationIds(state)).toMatchSnapshot(
          `getAnnotationIds ${name}`
        );
      });

      test('getAnnotations', () => {
        expect(getAnnotations(state)).toMatchSnapshot(`getAnnotations ${name}`);
      });
    });
  });
});
