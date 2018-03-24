import * as manifestApi from './manifest';
import { createSelector } from 'reselect';

const getCurrentManifestId = state => state.currentManifest;
const getAllManifests = state => state.manifests;
const getAllSequences = state => state.sequences;
const getAllCanvases = state => state.canvases;

const getCurrentManifest = createSelector(
  getCurrentManifestId,
  getAllManifests,
  (manifestId, manifests) => manifests[manifestId]
);

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

const getViewingHint = createSelector(
  getCurrentManifest,
  manifestApi.getViewingHint
);

const isPaged = createSelector(getCurrentManifest, manifestApi.isPaged);

const getCanvasesFromDefaultSequence = createSelector(
  getDefaultSequence,
  getAllCanvases,
  (sequence, canvases) => sequence.canvases.map(canvasId => canvases[canvasId])
);

export {
  getCurrentManifestId,
  getAllManifests,
  getCurrentManifest,
  getDefaultSequence,
  getAllCanvases,
  getAllSequences,
  getSequences,
  getViewingHint,
  isPaged,
  getCanvasesFromDefaultSequence,
};
