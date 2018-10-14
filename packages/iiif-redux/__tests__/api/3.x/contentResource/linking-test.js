import contentResource from '../../../../src/api/3.x/content-resource';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/content-resource/linking', () => {
  describe.each(fixtures)('Fixture: %s', (name, fixture) => {
    const {
      result: { id },
      entities,
    } = normalize(fixture);
    const state = {
      resources: { ...DEFAULT_STATE.resources, ...entities },
    };
    const selectContentResource = s => s.resources.contentResources[id];

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
    } = contentResource(selectContentResource);

    test('getSeeAlsoIds', () => {
      expect(getSeeAlsoIds(state)).toMatchSnapshot('getSeeAlsoIds');
    });

    test('getSeeAlso', () => {
      expect(getSeeAlso(state)).toMatchSnapshot('getSeeAlso');
    });

    test('getServiceIds', () => {
      expect(getServiceIds(state)).toMatchSnapshot('getServiceIds');
    });

    test('getService', () => {
      expect(getService(state)).toMatchSnapshot('getService');
    });

    test('getLogoIds', () => {
      expect(getLogoIds(state)).toMatchSnapshot('getLogoIds');
    });

    test('getLogo', () => {
      expect(getLogo(state)).toMatchSnapshot('getLogo');
    });

    test('getHomepageId', () => {
      expect(getHomepageId(state)).toMatchSnapshot('getHomepageId');
    });

    test('getHomepage', () => {
      expect(getHomepage(state)).toMatchSnapshot('getHomepage');
    });

    test('getRenderingIds', () => {
      expect(getRenderingIds(state)).toMatchSnapshot('getRenderingIds');
    });

    test('getRendering', () => {
      expect(getRendering(state)).toMatchSnapshot('getRendering');
    });

    test('getPartOfId', () => {
      expect(getPartOfId(state)).toMatchSnapshot('getPartOfId');
    });

    test('getPartOf', () => {
      expect(getPartOf(state)).toMatchSnapshot('getPartOf');
    });
  });
});
