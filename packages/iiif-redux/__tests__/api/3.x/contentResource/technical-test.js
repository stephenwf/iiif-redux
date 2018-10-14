import contentResource from '../../../../src/api/3.x/content-resource';
import { normalize } from '../../../../src/schema/presentation3';
import fixtures from './fixtures';
import { DEFAULT_STATE } from '../../../../src/spaces/iiif-resource';

describe('api/3.x/content-resource/technical', () => {
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
      getId,
      getType,
      getFormat,
      getProfile,
      getHeight,
      getWidth,
      getDuration,
      getBehavior,
    } = contentResource(selectContentResource);

    test('getId', () => {
      expect(getId(state)).toMatchSnapshot('getId');
    });
    test('getType', () => {
      expect(getType(state)).toMatchSnapshot('getType');
    });
    test('getFormat', () => {
      expect(getFormat(state)).toMatchSnapshot('getFormat');
    });
    test('getProfile', () => {
      expect(getProfile(state)).toMatchSnapshot('getProfile');
    });
    test('getHeight', () => {
      expect(getHeight(state)).toMatchSnapshot('getHeight');
    });
    test('getWidth', () => {
      expect(getWidth(state)).toMatchSnapshot('getWidth');
    });
    test('getDuration', () => {
      expect(getDuration(state)).toMatchSnapshot('getDuration');
    });
    test('getBehavior', () => {
      expect(getBehavior(state)).toMatchSnapshot('getBehavior');
    });
  });
});
