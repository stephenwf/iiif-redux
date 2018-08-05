import collection from '../../../../src/api/3.x/collection';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';

describe('api/3.x/collection/technical', () => {
  fixtures.forEach((fixture, num) => {
    describe(`Collection number ${num}`, () => {
      const {
        result: { id },
        entities,
      } = normalize(fixture);
      const state = {
        resources: entities,
      };
      const selectCollection = s => s.resources.collections[id];

      const { getId, getType, getViewingDirection, getBehaviour } = collection(
        selectCollection
      );

      test('getId', () => {
        expect(getId(state)).toMatchSnapshot();
      });

      test('getType', () => {
        expect(getType(state)).toMatchSnapshot();
      });

      test('getViewingDirection', () => {
        expect(getViewingDirection(state)).toMatchSnapshot();
      });

      test('getBehaviour', () => {
        expect(getBehaviour(state)).toMatchSnapshot();
      });
    });
  });
});
