import createStore from '../../src/createStore';
import wellcomeBoxes from '../fixtures/wellcome-boxes';
import * as currentManifest from '../../src/api/current-manifest';
import { selectCollection, selectManifest } from '../../src/spaces/routing';

function waitForRequest(store, id) {
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

describe('spaces/collections', () => {
  global.fetch = require('jest-fetch-mock');

  it('should load manifest when selected', async () => {
    const store = createStore();

    fetch.mockResponseOnce(JSON.stringify(wellcomeBoxes));

    store.dispatch(
      selectManifest({
        id: 'https://wellcomelibrary.org/service/collections/genres/Boxes/',
      })
    );

    const loadingState = store.getState();
    expect(loadingState.dereferenced).toEqual({
      'https://wellcomelibrary.org/service/collections/genres/Boxes/': {
        loading: true,
        requested:
          loadingState.dereferenced[
            'https://wellcomelibrary.org/service/collections/genres/Boxes/'
          ].requested,
        resourceId:
          'https://wellcomelibrary.org/service/collections/genres/Boxes/',
        ttl: 600,
      },
    });

    await waitForRequest(
      store,
      'https://wellcomelibrary.org/service/collections/genres/Boxes/'
    );

    const loadedState = store.getState();
    expect(loadedState.dereferenced).toEqual({
      'https://wellcomelibrary.org/service/collections/genres/Boxes/': {
        loading: false,
        requested:
          loadedState.dereferenced[
            'https://wellcomelibrary.org/service/collections/genres/Boxes/'
          ].requested,
        resourceId:
          'https://wellcomelibrary.org/service/collections/genres/Boxes/',
        ttl: 600,
      },
    });

    expect(Object.keys(store.getState().resources.manifests)).toEqual([
      'https://wellcomelibrary.org/service/collections/genres/Boxes/',
    ]);

    expect(currentManifest.getLabel(store.getState())).toEqual([
      { '@language': 'en', '@value': ' Genre: Boxes' },
    ]);
  });
});
