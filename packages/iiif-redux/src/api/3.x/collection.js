import memoize from 'lodash.memoize';
import * as technical from '../3.x/iiif/technical';
import * as descriptive from '../3.x/iiif/descriptive';
import * as linking from '../3.x/iiif/linking';
import * as structural from '../3.x/iiif/structural';
import { createSelector } from 'reselect';
import {
  getAllCanvases,
  getAllImages,
  getAllResources,
  getAllServices,
  getAllContentResources,
  getAllExternalResources,
  getAllManifests,
  getAllCollections,
  getAllAnnotations,
} from '../all';
import mapById from '../../utility/mapById';
import mapAllById from '../../utility/mapAllById';

const collection = memoize(selector => {
  /**
   * Technical properties
   *
   * - getId
   * - getType
   * - getViewingDirection
   * - getBehaviour
   */
  const getId = createSelector(selector, technical.getId);

  const getType = createSelector(selector, technical.getType);

  const getViewingDirection = createSelector(
    selector,
    technical.getViewingDirection
  );

  const getBehaviour = createSelector(selector, technical.getBehaviour);

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
   * - getLanguage
   */
  const getLabel = createSelector(selector, descriptive.getLabel);

  const getMetadata = createSelector(selector, descriptive.getMetadata);

  const getSummary = createSelector(selector, descriptive.getSummary);

  const getThumbnailId = createSelector(selector, descriptive.getThumbnailId);

  const getThumbnail = createSelector(
    getThumbnailId,
    getAllImages,
    (thumbnailId, allImages) => allImages[thumbnailId] || thumbnailId
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
  // @todo Clarify with specification, since this can technically be anything in this model.
  const getSeeAlsoIds = createSelector(selector, linking.getSeeAlso);
  const getSeeAlso = createSelector(getSeeAlsoIds, getAllResources, mapAllById);

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
    getAllExternalResources,
    mapById
  );

  const getRenderingIds = createSelector(selector, linking.getRendering);
  const getRendering = createSelector(
    getRenderingIds,
    getAllExternalResources,
    mapAllById
  );

  const getPartOfId = createSelector(selector, linking.getPartOf);
  const getPartOf = createSelector(
    getPartOfId,
    getAllResources,
    (partOfId, resources) => resources[partOfId.schema][partOfId.id]
  );

  /**
   * Structural Properties
   * - getItems
   * - getManifests (non-standard)
   * - getCollections (non-standard)
   * - getAnnotations
   */
  const getItemIds = createSelector(selector, structural.getItems);
  const getItems = createSelector(
    getItemIds,
    getAllManifests,
    getAllCollections,
    (items, allManifests, allCollections) =>
      items.map(
        item =>
          item.schema === 'manifest'
            ? allManifests[item.id]
            : allCollections[item.id]
      )
  );

  const getManifests = createSelector(
    getItemIds,
    getAllManifests,
    (items, allManifests) =>
      items
        .map(
          item => (item.schema === 'manifest' ? allManifests[item.id] : null)
        )
        .filter(Boolean)
  );

  const getCollections = createSelector(
    getItemIds,
    getAllCollections,
    (items, allCollections) =>
      items
        .map(
          item =>
            item.schema === 'collection' ? allCollections[item.id] : null
        )
        .filter(Boolean)
  );

  // @todo kinda misleading, as these are annotation pages.
  const getAnnotationIds = createSelector(selector, structural.getAnnotations);
  const getAnnotations = createSelector(
    getAnnotationIds,
    getAllAnnotations,
    mapAllById
  );

  return {
    collection,
    getId,
    getType,
    getViewingDirection,
    getBehaviour,
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
    getItemIds,
    getItems,
    getManifests,
    getCollections,
    getAnnotationIds,
    getAnnotations,
  };
});

export default collection;
