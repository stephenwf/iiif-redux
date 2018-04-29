import createStore from './src/createStore';
import {
  selectCanvas,
  selectManifest,
  selectSequence,
} from './src/spaces/routing';
import * as currentManifest from './src/api/current-manifest';
import * as currentSequence from './src/api/current-sequence';
import * as currentCanvas from './src/api/current-canvas';

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

export async function createStoreAndImportManifest(manifestJson) {
  const id = manifestJson['@id'];
  const store = createStore();
  fetch.mockResponseOnce(JSON.stringify(manifestJson));

  const whenRequestFinishes = waitForRequest(store, id);

  store.dispatch(selectManifest({ id }));

  await whenRequestFinishes;

  const sequences = currentManifest.getSequenceIds(store.getState());
  store.dispatch(selectSequence({ id: sequences[0] }));

  const canvases = currentSequence.getCanvasIds(store.getState());
  store.dispatch(selectCanvas({ id: canvases[0] }));

  return store;
}
