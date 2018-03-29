const getCurrentManifestId = state => state.routing.currentManifest;
const getCurrentCollectionId = state => state.routing.currentCollection;
const getCurrentSequenceId = state => state.routing.currentSequence;
const getCurrentCanvasId = state => state.routing.currentCanvas;

export {
  getCurrentCanvasId,
  getCurrentCollectionId,
  getCurrentManifestId,
  getCurrentSequenceId,
};
