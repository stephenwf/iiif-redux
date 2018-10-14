import contentResource from '../../../../src/api/3.x/content-resource';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/content-resource/structural', () => {
  describe.each(fixtures)('Fixture: %s', (name, fixture) => {
    const {
      result: { id },
      entities,
    } = normalize(fixture);
    const state = {
      resources: { ...DEFAULT_STATE.resources, ...entities },
    };
    const selectContentResource = s => s.resources.contentResources[id];

    const { getAnnotationIds, getAnnotations } = contentResource(
      selectContentResource
    );

    test('getAnnotationIds', () => {
      expect(getAnnotationIds(state)).toMatchSnapshot('getAnnotationIds');
    });
    test('getAnnotations', () => {
      expect(getAnnotations(state)).toMatchSnapshot('getAnnotations');
    });
  });
});
