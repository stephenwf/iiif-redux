import { getCurrentSequence } from './current';
import sequence from './sequence';

const {
  // Technical
  getId,
  getType,
  getViewingHint,
  getViewingDirection,
  // Descriptive
  getLabel,
  getDescription,
  getMetadata,
  getAttribution,
  getLogo,
  getLicense,
  getThumbnailId,
  getThumbnail,
  // Linking
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
  getStartCanvasId,
  getStartCanvas,
  // Structural
  getCanvasIds,
  getCanvases,
} = sequence(getCurrentSequence);

export {
  getCurrentSequence,
  // Technical
  getId,
  getType,
  getViewingHint,
  getViewingDirection,
  // Descriptive
  getLabel,
  getDescription,
  getMetadata,
  getAttribution,
  getLogo,
  getLicense,
  getThumbnailId,
  getThumbnail,
  // Linking
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
  getStartCanvasId,
  getStartCanvas,
  // Structural
  getCanvasIds,
  getCanvases,
};
