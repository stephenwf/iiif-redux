import { createStructuredSelector, createSelector } from 'reselect';
import createStore from '../src/createStore';
import bridges from './fixtures/bridges';
import {
  iiifResourceRequest,
  iiifResourceRequestUnknown,
} from '../src/spaces/iiif-resource';
import { collection, manifest } from '../src/schema/presentation2';
import { waitForRequest } from '../test-utils';
import { manifestByIdSelector } from '../src/api/manifest';
import { sequenceByIdSelector } from '../src/api/sequence';
import { canvasByIdSelector } from '../src/api/canvas';

describe('store', () => {
  global.fetch = require('jest-fetch-mock');
  const RealDate = Date;

  function mockDate(isoDate) {
    // noinspection JSUnresolvedVariable
    global.Date = class extends RealDate {
      // noinspection JSAnnotator
      constructor(...theArgs) {
        if (theArgs.length) {
          return new RealDate(...theArgs);
        }
        return new RealDate(isoDate);
      }

      static now() {
        return new RealDate(isoDate).getTime();
      }
    };
  }
  afterEach(() => {
    // noinspection JSUnresolvedVariable
    global.Date = RealDate;
  });

  it('should have default state', () => {
    const store = createStore();
    expect(store.getState()).toMatchSnapshot();
  });

  it('should throw an error if actions are not passed through', () => {
    mockDate('2017-11-25T00:00:00z');

    const store = createStore();
    store.dispatch(
      iiifResourceRequest(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS'],
        manifest
      )
    );

    const state = store.getState();
    expect(state).toMatchSnapshot();
  });

  it('should set error in state when request errors', async () => {
    const store = createStore();
    mockDate('2017-11-25T00:00:00z');
    fetch.mockRejectOnce('Excepted error found');
    store.dispatch(
      iiifResourceRequest(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );
    await new Promise(resolve => store.subscribe(resolve));
    const state = store.getState();
    expect(state).toMatchSnapshot();
  });

  it('should set error in state when malformed url is given', () => {
    const store = createStore();
    mockDate('2017-11-25T00:00:00z');
    store.dispatch(
      iiifResourceRequest(
        'not-real-url',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );

    const state = store.getState();

    expect(state).toMatchSnapshot();
  });

  it('should import a manifest', async () => {
    const store = createStore();
    fetch.mockResponseOnce(JSON.stringify(bridges));
    mockDate('2017-11-25T00:00:00z');

    const whenRequestFinishes = waitForRequest(
      store,
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );

    store.dispatch(
      iiifResourceRequest(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );
    const state = store.getState();

    const manifestState =
      state.dereferenced[
        'https://view.nls.uk/manifest/7446/74464117/manifest.json'
      ];

    expect(manifestState.loading).toEqual(true);
    expect(manifestState.resourceId).toEqual(
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );
    expect(manifestState.ttl).toEqual(600);

    await whenRequestFinishes;

    const secondState = store.getState();
    expect(secondState).toMatchSnapshot('second state');

    // Try fetching as unknown.
    fetch.mockResponseOnce(JSON.stringify(bridges));
    const whenRequestFinishes2 = waitForRequest(
      store,
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );

    store.dispatch(
      iiifResourceRequestUnknown(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json'
      )
    );

    await whenRequestFinishes2;

    expect(
      store.getState().dereferenced[
        'https://view.nls.uk/manifest/7446/74464117/manifest.json'
      ]
    ).toEqual({
      loading: false,
      resourceId: 'https://view.nls.uk/manifest/7446/74464117/manifest.json',
      ttl: 600,
    });
  });

  it('should only make 1 http request per resource by default', async () => {
    const store = createStore();
    fetch.mockResponseOnce(JSON.stringify(bridges));

    const whenRequestFinishes = waitForRequest(
      store,
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );

    store.dispatch(
      iiifResourceRequest(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );
    const state = store.getState();

    const manifestState =
      state.dereferenced[
        'https://view.nls.uk/manifest/7446/74464117/manifest.json'
      ];

    expect(manifestState.loading).toEqual(true);
    expect(manifestState.resourceId).toEqual(
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );
    expect(manifestState.ttl).toEqual(600);

    await whenRequestFinishes;

    store.dispatch(
      iiifResourceRequest(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );

    const state2 = store.getState();
    expect(
      state2.dereferenced[
        'https://view.nls.uk/manifest/7446/74464117/manifest.json'
      ].loading
    ).toEqual(false);
  });

  it('should only correct incorrect IDs when requesting resource.', async () => {
    const store = createStore();
    fetch.mockResponseOnce(
      JSON.stringify({ ...bridges, '@id': 'https://INCORRECT_FIX_ME/' })
    );

    const whenRequestFinishes = waitForRequest(
      store,
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );

    store.dispatch(
      iiifResourceRequest(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );
    const state = store.getState();

    const manifestState =
      state.dereferenced[
        'https://view.nls.uk/manifest/7446/74464117/manifest.json'
      ];

    expect(manifestState.loading).toEqual(true);
    expect(manifestState.resourceId).toEqual(
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );
    expect(manifestState.ttl).toEqual(600);

    await whenRequestFinishes;

    store.dispatch(
      iiifResourceRequest(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );

    const state2 = store.getState();
    expect(
      state2.dereferenced[
        'https://view.nls.uk/manifest/7446/74464117/manifest.json'
      ].loading
    ).toEqual(false);
  });

  it('should create state that works with selectors', async () => {
    const store = createStore({}, [], [], {
      routing: {
        currentManifest:
          'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        currentSequence:
          'https://view.nls.uk/manifest/7446/74464117/canvas/default',
        currentCanvas: 'https://view.nls.uk/iiif/7446/74464117/canvas/1',
      },
    });
    fetch.mockResponseOnce(JSON.stringify(bridges));

    const whenRequestFinishes = waitForRequest(
      store,
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );

    store.dispatch(
      iiifResourceRequest(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );

    await whenRequestFinishes;

    const state = store.getState();

    // Assert manifest.
    const manifestLabel = manifestByIdSelector(api => api.getLabel, {
      getId: () => 'https://view.nls.uk/manifest/7446/74464117/manifest.json',
    });
    expect(manifestLabel(state)).toMatchSnapshot();

    // Assert sequence.
    const sequenceLabel = sequenceByIdSelector(api => api.getLabel, {
      getId: () => 'https://view.nls.uk/manifest/7446/74464117/canvas/default',
    });

    expect(sequenceLabel(state)).toMatchSnapshot();

    // Assert canvas.
    const canvasState = canvasByIdSelector(
      api => ({
        label: api.getLabel,
        thumbnail: api.getThumbnailId,
        imageService: api.getImageService,
      }),
      {
        getId: () => 'https://view.nls.uk/iiif/7446/74464117/canvas/1',
      }
    );

    expect(canvasState(state)).toMatchSnapshot();
  });

  it('should preload normalized entities in collections', async () => {
    const collectionJson = {
      '@id': 'http://iiif.com/collection-1.json',
      '@type': 'sc:Collection',
      label: 'Collection label 1',
      members: [
        {
          '@id': 'http://iiif.com/collection-2.json',
          '@type': 'sc:Collection',
          label: 'Collection label 2',
        },
        {
          '@id': 'http://iiif.com/collection-3.json',
          '@type': 'sc:Collection',
          label: 'Collection label 3',
        },
      ],
      manifests: [
        {
          '@id': 'http://iiif.com/manifest-1.json',
          '@type': 'sc:Manifest',
          label: 'Manifest label 1',
        },
        {
          '@id': 'http://iiif.com/manifest-2.json',
          '@type': 'sc:Manifest',
          label: 'Manifest label 2',
        },
      ],
    };

    const store = createStore();
    fetch.mockResponseOnce(JSON.stringify(collectionJson));
    mockDate('2017-11-25T00:00:00z');

    const whenRequestFinishes = waitForRequest(
      store,
      'http://iiif.com/collection-1.json'
    );

    store.dispatch(
      iiifResourceRequest(
        'http://iiif.com/collection-1.json',
        ['COLLECTION_REQUEST', 'COLLECTION_SUCCESS', 'COLLECTION_ERROR'],
        collection
      )
    );

    await whenRequestFinishes;

    const state = store.getState();

    expect(state.resources).toMatchSnapshot();
  });

  describe('iiifResourceRequestUnknown', () => {
    test('basic resource', () => {
      expect(
        iiifResourceRequestUnknown('https://iiif.com/collection-1.json')
      ).toMatchSnapshot();
    });

    test('http request', async () => {
      const store = createStore();
      fetch.mockResponseOnce(
        JSON.stringify({
          '@id': 'http://iiif.com/collection-1.json',
          '@type': 'sc:Collection',
          label: 'Collection label 1',
        })
      );

      fetch.mockResponseOnce(
        JSON.stringify({
          '@id': 'http://iiif.com/collection-1.json',
          '@type': 'sc:Collection',
          label: 'Collection label 1',
        })
      );

      const whenRequestFinishes = waitForRequest(
        store,
        'http://iiif.com/collection-1.json'
      );

      store.dispatch(
        iiifResourceRequestUnknown('http://iiif.com/collection-1.json')
      );

      await whenRequestFinishes;

      const state = store.getState();

      expect(state.dereferenced.error).toEqual();

      expect(state.resources).toMatchSnapshot();
    });

    test('invalid URL', async () => {
      const store = createStore();

      store.dispatch(iiifResourceRequestUnknown('NOT-REAL-URL'));
      const state = store.getState();

      expect(state.dereferenced['NOT-REAL-URL'].error).toEqual(
        'Resource is not a valid URL.'
      );
    });

    test('unknown type', async () => {
      const store = createStore();
      fetch.mockResponseOnce(
        JSON.stringify({
          '@id': 'http://iiif.com/NOT-REAL-1.json',
          '@type': 'NOT REAL',
          label: 'Collection label 1',
        })
      );
      const whenRequestFinishes = waitForRequest(
        store,
        'http://iiif.com/NOT-REAL-1.json'
      );
      store.dispatch(
        iiifResourceRequestUnknown('http://iiif.com/NOT-REAL-1.json')
      );

      await whenRequestFinishes;

      const state = store.getState();

      expect(
        state.dereferenced['http://iiif.com/NOT-REAL-1.json'].error
      ).toEqual('Unknown Presentation 2 resource type');
    });

    test('unknown mapping', async () => {
      const store = createStore();
      fetch.mockResponseOnce(
        JSON.stringify({
          '@id': 'http://iiif.com/NOT-REAL-1.json',
          '@type': 'sc:Collection',
          label: 'Collection label 1',
        })
      );
      const whenRequestFinishes = waitForRequest(
        store,
        'http://iiif.com/NOT-REAL-1.json'
      );
      store.dispatch(
        iiifResourceRequestUnknown(
          'http://iiif.com/NOT-REAL-1.json',
          {},
          {
            canvas: () => null, // noop for test
            manifest: () => null, // noop for test
          }
        )
      );

      await whenRequestFinishes;

      const state = store.getState();

      expect(
        state.dereferenced['http://iiif.com/NOT-REAL-1.json'].error
      ).toEqual(
        'Resource type is not in configured mappings (canvas, manifest)'
      );
    });
  });
});
