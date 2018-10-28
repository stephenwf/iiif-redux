import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';
import mapById from '../../utility/mapById';
import * as technical from './iiif/technical';
import * as descriptive from './iiif/descriptive';
import * as linking from './iiif/linking';
import * as structural from './iiif/structural';
import {
  getAllAnnotationCollections,
  getAllAnnotationPages,
  getAllAnnotations,
  getAllCanvases,
  getAllCanvasReferences,
  getAllContentResources,
  getAllRanges,
  getAllResources,
  getAllSelectors,
  getAllServices,
} from '../all';
import mapByIdOrId from '../../utility/mapByIdOrId';
import mapAllResources from '../../utility/mapAllResources';
import mapAllById from '../../utility/mapAllById';
import { standardFieldMappingFactory } from '../../../es/utility/new/standardFieldMappingFactory';

const range = memoize(selector => {
  /**
   * Technical properties
   *
   * - getId
   * - getType
   * - getBehavior
   * - getViewingDirection
   */
  const getId = createSelector(selector, technical.getId);

  const getType = createSelector(selector, technical.getType);

  const getViewingDirection = createSelector(
    selector,
    technical.getViewingDirection
  );

  const getBehavior = createSelector(selector, technical.getBehavior);

  /**
   * Descriptive Properties
   *
   * - getLabel
   * - getMetadata
   * - getSummary
   * - getThumbnail
   * - getPosterCanvas
   * - getRequiredStatement
   * - getRights
   * - getNavDate
   */
  const getLabel = createSelector(selector, descriptive.getLabel);

  const getMetadata = createSelector(selector, descriptive.getMetadata);

  const getSummary = createSelector(selector, descriptive.getSummary);

  const getThumbnailId = createSelector(selector, descriptive.getThumbnailId);

  const getThumbnail = createSelector(
    getThumbnailId,
    getAllContentResources,
    mapByIdOrId
  );

  const getPosterCanvasId = createSelector(
    selector,
    descriptive.getPosterCanvas
  );
  const getPosterCanvas = createSelector(
    getPosterCanvasId,
    getAllCanvases,
    mapById
  );

  const getRequiredStatement = createSelector(
    selector,
    descriptive.getRequiredStatement
  );

  const getRights = createSelector(selector, descriptive.getRights);

  const getNavDate = createSelector(selector, descriptive.getNavDate);

  /**
   * Linking properties
   *
   * - getSeeAlso
   * - getService
   * - getLogo
   * - getHomepage
   * - getRendering
   * - getPartOf
   */
  const getSeeAlsoIds = createSelector(selector, linking.getSeeAlso);
  const getSeeAlso = createSelector(
    getSeeAlsoIds,
    getAllContentResources,
    mapAllById
  );

  const getServiceIds = createSelector(selector, linking.getService);
  const getService = createSelector(getServiceIds, getAllServices, mapAllById);

  const getLogoIds = createSelector(selector, linking.getLogo);
  const getLogo = createSelector(
    getLogoIds,
    getAllContentResources,
    mapAllById
  );

  const getHomepageId = createSelector(selector, linking.getHomepage);
  const getHomepage = createSelector(
    getHomepageId,
    getAllContentResources,
    mapById
  );

  const getRenderingIds = createSelector(selector, linking.getRendering);
  const getRendering = createSelector(
    getRenderingIds,
    getAllContentResources,
    mapAllById
  );

  const getPartOfId = createSelector(selector, linking.getPartOf);
  const getPartOf = createSelector(
    getPartOfId,
    getAllResources,
    mapAllResources
  );

  const getStartId = createSelector(selector, linking.getStart);
  const getStart = createSelector(
    getStartId,
    getAllCanvases,
    getAllCanvasReferences,
    (start, allCanvases, allCanvasReferences) => {
      if (!start) {
        return null;
      }
      if (start.schema === 'canvas') {
        return allCanvases[start.id];
      }
      return allCanvasReferences[start.id] || null;
    }
  );

  const getSupplementaryId = createSelector(selector, linking.getSupplementary);
  const getSupplementary = createSelector(
    getSupplementaryId,
    getAllAnnotationCollections,
    mapById
  );

  /**
   * Structural Properties
   *
   * - getItems
   * - getRanges
   * - getAnnotations
   */
  const getItemIds = createSelector(selector, structural.getItems);
  const getItems = createSelector(
    getItemIds,
    getAllAnnotations,
    getAllCanvases,
    getAllRanges,
    getAllResources,
    getAllCanvasReferences,
    getAllSelectors,
    (
      itemIds,
      allAnnotations,
      allCanvases,
      allRanges,
      allResources,
      allCanvasReferences,
      allSelectors
    ) => {
      const map = {
        annotation: allAnnotations,
        canvas: allCanvases,
        range: allRanges,
        resource: allResources,
        canvasReference: allCanvasReferences,
        selector: allSelectors,
      };
      return itemIds.map(({ schema, id }) => map[schema][id]);
    }
  );

  const getRangeIds = createSelector(getItemIds, rangeIds =>
    rangeIds
      .filter(({ schema }) => schema === 'range')
      .map(singleRange => singleRange.id)
  );
  const getRanges = createSelector(getRangeIds, getAllRanges, mapAllById);

  const getAnnotationIds = createSelector(selector, structural.getAnnotations);
  const getAnnotations = createSelector(
    getAnnotationIds,
    getAllAnnotationPages,
    mapAllById
  );

  return {
    // Technical.
    getId,
    getType,
    getBehavior,
    getViewingDirection,

    // Descriptive.
    getLabel,
    getMetadata,
    getSummary,
    getThumbnailId,
    getThumbnail,
    getPosterCanvasId,
    getPosterCanvas,
    getRequiredStatement,
    getRights,
    getNavDate,

    // Linking
    getSeeAlsoIds,
    getSeeAlso,
    getServiceIds,
    getService,
    getLogoIds,
    getLogo,
    getHomepageId,
    getHomepage,
    getRenderingIds,
    getRendering,
    getPartOfId,
    getPartOf,
    getStartId,
    getStart,
    getSupplementaryId,
    getSupplementary,

    // Structural.
    getItemIds,
    getItems,
    getRangeIds,
    getRanges,
    getAnnotationIds,
    getAnnotations,
  };
});

export const mappings = standardFieldMappingFactory(range);

export default range;
