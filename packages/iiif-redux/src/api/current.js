import { createSelector } from 'reselect';
import {
  getAllCanvases,
  getAllCollections,
  getAllManifests,
  getAllSequences,
} from './all';

const getCurrentManifestId = state => state.routing.currentManifest;
const getCurrentCollectionId = state => state.routing.currentCollection;
const getCurrentSequenceId = state => state.routing.currentSequence;
const getCurrentCanvasId = state => state.routing.currentCanvas;

const getCurrentSequence = createSelector(
  getCurrentSequenceId,
  getAllSequences,
  (sequenceId, sequences) => sequences[sequenceId]
);

const getCurrentCanvas = createSelector(
  getCurrentCanvasId,
  getAllCanvases,
  (currentCanvasId, allCanvases) => allCanvases[currentCanvasId]
);

const getCurrentCollection = createSelector(
  getCurrentCollectionId,
  getAllCollections,
  (id, collections) => collections[id]
);

const getCurrentManifest = createSelector(
  getCurrentManifestId,
  getAllManifests,
  (manifestId, manifests) => manifests[manifestId]
);

export {
  getCurrentCanvasId,
  getCurrentCanvas,
  getCurrentCollectionId,
  getCurrentCollection,
  getCurrentManifestId,
  getCurrentManifest,
  getCurrentSequenceId,
  getCurrentSequence,
};
