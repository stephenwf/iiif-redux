import cachedFetch from 'fetch-unless-cached';
import { createActions, handleActions } from 'redux-actions';
import validUrl from 'valid-url';
import { call, put, select, takeEvery, all } from 'redux-saga/effects';
import deepmerge from 'deepmerge';
import update from 'immutability-helper';
import * as presentation2 from '../schema/presentation2';
import * as presentation3 from '../schema/presentation3';
import trackPresentationVersion from '../utility/trackPresentationVersion';
import {
  COLLECTION_ERROR,
  COLLECTION_REQUEST,
  COLLECTION_SUCCESS,
} from './collections';
import {
  MANIFEST_ERROR,
  MANIFEST_REQUEST,
  MANIFEST_SUCCESS,
} from './manifests';
import getPresentationVersionFromResource from '../utility/getPresentationVersionFromResource';
const debug = require('debug')('iiif-redux');

const IIIF_RESOURCE_REQUEST = 'IIIF_RESOURCE_REQUEST';
const IIIF_RESOURCE_SUCCESS = 'IIIF_RESOURCE_SUCCESS';
const IIIF_RESOURCE_ERROR = 'IIIF_RESOURCE_ERROR';
const IIIF_RESOURCE_REQUEST_UNKNOWN = 'IIIF_RESOURCE_REQUEST_UNKNOWN';
const IIIF_RESOURCE_IDENTIFY = 'IIIF_RESOURCE_IDENTIFY';

const DEFAULT_MAPPINGS = {
  collection: [COLLECTION_REQUEST, COLLECTION_SUCCESS, COLLECTION_ERROR],
  manifest: [MANIFEST_REQUEST, MANIFEST_SUCCESS, MANIFEST_ERROR],
};

const {
  iiifResourceRequestUnknown,
  iiifResourceRequest,
  iiifResourceSuccess,
  iiifResourceError,
} = createActions({
  [IIIF_RESOURCE_REQUEST_UNKNOWN]: (
    resourceId,
    options = {},
    mappings = DEFAULT_MAPPINGS
  ) => ({
    resourceId,
    dereferenceIfMissing: options.dereferenceIfMissing || false,
    ttl: options.ttl || 600,
    forceFresh: options.forceFresh,
    mappings,
  }),
  [IIIF_RESOURCE_REQUEST]: (resourceId, types, schema, options = {}) => ({
    resourceId,
    types,
    schema,
    dereferenceIfMissing: options.dereferenceIfMissing || false,
    ttl: options.ttl || 600,
    forceFresh: options.forceFresh,
  }),
  [IIIF_RESOURCE_SUCCESS]: (resourceId, normalizedResponse) => ({
    resourceId,
    normalizedResponse,
  }),
  [IIIF_RESOURCE_ERROR]: (resourceId, error) => ({
    resourceId,
    error,
  }),
});

const DEFAULT_STATE = {
  dereferenced: {},
  resources: {
    collections: {},
    sequences: {},
    manifests: {},
    canvases: {},
    canvasReferences: {},
    annotations: {},
    annotationLists: {},
    annotationPages: {},
    annotationCollections: {},
    ranges: {},
    layers: {},
    imageResources: {},
    externalResources: {},
    contentResources: {},
    choices: {},
  },
};

const resourceReducer = handleActions(
  {
    [iiifResourceSuccess]: (state, { payload: { normalizedResponse } }) =>
      deepmerge(state, normalizedResponse),
  },
  DEFAULT_STATE.resources
);

const dereferencedReducer = handleActions(
  {
    [iiifResourceRequest]: (state, { payload: { resourceId, ttl } }) =>
      update(state, {
        [resourceId]: {
          $set: {
            resourceId,
            ttl,
            requested: state[resourceId]
              ? state[resourceId].requested
              : new Date(),
            loading: state[resourceId] ? state[resourceId].loading : true,
          },
        },
      }),
    [iiifResourceRequestUnknown]: (state, { payload: { resourceId, ttl } }) =>
      update(state, {
        [resourceId]: {
          $set: {
            resourceId,
            ttl,
            loading: state[resourceId] ? state[resourceId].loading : true,
          },
        },
      }),

    [iiifResourceError]: (state, { payload: { resourceId, error } }) =>
      update(state, {
        [resourceId]: {
          loading: { $set: false },
          error: { $set: error },
        },
      }),

    [iiifResourceSuccess]: (state, { payload: { resourceId } }) =>
      update(state, {
        [resourceId]: {
          loading: { $set: false },
        },
      }),
  },
  DEFAULT_STATE.dereferenced
);

async function requestResource(resourceId, options) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    return cachedFetch(resourceId);
  }

  return fetch(resourceId).then(resp => resp.json());
}

function* errorAction(type, resourceId, error) {
  yield put(iiifResourceError(resourceId, error));
  if (type) {
    yield put({ type, payload: { resourceId, error } });
  }
}

function* successAction(type, resourceId, normalizedResponse) {
  yield put(iiifResourceSuccess(resourceId, normalizedResponse));
  yield put({ type, payload: { resourceId, normalizedResponse } });
}

function* requestIiifResource({ payload }) {
  const { resourceId, types, ...options } = payload;
  if (types.length !== 3 && process.env.NODE_ENV !== 'production') {
    yield call(
      errorAction,
      null,
      resourceId,
      'DEV ERROR: You must pass in exactly 3 action types'
    );
  }

  const [REQUEST, SUCCESS, ERROR] = types;

  if (!validUrl.isWebUri(resourceId)) {
    yield call(
      errorAction,
      ERROR,
      resourceId,
      'Resource is not a valid Web URI.'
    );
    return;
  }

  const state = yield select();

  // @todo logic for cache.
  if (
    state.dereferenced[resourceId] &&
    state.dereferenced[resourceId].loading ===
      false /*&& options.forceFresh === false*/
  ) {
    debug('Skipping fetch for resource %s using cache.', resourceId);

    return;
  }

  yield put({ type: REQUEST, payload });

  try {
    debug('Fetching resource %s', resourceId);
    const response = yield call(requestResource, resourceId, options);

    const { result, entities } = yield call(
      importResource,
      response,
      resourceId
    );
    debug('Finished normalize resource %s', result.id);

    yield call(successAction, SUCCESS, result.id, entities);
  } catch (err) {
    debug('Error: %O', err);
    yield call(errorAction, ERROR, resourceId, err);
  }
}

function* importResource(response, resourceId) {
  const version = getPresentationVersionFromResource(response);
  if (version === 2) {
    return yield call(importPresentation2Resource, response, resourceId);
  }
  if (version === 3) {
    return yield call(importPresentation3Resource, response, resourceId);
  }

  throw new Error('Unknown IIIF Presentation version');
}

function* importPresentation2Resource(response, resourceId) {
  if (response['@id'] !== resourceId) {
    // @todo this will not catch "partOf" fields.
    debug(
      'Resource ID does not match requested presentation 2 resource, patching... Found: %s Expected: %s',
      response['@id'],
      resourceId
    );
    response['@id'] = resourceId;
  }

  debug('Starting normalize presentation 2 resource %s', resourceId);

  return trackPresentationVersion(
    2,
    presentation2.normalize(response, presentation2.resource)
  );
}

function* importPresentation3Resource(response, resourceId) {
  if (response.id !== resourceId) {
    // @todo this will not catch "partOf" fields.
    debug(
      'Resource ID does not match requested presentation 3 resource, patching... Found: %s Expected: %s',
      response.id,
      resourceId
    );
    response.id = resourceId;
  }

  debug('Starting normalize presentation 3 resource %s', resourceId);

  return trackPresentationVersion(
    3,
    presentation3.normalize(response, presentation3.resource)
  );
}

function* getResourceType(resourceId, response) {
  const presentationVersion = getPresentationVersionFromResource(response);
  if (presentationVersion === 2) {
    return yield call(getPresentation2ResourceType, resourceId, response);
  }
  if (presentationVersion === 3) {
    return yield call(getPresentation3ResourceType, resourceId, response);
  }

  throw new Error('Unknown IIIF Presentation version');
}

function* getPresentation2ResourceType(resourceId, response) {
  if (!presentation2.RESOURCE_TYPE_MAP[response['@type']]) {
    throw new Error('Unknown Presentation 2 resource type');
  }

  return presentation2.RESOURCE_TYPE_MAP[response['@type']];
}

function* getPresentation3ResourceType(resourceId, response) {
  if (!presentation3.RESOURCE_TYPE_MAP[response.type]) {
    throw new Error('Unknown Presentation 3 resource type');
  }

  return presentation3.RESOURCE_TYPE_MAP[response.type];
}

function* requestUnknownResource({
  payload: { resourceId, mappings, ...options },
}) {
  if (!validUrl.isWebUri(resourceId)) {
    yield put(iiifResourceError(resourceId, 'Resource is not a valid URL.'));
    return;
  }

  try {
    // 1) Request the resource.
    debug('Fetching unknown resource %s', resourceId);
    const response = yield call(requestResource, resourceId, options);
    if (!response) {
      yield put(iiifResourceError(resourceId, 'Unknown resource'));
      return;
    }

    const type = yield call(getResourceType, resourceId, response);

    if (!mappings[type]) {
      yield put(
        iiifResourceError(
          resourceId,
          `Resource type is not in configured mappings (${Object.keys(
            mappings
          ).join(', ')})`
        )
      );
      return;
    }

    // 3) Grab constants from a map (to be created).
    const [REQUEST, SUCCESS, ERROR] = mappings[type];

    // 4) Send to regular import (will be cached).
    yield put(iiifResourceRequest(resourceId, [REQUEST, SUCCESS, ERROR]));
  } catch (err) {
    yield put(iiifResourceError(resourceId, err.message));
  }
}

function* saga() {
  yield all([
    takeEvery(IIIF_RESOURCE_REQUEST, requestIiifResource),
    takeEvery(IIIF_RESOURCE_REQUEST_UNKNOWN, requestUnknownResource),
  ]);
}

export {
  saga,
  resourceReducer,
  dereferencedReducer,
  iiifResourceRequest,
  iiifResourceRequestUnknown,
  DEFAULT_STATE,
  IIIF_RESOURCE_REQUEST,
  IIIF_RESOURCE_SUCCESS,
  IIIF_RESOURCE_ERROR,
  IIIF_RESOURCE_REQUEST_UNKNOWN,
  IIIF_RESOURCE_IDENTIFY,
};
