import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';
import validUrl from 'valid-url';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';
import * as linking from './iiif-linking';
import * as structural from './iiif-structural';
import {
  getAllAnnotationLists,
  getAllAnnotations,
  getAllExternalResources,
  getAllImages,
  getAllLayers,
  getAllServices,
} from './all';
import { isImageService } from '../constants/services';

const createCanvasSelectors = memoize(selector => {
  /**************************************************
   * Technical properties
   *
   * - getId
   * - getType
   * - getViewingHint
   * - getHeight
   * - getWidth
   **************************************************/
  const getId = createSelector(selector, technical.getId);

  const getType = createSelector(selector, technical.getType);

  const getViewingHint = createSelector(selector, canvas => {
    const viewingHint = technical.getViewingHint(canvas);
    switch (viewingHint) {
      case 'non-paged':
      case 'facing-pages':
        return viewingHint;
      default:
        return validUrl.isWebUri(viewingHint) ? viewingHint : null;
    }
  });

  const getHeight = createSelector(selector, technical.getHeight);

  const getWidth = createSelector(selector, technical.getWidth);

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
            label: 'unknown',
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
      withinIds.map(
        withinId => allLayers[withinId] || allExternalResources[withinId]
      )
  );

  /**************************************************
   * Structural properties
   *
   * - getOtherContent
   * - getImages
   **************************************************/
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
            label: 'unknown',
          }
      )
  );

  const getImageIds = createSelector(selector, structural.getImages);
  const getImages = createSelector(
    getImageIds,
    getAllAnnotations,
    (imageIds, allImages) => imageIds.map(imageId => allImages[imageId])
  );

  /**************************************************
   * Algorithms
   *
   * - getImageService
   **************************************************/
  const getImageService = createSelector(
    getImages,
    getAllServices,
    getAllImages,
    (images, allServices, allImages) =>
      // The basic path is images[x].resource.service
      images.reduce((result, image) => {
        if (result) return result;
        const resource =
          image.resource.schema === 'imageResource'
            ? allImages[image.resource.id]
            : { service: [] };

        return resource.service.reduce((innerResult, serviceId) => {
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
    getViewingHint,
    getHeight,
    getWidth,
    // Descriptive
    getLabel,
    getMetadata,
    getDescription,
    getThumbnailId,
    getThumbnail,
    getAttribution,
    getLicense,
    getLogo,
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
    getOtherContentIds,
    getOtherContent,
    getImageIds,
    getImages,
    // Algorithms.
    getImageService,
  };
});

export default createCanvasSelectors;
