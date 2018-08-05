import { createSelector, createStructuredSelector } from 'reselect';
import memoize from 'lodash.memoize';
import annotation from './annotation';
import canvas from './canvas';
import collection from './collection';
import externalResource from './external-resource';
import imageResource from './image-resource';
import manifest from './manifest';
import range from './range';
import resourceApi from './resource';
import sequence from './sequence';

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
