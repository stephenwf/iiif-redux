import { createSelector, createStructuredSelector } from 'reselect';
import memoize from 'lodash.memoize';
import {
  doesResourceExist,
  hasResourceBeenFetched,
  isResourceLoading,
} from '../../api/dereferenced';
import { getSchemaVersionForResource } from '../../api/schemaVersion';
import selectorError from './selectorError';

export default function resourceSelectorFactory(
  resourceKey,
  presentationVersionMap,
  defaultVersion
) {
  return (
    selector,
    apiRequest,
    { dereference = false } = { dereference: false }
  ) => {
    return state => {
      const resource = selector(state);
      const version = getSchemaVersionForResource(selector)(state);
      const exists = doesResourceExist(selector)(state);
      const fetched = hasResourceBeenFetched(selector, resourceKey)(state);

      console.log({ resource, version });

      // No resource, error reported.
      if (!resource) {
        return selectorError('Resource not found.');
      }

      // Resource doesn't exist and hasn't been requested yet.
      if (dereference && exists === false) {
        return {
          fetched: false,
          loading: false,
        };
      }

      // Resource exists and is fetching.
      if (!fetched) {
        return {
          fetched: false,
          loading: true,
        };
      }

      // No valid presentation version.
      if (
        (!defaultVersion && !presentationVersionMap[version]) ||
        (!presentationVersionMap[version] &&
          !presentationVersionMap[defaultVersion])
      ) {
        return selectorError(
          `Schema version ${version} not found for resource`
        );
      }

      // Grab the correct selector api (2 or 3).
      const selectorApi =
        presentationVersionMap[version] ||
        presentationVersionMap[defaultVersion];

      // Take user input to make selector.
      const selectorOrStructure = apiRequest(selectorApi(selector));

      console.info('=> RESOURCE', selectorApi(() => resource).getId);

      function filterEmpty(selectorMap) {
        return Object.keys(selectorMap).reduce((acc, next) => {
          if (selectorMap[next]) {
            acc[next] = selectorMap[next];
          } else {
            acc[next] = () => null;
          }
          return acc;
        }, {});
      }

      // Return result.
      const newProps = (selectorOrStructure &&
      {}.toString.call(selectorOrStructure) === '[object Function]'
        ? selectorOrStructure
        : createStructuredSelector(filterEmpty(selectorOrStructure)))(state);

      if (dereference) {
        newProps.fetched = true;
        newProps.loading = isResourceLoading(selector)(state);
      }

      return newProps;
    };
  };
}
