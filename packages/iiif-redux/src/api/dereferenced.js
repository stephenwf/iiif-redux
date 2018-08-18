import { createSelector } from 'reselect';
import { getAllDereferenced, getAllResources } from './all';

export const doesResourceExist = selector =>
  createSelector(getAllDereferenced, selector, (allDereferenced, resource) => {
    return !!(
      resource &&
      allDereferenced &&
      allDereferenced[resource.id || resource['@id'] || resource]
    );
  });

export const hasResourceBeenFetched = (selector, resourceType) =>
  createSelector(getAllResources, selector, (allResources, resource) => {
    return !!(
      resource &&
      allResources &&
      allResources[resourceType] &&
      allResources[resourceType][resource.id || resource['@id'] || resource]
    );
  });
