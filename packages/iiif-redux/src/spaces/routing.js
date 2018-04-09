/**
 * Routing
 *
 * The basic actions of routing are:
 * - Select
 * - Next
 * - Previous
 * - Deselect
 *
 * This file defines all of the constants and actions for
 * triggering and setting the state for routing.
 *
 * Each individual resource should add support for next / previous
 * to their redux sagas, this may also be context specific, so is out
 * of the scope of this. They should end up dispatching a select when
 * next or previous is triggered.
 */
import { createAction, handleActions } from 'redux-actions';
import update from 'immutability-helper';

// Collections
const ROUTING_SELECT_COLLECTION = 'ROUTING_SELECT_COLLECTION';
const ROUTING_NEXT_COLLECTION = 'ROUTING_NEXT_COLLECTION';
const ROUTING_PREVIOUS_COLLECTION = 'ROUTING_PREVIOUS_COLLECTION';
const ROUTING_DESELECT_COLLECTION = 'ROUTING_DESELECT_COLLECTION';

// Manifests
const ROUTING_SELECT_MANIFEST = 'ROUTING_SELECT_MANIFEST';
const ROUTING_NEXT_MANIFEST = 'ROUTING_NEXT_MANIFEST';
const ROUTING_PREVIOUS_MANIFEST = 'ROUTING_PREVIOUS_MANIFEST';
const ROUTING_DESELECT_MANIFEST = 'ROUTING_DESELECT_MANIFEST';

// Sequence
const ROUTING_SELECT_SEQUENCE = 'ROUTING_SELECT_SEQUENCE';
const ROUTING_NEXT_SEQUENCE = 'ROUTING_NEXT_SEQUENCE';
const ROUTING_PREVIOUS_SEQUENCE = 'ROUTING_PREVIOUS_SEQUENCE';
const ROUTING_DESELECT_SEQUENCE = 'ROUTING_DESELECT_SEQUENCE';

// Canvas
const ROUTING_SELECT_CANVAS = 'ROUTING_SELECT_CANVAS';
const ROUTING_NEXT_CANVAS = 'ROUTING_NEXT_CANVAS';
const ROUTING_PREVIOUS_CANVAS = 'ROUTING_PREVIOUS_CANVAS';
const ROUTING_DESELECT_CANVAS = 'ROUTING_DESELECT_CANVAS';

// Annotation list
const ROUTING_SELECT_ANNOTATION_LIST = 'ROUTING_SELECT_ANNOTATION_LIST';
const ROUTING_NEXT_ANNOTATION_LIST = 'ROUTING_NEXT_ANNOTATION_LIST';
const ROUTING_PREVIOUS_ANNOTATION_LIST = 'ROUTING_PREVIOUS_ANNOTATION_LIST';
const ROUTING_DESELECT_ANNOTATION_LIST = 'ROUTING_DESELECT_ANNOTATION_LIST';

// Annotation
const ROUTING_SELECT_ANNOTATION = 'ROUTING_SELECT_ANNOTATION';
const ROUTING_NEXT_ANNOTATION = 'ROUTING_NEXT_ANNOTATION';
const ROUTING_PREVIOUS_ANNOTATION = 'ROUTING_PREVIOUS_ANNOTATION';
const ROUTING_DESELECT_ANNOTATION = 'ROUTING_DESELECT_ANNOTATION';

// Range
const ROUTING_SELECT_RANGE = 'ROUTING_SELECT_RANGE';
const ROUTING_NEXT_RANGE = 'ROUTING_NEXT_RANGE';
const ROUTING_PREVIOUS_RANGE = 'ROUTING_PREVIOUS_RANGE';
const ROUTING_DESELECT_RANGE = 'ROUTING_DESELECT_RANGE';

// Layer
const ROUTING_SELECT_LAYER = 'ROUTING_SELECT_LAYER';
const ROUTING_NEXT_LAYER = 'ROUTING_NEXT_LAYER';
const ROUTING_PREVIOUS_LAYER = 'ROUTING_PREVIOUS_LAYER';
const ROUTING_DESELECT_LAYER = 'ROUTING_DESELECT_LAYER';

// Image resource
const ROUTING_SELECT_IMAGE_RESOURCE = 'ROUTING_SELECT_IMAGE_RESOURCE';
const ROUTING_NEXT_IMAGE_RESOURCE = 'ROUTING_NEXT_IMAGE_RESOURCE';
const ROUTING_PREVIOUS_IMAGE_RESOURCE = 'ROUTING_PREVIOUS_IMAGE_RESOURCE';
const ROUTING_DESELECT_IMAGE_RESOURCE = 'ROUTING_DESELECT_IMAGE_RESOURCE';

const DEFAULT_STATE = {
  currentSequence: null,
  currentManifest: null,
  currentCanvas: null,
  currentAnnotationList: null,
  currentAnnotation: null,
  currentRange: null,
  currentLayer: null,
  currentImageResource: null,
  currentCollection: null,
};

const selectCollection = createAction(ROUTING_SELECT_COLLECTION);
const nextCollection = createAction(ROUTING_NEXT_COLLECTION);
const previousCollection = createAction(ROUTING_PREVIOUS_COLLECTION);
const deselectCollection = createAction(ROUTING_DESELECT_COLLECTION);
const selectManifest = createAction(ROUTING_SELECT_MANIFEST);
const nextManifest = createAction(ROUTING_NEXT_MANIFEST);
const previousManifest = createAction(ROUTING_PREVIOUS_MANIFEST);
const deselectManifest = createAction(ROUTING_DESELECT_MANIFEST);
const selectSequence = createAction(ROUTING_SELECT_SEQUENCE);
const nextSequence = createAction(ROUTING_NEXT_SEQUENCE);
const previousSequence = createAction(ROUTING_PREVIOUS_SEQUENCE);
const deselectSequence = createAction(ROUTING_DESELECT_SEQUENCE);
const selectCanvas = createAction(ROUTING_SELECT_CANVAS);
const nextCanvas = createAction(ROUTING_NEXT_CANVAS);
const previousCanvas = createAction(ROUTING_PREVIOUS_CANVAS);
const deselectCanvas = createAction(ROUTING_DESELECT_CANVAS);
const selectAnnotationList = createAction(ROUTING_SELECT_ANNOTATION_LIST);
const nextAnnotationList = createAction(ROUTING_NEXT_ANNOTATION_LIST);
const previousAnnotationList = createAction(ROUTING_PREVIOUS_ANNOTATION_LIST);
const deselectAnnotationList = createAction(ROUTING_DESELECT_ANNOTATION_LIST);
const selectAnnotation = createAction(ROUTING_SELECT_ANNOTATION);
const nextAnnotation = createAction(ROUTING_NEXT_ANNOTATION);
const previousAnnotation = createAction(ROUTING_PREVIOUS_ANNOTATION);
const deselectAnnotation = createAction(ROUTING_DESELECT_ANNOTATION);
const selectRange = createAction(ROUTING_SELECT_RANGE);
const nextRange = createAction(ROUTING_NEXT_RANGE);
const previousRange = createAction(ROUTING_PREVIOUS_RANGE);
const deselectRange = createAction(ROUTING_DESELECT_RANGE);
const selectLayer = createAction(ROUTING_SELECT_LAYER);
const nextLayer = createAction(ROUTING_NEXT_LAYER);
const previousLayer = createAction(ROUTING_PREVIOUS_LAYER);
const deselectLayer = createAction(ROUTING_DESELECT_LAYER);
const selectImageResource = createAction(ROUTING_SELECT_IMAGE_RESOURCE);
const nextImageResource = createAction(ROUTING_NEXT_IMAGE_RESOURCE);
const previousImageResource = createAction(ROUTING_PREVIOUS_IMAGE_RESOURCE);
const deselectImageResource = createAction(ROUTING_DESELECT_IMAGE_RESOURCE);

const selectUpdater = resource => (state, { payload }) =>
  update(state, { [`current${resource}`]: { $set: payload.id } });

const deselectUpdater = resource => state =>
  update(state, { [`current${resource}`]: { $set: null } });

const reducer = handleActions(
  {
    // Collection
    [selectCollection]: selectUpdater('Collection'),
    [deselectCollection]: deselectUpdater('Collection'),

    // Manifest
    [selectManifest]: selectUpdater('Manifest'),
    [deselectManifest]: deselectUpdater('Manifest'),

    // Sequence
    [selectSequence]: selectUpdater('Sequence'),
    [deselectSequence]: deselectUpdater('Sequence'),

    // Canvas
    [selectCanvas]: selectUpdater('Canvas'),
    [deselectCanvas]: deselectUpdater('Canvas'),

    // Annotation list
    [selectAnnotationList]: selectUpdater('AnnotationList'),
    [deselectAnnotationList]: deselectUpdater('AnnotationList'),

    // Annotation
    [selectAnnotation]: selectUpdater('Annotation'),
    [deselectAnnotation]: deselectUpdater('Annotation'),

    // Range
    [selectRange]: selectUpdater('Range'),
    [deselectRange]: deselectUpdater('Range'),

    // Layer
    [selectLayer]: selectUpdater('Layer'),
    [deselectLayer]: deselectUpdater('Layer'),

    // Image resource
    [selectImageResource]: selectUpdater('ImageResource'),
    [deselectImageResource]: deselectUpdater('ImageResource'),
  },
  DEFAULT_STATE
);

export {
  reducer,
  DEFAULT_STATE,
  // Actions.
  selectCollection,
  nextCollection,
  previousCollection,
  deselectCollection,
  selectManifest,
  nextManifest,
  previousManifest,
  deselectManifest,
  selectSequence,
  nextSequence,
  previousSequence,
  deselectSequence,
  selectCanvas,
  nextCanvas,
  previousCanvas,
  deselectCanvas,
  selectAnnotationList,
  nextAnnotationList,
  previousAnnotationList,
  deselectAnnotationList,
  selectAnnotation,
  nextAnnotation,
  previousAnnotation,
  deselectAnnotation,
  selectRange,
  nextRange,
  previousRange,
  deselectRange,
  selectLayer,
  nextLayer,
  previousLayer,
  deselectLayer,
  selectImageResource,
  nextImageResource,
  previousImageResource,
  deselectImageResource,
  ROUTING_SELECT_COLLECTION,
  ROUTING_NEXT_COLLECTION,
  ROUTING_PREVIOUS_COLLECTION,
  ROUTING_DESELECT_COLLECTION,
  ROUTING_SELECT_MANIFEST,
  ROUTING_NEXT_MANIFEST,
  ROUTING_PREVIOUS_MANIFEST,
  ROUTING_DESELECT_MANIFEST,
  ROUTING_SELECT_SEQUENCE,
  ROUTING_NEXT_SEQUENCE,
  ROUTING_PREVIOUS_SEQUENCE,
  ROUTING_DESELECT_SEQUENCE,
  ROUTING_SELECT_CANVAS,
  ROUTING_NEXT_CANVAS,
  ROUTING_PREVIOUS_CANVAS,
  ROUTING_DESELECT_CANVAS,
  ROUTING_SELECT_ANNOTATION_LIST,
  ROUTING_NEXT_ANNOTATION_LIST,
  ROUTING_PREVIOUS_ANNOTATION_LIST,
  ROUTING_DESELECT_ANNOTATION_LIST,
  ROUTING_SELECT_ANNOTATION,
  ROUTING_NEXT_ANNOTATION,
  ROUTING_PREVIOUS_ANNOTATION,
  ROUTING_DESELECT_ANNOTATION,
  ROUTING_SELECT_RANGE,
  ROUTING_NEXT_RANGE,
  ROUTING_PREVIOUS_RANGE,
  ROUTING_DESELECT_RANGE,
  ROUTING_SELECT_LAYER,
  ROUTING_NEXT_LAYER,
  ROUTING_PREVIOUS_LAYER,
  ROUTING_DESELECT_LAYER,
  ROUTING_SELECT_IMAGE_RESOURCE,
  ROUTING_NEXT_IMAGE_RESOURCE,
  ROUTING_PREVIOUS_IMAGE_RESOURCE,
  ROUTING_DESELECT_IMAGE_RESOURCE,
  // Misc
  selectUpdater,
  deselectUpdater,
};
