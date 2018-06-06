import { createSelector, createStructuredSelector } from 'reselect';
import memoize from 'lodash.memoize';

export default function resourceListSelectorFactory(getAllOfResource, rootApi) {
  return memoize((selector, api) => {
    return createSelector(
      selector,
      getAllOfResource,
      s => s,
      (list, allResources, state) =>
        list.map(idOrResource => {
          const selectorOrStructured = api(
            rootApi(
              () =>
                typeof idOrResource === 'string'
                  ? allResources[idOrResource]
                  : idOrResource
            )
          );

          if (typeof selectorOrStructured === 'function') {
            return selectorOrStructured(state);
          }

          return createStructuredSelector(selectorOrStructured)(state);
        })
    );
  });
}
