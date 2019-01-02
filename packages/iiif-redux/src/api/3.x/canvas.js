import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';
import mapById from '../../utility/mapById';
import * as technical from './iiif/technical';
import * as descriptive from './iiif/descriptive';
import * as linking from './iiif/linking';
import * as structural from './iiif/structural';
import {
  getAllAnnotationPages,
  getAllAnnotations,
  getAllCanvases,
  getAllContentResources,
  getAllResources,
  getAllServices,
} from '../all';
import mapByIdOrId from '../../utility/mapByIdOrId';
import mapAllResources from '../../utility/mapAllResources';
import mapAllById from '../../utility/mapAllById';
import { isImageService } from '../../constants/services';

const canvas = memoize(selector => {
  /**
   * Technical properties
   *
   * - getId
   * - getType
   * - getHeight
   * - getWidth
   * - getDuration
   * - getBehavior
   */
  const getId = createSelector(selector, technical.getId);

  const getType = createSelector(selector, technical.getType);

  const getHeight = createSelector(selector, technical.getHeight);

  const getWidth = createSelector(selector, technical.getWidth);

  const getDuration = createSelector(selector, technical.getDuration);

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

  /**
   * Structural Properties
   *
   * - getItems
   * - getStructures
   * - getAnnotations
   */
  const getItemIds = createSelector(selector, structural.getItems);
  const getItems = createSelector(
    getItemIds,
    getAllAnnotationPages,
    mapAllById
  );

  const getPaintingAnnotationIds = getItemIds;
  const getPaintingAnnotations = getItems;

  const getAnnotationIds = createSelector(selector, structural.getAnnotations);
  const getAnnotations = createSelector(
    getAnnotationIds,
    getAllAnnotationPages,
    mapAllById
  );

  /**************************************************
   * Algorithms
   *
   * - getImageService
   **************************************************/
  const getImageService = createSelector(
    getItems,
    getAllAnnotations,
    getAllServices,
    getAllContentResources,
    (images, allAnnotations, allServices, allImages) =>
      // The basic path is canvas.annotationPage[x].annotation[x].body[x].service
      images
        .reduce((annotationList, next) => {
          (next.items || []).forEach(annotationId => {
            allAnnotations[annotationId].body.forEach(body => {
              annotationList.push(body);
            });
          });
          return annotationList;
        }, [])
        .reduce((result, image) => {
          if (result) return result;
          const resource =
            image.schema === 'contentResource'
              ? allImages[image.id]
              : { service: [] };

          return (resource.service || []).reduce((innerResult, serviceId) => {
            if (innerResult) return innerResult;
            const service = allServices[serviceId];
            if (isImageService(service.profile)) {
              return service;
            }
          }, null);
        }, null)
  );

  return {
    // Technical
    getId,
    getType,
    getHeight,
    getWidth,
    getDuration,
    getBehavior,
    // Descriptive
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
    // Structural
    getItemIds,
    getItems,
    getPaintingAnnotationIds,
    getPaintingAnnotations,
    getAnnotationIds,
    getAnnotations,
    // Algorithms
    getImageService,
  };
});

export default canvas;
