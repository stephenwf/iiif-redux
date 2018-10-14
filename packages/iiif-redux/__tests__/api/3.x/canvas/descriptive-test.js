import canvas from '../../../../src/api/3.x/canvas';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/canvas/descriptive', () => {
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
        getLabel,
        getMetadata,
        getSummary,
        getThumbnailId,
        getThumbnail,
        getPosterCanvasId,
        getPosterCanvas,
        getRequiredStatement,
        getRights,
        getNavDate,
      } = canvas(selectCanvas);

      // Descriptive

      test('getLabel', () => {
        expect(getLabel(state)).toMatchSnapshot(`getLabel ${name}`);
      });

      test('getMetadata', () => {
        expect(getMetadata(state)).toMatchSnapshot(`getMetadata ${name}`);
      });

      test('getSummary', () => {
        expect(getSummary(state)).toMatchSnapshot(`getSummary ${name}`);
      });

      test('getThumbnailId', () => {
        expect(getThumbnailId(state)).toMatchSnapshot(`getThumbnailId ${name}`);
      });

      test('getThumbnail', () => {
        expect(getThumbnail(state)).toMatchSnapshot(`getThumbnail ${name}`);
      });

      test('getPosterCanvasId', () => {
        expect(getPosterCanvasId(state)).toMatchSnapshot(
          `getPosterCanvasId ${name}`
        );
      });

      test('getPosterCanvas', () => {
        expect(getPosterCanvas(state)).toMatchSnapshot(
          `getPosterCanvas ${name}`
        );
      });

      test('getRequiredStatement', () => {
        expect(getRequiredStatement(state)).toMatchSnapshot(
          `getRequiredStatement ${name}`
        );
      });

      test('getRights', () => {
        expect(getRights(state)).toMatchSnapshot(`getRights ${name}`);
      });

      test('getNavDate', () => {
        expect(getNavDate(state)).toMatchSnapshot(`getNavDate ${name}`);
      });
    });
  });
});
