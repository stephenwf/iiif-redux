import { createSelector, createStructuredSelector } from 'reselect';
import memoize from 'lodash.memoize';

export default function resourceListSelectorFactory(getAllOfResource, rootApi) {
  return (selector, api, config) => {
    return createSelector(
      selector,
      getAllOfResource,
      s => s,
      (list, allResources, state) =>
        list.map(idOrResource =>
          rootApi(
            () =>
              typeof idOrResource === 'string'
                ? allResources[idOrResource]
                : idOrResource,
            api,
            config
          )(state)
        )
    );
  };
}
