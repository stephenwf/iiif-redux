import { createActions, handleActions } from 'redux-actions';
import validUrl from 'valid-url';
import { normalize } from '../schema/presentation2';
import { call, put, select, all, takeEvery } from 'redux-saga/effects';
import deepmerge from 'deepmerge';
import update from 'immutability-helper';
import preloadNormalizedList from '../utility/preloadNormalizedList';
const debug = require('debug')('iiif-redux');

const IIIF_RESOURCE_REQUEST = 'IIIF_RESOURCE_REQUEST';
const IIIF_RESOURCE_SUCCESS = 'IIIF_RESOURCE_SUCCESS';
const IIIF_RESOURCE_ERROR = 'IIIF_RESOURCE_ERROR';

const {
  iiifResourceRequest,
  iiifResourceSuccess,
  iiifResourceError,
} = createActions({
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
    annotationLists: {},
    annotations: {},
    ranges: {},
    layers: {},
    imageResources: {},
    externalResources: {},
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
  const { resourceId, types, schema, ...options } = payload;
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

    if (response['@id'] !== resourceId) {
      // @todo this will not catch "partOf" fields.
      debug(
        'Resource ID does not match requested resource, patching... Found: %s Expected: %s',
        response['@id'],
        resourceId
      );
      response['@id'] = resourceId;
    }

    debug('Starting normalize resource (warm up) %s', resourceId);

    // Warm cache async.
    // @todo memoize issue.
    if (response['@type'] === 'sc:Collection') {
      if (response.collections) {
        yield call(preloadNormalizedList, response.collections);
      }
      if (response.members) {
        yield call(preloadNormalizedList, response.members);
      }
      if (response.manifests) {
        yield call(preloadNormalizedList, response.manifests);
      }
    }

    debug('Starting normalize resource %s', resourceId);

    const { result, entities } = normalize(response, schema);

    debug('Finished normalize resource %s', result);

    yield call(successAction, SUCCESS, result, entities);
  } catch (err) {
    debug('Error: %O', err);
    yield call(errorAction, ERROR, resourceId, err);
  }
}

function* saga() {
  yield takeEvery(IIIF_RESOURCE_REQUEST, requestIiifResource);
}

export {
  saga,
  resourceReducer,
  dereferencedReducer,
  iiifResourceRequest,
  DEFAULT_STATE,
};
