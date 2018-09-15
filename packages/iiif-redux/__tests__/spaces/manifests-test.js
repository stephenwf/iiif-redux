import { manifestByIdSelector } from '../../src/api/manifest';
import createStore from '../../src/createStore';
import bridges from '../fixtures/bridges';
import presentation3 from '../fixtures/presentation/3.0/2-to-3-converter/dams.llgc.org.uk__iiif__newspaper__issue__3320640__manifest';
import { selectManifest } from '../../src/spaces/routing';
import { waitForRequest } from '../../test-utils';

describe('spaces/collections', () => {
  global.fetch = require('jest-fetch-mock');

  it('should load manifest (presentation 3) when selected', async () => {
    const manifestId =
      'http://dams.llgc.org.uk/iiif/newspaper/issue/3320640/manifest.json';
    const store = createStore();

    fetch.mockResponseOnce(JSON.stringify(presentation3));

    store.dispatch(
      selectManifest({
        id: manifestId,
      })
    );

    const loadingState = store.getState();
    expect(loadingState.dereferenced).toEqual({
      'http://dams.llgc.org.uk/iiif/newspaper/issue/3320640/manifest.json': {
        loading: true,
        requested: loadingState.dereferenced[manifestId].requested,
        resourceId:
          'http://dams.llgc.org.uk/iiif/newspaper/issue/3320640/manifest.json',
        ttl: 600,
      },
    });

    await waitForRequest(store, manifestId);

    const loadedState = store.getState();
    expect(loadedState.dereferenced).toEqual({
      'http://dams.llgc.org.uk/iiif/newspaper/issue/3320640/manifest.json': {
        loading: false,
        requested: loadingState.dereferenced[manifestId].requested,
        resourceId:
          'http://dams.llgc.org.uk/iiif/newspaper/issue/3320640/manifest.json',
        ttl: 600,
      },
    });

    expect(Object.keys(store.getState().resources.manifests)).toEqual([
      'http://dams.llgc.org.uk/iiif/newspaper/issue/3320640/manifest.json',
    ]);
    expect(Object.keys(store.getState().resources.canvases)).toEqual([
      'http://dams.llgc.org.uk/iiif/3320640/canvas/3320641',
      'http://dams.llgc.org.uk/iiif/3320640/canvas/3320642',
      'http://dams.llgc.org.uk/iiif/3320640/canvas/3320643',
      'http://dams.llgc.org.uk/iiif/3320640/canvas/3320644',
    ]);

    expect(
      manifestByIdSelector(currentManifest => currentManifest.getLabel, {
        getId: () => manifestId,
      })(store.getState())
    ).toEqual({ '@none': ['Cambrian (1804-01-28)'] });
  });

  it('should load manifest when selected', async () => {
    const store = createStore();

    fetch.mockResponseOnce(JSON.stringify(bridges));

    store.dispatch(
      selectManifest({
        id: 'https://view.nls.uk/manifest/7446/74464117/manifest.json',
      })
    );

    const loadingState = store.getState();
    expect(loadingState.dereferenced).toEqual({
      'https://view.nls.uk/manifest/7446/74464117/manifest.json': {
        loading: true,
        requested:
          loadingState.dereferenced[
            'https://view.nls.uk/manifest/7446/74464117/manifest.json'
          ].requested,
        resourceId: 'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ttl: 600,
      },
    });

    await waitForRequest(
      store,
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );

    const loadedState = store.getState();
    expect(loadedState.dereferenced).toEqual({
      'https://view.nls.uk/manifest/7446/74464117/manifest.json': {
        loading: false,
        requested:
          loadedState.dereferenced[
            'https://view.nls.uk/manifest/7446/74464117/manifest.json'
          ].requested,
        resourceId: 'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ttl: 600,
      },
    });

    expect(Object.keys(store.getState().resources.manifests)).toEqual([
      'https://view.nls.uk/manifest/7446/74464117/manifest.json',
    ]);

    expect(Object.keys(store.getState().resources.canvases)).toEqual([
      'https://view.nls.uk/iiif/7446/74464117/canvas/1',
      'https://view.nls.uk/iiif/7446/74464117/canvas/2',
      'https://view.nls.uk/iiif/7446/74464117/canvas/3',
      'https://view.nls.uk/iiif/7446/74464117/canvas/4',
      'https://view.nls.uk/iiif/7446/74464117/canvas/5',
      'https://view.nls.uk/iiif/7446/74464117/canvas/6',
      'https://view.nls.uk/iiif/7446/74464117/canvas/7',
      'https://view.nls.uk/iiif/7446/74464117/canvas/8',
      'https://view.nls.uk/iiif/7446/74464117/canvas/9',
      'https://view.nls.uk/iiif/7446/74464117/canvas/10',
      'https://view.nls.uk/iiif/7446/74464117/canvas/11',
      'https://view.nls.uk/iiif/7446/74464117/canvas/12',
      'https://view.nls.uk/iiif/7446/74464117/canvas/13',
      'https://view.nls.uk/iiif/7446/74464117/canvas/14',
      'https://view.nls.uk/iiif/7446/74464117/canvas/15',
      'https://view.nls.uk/iiif/7446/74464117/canvas/16',
      'https://view.nls.uk/iiif/7446/74464117/canvas/17',
      'https://view.nls.uk/iiif/7446/74464117/canvas/18',
      'https://view.nls.uk/iiif/7446/74464117/canvas/19',
      'https://view.nls.uk/iiif/7446/74464117/canvas/20',
      'https://view.nls.uk/iiif/7446/74464117/canvas/21',
      'https://view.nls.uk/iiif/7446/74464117/canvas/22',
      'https://view.nls.uk/iiif/7446/74464117/canvas/23',
      'https://view.nls.uk/iiif/7446/74464117/canvas/24',
      'https://view.nls.uk/iiif/7446/74464117/canvas/25',
      'https://view.nls.uk/iiif/7446/74464117/canvas/26',
      'https://view.nls.uk/iiif/7446/74464117/canvas/27',
      'https://view.nls.uk/iiif/7446/74464117/canvas/28',
      'https://view.nls.uk/iiif/7446/74464117/canvas/29',
      'https://view.nls.uk/iiif/7446/74464117/canvas/30',
      'https://view.nls.uk/iiif/7446/74464117/canvas/31',
      'https://view.nls.uk/iiif/7446/74464117/canvas/32',
      'https://view.nls.uk/iiif/7446/74464117/canvas/33',
      'https://view.nls.uk/iiif/7446/74464117/canvas/34',
      'https://view.nls.uk/iiif/7446/74464117/canvas/35',
      'https://view.nls.uk/iiif/7446/74464117/canvas/36',
      'https://view.nls.uk/iiif/7446/74464117/canvas/37',
      'https://view.nls.uk/iiif/7446/74464117/canvas/38',
      'https://view.nls.uk/iiif/7446/74464117/canvas/39',
      'https://view.nls.uk/iiif/7446/74464117/canvas/40',
    ]);

    expect(
      manifestByIdSelector(currentManifest => currentManifest.getLabel, {
        getId: () => 'https://view.nls.uk/manifest/7446/74464117/manifest.json',
      })(store.getState())
    ).toEqual([
      { '@language': 'en', '@value': 'Forth Bridge illustrations 1886-1887' },
    ]);
  });
});
