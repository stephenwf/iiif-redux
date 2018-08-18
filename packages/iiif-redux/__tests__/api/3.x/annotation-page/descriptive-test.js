import annotationPage from '../../../../src/api/3.x/annotation-page';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/annotation-page/descriptive', () => {
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
        getLabel,
        getMetadata,
        getSummary,
        getThumbnailId,
        getThumbnail,
        getRequiredStatement,
        getRights,
      } = annotationPage(selectAnnotationPage);

      test('getLabel', () => {
        expect(getLabel(state)).toMatchSnapshot(`getLabel ${name}`);
      });

      test('getMetadata', () => {
        expect(getMetadata(state)).toMatchSnapshot(`getMetadata ${name}`);
      });

      test('getSummary', () => {
        expect(getSummary(state)).toMatchSnapshot(`getSummary ${name}`);
      });

      test('getThumbnailId', () => {
        expect(getThumbnailId(state)).toMatchSnapshot(`getThumbnailId ${name}`);
      });

      test('getThumbnail', () => {
        expect(getThumbnail(state)).toMatchSnapshot(`getThumbnail ${name}`);
      });

      test('getRequiredStatement', () => {
        expect(getRequiredStatement(state)).toMatchSnapshot(
          `getRequiredStatement ${name}`
        );
      });

      test('getRights', () => {
        expect(getRights(state)).toMatchSnapshot(`getRights ${name}`);
      });
    });
  });
});
