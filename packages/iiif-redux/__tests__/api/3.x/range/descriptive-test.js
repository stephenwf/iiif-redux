import range from '../../../../src/api/3.x/range';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/range/descriptive', () => {
  describe.each(fixtures)('Fixture: %s', (name, fixture) => {
    const {
      result: { id },
      entities,
    } = normalize(fixture);
    const state = {
      resources: { ...DEFAULT_STATE.resources, ...entities },
    };
    const selectRange = s => s.resources.ranges[id];

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
    } = range(selectRange);

    test('getLabel', () => {
      expect(getLabel(state)).toMatchSnapshot('getLabel');
    });

    test('getMetadata', () => {
      expect(getMetadata(state)).toMatchSnapshot('getMetadata');
    });

    test('getSummary', () => {
      expect(getSummary(state)).toMatchSnapshot('getSummary');
    });

    test('getThumbnailId', () => {
      expect(getThumbnailId(state)).toMatchSnapshot('getThumbnailId');
    });

    test('getThumbnail', () => {
      expect(getThumbnail(state)).toMatchSnapshot('getThumbnail');
    });

    test('getPosterCanvasId', () => {
      expect(getPosterCanvasId(state)).toMatchSnapshot('getPosterCanvasId');
    });

    test('getPosterCanvas', () => {
      expect(getPosterCanvas(state)).toMatchSnapshot('getPosterCanvas');
    });

    test('getRequiredStatement', () => {
      expect(getRequiredStatement(state)).toMatchSnapshot(
        'getRequiredStatement'
      );
    });

    test('getRights', () => {
      expect(getRights(state)).toMatchSnapshot('getRights');
    });

    test('getNavDate', () => {
      expect(getNavDate(state)).toMatchSnapshot(`getNavDate`);
    });
  });
});
