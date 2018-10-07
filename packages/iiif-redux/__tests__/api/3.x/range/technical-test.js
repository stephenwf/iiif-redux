import range from '../../../../src/api/3.x/range';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/range/technical', () => {
  describe.each(fixtures)('Fixture: %s', (name, fixture) => {
    const {
      result: { id },
      entities,
    } = normalize(fixture);
    const state = {
      resources: { ...DEFAULT_STATE.resources, ...entities },
    };
    const selectRange = s => s.resources.ranges[id];

    const { getId, getType, getBehavior, getViewingDirection } = range(
      selectRange
    );

    test('getId', () => {
      expect(getId(state)).toMatchSnapshot(`getId ${name}`);
    });

    test('getType', () => {
      expect(getType(state)).toMatchSnapshot(`getType ${name}`);
    });

    test('getBehavior', () => {
      expect(getBehavior(state)).toMatchSnapshot(`getBehavior ${name}`);
    });

    test('getViewingDirection', () => {
      expect(getViewingDirection(state)).toMatchSnapshot(
        `getViewingDirection ${name}`
      );
    });
  });
});
