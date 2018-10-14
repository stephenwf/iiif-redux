import annotationPage from '../../../../src/api/3.x/annotation-page';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/annotation-page/linking', () => {
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
        getSeeAlsoIds,
        getSeeAlso,
        getServiceIds,
        getService,
        getLogoIds,
        getLogo,
        getHomepageId,
        getHomepage,
        getRenderingIds,
        getRendering,
        getPartOfId,
        getPartOf,
      } = annotationPage(selectAnnotationPage);

      test('getSeeAlsoIds', () => {
        expect(getSeeAlsoIds(state)).toMatchSnapshot(`getSeeAlsoIds ${name}`);
      });

      test('getSeeAlso', () => {
        expect(getSeeAlso(state)).toMatchSnapshot(`getSeeAlso ${name}`);
      });

      test('getServiceIds', () => {
        expect(getServiceIds(state)).toMatchSnapshot(`getServiceIds ${name}`);
      });

      test('getService', () => {
        expect(getService(state)).toMatchSnapshot(`getService ${name}`);
      });

      test('getLogoIds', () => {
        expect(getLogoIds(state)).toMatchSnapshot(`getLogoIds ${name}`);
      });

      test('getLogo', () => {
        expect(getLogo(state)).toMatchSnapshot(`getLogo ${name}`);
      });

      test('getHomepageId', () => {
        expect(getHomepageId(state)).toMatchSnapshot(`getHomepageId ${name}`);
      });

      test('getHomepage', () => {
        expect(getHomepage(state)).toMatchSnapshot(`getHomepage ${name}`);
      });

      test('getRenderingIds', () => {
        expect(getRenderingIds(state)).toMatchSnapshot(
          `getRenderingIds ${name}`
        );
      });

      test('getRendering', () => {
        expect(getRendering(state)).toMatchSnapshot(`getRendering ${name}`);
      });

      test('getPartOfId', () => {
        expect(getPartOfId(state)).toMatchSnapshot(`getPartOfId ${name}`);
      });

      test('getPartOf', () => {
        expect(getPartOf(state)).toMatchSnapshot(`getPartOf ${name}`);
      });
    });
  });
});
