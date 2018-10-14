import { createSelector, createStructuredSelector } from 'reselect';
import memoize from 'lodash.memoize';

export default function byIdSelectorFactory(rootApi, resourceKey) {
  return memoize(
    (callable, { getId = null, dereference = false } = {}) => (
      state,
      props
    ) => {
      const id = getId ? getId(props) : props ? props.id : null;
      if (!id) {
        // @todo invariant.
        return {
          fetched: false,
          error: true,
          errorMessage: 'No ID found on resource',
        };
      }

      if (dereference && (!state.dereferenced || !state.dereferenced[id])) {
        return {
          fetched: false,
          loading: false,
        };
      }

      if (
        !state.resources ||
        !state.resources[resourceKey] ||
        !state.resources[resourceKey][id]
      ) {
        return {
          fetched: false,
          loading: true,
        };
      }

      const selectorOrStructure = callable(
        rootApi(s => s.resources[resourceKey][id])
      );

      const newProps = (selectorOrStructure &&
      {}.toString.call(selectorOrStructure) === '[object Function]'
        ? selector => passThroughState => selector(passThroughState)
        : createStructuredSelector)(selectorOrStructure)(state);

      return newProps;
    }
  );
}
