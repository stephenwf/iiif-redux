import { createStructuredSelector, createSelector } from 'reselect';
import createStore from '../src/createStore';
import bridges from './fixtures/bridges';
import {
  iiifResourceRequest,
  iiifResourceRequestUnknown,
} from '../src/spaces/iiif-resource';
import { collection, manifest } from '../src/schema/presentation2';
import * as currentManifest from '../src/api/current-manifest';
import * as currentSequence from '../src/api/current-sequence';
import * as currentCanvas from '../src/api/current-canvas';
import * as descriptive from '../src/api/2.x/iiif/descriptive';
import { waitForRequest } from '../test-utils';

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

    expect(currentManifest.getLabel(state)).toEqual([
      { '@language': 'en', '@value': 'Forth Bridge illustrations 1886-1887' },
    ]);

    expect(currentSequence.getLabel(state)).toEqual([
      { '@language': 'en', '@value': 'default' },
    ]);

    expect(currentCanvas.getLabel(state)).toEqual([
      { '@language': 'en', '@value': '1' },
    ]);

    expect(currentCanvas.getThumbnailId(state)).toEqual(
      'https://deriv.nls.uk/dcn4/7443/74438561.4.jpg'
    );

    expect(currentCanvas.getImageService(state)).toEqual({
      '@context': 'http://iiif.io/api/image/2/context.json',
      '@id': 'https://view.nls.uk/iiif/7443/74438561.5',
      profile: 'http://iiif.io/api/image/2/profiles/level2.json',
    });

    const structured = createStructuredSelector({
      label: currentManifest.getLabel,
      metadata: currentManifest.getMetadata,
      canvasThumbnails: createSelector(currentSequence.getCanvases, canvases =>
        canvases.map(
          createStructuredSelector({
            label: descriptive.getLabel,
            thumbnail: descriptive.getThumbnailId,
          })
        )
      ),
    });
    expect(structured(state)).toEqual({
      label: [
        { '@language': 'en', '@value': 'Forth Bridge illustrations 1886-1887' },
      ],
      canvasThumbnails: [
        {
          label: [{ '@language': 'en', '@value': '1' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438561.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '2' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438562.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '3' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438654.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '4' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438655.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '5' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438656.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '6' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438657.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '7' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438658.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '8' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438659.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '9' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438660.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '10' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438661.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '11' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438662.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '12' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438663.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '13' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438664.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '14' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438665.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '15' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438666.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '16' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438667.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '17' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438668.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '18' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438669.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '19' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438670.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '20' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438671.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '21' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438672.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '22' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438673.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '23' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438674.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '24' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438675.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '25' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438676.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '26' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438677.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '27' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438678.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '28' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438679.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '29' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438680.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '30' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438681.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '31' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438682.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '32' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438683.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '33' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438684.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '34' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438685.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '35' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438686.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '36' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74438687.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '37' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74439048.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '38' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74439050.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '39' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74439051.4.jpg',
        },
        {
          label: [{ '@language': 'en', '@value': '40' }],
          thumbnail: 'https://deriv.nls.uk/dcn4/7443/74439052.4.jpg',
        },
      ],
      metadata: [
        {
          label: [{ '@language': 'en', '@value': 'Title' }],
          value: [
            {
              '@language': 'en',
              '@value': 'Forth Bridge illustrations 1886-1887',
            },
          ],
        },
        {
          label: [{ '@language': 'en', '@value': 'Description' }],
          value: [
            {
              '@language': 'en',
              '@value':
                '40 black-and-white photographs capturing the construction of the Forth Bridge by Glasgow-based Sir William Arrol & Co. Close-up and distance views of superstructure, cantilevers, lifting platforms and viaduct. Taken at weekly or fortnightly intervals from 1886-1887 by Philip Phillips, son of one of the contractors. Silver gelatin prints.',
            },
          ],
        },
        {
          label: [{ '@language': 'en', '@value': 'Shelfmark' }],
          value: [{ '@language': 'en', '@value': 'RB.l.229' }],
        },
        {
          label: [],
          value: [
            {
              '@language': 'en',
              '@value':
                '<a href="http://digital.nls.uk/74464117">View in our digital gallery</a>',
            },
          ],
        },
        {
          label: [{ '@language': 'en', '@value': 'Full conditions of use' }],
          value: [
            {
              '@language': 'en',
              '@value':
                'You have permission to make copies of this work under the <a target="_top" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a> unless otherwise stated.',
            },
          ],
        },
      ],
    });

    expect(currentCanvas.getImageService(state)).toEqual({
      '@context': 'http://iiif.io/api/image/2/context.json',
      '@id': 'https://view.nls.uk/iiif/7443/74438561.5',
      profile: 'http://iiif.io/api/image/2/profiles/level2.json',
    });
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
      ).toEqual('Unknown resource type');
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
