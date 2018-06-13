import createStore from '../../src/createStore';
import nlsTop from '../fixtures/nls-top';
import bridges from '../fixtures/bridges';
import { waitForRequest } from '../../test-utils';
import { iiifResourceRequest } from '../../src/spaces/iiif-resource';
import {
  frameCreate,
  frameGoBack,
  frameGoToResource,
} from '../../src/spaces/frames';
import { frameByIdSelector } from '../../src/api/frame';
import { collection, manifest } from '../../src/schema/presentation2';
import resource from '../../src/api/resource';

describe('iiif/store frames', () => {
  global.fetch = require('jest-fetch-mock');

  async function loadCollection(store, collectionJson) {
    fetch.mockResponseOnce(JSON.stringify(collectionJson));
    const whenRequestFinishes = waitForRequest(store, collectionJson['@id']);
    store.dispatch(
      iiifResourceRequest(
        collectionJson['@id'],
        ['COLLECTION_REQUEST', 'COLLECTION_SUCCESS', 'COLLECTION_ERROR'],
        collection
      )
    );
    await whenRequestFinishes;
  }

  test('collections can be returned from selectors in frames', async () => {
    const store = createStore();

    store.dispatch(
      frameCreate({
        resourceId: nlsTop['@id'],
        resourceType: 'collection',
      })
    );
    // Load collection
    const finishedLoading = loadCollection(store, nlsTop);
    // @todo assertion?
    await finishedLoading;

    expect(
      frameByIdSelector(api => ({
        resource: resource(api.getCurrentResource, {
          collection: currentCollection => ({
            id: currentCollection.getId,
            type: currentCollection.getType,
            label: currentCollection.getLabel,
          }),
        }),
      }))(store.getState())
    ).toEqual({
      resource: {
        id: 'https://view.nls.uk/collections/top.json',
        label: [
          {
            '@language': 'en',
            '@value': 'National Library of Scotland IIIF Collections',
          },
        ],
        schema: 'collection',
        type: 'sc:Collection',
      },
    });

    expect(
      frameByIdSelector(api => ({
        resource: resource(api.getCurrentResource, {
          collection: currentCollection => currentCollection.getId,
        }),
      }))(store.getState())
    ).toEqual({ resource: 'https://view.nls.uk/collections/top.json' });

    expect(
      frameByIdSelector(
        api => ({
          resource: resource(api.getCurrentResource, {
            collection: currentCollection => currentCollection.getId,
          }),
        }),
        {
          getId: () => 'default-frame',
        }
      )(store.getState())
    ).toEqual({ resource: 'https://view.nls.uk/collections/top.json' });

    expect(
      frameByIdSelector(api => ({
        resource: resource(api.getCurrentResource, {
          collection: currentCollection => currentCollection.getId,
        }),
      }))(store.getState(), { frameId: 'default-frame' })
    ).toEqual({ resource: 'https://view.nls.uk/collections/top.json' });

    expect(
      frameByIdSelector(api => api.getCurrentResource)(store.getState())
    ).toEqual({
      id: 'https://view.nls.uk/collections/top.json',
      schema: 'collection',
    });
  });

  test('collections can be returned from selectors in frames', async () => {
    const store = createStore();

    store.dispatch(
      frameCreate({
        resourceId: nlsTop['@id'],
        resourceType: 'collection',
      })
    );
    // Load collection
    const finishedLoading = loadCollection(store, nlsTop);
    // @todo assertion?
    await finishedLoading;

    store.dispatch(
      frameGoToResource({
        resourceId: 'https://view.nls.uk/manifest/7446/74464614/manifest.json',
        resourceType: 'manifest',
      })
    );

    expect(
      frameByIdSelector(api => ({
        resource: resource(api.getCurrentResource, {
          collection: currentCollection => ({
            label: currentCollection.getLabel,
          }),
          manifest: currentManifest => ({ label: currentManifest.getLabel }),
        }),
      }))(store.getState())
    ).toEqual({
      resource: {
        label: [
          {
            '@language': 'en',
            '@value': 'Poems, chiefly in the Scottish dialect',
          },
        ],
        schema: 'manifest',
      },
    });
  });
  test('collections can be returned from selectors in frames', async () => {
    const store = createStore();

    store.dispatch(
      frameCreate({
        resourceId: bridges['@id'],
        resourceType: 'manifest',
      })
    );

    fetch.mockResponseOnce(JSON.stringify(bridges));
    const whenRequestFinishes = waitForRequest(store, bridges['@id']);
    store.dispatch(
      iiifResourceRequest(
        bridges['@id'],
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );
    await whenRequestFinishes;

    store.dispatch(
      frameGoToResource({
        resourceId: 'https://view.nls.uk/iiif/7446/74464117/canvas/1',
        resourceType: 'canvas',
      })
    );

    expect(
      frameByIdSelector(api => ({
        resource: resource(api.getCurrentResource, {
          manifest: currentManifest => ({ label: currentManifest.getLabel }),
          canvas: currentCanvas => ({ label: currentCanvas.getLabel }),
        }),
      }))(store.getState())
    ).toEqual({
      resource: {
        label: [{ '@language': 'en', '@value': '1' }],
        schema: 'canvas',
      },
    });

    store.dispatch(frameGoBack());

    expect(
      frameByIdSelector(api => ({
        resource: resource(api.getCurrentResource, {
          manifest: currentManifest => ({ label: currentManifest.getLabel }),
          canvas: currentCanvas => ({ label: currentCanvas.getLabel }),
        }),
      }))(store.getState())
    ).toEqual({
      resource: {
        label: [
          {
            '@language': 'en',
            '@value': 'Forth Bridge illustrations 1886-1887',
          },
        ],
        schema: 'manifest',
      },
    });

    expect(
      frameByIdSelector(api => ({
        resource: resource(api.getCurrentResource, {}),
      }))(store.getState())
    ).toEqual({ resource: null });
  });
});
