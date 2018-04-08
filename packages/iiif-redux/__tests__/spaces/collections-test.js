import createStore from '../../src/createStore';
import nlsTop from '../fixtures/nls-top';
import * as currentCollection from '../../src/api/current-collection';
import { selectCollection } from '../../src/spaces/routing';

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

  it('should load collection when selected', async () => {
    const store = createStore();

    fetch.mockResponseOnce(JSON.stringify(nlsTop));

    store.dispatch(
      selectCollection({ id: 'https://view.nls.uk/collections/top.json' })
    );

    const loadingState = store.getState();
    expect(loadingState.dereferenced).toEqual({
      'https://view.nls.uk/collections/top.json': {
        loading: true,
        requested:
          loadingState.dereferenced['https://view.nls.uk/collections/top.json']
            .requested,
        resourceId: 'https://view.nls.uk/collections/top.json',
        ttl: 600,
      },
    });

    await waitForRequest(store, 'https://view.nls.uk/collections/top.json');

    expect(store.getState().dereferenced).toEqual({
      'https://view.nls.uk/collections/top.json': {
        loading: false,
        requested:
          loadingState.dereferenced['https://view.nls.uk/collections/top.json']
            .requested,
        resourceId: 'https://view.nls.uk/collections/top.json',
        ttl: 600,
      },
    });

    expect(Object.keys(store.getState().resources.collections)).toEqual([
      'https://view.nls.uk/collections/1208/2191/120821910.json',
      'https://view.nls.uk/collections/1258/8396/125883965.json',
      'https://view.nls.uk/collections/1334/7486/133474867.json',
      'https://view.nls.uk/collections/1256/5201/125652019.json',
      'https://view.nls.uk/collections/7446/74466699.json',
      'https://view.nls.uk/collections/7446/74466728.json',
      'https://view.nls.uk/collections/7446/74462370.json',
      'https://view.nls.uk/collections/7446/74466682.json',
      'https://view.nls.uk/collections/1256/4477/125644778.json',
      'https://view.nls.uk/collections/9350/93506071.json',
      'https://view.nls.uk/collections/1041/8410/104184103.json',
      'https://view.nls.uk/collections/top.json',
    ]);

    expect(currentCollection.getLabel(store.getState())).toEqual([
      {
        '@language': 'en',
        '@value': 'National Library of Scotland IIIF Collections',
      },
    ]);
  });
});
