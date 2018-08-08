import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';
import mapById from '../../utility/mapById';
import * as technical from './iiif/technical';
import * as descriptive from './iiif/descriptive';
import * as linking from './iiif/linking';
import * as structural from './iiif/structural';
import {
  getAllAnnotationPages,
  getAllCanvases,
  getAllCanvasReferences,
  getAllContentResources,
  getAllExternalResources,
  getAllRanges,
  getAllResources,
  getAllServices,
} from '../all';
import mapByIdOrId from '../../utility/mapByIdOrId';
import mapAllResources from '../../utility/mapAllResources';
import mapAllById from '../../utility/mapAllById';

const annotation = memoize(selector => {
  /**
   * Technical properties
   *
   * - getId
   * - getType
   * - getBehavior
   * - getTimeMode
   */
  const getId = createSelector(selector, technical.getId);

  const getType = createSelector(selector, technical.getType);

  const getBehavior = createSelector(selector, technical.getBehavior);

  const getTimeMode = createSelector(selector, technical.getTimeMode);

  /**
   * Descriptive Properties
   *
   * - getLabel
   * - getMetadata
   * - getSummary
   * - getThumbnail
   * - getRequiredStatement
   * - getRights
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

  const getRequiredStatement = createSelector(
    selector,
    descriptive.getRequiredStatement
  );

  const getRights = createSelector(selector, descriptive.getRights);

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

  return {
    getId,
    getType,
    getTimeMode,
    getBehavior,
    getLabel,
    getMetadata,
    getSummary,
    getThumbnailId,
    getThumbnail,
    getRequiredStatement,
    getRights,
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
  };
});

export default annotation;
