import memoize from 'lodash.memoize';
import { createSelector, createStructuredSelector } from 'reselect';
import * as technical from './2.x/iiif/technical';
import * as descriptive from './2.x/iiif/descriptive';
import * as linking from './2.x/iiif/linking';
import {
  getAllAnnotationLists,
  getAllExternalResources,
  getAllImages,
  getAllLayers,
  getAllServices,
} from './all';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';

const externalResource = memoize(selector => {
  /**************************************************
   * Technical properties
   *
   * - getId
   * - getType
   * - getFormat
   * - getHeight
   * - getWidth
   * - getViewingHint
   **************************************************/
  const getId = createSelector(selector, technical.getId);

  const getType = createSelector(selector, technical.getType);

  const getFormat = createSelector(selector, technical.getFormat);

  const getHeight = createSelector(selector, technical.getHeight);

  const getWidth = createSelector(selector, technical.getWidth);

  const getViewingHint = createSelector(
    selector,
    technical.getWhitelistedViewingHint([]) // has to be URI.
  );

  /**************************************************
   * Descriptive properties
   *
   * - getLabel
   * - getDescription
   * - getMetadata
   * - getAttribution
   * - getLogo
   * - getLicense
   * - getThumbnail
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

  return {
    selector,
    // Technical
    getId,
    getType,
    getFormat,
    getHeight,
    getWidth,
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
  };
});

export default externalResource;

export const externalResources = resourceListSelectorFactory(
  getAllAnnotationLists,
  externalResource
);

export const externalResourceByIdSelector = byIdSelectorFactory(
  externalResource,
  'externalResources'
);
