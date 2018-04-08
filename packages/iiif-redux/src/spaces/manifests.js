import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import update from 'immutability-helper';

const MANIFESTS_REQUEST = 'MANIFESTS_REQUEST';
const MANIFESTS_SUCCESS = 'MANIFESTS_SUCCESS';
const MANIFESTS_FAILURE = 'MANIFESTS_FAILURE';

async function fetchManifest(manifestUrl) {
  const manifest = await fetch(manifestUrl);
  if (!manifest) {
    throw Error('No manifest found');
  }
  return await manifest.json();
}

const { manifestRequest, manifestSuccess, manifestFailure } = createActions({
  [MANIFESTS_REQUEST]: (manifestUrl, { startCanvas }) => ({
    manifestUrl,
    metaData: { startCanvas },
  }),
  [MANIFESTS_SUCCESS]: (manifestUrl, manifest) => ({
    manifestUrl,
    manifest,
  }),
  [MANIFESTS_FAILURE]: (manifestUrl, error) => ({ manifestUrl, error }),
});

function* fetchManifestSaga({ payload: { manifestUrl } }) {
  try {
    const manifest = yield call(fetchManifest, manifestUrl);
    yield put(manifestSuccess(manifestUrl, manifest));
  } catch (err) {
    yield put(manifestFailure(manifestUrl, err));
  }
}

function* saga() {
  yield all([takeEvery(MANIFESTS_REQUEST, fetchManifestSaga)]);
}

const defaultState = {
  isPending: false,
  currentManifest: null,
  jsonLd: null,
  error: false,
  errorMessage: null,
  currentCanvas: 0,
};

const reducer = handleActions(
  {
    // Requesting manifest adds its ID to state.
    [manifestRequest]: (state, { payload: { manifestUrl, locale } }) =>
      update(state, {
        currentManifest: { $set: manifestUrl },
        locale: { $set: locale },
        isPending: { $set: true },
      }),

    // After a successful manifest request we store it.
    [manifestSuccess]: (
      state,
      { payload: { manifestUrl, manifest, manifesto, locale } }
    ) =>
      update(state, {
        jsonLd: { $set: manifest },
        manifesto: { $set: manifesto },
        locale: { $set: locale },
        isPending: { $set: false },
      }),

    // After failure, we store error message.
    [manifestFailure]: (state, { payload: { manifestUrl, error } }) =>
      update(state, {
        isPending: { $set: false },
        error: true,
        errorMessage: error,
      }),
  },
  defaultState
);

export {
  MANIFESTS_REQUEST,
  MANIFESTS_SUCCESS,
  MANIFESTS_FAILURE,
  manifestRequest,
  manifestSuccess,
  manifestFailure,
  saga,
  reducer,
};
