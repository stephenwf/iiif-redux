import { createSelector } from 'reselect';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';
import * as linking from './iiif-linking';
import * as structural from './iiif-structural';
import { getDefaultLanguage } from './config';
import { getCurrentSequenceId } from './current';
import {
  getAllExternalResources,
  getAllLayers,
  getAllSequences,
  getAllServices,
  getAllCanvases,
} from './all';
import validUrl from 'valid-url';

const getCurrentSequence = createSelector(
  getCurrentSequenceId,
  getAllSequences,
  (sequenceId, sequences) => sequences[sequenceId]
);

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
const getLabel = createSelector(
  getCurrentSequence,
  getDefaultLanguage,
  (sequence, language) => descriptive.getLabel(language)(sequence)
);

const getDescription = createSelector(
  getCurrentSequence,
  getDefaultLanguage,
  (sequence, language) => descriptive.getDescription(language)(sequence)
);

const getMetadata = createSelector(
  getCurrentSequence,
  getDefaultLanguage,
  (sequence, language) => descriptive.getMetadata(language)(sequence)
);

const getAttribution = createSelector(
  getCurrentSequence,
  getDefaultLanguage,
  (sequence, language) => descriptive.getAttribution(language)(sequence)
);

const getLogo = createSelector(getCurrentSequence, descriptive.getLogo);

const getLicense = createSelector(getCurrentSequence, descriptive.getLicense);

const getThumbnail = createSelector(
  getCurrentSequence,
  descriptive.getThumbnail
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
