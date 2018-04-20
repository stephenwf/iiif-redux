import { getCurrentCanvas } from './current';
import canvas from './canvas';

const {
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
} = canvas(getCurrentCanvas);

export {
  getCurrentCanvas,
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
