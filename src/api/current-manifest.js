import { createSelector } from 'reselect';
import * as technical from './iiif-technical';
import * as descriptive from './iiif-descriptive';
import { getDefaultLanguage } from './config';

const getCurrentManifestId = state => state.routing.currentManifest;
const getAllManifests = state => state.manifests;
const getCurrentManifest = createSelector(
  getCurrentManifestId,
  getAllManifests,
  (manifestId, manifests) => manifests[manifestId]
);

/*
const getAllSequences = state => state.sequences;
const getAllCanvases = state => state.canvases;

const getSequences = createSelector(
  getCurrentManifest,
  getAllSequences,
  (manifest, sequences) =>
    manifest.sequences.map(sequenceId => sequences[sequenceId])
);

const getDefaultSequence = createSelector(
  getSequences,
  sequences => sequences[0]
);
const isPaged = createSelector(getCurrentManifest, manifestApi.isPaged);

const getCanvasesFromDefaultSequence = createSelector(
  getDefaultSequence,
  getAllCanvases,
  (sequence, canvases) => sequence.canvases.map(canvasId => canvases[canvasId])
);
*/

const getViewingDirection = createSelector(
  getCurrentManifest,
  technical.getViewingDirection
);

const getNavDate = createSelector(getCurrentManifest, technical.getNavDate);

const getId = createSelector(getCurrentManifest, technical.getId);

const getType = createSelector(getCurrentManifest, technical.getType);

const getViewingHint = createSelector(getCurrentManifest, manifest => {
  const viewingHint = technical.getViewingHint(manifest);
  switch (viewingHint) {
    case 'individuals':
    case 'paged':
    case 'continuous':
      return viewingHint;
    default:
      // @todo only return if URI
      return null;
  }
});

const getLabel = createSelector(
  getCurrentManifest,
  getDefaultLanguage,
  (manifest, language) => descriptive.getLabel(language)(manifest)
);

const getDescription = createSelector(
  getCurrentManifest,
  getDefaultLanguage,
  (manifest, language) => descriptive.getDescription(language)(manifest)
);

const getMetadata = createSelector(
  getCurrentManifest,
  getDefaultLanguage,
  (manifest, language) => descriptive.getMetadata(language)(manifest)
);

const getAttribution = createSelector(
  getCurrentManifest,
  getDefaultLanguage,
  (manifest, language) => descriptive.getAttribution(language)(manifest)
);

const getLogo = createSelector(getCurrentManifest, descriptive.getLogo);

const getLicense = createSelector(getCurrentManifest, descriptive.getLicense);

const getThumbnail = createSelector(
  getCurrentManifest,
  descriptive.getThumbnail
);

export {
  getCurrentManifestId,
  getAllManifests,
  getCurrentManifest,
  getViewingHint,
  // Tested.
  getViewingDirection,
  getNavDate,
  getId,
  getType,
  getLabel,
  getDescription,
  getMetadata,
  // To be tested.
  getAttribution,
  getLogo,
  getLicense,
  getThumbnail,
};
