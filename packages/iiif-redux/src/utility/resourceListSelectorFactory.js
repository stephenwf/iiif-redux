import { createSelector, createStructuredSelector } from 'reselect';
import memoize from 'lodash.memoize';

export default function resourceListSelectorFactory(getAllOfResource, rootApi) {
  return memoize((selector, api) => {
    return createSelector(
      selector,
      getAllOfResource,
      s => s,
      (list, allResources, state) =>
        list.map(idOrResource =>
          createStructuredSelector(
            api(
              rootApi(
                () =>
                  typeof idOrResource === 'string'
                    ? allResources[idOrResource]
                    : idOrResource
              )
            )
          )(state)
        )
    );
  });
}
