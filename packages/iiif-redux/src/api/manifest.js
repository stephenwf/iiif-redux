import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';
import validUrl from 'valid-url';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';
import {
  getAllAnnotationLists,
  getAllExternalResources,
  getAllImages,
  getAllLayers,
  getAllRanges,
  getAllSequences,
  getAllServices,
} from './all';
import * as linking from './iiif-linking';
import * as structural from './iiif-structural';

export default memoize(selector => {
  /**************************************************
   * Technical properties
   *
   * - getId
   * - getType
   * - getViewingHint
   * - getViewingDirection
   * - getNavDate
   **************************************************/
  const getId = createSelector(selector, technical.getId);

  const getType = createSelector(selector, technical.getType);

  const getViewingHint = createSelector(
    selector,
    technical.getWhitelistedViewingHint(['individuals', 'paged', 'continuous'])
  );

  const getViewingDirection = createSelector(
    selector,
    technical.getViewingDirection
  );

  const getNavDate = createSelector(selector, technical.getNavDate);

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

  /**************************************************
   * Structural properties
   *
   * - getSequences (Required)
   * - getStructures / getRanges
   **************************************************/
  const getSequenceIds = createSelector(selector, structural.getSequences);
  const getSequences = createSelector(
    getSequenceIds,
    getAllSequences,
    (sequenceIds, allSequences) =>
      sequenceIds.map(sequenceId => allSequences[sequenceId])
  );

  const getRangeIds = createSelector(selector, structural.getRanges);
  const getRanges = createSelector(
    getRangeIds,
    getAllRanges,
    (rangeIds, allRanges) => rangeIds.map(rangeId => allRanges[rangeId])
  );

  const getStructureIds = getRangeIds;
  const getStructures = getRanges;

  const getOtherContentIds = createSelector(
    selector,
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
            label: [{ '@value': 'unknown', '@language': '@none' }],
          }
      )
  );

  return {
    selector,
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
    getThumbnailId,
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
});
