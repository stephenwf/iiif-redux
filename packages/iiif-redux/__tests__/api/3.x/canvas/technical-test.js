import canvas from '../../../../src/api/3.x/canvas';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/canvas/technical', () => {
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
        getId,
        getType,
        getHeight,
        getWidth,
        getDuration,
        getBehavior,
      } = canvas(selectCanvas);

      test('getId', () => {
        expect(getId(state)).toMatchSnapshot(`getId ${name}`);
      });

      test('getType', () => {
        expect(getType(state)).toMatchSnapshot(`getType ${name}`);
      });

      test('getHeight', () => {
        expect(getHeight(state)).toMatchSnapshot(`getHeight ${name}`);
      });

      test('getWidth', () => {
        expect(getWidth(state)).toMatchSnapshot(`getWidth ${name}`);
      });

      test('getDuration', () => {
        expect(getDuration(state)).toMatchSnapshot(`getDuration ${name}`);
      });

      test('getBehavior', () => {
        expect(getBehavior(state)).toMatchSnapshot(`getBehavior ${name}`);
      });
    });
  });
});
