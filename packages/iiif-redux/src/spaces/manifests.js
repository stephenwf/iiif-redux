import { put, all, takeEvery } from 'redux-saga/effects';
import { ROUTING_SELECT_MANIFEST } from './routing';
import { manifest } from '../schema/presentation2';
import { iiifResourceRequest } from './iiif-resource';

const MANIFEST_REQUEST = 'MANIFEST_REQUEST';
const MANIFEST_SUCCESS = 'MANIFEST_SUCCESS';
const MANIFEST_ERROR = 'MANIFEST_ERROR';

function* fetchManifest({ payload: { id } }) {
  yield put(
    iiifResourceRequest(
      id,
      [MANIFEST_REQUEST, MANIFEST_SUCCESS, MANIFEST_ERROR],
      manifest
    )
  );
}

function* saga() {
  yield all([takeEvery(ROUTING_SELECT_MANIFEST, fetchManifest)]);
}

export { MANIFEST_SUCCESS, MANIFEST_REQUEST, MANIFEST_ERROR, saga };
