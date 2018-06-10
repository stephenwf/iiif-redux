import memoize from 'lodash.memoize';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';
import {
  getAllCanvases,
  getAllExternalResources,
  getAllImages,
  getAllLayers,
  getAllRanges,
  getAllServices,
} from './all';
import * as technical from './iiif-technical';
import { createSelector } from 'reselect';
import * as descriptive from './iiif-descriptive';
import * as linking from './iiif-linking';
import * as structural from './iiif-structural';

const range = memoize(selector => {
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

  const getViewingHint = createSelector(
    selector,
    technical.getWhitelistedViewingHint([
      'individuals',
      'paged',
      'continuous',
      'top',
    ])
  );

  const getViewingDirection = createSelector(
    selector,
    technical.getViewingDirection
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

  const getStartCanvasId = createSelector(selector, linking.getStartCanvas);
  const getStartCanvas = createSelector(
    getStartCanvasId,
    getAllCanvases,
    (canvasId, allCanvases) => allCanvases[canvasId]
  );

  /**************************************************
   * Structural properties
   *
   * - getMembers
   * - getCanvases
   * - getRanges
   **************************************************/
  const getCanvasIds = createSelector(selector, structural.getRangeCanvases);
  const getCanvases = createSelector(
    getCanvasIds,
    getAllCanvases,
    (canvasIds, allCanvases) =>
      canvasIds.map(
        canvasId =>
          allCanvases[canvasId] || {
            '@id': canvasId,
            label: [{ '@language': 'none', '@value': 'unknown' }],
          }
      )
  );

  const getMemberIds = createSelector(selector, structural.getRangeMembers);
  const getMembers = createSelector(
    getMemberIds,
    getAllCanvases,
    getAllRanges,
    (memberIds, allCanvases, allRanges) =>
      memberIds.map(
        memberId =>
          allCanvases[memberId] ||
          allRanges[memberId] || {
            '@id': memberId,
            label: [{ '@language': 'none', '@value': 'unknown' }],
          }
      )
  );

  const getRangeIds = createSelector(selector, structural.getRangeRanges);
  const getRanges = createSelector(
    getRangeIds,
    getAllRanges,
    (rangeIds, allRanges) => rangeIds.map(rangeId => allRanges[rangeId])
  );

  return {
    // technical.
    getId,
    getType,
    getViewingHint,
    getViewingDirection,

    // descriptive.
    getLabel,
    getMetadata,
    getDescription,
    getThumbnail,
    getThumbnailId,
    getAttribution,
    getLicense,
    getLogo,

    // linking.
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
    getStartCanvas,
    getStartCanvasId,

    // structural.
    getMembers,
    getMemberIds,
    getCanvases,
    getCanvasIds,
    getRanges,
    getRangeIds,
  };
});

export default range;

export const ranges = resourceListSelectorFactory(getAllRanges, range);

export const rangeByIdSelector = byIdSelectorFactory(range, 'ranges');
