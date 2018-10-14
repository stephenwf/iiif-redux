import { createSelector, createStructuredSelector } from 'reselect';
import memoize from 'lodash.memoize';
import annotation from './2.x/annotation';
import canvas from './2.x/canvas';
import collection from './2.x/collection';
import externalResource from './2.x/external-resource';
import imageResource from './2.x/image-resource';
import manifest from './2.x/manifest';
import range from './2.x/range';
import resourceApi from './resource';
import sequence from './2.x/sequence';

// @todo make this work with presentation 2 + 3 and new structure.
const resourceApiMap = {
  annotation: annotation,
  canvas: canvas,
  collection: collection,
  externalResource: externalResource,
  imageResource: imageResource,
  manifest: manifest,
  range: range,
  resource: resourceApi,
  sequence: sequence,
};

const resource = memoize((selector, apiMap) => {
  return createSelector(
    selector,
    s => s,
    (entity, state) => {
      if (!entity) return null;
      const { id, schema } = entity;

      if (state.dereferenced[id] && state.dereferenced[id].loading === true) {
        return null;
      }
      if (state.dereferenced[id] && state.dereferenced[id].error) {
        return { error: state.dereferenced[id].error };
      }
      if (apiMap[schema] && resourceApiMap[schema]) {
        const api = apiMap[schema];
        const rootApi = resourceApiMap[schema];
        const selectorOrStructured = api(
          rootApi(s => {
            const resourceSchema =
              schema === 'canvas' ? 'canvases' : schema + 's';
            return s.resources[resourceSchema][id];
          })
        );

        if (typeof selectorOrStructured === 'function') {
          return selectorOrStructured(state);
        }

        const newProps = createStructuredSelector(selectorOrStructured)(state);
        newProps.schema = schema;
        return newProps;
      }
      return null;
    }
  );
});

export default resource;
