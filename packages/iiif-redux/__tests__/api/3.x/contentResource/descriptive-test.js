import contentResource from '../../../../src/api/3.x/content-resource';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/content-resource/descriptive', () => {
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
      getLabel,
      getMetadata,
      getSummary,
      getThumbnailId,
      getThumbnail,
      getRequiredStatement,
      getRights,
      getLanguage,
    } = contentResource(selectContentResource);

    test('getLabel', () => {
      expect(getLabel(state)).toMatchSnapshot('getLabel');
    });

    test('getMetadata', () => {
      expect(getMetadata(state)).toMatchSnapshot('getMetadata');
    });

    test('getSummary', () => {
      expect(getSummary(state)).toMatchSnapshot('getSummary');
    });

    test('getThumbnailId', () => {
      expect(getThumbnailId(state)).toMatchSnapshot('getThumbnailId');
    });

    test('getThumbnail', () => {
      expect(getThumbnail(state)).toMatchSnapshot('getThumbnail');
    });

    test('getRequiredStatement', () => {
      expect(getRequiredStatement(state)).toMatchSnapshot(
        'getRequiredStatement'
      );
    });

    test('getRights', () => {
      expect(getRights(state)).toMatchSnapshot('getRights');
    });

    test('getLanguage', () => {
      expect(getLanguage(state)).toMatchSnapshot('getLanguage');
    });
  });
});
