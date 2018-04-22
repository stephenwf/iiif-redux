import { getCurrentManifest } from './current';
import manifest from './manifest';

const {
  // Technical
  getId,
  getType,
  getViewingHint,
  getViewingDirection,
  getNavDate,
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
  getSequenceIds,
  getSequences,
  getRangeIds,
  getRanges,
  getStructureIds,
  getStructures,
  getOtherContentIds,
  getOtherContent,
} = manifest(getCurrentManifest);

export {
  getCurrentManifest,
  // Technical
  getId,
  getType,
  getViewingHint,
  getViewingDirection,
  getNavDate,
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
  getSequenceIds,
  getSequences,
  getRangeIds,
  getRanges,
  getStructureIds,
  getStructures,
  getOtherContentIds,
  getOtherContent,
};
