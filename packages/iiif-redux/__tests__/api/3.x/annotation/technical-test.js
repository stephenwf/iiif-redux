import annotation from '../../../../src/api/3.x/annotation';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/annotation/technical', () => {
  fixtures.forEach(({ fixture, name }) => {
    describe(`Annotation: ${name}`, () => {
      const {
        result: { id },
        entities,
      } = normalize(fixture);
      const state = {
        resources: { ...DEFAULT_STATE.resources, ...entities },
      };
      const selectAnnotation = s => s.resources.annotations[id];

      const { getId, getType, getTimeMode, getBehavior } = annotation(
        selectAnnotation
      );

      test('getId', () => {
        expect(getId(state)).toMatchSnapshot(`getId ${name}`);
      });

      test('getType', () => {
        expect(getType(state)).toMatchSnapshot(`getType ${name}`);
      });

      test('getTimeMode', () => {
        expect(getTimeMode(state)).toMatchSnapshot(`getTimeMode ${name}`);
      });

      test('getBehavior', () => {
        expect(getBehavior(state)).toMatchSnapshot(`getBehavior ${name}`);
      });
    });
  });
});
