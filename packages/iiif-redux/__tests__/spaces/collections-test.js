import { collectionByIdSelector } from '../../src/api/collection';
import createStore from '../../src/createStore';
import nlsTop from '../fixtures/nls-top';
import presentation3 from '../fixtures/presentation/3.0/2-to-3-converter/iiif.io__api__presentation__2.1__example__fixtures__collection';
import { selectCollection } from '../../src/spaces/routing';
import { waitForRequest } from '../../test-utils';

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

    expect(
      collectionByIdSelector(currentCollection => currentCollection.getLabel, {
        getId: () => 'https://view.nls.uk/collections/top.json',
      })(store.getState())
    ).toEqual([
      {
        '@language': 'en',
        '@value': 'National Library of Scotland IIIF Collections',
      },
    ]);
  });

  it('should load collection (P3) when selected', async () => {
    const collectionId =
      'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json';
    const store = createStore();

    fetch.mockResponseOnce(JSON.stringify(presentation3));

    store.dispatch(selectCollection({ id: collectionId }));

    const loadingState = store.getState();
    expect(loadingState.dereferenced).toEqual({
      'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json': {
        loading: true,
        requested: loadingState.dereferenced[collectionId].requested,
        resourceId:
          'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json',
        ttl: 600,
      },
    });

    await waitForRequest(store, collectionId);

    expect(store.getState().dereferenced).toEqual({
      'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json': {
        loading: false,
        requested: loadingState.dereferenced[collectionId].requested,
        resourceId:
          'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json',
        ttl: 600,
      },
    });

    expect(Object.keys(store.getState().resources.collections)).toEqual([
      'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json',
    ]);
    expect(Object.keys(store.getState().resources.manifests)).toEqual([
      'http://iiif.io/api/presentation/2.1/example/fixtures/1/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/2/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/3/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/4/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/5/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/6/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/7/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/8/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/9/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/10/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/11/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/12/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/13/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/14/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/15/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/16/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/17/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/18/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/20/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/21/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/22/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/23/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/24/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/25/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/26/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/27/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/28/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/29/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/30/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/31/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/32/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/33/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/34/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/35/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/36/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/37/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/38/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/39/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/40/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/41/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/43/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/44/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/45/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/46/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/47/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/48/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/51/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/52/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/54/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/61/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/62/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/63/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/64/manifest.json',
      'http://iiif.io/api/presentation/2.1/example/fixtures/65/manifest.json',
    ]);

    expect(
      collectionByIdSelector(currentCollection => currentCollection.getLabel, {
        getId: () => collectionId,
      })(store.getState())
    );
  });

  test('unknown presentation version', async () => {
    const collectionId =
      'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json';
    const store = createStore();

    fetch.mockResponseOnce(
      JSON.stringify({
        id:
          'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json',
      })
    );

    store.dispatch(selectCollection({ id: collectionId }));

    const loadingState = store.getState();
    expect(loadingState.dereferenced).toEqual({
      'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json': {
        loading: true,
        requested: loadingState.dereferenced[collectionId].requested,
        resourceId:
          'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json',
        ttl: 600,
      },
    });

    await waitForRequest(store, collectionId);

    expect(
      store
        .getState()
        .dereferenced[
          'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json'
        ].error.toString()
    ).toEqual('Error: Unknown entity type');
  });

  test('p3 id mis-match', async () => {
    const collectionId =
      'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json';
    const store = createStore();

    fetch.mockResponseOnce(
      JSON.stringify({
        id:
          'http://iiif.io/api/presentation/2.1/example/fixtures/collection-wrong-id.json',
        type: 'Collection',
      })
    );

    store.dispatch(selectCollection({ id: collectionId }));

    const loadingState = store.getState();
    expect(loadingState.dereferenced).toEqual({
      'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json': {
        loading: true,
        requested: loadingState.dereferenced[collectionId].requested,
        resourceId:
          'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json',
        ttl: 600,
      },
    });

    await waitForRequest(store, collectionId);

    const loadedState = store.getState();
    expect(loadedState.dereferenced).toEqual({
      'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json': {
        loading: false,
        requested: loadedState.dereferenced[collectionId].requested,
        resourceId:
          'http://iiif.io/api/presentation/2.1/example/fixtures/collection.json',
        ttl: 600,
      },
    });
  });
});
