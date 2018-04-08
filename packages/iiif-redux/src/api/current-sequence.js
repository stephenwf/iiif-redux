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
import { getCurrentSequence } from './current';

/**************************************************
 * Technical properties
 *
 * - getId
 * - getType
 * - getViewingHint
 * - getViewingDirection
 **************************************************/
const getId = createSelector(getCurrentSequence, technical.getId);
const getType = createSelector(getCurrentSequence, technical.getType);
const getViewingHint = createSelector(getCurrentSequence, sequence => {
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
  getCurrentSequence,
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
const getLabel = createSelector(getCurrentSequence, descriptive.getLabel);

const getDescription = createSelector(
  getCurrentSequence,
  descriptive.getDescription
);

const getMetadata = createSelector(getCurrentSequence, descriptive.getMetadata);

const getAttribution = createSelector(
  getCurrentSequence,
  descriptive.getAttribution
);

const getLogo = createSelector(getCurrentSequence, descriptive.getLogo);

const getLicense = createSelector(getCurrentSequence, descriptive.getLicense);

const getThumbnailId = createSelector(
  getCurrentSequence,
  descriptive.getThumbnailId
);
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
const getSeeAlsoIds = createSelector(getCurrentSequence, linking.getSeeAlso);
const getSeeAlso = createSelector(
  getSeeAlsoIds,
  getAllExternalResources,
  (seeAlsoIds, allExternalResources) =>
    seeAlsoIds.map(seeAlsoId => allExternalResources[seeAlsoId])
);

const getServiceIds = createSelector(getCurrentSequence, linking.getService);
const getService = createSelector(
  getServiceIds,
  getAllServices,
  (serviceIds, allServices) =>
    serviceIds.map(serviceId => allServices[serviceId])
);

const getRelatedIds = createSelector(getCurrentSequence, linking.getRelated);
const getRelated = createSelector(
  getRelatedIds,
  getAllExternalResources,
  (relatedIds, allExternalResources) =>
    relatedIds.map(relatedId => allExternalResources[relatedId])
);

const getRenderingIds = createSelector(
  getCurrentSequence,
  linking.getRendering
);
const getRendering = createSelector(
  getRenderingIds,
  getAllExternalResources,
  (renderingIds, allExternalResources) =>
    renderingIds.map(renderingId => allExternalResources[renderingId])
);

const getWithinIds = createSelector(getCurrentSequence, linking.getWithin);
const getWithin = createSelector(
  getWithinIds,
  getAllLayers,
  getAllExternalResources,
  (withinIds, allLayers, allExternalResources) =>
    withinIds.map(
      withinId => allLayers[withinId] || allExternalResources[withinId]
    )
);

const getStartCanvasId = createSelector(
  getCurrentSequence,
  linking.getStartCanvas
);
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
const getCanvasIds = createSelector(getCurrentSequence, structural.getCanvases);
const getCanvases = createSelector(
  getCanvasIds,
  getAllCanvases,
  (canvasIds, allCanvases) => canvasIds.map(canvasId => allCanvases[canvasId])
);

export {
  getCurrentSequence,
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
