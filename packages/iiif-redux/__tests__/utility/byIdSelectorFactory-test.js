import byIdSelectorFactory from '../../src/utility/byIdSelectorFactory';
import annotation from '../../src/api/annotation';

describe('utility/byIdSelectorFactory', () => {
  const getAnnotationById = byIdSelectorFactory(annotation, 'annotations');

  it('should return empty object when no ID is provided', () => {
    const state = {};
    const selector = getAnnotationById(api => ({
      id: api.getId,
      label: api.getLabel,
    }));
    expect(selector(state)).toEqual({ error: true, fetched: false });
  });

  it('should return neither loading or fetched for non-existant resource', () => {
    const state = { dereferenced: {}, resources: {} };
    const selector = getAnnotationById(
      api => ({
        id: api.getId,
        label: api.getLabel,
      }),
      { dereference: true }
    );
    expect(selector(state, { id: 'http://iiif.com/collection-1' })).toEqual({
      fetched: false,
      loading: false,
    });
  });

  it('should return loading but not fetched if resource is in dereferenced list but not resources', () => {
    const state = {
      dereferenced: {
        'http://iiif.com/collection-1': { loading: true },
      },
      resources: {},
    };
    const selector = getAnnotationById(
      api => ({
        id: api.getId,
        label: api.getLabel,
      }),
      { dereference: true }
    );
    expect(selector(state, { id: 'http://iiif.com/collection-1' })).toEqual({
      fetched: false,
      loading: true,
    });
  });
});
