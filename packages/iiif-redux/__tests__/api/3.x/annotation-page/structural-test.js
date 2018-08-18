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

      const {
        getItemIds,
        getItems,
        getAnnotationIds,
        getAnnotations,
      } = annotationPage(selectAnnotationPage);

      test('getItemIds', () => {
        expect(getItemIds(state)).toMatchSnapshot(`getItemIds ${name}`);
      });

      test('getItems', () => {
        expect(getItems(state)).toMatchSnapshot(`getItems ${name}`);
      });

      test('getAnnotationIds', () => {
        expect(getAnnotationIds(state)).toMatchSnapshot(
          `getAnnotationIds ${name}`
        );
      });

      test('getAnnotations', () => {
        expect(getAnnotations(state)).toMatchSnapshot(`getAnnotations ${name}`);
      });
    });
  });
});
