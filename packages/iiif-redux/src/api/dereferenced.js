import { createSelector } from 'reselect';
import { getAllDereferenced, getAllResources } from './all';

export const doesResourceExist = (selector, id) =>
  createSelector(getAllDereferenced, selector, (allDereferenced, resource) => {
    const idToCheck = resource
      ? resource.id || resource['@id'] || resource
      : id;
    return !!(idToCheck && allDereferenced && allDereferenced[idToCheck]);
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

export const isResourceLoading = (selector, id) =>
  createSelector(getAllDereferenced, selector, (allDereferenced, resource) => {
    const idToCheck = resource
      ? resource.id || resource['@id'] || resource
      : id;
    return !!(
      idToCheck &&
      allDereferenced &&
      allDereferenced[idToCheck] &&
      allDereferenced[idToCheck].loading === true
    );
  });
