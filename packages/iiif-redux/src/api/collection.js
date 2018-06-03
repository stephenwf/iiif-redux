import memoize from 'lodash.memoize';
import { createSelector, createStructuredSelector } from 'reselect';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';
import * as linking from './iiif-linking';
import * as paging from './iiif-paging';
import * as structural from './iiif-structural';
import {
  getAllCollections,
  getAllLayers,
  getAllServices,
  getAllExternalResources,
  getAllManifests,
  getAllAnnotationLists,
  getAllImages,
} from './all';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';

const collection = memoize(selector => {
  /**************************************************
   * Technical properties
   *
   * - getId
   * - getType
   * - getViewingHint
   * - getNavDate
   **************************************************/
  const getId = createSelector(selector, technical.getId);
  const getType = createSelector(selector, technical.getType);
  const getViewingHint = createSelector(
    selector,
    technical.getWhitelistedViewingHint(['individuals', 'multi-part'])
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
   * Paging properties
   *
   * - getFirst
   * - getLast
   * - getTotal
   * - getNext
   * - getPrevious
   * - getStartIndex
   **************************************************/
  const getFirstId = createSelector(selector, paging.getFirst);
  const getFirst = createSelector(
    getFirstId,
    getAllCollections,
    (firstId, collections) => collections[firstId]
  );

  const getLastId = createSelector(selector, paging.getLast);
  const getLast = createSelector(
    getLastId,
    getAllCollections,
    (lastId, collections) => collections[lastId]
  );

  const getTotal = createSelector(selector, paging.getTotal);

  const getNextId = createSelector(selector, paging.getNext);
  const getNext = createSelector(
    getNextId,
    getAllCollections,
    (nextId, collections) => collections[nextId]
  );

  const getPreviousId = createSelector(selector, paging.getPrevious);
  const getPrevious = createSelector(
    getPreviousId,
    getAllCollections,
    (previousId, collections) => collections[previousId]
  );

  const getStartIndex = createSelector(selector, paging.getStartIndex);

  /**************************************************
   * Structural properties
   *
   * - getCollections
   * - getManifests
   * - getMembers
   * - getOtherContent
   **************************************************/
  const getMemberIds = createSelector(selector, structural.getMembers);

  const getCollectionIds = createSelector(selector, structural.getCollections);
  const getCollections = createSelector(
    getCollectionIds,
    getAllCollections,
    (collectionIds, allCollections) =>
      collectionIds.map(collectionId => allCollections[collectionId])
  );

  const getManifestIds = createSelector(selector, structural.getManifests);
  const getManifests = createSelector(
    getMemberIds,
    getAllManifests,
    (memberIds, allManifests) =>
      memberIds.map(memberId => allManifests[memberId] || null).filter(e => e)
  );

  const getMembers = createSelector(
    getMemberIds,
    getAllCollections,
    getAllManifests,
    (memberIds, allCollections, allManifests) =>
      memberIds
        .map(memberId => allCollections[memberId] || allManifests[memberId])
        .filter(e => e)
  );
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
    // Technical
    getId,
    getType,
    getViewingHint,
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
    // Paging
    getFirstId,
    getFirst,
    getLastId,
    getLast,
    getTotal,
    getNextId,
    getNext,
    getPreviousId,
    getPrevious,
    getStartIndex,
    // Structural
    getCollectionIds,
    getCollections,
    getManifestIds,
    getManifests,
    getMemberIds,
    getMembers,
    getOtherContentIds,
    getOtherContent,
    // Other
  };
});

export default collection;

export const collections = resourceListSelectorFactory(
  getAllAnnotationLists,
  collection
);

export const collectionByIdSelector = byIdSelectorFactory(
  collection,
  'collections'
);
