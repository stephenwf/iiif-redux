import memoize from 'lodash.memoize';
import * as technical from '../3.x/iiif/technical';
import * as descriptive from '../3.x/iiif/descriptive';
import * as linking from '../3.x/iiif/linking';
import * as structural from '../3.x/iiif/structural';
import { createSelector } from 'reselect';
import {
  getAllCanvases,
  getAllResources,
  getAllServices,
  getAllContentResources,
  getAllExternalResources,
  getAllManifests,
  getAllCollections,
  getAllAnnotationPages,
} from '../all';
import mapById from '../../utility/mapById';
import mapAllById from '../../utility/mapAllById';
import mapAllResources from '../../utility/mapAllResources';
import mapByIdOrId from '../../utility/mapByIdOrId';

const collection = memoize(selector => {
  /**
   * Technical properties
   *
   * - getId
   * - getType
   * - getViewingDirection
   * - getBehavior
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
  // @todo Clarify with specification, since this can technically be anything in this model.
  const getSeeAlsoIds = createSelector(selector, linking.getSeeAlso);
  const getSeeAlso = createSelector(
    getSeeAlsoIds,
    getAllExternalResources,
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
    mapAllResources
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

  const getManifestIds = createSelector(getItemIds, items =>
    items
      .map(item => (item.schema === 'manifest' ? item.id : null))
      .filter(Boolean)
  );
  const getManifests = createSelector(getManifestIds, getAllManifests, mapById);

  const getCollectionIds = createSelector(getItemIds, items =>
    items
      .map(item => (item.schema === 'collection' ? item.id : null))
      .filter(Boolean)
  );
  const getCollections = createSelector(
    getCollectionIds,
    getAllCollections,
    mapById
  );

  // @todo kinda misleading, as these are annotation pages.
  const getAnnotationIds = createSelector(selector, structural.getAnnotations);
  const getAnnotations = createSelector(
    getAnnotationIds,
    getAllAnnotationPages,
    mapAllById
  );

  return {
    collection,
    getId,
    getType,
    getViewingDirection,
    getBehavior,
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
    getManifestIds,
    getManifests,
    getCollectionIds,
    getCollections,
    getAnnotationIds,
    getAnnotations,
  };
});

export default collection;
