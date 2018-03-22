import { normalize, schema } from 'normalizr';
import bridges from './fixtures/bridges';
import { createSelector, createStructuredSelector } from 'reselect';
import {
  getAttribution,
  getLabel,
  getMetadata,
} from './selectors/manifestSelectors';

const image = new schema.Entity('images', {}, { idAttribute: '@id' });
const imageAnnotations = new schema.Entity(
  'imageAnnotations',
  {
    resource: image,
  },
  { idAttribute: '@id' }
);

const canvasEntity = new schema.Entity(
  'canvases',
  {
    thumbnail: image,
    images: [imageAnnotations],
  },
  { idAttribute: '@id' }
);

const sequenceEntity = new schema.Entity(
  'sequences',
  {
    canvases: [canvasEntity],
  },
  { idAttribute: '@id' }
);

const rangeEntity = new schema.Entity(
  'ranges',
  {
    canvases: [canvasEntity],
  },
  { idAttribute: '@id' }
);

const manifestEntity = new schema.Entity(
  'manifests',
  {
    sequences: [sequenceEntity],
    structures: [rangeEntity],
  },
  { idAttribute: '@id' }
);

const getCurrentManifestId = state => {
  return state.currentManifest;
};

const getCurrentManifest = createSelector(
  getCurrentManifestId,
  manifestId => state.manifests[manifestId]
);

const getManifestLabel = createSelector(getCurrentManifest, getLabel);

const getCurrentManifestAttribution = createSelector(
  getCurrentManifest,
  getAttribution
);

const getCurrentMetadata = createSelector(getCurrentManifest, getMetadata);

const getManifestData = createStructuredSelector({
  label: getManifestLabel,
  attribution: getCurrentManifestAttribution,
  metadata: getCurrentMetadata,
});

const stringToLanguageMap = (str, language = '@none') => ({
  [language]: [str],
});

const getManifestDataAsP3 = createSelector(
  getManifestData,
  ({ label, attribution, metadata }) => {
    return {
      label: stringToLanguageMap(label),
      attribution: stringToLanguageMap(attribution),
      metadata: metadata.map(item => ({
        label: stringToLanguageMap(item.label),
        value: stringToLanguageMap(item.value),
      })),
    };
  }
);

const getDefaultSequenceId = createSelector(
  getCurrentManifest,
  manifest => manifest.sequences[0]
);

const getSequences = state => state.sequences;
const getCanvases = state => state.canvases;

const getDefaultSequence = createSelector(
  getDefaultSequenceId,
  getSequences,
  (sequenceId, sequences) => sequences[sequenceId]
);

const getCanvasesFromDefaultSequence = createSelector(
  getDefaultSequence,
  getCanvases,
  (sequence, canvases) => sequence.canvases.map(canvasId => canvases[canvasId])
);

const getThumbnailsFromCanvas = canvas => canvas.thumbnail;

const getCanvasThumbnailsFromDefaultSequence = createSelector(
  getCanvasesFromDefaultSequence,
  canvases => canvases.map(getThumbnailsFromCanvas)
);

const getCanvasIndexById = canvasId =>
  createSelector(getDefaultSequence, sequence => {
    return sequence.canvases.indexOf(canvasId);
  });

const test = createStructuredSelector({
  canvasA: getCanvasIndexById(
    'https://view.nls.uk/iiif/7446/74464117/canvas/14'
  ),
  canvasB: getCanvasIndexById(
    'https://view.nls.uk/iiif/7446/74464117/canvas/13'
  ),
});

const getRanges = state => state.ranges;

const getAllRanges = createSelector(
  getCurrentManifest,
  getRanges,
  (manifest, ranges) => manifest.structures.map(rangeId => ranges[rangeId])
);

const getTopRanges = createSelector(getAllRanges, ranges => {
  const topRange = ranges.find(range => range.viewingHint === 'top', null);
  return topRange || { ranges };
});

function mapId(id, itemSet) {
  return itemSet[id];
}

const getCurrentRangeId = state => state.currentRange;
const getCurrentRange = createSelector(getCurrentRangeId, getRanges, mapId);

const isMultiSequence = createSelector(
  getCurrentManifest,
  manifest => manifest.structures > 1
);

const getViewingHint = createSelector(
  getCurrentManifest,
  manifest => manifest.viewingHint
);

// const getViewingHint = createSelector(
//   getCurrentManifest,
//   manifest => manifest.viewingDirection
// );

const isPagingEnabled = createSelector(
  getViewingHint,
  viewingHint => viewingHint === 'paged'
);

const data = normalize(bridges, manifestEntity);

// console.log(JSON.stringify(data.entities.manifests, null, 2));

const state = {
  currentManifest: data.result,
  currentCanvas: null,
  currentRange: null,
  ...data.entities,
};

// console.log(getTopRanges(state));

// console.log(getManifestData(state));
// console.log(getDefaultSequence(state));
// console.log(getCanvasesFromDefaultSequence(state));
// console.log(getCanvasThumbnailsFromDefaultSequence(state));
// console.log(test(state));

const logJson = logData => console.log(JSON.stringify(logData, null, 2));

logJson(getManifestDataAsP3(state));

// logJson(getCanvasThumbnailsFromDefaultSequence(state));
