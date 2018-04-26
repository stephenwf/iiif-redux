import memoize from 'lodash.memoize';
import { createSelector, createStructuredSelector } from 'reselect';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';
import * as structural from './iiif-structural';
import {
  getAllExternalResources,
  getAllImages,
  getAllLayers,
  getAllServices,
} from './all';
import * as linking from './iiif-linking';
import { isImageService } from '../constants/services';

const image = memoize(selector => {
  /**************************************************
   * Technical properties
   *
   * - getId
   * - getType
   * - getViewingHint
   **************************************************/
  const getId = createSelector(selector, technical.getId);

  const getType = createSelector(selector, technical.getType);

  const getViewingHint = createSelector(
    selector,
    technical.getWhitelistedViewingHint([])
  );

  /**************************************************
   * Descriptive properties
   *
   * - getLabel
   * - getMetadata
   * - getDescription
   * - getThumbnail
   * - getAttribution
   * - getLicense
   * - getLogo
   **************************************************/
  const getLabel = createSelector(selector, descriptive.getLabel);

  const getDescription = createSelector(selector, descriptive.getDescription);

  const getMetadata = createSelector(selector, descriptive.getMetadata);

  const getAttribution = createSelector(selector, descriptive.getAttribution);

  const getLogo = createSelector(selector, descriptive.getLogo);

  const getLicense = createSelector(selector, descriptive.getLicense);

  const getThumbnailId = createSelector(selector, descriptive.getThumbnailId);
  const getThumbnail = createSelector(
    getThumbnailId,
    getAllImages,
    (thumbnailId, allImages) => allImages[thumbnailId] || thumbnailId
  );

  /**************************************************
   * Linking properties
   *
   * - getSeeAlso
   * - getService
   * - getRelated
   * - getRendering
   * - getWithin
   **************************************************/
  const getSeeAlsoIds = createSelector(selector, linking.getSeeAlso);
  const getSeeAlso = createSelector(
    getSeeAlsoIds,
    getAllExternalResources,
    (seeAlsoIds, allExternalResources) =>
      seeAlsoIds.map(
        seeAlsoId =>
          allExternalResources[seeAlsoId] || {
            '@id': seeAlsoId,
            label: [{ '@value': 'unknown', '@language': '@none' }],
          }
      )
  );

  const getServiceIds = createSelector(selector, linking.getService);
  const getService = createSelector(
    getServiceIds,
    getAllServices,
    (serviceIds, allServices) =>
      serviceIds.map(serviceId => allServices[serviceId])
  );

  const getRelatedIds = createSelector(selector, linking.getRelated);
  const getRelated = createSelector(
    getRelatedIds,
    getAllExternalResources,
    (relatedIds, allExternalResources) =>
      relatedIds.map(relatedId => allExternalResources[relatedId])
  );

  const getRenderingIds = createSelector(selector, linking.getRendering);
  const getRendering = createSelector(
    getRenderingIds,
    getAllExternalResources,
    (renderingIds, allExternalResources) =>
      renderingIds.map(renderingId => allExternalResources[renderingId])
  );

  const getWithinIds = createSelector(selector, linking.getWithin);
  const getWithin = createSelector(
    getWithinIds,
    getAllLayers,
    getAllExternalResources,
    (withinIds, allLayers, allExternalResources) =>
      withinIds
        .map(within => allLayers[within.id] || allExternalResources[within.id])
        .filter(e => e)
  );

  /**************************************************
   * Structural properties
   *
   * - getResource
   **************************************************/
  const getResourceId = createSelector(selector, structural.getResource);
  const getResource = createSelector(
    getResourceId,
    getAllImages,
    (resourceId, allImageResources) => allImageResources[resourceId] || null
  );

  const getImageService = createSelector(
    getResource,
    getAllServices,
    (resource, allServices) =>
      resource
        ? resource.service.reduce((innerResult, serviceId) => {
            if (innerResult) return innerResult;
            const service = allServices[serviceId];
            if (isImageService(service.profile)) {
              return service;
            }
            return null;
          }, null)
        : null
  );

  return {
    // Technical
    getId,
    getType,
    getViewingHint,
    // Descriptive
    getLabel,
    getMetadata,
    getDescription,
    getThumbnailId,
    getThumbnail,
    getAttribution,
    getLicense,
    getLogo,
    // Linking
    getSeeAlso,
    getSeeAlsoIds,
    getService,
    getServiceIds,
    getRelated,
    getRelatedIds,
    getRendering,
    getRenderingIds,
    getWithin,
    getWithinIds,
    // Structural
    getResourceId,
    getResource,
    // Service
    getImageService,
  };
});

export default image;

export function imageByIdSelector(callable, getId) {
  return (state, props) =>
    createStructuredSelector(
      callable(
        image(
          () => state.resources.annotations[getId ? getId(props) : props.id]
        )
      )
    )(state);
}
