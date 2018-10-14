import collection from '../../../../src/api/3.x/collection';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/collection/technical', () => {
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

      const { getId, getType, getViewingDirection, getBehavior } = collection(
        selectCollection
      );

      test('getId', () => {
        expect(getId(state)).toMatchSnapshot(`getId ${num}`);
      });

      test('getType', () => {
        expect(getType(state)).toMatchSnapshot(`getType ${num}`);
      });

      test('getViewingDirection', () => {
        expect(getViewingDirection(state)).toMatchSnapshot(
          `getViewingDirection ${num}`
        );
      });

      test('getBehavior', () => {
        expect(getBehavior(state)).toMatchSnapshot(`getBehavior ${num}`);
      });
    });
  });
});
