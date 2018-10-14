import memoize from 'lodash.memoize';
import * as technical from './iiif/technical';
import { createSelector, createStructuredSelector } from 'reselect';
import * as descriptive from './iiif/descriptive';
import {
  getAllAnnotationLists,
  getAllAnnotations,
  getAllExternalResources,
  getAllImages,
  getAllLayers,
  getAllServices,
} from '../all';
import * as linking from './iiif/linking';
import * as paging from './iiif/paging';
import * as structural from './iiif/structural';

const annotationList = memoize(selector => {
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
   * Paging properties
   *
   * - getNext
   * - getPrevious
   * - getStartIndex
   **************************************************/
  const getNextId = createSelector(selector, paging.getNext);
  const getNext = createSelector(
    getNextId,
    getAllAnnotationLists,
    (nextId, annotationLists) => annotationLists[nextId]
  );

  const getPreviousId = createSelector(selector, paging.getPrevious);
  const getPrevious = createSelector(
    getPreviousId,
    getAllAnnotationLists,
    (previousId, annotationLists) => annotationLists[previousId]
  );

  const getStartIndex = createSelector(selector, paging.getStartIndex);

  /**************************************************
   * Structural properties
   *
   * - getResources (alias getAnnotations)
   **************************************************/
  const getResourceIds = createSelector(selector, structural.getResources);
  const getResources = createSelector(
    getResourceIds,
    getAllAnnotations,
    (resourceIds, allAnnotations) =>
      resourceIds.map(annotationId => allAnnotations[annotationId])
  );

  return {
    // technical
    getId,
    getType,
    getViewingHint,

    // descriptive
    getLabel,
    getDescription,
    getMetadata,
    getAttribution,
    getLogo,
    getLicense,
    getThumbnail,
    getThumbnailId,

    // linking
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

    // paging
    getNext,
    getNextId,
    getPrevious,
    getPreviousId,
    getStartIndex,

    // structural
    getResources,
    getResourceIds,
    getAnnotations: getResources,
    getAnnotationIds: getResourceIds,
  };
});

export default annotationList;
