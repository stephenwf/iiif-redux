import { createSelector } from 'reselect';
import { getDefaultLanguage } from './config';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';
import * as linking from './iiif-linking';
import * as paging from './iiif-paging';
import * as structural from './iiif-structural';
import validUrl from 'valid-url';
import { getAllManifests } from './current-manifest';

const getCurrentCollectionId = state => state.routing.currentCollection;
const getAllCollections = state => state.collections;
const getAllExternalResources = state => state.externalResources;
const getAllLayers = state => state.layers;
const getAllServices = state => state.services;
const getAllCanvases = state => state.canvases;

const getCurrentCollection = createSelector(
  getCurrentCollectionId,
  getAllCollections,
  (id, collections) => collections[id]
);

/**************************************************
 * Technical properties
 *
 * - getId
 * - getType
 * - getViewingHint
 * - getNavDate
 **************************************************/
const getId = createSelector(getCurrentCollection, technical.getId);
const getType = createSelector(getCurrentCollection, technical.getType);
const getViewingHint = createSelector(getCurrentCollection, collection => {
  const viewingHint = technical.getViewingHint(collection);
  if (
    viewingHint !== 'individuals' &&
    viewingHint !== 'multi-part' &&
    !validUrl.isWebUri(viewingHint)
  ) {
    return null;
  }
  return viewingHint;
});
const getNavDate = createSelector(getCurrentCollection, technical.getNavDate);

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
  getCurrentCollection,
  getDefaultLanguage,
  (collection, language) => descriptive.getLabel(language)(collection)
);

const getDescription = createSelector(
  getCurrentCollection,
  getDefaultLanguage,
  (collection, language) => descriptive.getDescription(language)(collection)
);

const getMetadata = createSelector(
  getCurrentCollection,
  getDefaultLanguage,
  (collection, language) => descriptive.getMetadata(language)(collection)
);

const getAttribution = createSelector(
  getCurrentCollection,
  getDefaultLanguage,
  (collection, language) => descriptive.getAttribution(language)(collection)
);

const getLogo = createSelector(getCurrentCollection, descriptive.getLogo);

const getLicense = createSelector(getCurrentCollection, descriptive.getLicense);

const getThumbnail = createSelector(
  getCurrentCollection,
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
const getSeeAlsoIds = createSelector(getCurrentCollection, linking.getSeeAlso);
const getSeeAlso = createSelector(
  getSeeAlsoIds,
  getAllExternalResources,
  (seeAlsoIds, allExternalResources) =>
    seeAlsoIds.map(seeAlsoId => allExternalResources[seeAlsoId])
);

const getServiceIds = createSelector(getCurrentCollection, linking.getService);
const getService = createSelector(
  getServiceIds,
  getAllServices,
  (serviceIds, allServices) =>
    serviceIds.map(serviceId => allServices[serviceId])
);

const getRelatedIds = createSelector(getCurrentCollection, linking.getRelated);
const getRelated = createSelector(
  getRelatedIds,
  getAllExternalResources,
  (relatedIds, allExternalResources) =>
    relatedIds.map(relatedId => allExternalResources[relatedId])
);

const getRenderingIds = createSelector(
  getCurrentCollection,
  linking.getRendering
);
const getRendering = createSelector(
  getRenderingIds,
  getAllExternalResources,
  (renderingIds, allExternalResources) =>
    renderingIds.map(renderingId => allExternalResources[renderingId])
);

const getWithinIds = createSelector(getCurrentCollection, linking.getWithin);
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
 * Paging properties
 *
 * - getFirst
 * - getLast
 * - getTotal
 * - getNext
 * - getPrevious
 * - getStartIndex
 **************************************************/

const getFirstId = createSelector(getCurrentCollection, paging.getFirst);
const getFirst = createSelector(
  getFirstId,
  getAllCollections,
  (firstId, collections) => collections[firstId]
);

const getLastId = createSelector(getCurrentCollection, paging.getLast);
const getLast = createSelector(
  getLastId,
  getAllCollections,
  (lastId, collections) => collections[lastId]
);

const getTotal = createSelector(getCurrentCollection, paging.getTotal);

const getNextId = createSelector(getCurrentCollection, paging.getNext);
const getNext = createSelector(
  getNextId,
  getAllCollections,
  (nextId, collections) => collections[nextId]
);

const getPreviousId = createSelector(getCurrentCollection, paging.getPrevious);
const getPrevious = createSelector(
  getPreviousId,
  getAllCollections,
  (previousId, collections) => collections[previousId]
);

const getStartIndex = createSelector(
  getCurrentCollection,
  paging.getStartIndex
);

/**************************************************
 * Structural properties
 *
 * - getCollections
 * - getManifests
 * - getMembers
 **************************************************/
const getMemberIds = createSelector(
  getCurrentCollection,
  structural.getMembers
);

const getCollectionIds = createSelector(
  getCurrentCollection,
  structural.getCollections
);
const getCollections = createSelector(
  getMemberIds,
  getAllCollections,
  (memberIds, allCollections) =>
    memberIds.map(memberId => allCollections[memberId] || null).filter(e => e)
);

const getManifestIds = createSelector(
  getCurrentCollection,
  structural.getManifests
);
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
    memberIds.map(
      memberId => allCollections[memberId] || allManifests[memberId]
    )
);

export {
  getId,
  getType,
  getViewingHint,
  getNavDate,
  getLabel,
  getDescription,
  getMetadata,
  getAttribution,
  getLogo,
  getLicense,
  getThumbnail,
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
  getCollectionIds,
  getCollections,
  getManifestIds,
  getManifests,
  getMemberIds,
  getMembers,
};
