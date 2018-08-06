import manifest from '../../../../src/api/3.x/manifest';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/manifest/linking', () => {
  fixtures.forEach((fixture, num) => {
    describe(`Manifest number ${num}`, () => {
      const {
        result: { id },
        entities,
      } = normalize(fixture);
      const state = {
        resources: { ...DEFAULT_STATE.resources, ...entities },
      };
      const selectManifest = s => s.resources.manifests[id];

      const {
        getSeeAlso,
        getSeeAlsoIds,
        getService,
        getServiceIds,
        getLogo,
        getLogoIds,
        getHomepage,
        getHomepageId,
        getRendering,
        getRenderingIds,
        getPartOf,
        getPartOfId,
        getStartId,
        getStart,
      } = manifest(selectManifest);

      test('getSeeAlso', () => {
        expect(getSeeAlso(state)).toMatchSnapshot(`getSeeAlso ${num}`);
      });

      test('getSeeAlsoIds', () => {
        expect(getSeeAlsoIds(state)).toMatchSnapshot(`getSeeAlsoIds ${num}`);
      });

      test('getService', () => {
        expect(getService(state)).toMatchSnapshot(`getService ${num}`);
      });

      test('getServiceIds', () => {
        expect(getServiceIds(state)).toMatchSnapshot(`getServiceIds ${num}`);
      });

      test('getLogo', () => {
        expect(getLogo(state)).toMatchSnapshot(`getLogo ${num}`);
      });

      test('getLogoIds', () => {
        expect(getLogoIds(state)).toMatchSnapshot(`getLogoIds ${num}`);
      });

      test('getHomepage', () => {
        expect(getHomepage(state)).toMatchSnapshot(`getHomepage ${num}`);
      });

      test('getHomepageId', () => {
        expect(getHomepageId(state)).toMatchSnapshot(`getHomepageId ${num}`);
      });

      test('getRendering', () => {
        expect(getRendering(state)).toMatchSnapshot(`getRendering ${num}`);
      });

      test('getRenderingIds', () => {
        expect(getRenderingIds(state)).toMatchSnapshot(
          `getRenderingIds ${num}`
        );
      });

      test('getPartOf', () => {
        expect(getPartOf(state)).toMatchSnapshot(`getPartOf ${num}`);
      });

      test('getPartOfId', () => {
        expect(getPartOfId(state)).toMatchSnapshot(`getPartOfId ${num}`);
      });

      test('getStart', () => {
        expect(getStart(state)).toMatchSnapshot(`getStart ${num}`);
      });

      test('getStartId', () => {
        expect(getStartId(state)).toMatchSnapshot(`getStartId ${num}`);
      });
    });
  });
});
