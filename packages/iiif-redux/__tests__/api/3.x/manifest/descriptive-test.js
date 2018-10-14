import manifest from '../../../../src/api/3.x/manifest';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/manifest/descriptive', () => {
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
        getLabel,
        getMetadata,
        getSummary,
        getThumbnail,
        getPosterCanvas,
        getPosterCanvasId,
        getRequiredStatement,
        getRights,
        getNavDate,
      } = manifest(selectManifest);

      test('getLabel', () => {
        expect(getLabel(state)).toMatchSnapshot();
      });

      test('getMetadata', () => {
        expect(getMetadata(state)).toMatchSnapshot();
      });

      test('getSummary', () => {
        expect(getSummary(state)).toMatchSnapshot();
      });

      test('getThumbnail', () => {
        expect(getThumbnail(state)).toMatchSnapshot();
      });

      test('getPosterCanvasId', () => {
        expect(getPosterCanvasId(state)).toMatchSnapshot();
      });

      test('getPosterCanvas', () => {
        expect(getPosterCanvas(state)).toMatchSnapshot();
      });

      test('getRequiredStatement', () => {
        expect(getRequiredStatement(state)).toMatchSnapshot();
      });

      test('getRights', () => {
        expect(getRights(state)).toMatchSnapshot();
      });

      test('getNavDate', () => {
        expect(getNavDate(state)).toMatchSnapshot();
      });
    });
  });
});
