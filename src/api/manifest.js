import { createSelector } from 'reselect';

const getSequences = manifest => manifest.sequences || [];

const getCanvases = manifest => manifest.canvases || [];

const getDefaultSequence = manifest => manifest.sequences[0] || null;

const getViewingHint = manifest => manifest.viewingHint;

const isPaged = manifest => manifest.vewingHint === 'top';

export {
  getDefaultSequence,
  getCanvases,
  getSequences,
  getViewingHint,
  isPaged,
};
