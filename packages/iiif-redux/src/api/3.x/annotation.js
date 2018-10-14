import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';
import mapById from '../../utility/mapById';
import * as technical from './iiif/technical';
import * as descriptive from './iiif/descriptive';
import * as linking from './iiif/linking';
import {
  getAllCanvases,
  getAllContentResources,
  getAllResources,
  getAllServices,
  getAllChoices,
} from '../all';
import mapByIdOrId from '../../utility/mapByIdOrId';
import mapAllResources from '../../utility/mapAllResources';
import mapAllById from '../../utility/mapAllById';
import mapAllByIdOrId from '../../utility/mapAllByIdOrId';

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

  const getBodyIds = createSelector(selector, linking.getBody);
  const getBody = createSelector(
    getBodyIds,
    getAllContentResources,
    getAllChoices,
    (ids, allContentResources, allChoices) =>
      ids.map(
        resource =>
          resource.schema === 'contentResource'
            ? allContentResources[resource.id]
            : allChoices[resource.id]
      )
  );

  const getTargetIds = createSelector(selector, linking.getTarget);
  const getTarget = createSelector(
    getTargetIds,
    getAllCanvases,
    mapAllByIdOrId
  );

  return {
    // Technical
    getId,
    getType,
    getTimeMode,
    getBehavior,
    // Descriptive.
    getLabel,
    getMetadata,
    getSummary,
    getThumbnailId,
    getThumbnail,
    getRequiredStatement,
    getRights,
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
    getBodyIds,
    getBody,
    getTargetIds,
    getTarget,
  };
});

export default annotation;
