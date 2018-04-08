import { createActions, handleActions } from 'redux-actions';
import { normalize } from 'normalizr';
import validUrl from 'valid-url';
import { call, put, select, all, takeEvery } from 'redux-saga/effects';
import deepmerge from 'deepmerge';
import update from 'immutability-helper';
import { resource } from '../schema/presentation2';
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
};

const reducer = handleActions(
  {
    [iiifResourceRequest]: (state, { payload: { resourceId, ttl } }) =>
      update(state, {
        dereferenced: {
          [resourceId]: {
            $set: {
              resourceId,
              ttl,
              requested: new Date(),
              loading: true,
            },
          },
        },
      }),
    [iiifResourceError]: (state, { payload: { resourceId, error } }) =>
      update(state, {
        dereferenced: {
          [resourceId]: {
            loading: { $set: false },
            error: { $set: error },
          },
        },
      }),
    [iiifResourceSuccess]: (
      state,
      { payload: { resourceId, normalizedResponse } }
    ) => {
      return update(deepmerge(state, normalizedResponse), {
        dereferenced: {
          [resourceId]: {
            loading: { $set: false },
          },
        },
      });
    },
  },
  DEFAULT_STATE
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

  // const state = yield select();

  // @todo logic for cache.
  // if (state.dereferenced[resourceId] && options.forceFresh === false) {
  //   return;
  // }

  yield put({ type: REQUEST, payload });

  try {
    const response = yield call(requestResource, resourceId, options);
    const { result, entities } = normalize(response, schema);
    yield call(successAction, SUCCESS, result, entities);
  } catch (err) {
    yield call(errorAction, ERROR, resourceId, err);
  }
}

function* saga() {
  yield takeEvery(IIIF_RESOURCE_REQUEST, requestIiifResource);
}

export { saga, reducer, iiifResourceRequest, DEFAULT_STATE };
