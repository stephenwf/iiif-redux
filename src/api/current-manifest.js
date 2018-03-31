import { createSelector } from 'reselect';
import validUrl from 'valid-url';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';
import { getDefaultLanguage } from './config';
import { getCurrentManifestId } from './current';
import {
  getAllAnnotationLists,
  getAllExternalResources,
  getAllLayers,
  getAllManifests,
  getAllRanges,
  getAllSequences,
  getAllServices,
} from './all';
import * as linking from './iiif-linking';
import * as structural from './iiif-structural';
import { getMemberIds } from './current-collection';

const getCurrentManifest = createSelector(
  getCurrentManifestId,
  getAllManifests,
  (manifestId, manifests) => manifests[manifestId]
);

/**************************************************
 * Technical properties
 *
 * - getId
 * - getType
 * - getViewingHint
 * - getViewingDirection
 * - getNavDate
 **************************************************/
const getId = createSelector(getCurrentManifest, technical.getId);

const getType = createSelector(getCurrentManifest, technical.getType);

const getViewingHint = createSelector(getCurrentManifest, manifest => {
  const viewingHint = technical.getViewingHint(manifest);
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
  getCurrentManifest,
  technical.getViewingDirection
);

const getNavDate = createSelector(getCurrentManifest, technical.getNavDate);

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
  getCurrentManifest,
  getDefaultLanguage,
  (manifest, language) => descriptive.getLabel(language)(manifest)
);

const getDescription = createSelector(
  getCurrentManifest,
  getDefaultLanguage,
  (manifest, language) => descriptive.getDescription(language)(manifest)
);

const getMetadata = createSelector(
  getCurrentManifest,
  getDefaultLanguage,
  (manifest, language) => descriptive.getMetadata(language)(manifest)
);

const getAttribution = createSelector(
  getCurrentManifest,
  getDefaultLanguage,
  (manifest, language) => descriptive.getAttribution(language)(manifest)
);

const getLogo = createSelector(getCurrentManifest, descriptive.getLogo);

const getLicense = createSelector(getCurrentManifest, descriptive.getLicense);

const getThumbnail = createSelector(
  getCurrentManifest,
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
 **************************************************/
const getSeeAlsoIds = createSelector(getCurrentManifest, linking.getSeeAlso);
const getSeeAlso = createSelector(
  getSeeAlsoIds,
  getAllExternalResources,
  (seeAlsoIds, allExternalResources) =>
    seeAlsoIds.map(
      seeAlsoId =>
        allExternalResources[seeAlsoId] || {
          '@id': seeAlsoId,
          label: 'unknown',
        }
    )
);

const getServiceIds = createSelector(getCurrentManifest, linking.getService);
const getService = createSelector(
  getServiceIds,
  getAllServices,
  (serviceIds, allServices) =>
    serviceIds.map(serviceId => allServices[serviceId])
);

const getRelatedIds = createSelector(getCurrentManifest, linking.getRelated);
const getRelated = createSelector(
  getRelatedIds,
  getAllExternalResources,
  (relatedIds, allExternalResources) =>
    relatedIds.map(relatedId => allExternalResources[relatedId])
);

const getRenderingIds = createSelector(
  getCurrentManifest,
  linking.getRendering
);
const getRendering = createSelector(
  getRenderingIds,
  getAllExternalResources,
  (renderingIds, allExternalResources) =>
    renderingIds.map(renderingId => allExternalResources[renderingId])
);

const getWithinIds = createSelector(getCurrentManifest, linking.getWithin);
const getWithin = createSelector(
  getWithinIds,
  getAllLayers,
  getAllExternalResources,
  (withinIds, allLayers, allExternalResources) =>
    withinIds.map(
      withinId => allLayers[withinId] || allExternalResources[withinId]
    )
);

/**************************************************
 * Structural properties
 *
 * - getSequences (Required)
 * - getStructures / getRanges
 **************************************************/
const getSequenceIds = createSelector(
  getCurrentManifest,
  structural.getSequences
);
const getSequences = createSelector(
  getSequenceIds,
  getAllSequences,
  (sequenceIds, allSequences) =>
    sequenceIds.map(sequenceId => allSequences[sequenceId])
);

const getRangeIds = createSelector(getCurrentManifest, structural.getRanges);
const getRanges = createSelector(
  getRangeIds,
  getAllRanges,
  (rangeIds, allRanges) => rangeIds.map(rangeId => allRanges[rangeId])
);

const getStructureIds = getRangeIds;
const getStructures = getRanges;

const getOtherContentIds = createSelector(
  getCurrentManifest,
  structural.getOtherContent
);
const getOtherContent = createSelector(
  getOtherContentIds,
  getAllExternalResources,
  getAllAnnotationLists,
  (otherContentIds, allExternalResources, allAnnotationLists) =>
    otherContentIds.map(
      otherContentId =>
        allAnnotationLists[otherContentId] ||
        allExternalResources[otherContentId] || {
          '@id': otherContentId,
          label: 'unknown',
        }
    )
);

export {
  getCurrentManifest,
  // Technical
  getId,
  getType,
  getViewingHint,
  getViewingDirection,
  getNavDate,
  // Descriptive
  getLabel,
  getDescription,
  getMetadata,
  getAttribution,
  getLogo,
  getLicense,
  getThumbnail,
  // Linking
  getWithinIds,
  getWithin,
  getRenderingIds,
  getRendering,
  getRelatedIds,
  getRelated,
  getServiceIds,
  getService,
  getSeeAlsoIds,
  getSeeAlso,
  // Structural
  getSequenceIds,
  getSequences,
  getRangeIds,
  getRanges,
  getStructureIds,
  getStructures,
  getOtherContentIds,
  getOtherContent,
};
