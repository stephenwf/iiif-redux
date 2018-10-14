import annotationPage from '../../../../src/api/3.x/annotation-page';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/annotation-page/technical', () => {
  fixtures.forEach(({ fixture, name }) => {
    describe(`AnnotationPage: ${name}`, () => {
      const {
        result: { id },
        entities,
      } = normalize(fixture);
      const state = {
        resources: { ...DEFAULT_STATE.resources, ...entities },
      };
      const selectAnnotationPage = s => s.resources.annotationPages[id];

      const { getId, getType, getBehavior } = annotationPage(
        selectAnnotationPage
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
    });
  });
});
