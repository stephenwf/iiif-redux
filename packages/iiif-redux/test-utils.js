import { manifestByIdSelector } from './src/api/manifest';
import { sequences } from './src/api/sequence';
import createStore from './src/createStore';
import {
  selectCanvas,
  selectManifest,
  selectSequence,
} from './src/spaces/routing';
import * as reducers from './src/reducers';
import { combineReducers } from 'redux';

export function waitForRequest(store, id) {
  return new Promise(resolve => {
    store.subscribe(() => {
      const newState = store.getState();
      if (
        newState.dereferenced &&
        newState.dereferenced[id] &&
        newState.dereferenced[id].loading === false
      ) {
        resolve();
      }
    });
  });
}

const reducer = combineReducers(reducers);
export function makeStateFromActions(...actions) {
  return [{ type: '@@redux/INIT' }, ...actions].reduce(reducer, {});
}

export async function createStoreAndImportManifest(manifestJson) {
  const id = manifestJson['@id'];
  const store = createStore();
  fetch.mockResponseOnce(JSON.stringify(manifestJson));

  const whenRequestFinishes = waitForRequest(store, id);

  store.dispatch(selectManifest({ id }));

  await whenRequestFinishes;

  const sequenceIds = manifestByIdSelector(
    currentManifest => currentManifest.getSequenceIds,
    { getId: () => id }
  )(store.getState());
  store.dispatch(selectSequence({ id: sequenceIds[0] }));

  const canvasIds = manifestByIdSelector(
    currentManifest =>
      sequences(
        currentManifest.getSequences,
        currentSequence => currentSequence.getCanvasIds
      ),
    { getId: () => id }
  )(store.getState());
  store.dispatch(selectCanvas({ id: canvasIds[0] }));

  return store;
}
