import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';
import * as linking from './iiif-linking';
import * as structural from './iiif-structural';
import {
  getAllExternalResources,
  getAllLayers,
  getAllServices,
  getAllCanvases,
  getAllImages,
} from './all';
import validUrl from 'valid-url';

export default memoize(selector => {
  /**************************************************
   * Technical properties
   *
   * - getId
   * - getType
   * - getViewingHint
   * - getViewingDirection
   **************************************************/
  const getId = createSelector(selector, technical.getId);
  const getType = createSelector(selector, technical.getType);
  const getViewingHint = createSelector(selector, sequence => {
    const viewingHint = technical.getViewingHint(sequence);
    switch (viewingHint) {
      case 'individuals':
      case 'paged':
      case 'continuous':
        return viewingHint;
      default:
        return validUrl.isWebUri(viewingHint) ? viewingHint : null;
    }
  });
  const getViewingDirection = createSelector(
    selector,
    technical.getViewingDirection
  );

  /**************************************************
   * Descriptive properties
   *
   * - getLabel
   * - getDescription
   * - getMetadata
   * - getAttribution
   * - getLogo
   * - getLicence
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
   * - getStartCanvas
   **************************************************/
  const getSeeAlsoIds = createSelector(selector, linking.getSeeAlso);
  const getSeeAlso = createSelector(
    getSeeAlsoIds,
    getAllExternalResources,
    (seeAlsoIds, allExternalResources) =>
      seeAlsoIds.map(seeAlsoId => allExternalResources[seeAlsoId])
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

  const getStartCanvasId = createSelector(selector, linking.getStartCanvas);
  const getStartCanvas = createSelector(
    getStartCanvasId,
    getAllCanvases,
    (canvasId, allCanvases) => allCanvases[canvasId]
  );

  /**************************************************
   * Structural properties
   *
   * - getCanvases (Required)
   **************************************************/
  const getCanvasIds = createSelector(selector, structural.getCanvases);
  const getCanvases = createSelector(
    getCanvasIds,
    getAllCanvases,
    (canvasIds, allCanvases) => canvasIds.map(canvasId => allCanvases[canvasId])
  );

  return {
    selector,
    // Technical
    getId,
    getType,
    getViewingHint,
    getViewingDirection,
    // Descriptive
    getLabel,
    getDescription,
    getMetadata,
    getAttribution,
    getLogo,
    getLicense,
    getThumbnailId,
    getThumbnail,
    // Linking
    getSeeAlsoIds,
    getSeeAlso,
    getServiceIds,
    getService,
    getRelatedIds,
    getRelated,
    getRenderingIds,
    getRendering,
    getWithinIds,
    getWithin,
    getStartCanvasId,
    getStartCanvas,
    // Structural
    getCanvasIds,
    getCanvases,
  };
});
