import range from '../../../../src/api/3.x/range';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/range/structural', () => {
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
      getItemIds,
      getItems,
      getRangeIds,
      getRanges,
      getAnnotationIds,
      getAnnotations,
    } = range(selectRange);

    test('getItemIds', () => {
      expect(getItemIds(state)).toMatchSnapshot('getItemIds');
    });

    test('getItems', () => {
      expect(getItems(state)).toMatchSnapshot('getItems');
    });

    test('getRangeIds', () => {
      expect(getRangeIds(state)).toMatchSnapshot('getRangeIds');
    });

    test('getRanges', () => {
      expect(getRanges(state)).toMatchSnapshot('getRanges');
    });

    test('getAnnotationIds', () => {
      expect(getAnnotationIds(state)).toMatchSnapshot('getAnnotationIds');
    });

    test('getAnnotations', () => {
      expect(getAnnotations(state)).toMatchSnapshot('getAnnotations');
    });
  });
});
