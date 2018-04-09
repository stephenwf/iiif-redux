/**
 * Collections space
 *
 * The logic for collections.
 *
 * What is known:
 * - Collections can contain manifests
 * - Collections can contain other collections
 *
 * Interactions:
 * - When collection is selected, it should be loaded if its not already.
 *
 * Needs planning:
 * - Next/Prev
 */
import { put, all, takeEvery } from 'redux-saga/effects';
import { ROUTING_SELECT_COLLECTION } from './routing';
import { collection } from '../schema/presentation2';
import { iiifResourceRequest } from './iiif-resource';

const COLLECTION_REQUEST = 'COLLECTION_REQUEST';
const COLLECTION_SUCCESS = 'COLLECTION_SUCCESS';
const COLLECTION_ERROR = 'COLLECTION_ERROR';

function* fetchCollection({ payload: { id } }) {
  yield put(
    iiifResourceRequest(
      id,
      [COLLECTION_REQUEST, COLLECTION_SUCCESS, COLLECTION_ERROR],
      collection
    )
  );
}

function* saga() {
  yield all([takeEvery(ROUTING_SELECT_COLLECTION, fetchCollection)]);
}

export { COLLECTION_SUCCESS, COLLECTION_REQUEST, COLLECTION_ERROR, saga };
