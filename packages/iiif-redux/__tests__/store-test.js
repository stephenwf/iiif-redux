import { createStructuredSelector, createSelector } from 'reselect';
import createStore from '../src/createStore';
import bridges from './fixtures/bridges';
import { iiifResourceRequest } from '../src/spaces/iiif-resource';
import { manifest } from '../src/schema/presentation2';
import * as currentManifest from '../src/api/current-manifest';
import * as currentSequence from '../src/api/current-sequence';
import * as currentCanvas from '../src/api/current-canvas';
import * as descriptive from '../src/api/iiif-descriptive';
import { getDefaultLanguage } from '../src/api/config';
import { getImageService } from '../src/api/current-canvas';

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

describe('store', () => {
  global.fetch = require('jest-fetch-mock');

  it('should have default state', () => {
    const store = createStore();
    expect(store.getState()).toEqual({ dereferenced: {} });
  });

  it('should throw an error if actions are not passed through', () => {
    const store = createStore();
    store.dispatch(
      iiifResourceRequest(
        'https://view.nls.uk/manifest/7446/74464117/manifest.json',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS'],
        manifest
      )
    );

    const state = store.getState();
    expect(state).toEqual({
      dereferenced: {
        'https://view.nls.uk/manifest/7446/74464117/manifest.json': {
          loading: false,
          requested:
            state.dereferenced[
              'https://view.nls.uk/manifest/7446/74464117/manifest.json'
            ].requested,
          error: 'DEV ERROR: You must pass in exactly 3 action types',
          resourceId:
            'https://view.nls.uk/manifest/7446/74464117/manifest.json',
          ttl: 600,
        },
      },
    });
  });

  it('should set error in state when request errors', async () => {
    const store = createStore();
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
    expect(state).toEqual({
      dereferenced: {
        'https://view.nls.uk/manifest/7446/74464117/manifest.json': {
          error: 'Excepted error found',
          loading: false,
          requested:
            state.dereferenced[
              'https://view.nls.uk/manifest/7446/74464117/manifest.json'
            ].requested,
          resourceId:
            'https://view.nls.uk/manifest/7446/74464117/manifest.json',
          ttl: 600,
        },
      },
    });
  });

  it('should set error in state when malformed url is given', () => {
    const store = createStore();
    store.dispatch(
      iiifResourceRequest(
        'not-real-url',
        ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
        manifest
      )
    );

    const state = store.getState();

    expect(state).toEqual({
      dereferenced: {
        'not-real-url': {
          loading: false,
          error: 'Resource is not a valid Web URI.',
          requested: state.dereferenced['not-real-url'].requested,
          resourceId: 'not-real-url',
          ttl: 600,
        },
      },
    });
  });

  it('should import a manifest', async () => {
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

    const secondState = store.getState();
    expect(Object.keys(secondState)).toEqual([
      'dereferenced',
      'services',
      'imageResources',
      'annotations',
      'canvases',
      'sequences',
      'ranges',
      'externalResources',
      'manifests',
    ]);
    expect(Object.keys(secondState.services)).toEqual([
      'https://view.nls.uk/iiif/7443/74438561.5',
      'https://view.nls.uk/iiif/7443/74438562.5',
      'https://view.nls.uk/iiif/7443/74438654.5',
      'https://view.nls.uk/iiif/7443/74438655.5',
      'https://view.nls.uk/iiif/7443/74438656.5',
      'https://view.nls.uk/iiif/7443/74438657.5',
      'https://view.nls.uk/iiif/7443/74438658.5',
      'https://view.nls.uk/iiif/7443/74438659.5',
      'https://view.nls.uk/iiif/7443/74438660.5',
      'https://view.nls.uk/iiif/7443/74438661.5',
      'https://view.nls.uk/iiif/7443/74438662.5',
      'https://view.nls.uk/iiif/7443/74438663.5',
      'https://view.nls.uk/iiif/7443/74438664.5',
      'https://view.nls.uk/iiif/7443/74438665.5',
      'https://view.nls.uk/iiif/7443/74438666.5',
      'https://view.nls.uk/iiif/7443/74438667.5',
      'https://view.nls.uk/iiif/7443/74438668.5',
      'https://view.nls.uk/iiif/7443/74438669.5',
      'https://view.nls.uk/iiif/7443/74438670.5',
      'https://view.nls.uk/iiif/7443/74438671.5',
      'https://view.nls.uk/iiif/7443/74438672.5',
      'https://view.nls.uk/iiif/7443/74438673.5',
      'https://view.nls.uk/iiif/7443/74438674.5',
      'https://view.nls.uk/iiif/7443/74438675.5',
      'https://view.nls.uk/iiif/7443/74438676.5',
      'https://view.nls.uk/iiif/7443/74438677.5',
      'https://view.nls.uk/iiif/7443/74438678.5',
      'https://view.nls.uk/iiif/7443/74438679.5',
      'https://view.nls.uk/iiif/7443/74438680.5',
      'https://view.nls.uk/iiif/7443/74438681.5',
      'https://view.nls.uk/iiif/7443/74438682.5',
      'https://view.nls.uk/iiif/7443/74438683.5',
      'https://view.nls.uk/iiif/7443/74438684.5',
      'https://view.nls.uk/iiif/7443/74438685.5',
      'https://view.nls.uk/iiif/7443/74438686.5',
      'https://view.nls.uk/iiif/7443/74438687.5',
      'https://view.nls.uk/iiif/7443/74439048.5',
      'https://view.nls.uk/iiif/7443/74439050.5',
      'https://view.nls.uk/iiif/7443/74439051.5',
      'https://view.nls.uk/iiif/7443/74439052.5',
    ]);
    expect(Object.keys(secondState.manifests)).toEqual([
      'https://view.nls.uk/manifest/7446/74464117/manifest.json',
    ]);
    expect(Object.keys(secondState.canvases)).toEqual([
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
    expect(Object.keys(secondState.annotations)).toEqual([
      'https://view.nls.uk/iiif/7443/74438561.5/annotation',
      'https://view.nls.uk/iiif/7443/74438562.5/annotation',
      'https://view.nls.uk/iiif/7443/74438654.5/annotation',
      'https://view.nls.uk/iiif/7443/74438655.5/annotation',
      'https://view.nls.uk/iiif/7443/74438656.5/annotation',
      'https://view.nls.uk/iiif/7443/74438657.5/annotation',
      'https://view.nls.uk/iiif/7443/74438658.5/annotation',
      'https://view.nls.uk/iiif/7443/74438659.5/annotation',
      'https://view.nls.uk/iiif/7443/74438660.5/annotation',
      'https://view.nls.uk/iiif/7443/74438661.5/annotation',
      'https://view.nls.uk/iiif/7443/74438662.5/annotation',
      'https://view.nls.uk/iiif/7443/74438663.5/annotation',
      'https://view.nls.uk/iiif/7443/74438664.5/annotation',
      'https://view.nls.uk/iiif/7443/74438665.5/annotation',
      'https://view.nls.uk/iiif/7443/74438666.5/annotation',
      'https://view.nls.uk/iiif/7443/74438667.5/annotation',
      'https://view.nls.uk/iiif/7443/74438668.5/annotation',
      'https://view.nls.uk/iiif/7443/74438669.5/annotation',
      'https://view.nls.uk/iiif/7443/74438670.5/annotation',
      'https://view.nls.uk/iiif/7443/74438671.5/annotation',
      'https://view.nls.uk/iiif/7443/74438672.5/annotation',
      'https://view.nls.uk/iiif/7443/74438673.5/annotation',
      'https://view.nls.uk/iiif/7443/74438674.5/annotation',
      'https://view.nls.uk/iiif/7443/74438675.5/annotation',
      'https://view.nls.uk/iiif/7443/74438676.5/annotation',
      'https://view.nls.uk/iiif/7443/74438677.5/annotation',
      'https://view.nls.uk/iiif/7443/74438678.5/annotation',
      'https://view.nls.uk/iiif/7443/74438679.5/annotation',
      'https://view.nls.uk/iiif/7443/74438680.5/annotation',
      'https://view.nls.uk/iiif/7443/74438681.5/annotation',
      'https://view.nls.uk/iiif/7443/74438682.5/annotation',
      'https://view.nls.uk/iiif/7443/74438683.5/annotation',
      'https://view.nls.uk/iiif/7443/74438684.5/annotation',
      'https://view.nls.uk/iiif/7443/74438685.5/annotation',
      'https://view.nls.uk/iiif/7443/74438686.5/annotation',
      'https://view.nls.uk/iiif/7443/74438687.5/annotation',
      'https://view.nls.uk/iiif/7443/74439048.5/annotation',
      'https://view.nls.uk/iiif/7443/74439050.5/annotation',
      'https://view.nls.uk/iiif/7443/74439051.5/annotation',
      'https://view.nls.uk/iiif/7443/74439052.5/annotation',
    ]);
    expect(Object.keys(secondState.imageResources)).toEqual([
      'https://view.nls.uk/iiif/7443/74438561.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438561.4.jpg',
      'https://view.nls.uk/iiif/7443/74438562.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438562.4.jpg',
      'https://view.nls.uk/iiif/7443/74438654.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438654.4.jpg',
      'https://view.nls.uk/iiif/7443/74438655.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438655.4.jpg',
      'https://view.nls.uk/iiif/7443/74438656.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438656.4.jpg',
      'https://view.nls.uk/iiif/7443/74438657.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438657.4.jpg',
      'https://view.nls.uk/iiif/7443/74438658.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438658.4.jpg',
      'https://view.nls.uk/iiif/7443/74438659.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438659.4.jpg',
      'https://view.nls.uk/iiif/7443/74438660.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438660.4.jpg',
      'https://view.nls.uk/iiif/7443/74438661.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438661.4.jpg',
      'https://view.nls.uk/iiif/7443/74438662.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438662.4.jpg',
      'https://view.nls.uk/iiif/7443/74438663.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438663.4.jpg',
      'https://view.nls.uk/iiif/7443/74438664.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438664.4.jpg',
      'https://view.nls.uk/iiif/7443/74438665.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438665.4.jpg',
      'https://view.nls.uk/iiif/7443/74438666.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438666.4.jpg',
      'https://view.nls.uk/iiif/7443/74438667.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438667.4.jpg',
      'https://view.nls.uk/iiif/7443/74438668.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438668.4.jpg',
      'https://view.nls.uk/iiif/7443/74438669.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438669.4.jpg',
      'https://view.nls.uk/iiif/7443/74438670.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438670.4.jpg',
      'https://view.nls.uk/iiif/7443/74438671.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438671.4.jpg',
      'https://view.nls.uk/iiif/7443/74438672.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438672.4.jpg',
      'https://view.nls.uk/iiif/7443/74438673.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438673.4.jpg',
      'https://view.nls.uk/iiif/7443/74438674.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438674.4.jpg',
      'https://view.nls.uk/iiif/7443/74438675.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438675.4.jpg',
      'https://view.nls.uk/iiif/7443/74438676.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438676.4.jpg',
      'https://view.nls.uk/iiif/7443/74438677.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438677.4.jpg',
      'https://view.nls.uk/iiif/7443/74438678.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438678.4.jpg',
      'https://view.nls.uk/iiif/7443/74438679.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438679.4.jpg',
      'https://view.nls.uk/iiif/7443/74438680.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438680.4.jpg',
      'https://view.nls.uk/iiif/7443/74438681.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438681.4.jpg',
      'https://view.nls.uk/iiif/7443/74438682.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438682.4.jpg',
      'https://view.nls.uk/iiif/7443/74438683.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438683.4.jpg',
      'https://view.nls.uk/iiif/7443/74438684.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438684.4.jpg',
      'https://view.nls.uk/iiif/7443/74438685.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438685.4.jpg',
      'https://view.nls.uk/iiif/7443/74438686.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438686.4.jpg',
      'https://view.nls.uk/iiif/7443/74438687.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74438687.4.jpg',
      'https://view.nls.uk/iiif/7443/74439048.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74439048.4.jpg',
      'https://view.nls.uk/iiif/7443/74439050.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74439050.4.jpg',
      'https://view.nls.uk/iiif/7443/74439051.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74439051.4.jpg',
      'https://view.nls.uk/iiif/7443/74439052.5/full/full/0/native.jpg',
      'https://deriv.nls.uk/dcn4/7443/74439052.4.jpg',
    ]);

    expect(Object.keys(secondState.sequences)).toEqual([
      'https://view.nls.uk/manifest/7446/74464117/canvas/default',
    ]);
    expect(Object.keys(secondState.ranges)).toEqual([
      'https://view.nls.uk/iiif/7446/74464117/range/r-1',
      'https://view.nls.uk/iiif/7446/74464117/range/r-2',
      'https://view.nls.uk/iiif/7446/74464117/range/r-3',
      'https://view.nls.uk/iiif/7446/74464117/range/r-4',
      'https://view.nls.uk/iiif/7446/74464117/range/r-5',
      'https://view.nls.uk/iiif/7446/74464117/range/r-6',
      'https://view.nls.uk/iiif/7446/74464117/range/r-7',
      'https://view.nls.uk/iiif/7446/74464117/range/r-8',
      'https://view.nls.uk/iiif/7446/74464117/range/r-9',
      'https://view.nls.uk/iiif/7446/74464117/range/r-10',
      'https://view.nls.uk/iiif/7446/74464117/range/r-11',
      'https://view.nls.uk/iiif/7446/74464117/range/r-12',
      'https://view.nls.uk/iiif/7446/74464117/range/r-13',
      'https://view.nls.uk/iiif/7446/74464117/range/r-14',
      'https://view.nls.uk/iiif/7446/74464117/range/r-15',
      'https://view.nls.uk/iiif/7446/74464117/range/r-16',
      'https://view.nls.uk/iiif/7446/74464117/range/r-17',
      'https://view.nls.uk/iiif/7446/74464117/range/r-18',
      'https://view.nls.uk/iiif/7446/74464117/range/r-19',
      'https://view.nls.uk/iiif/7446/74464117/range/r-20',
      'https://view.nls.uk/iiif/7446/74464117/range/r-21',
      'https://view.nls.uk/iiif/7446/74464117/range/r-22',
      'https://view.nls.uk/iiif/7446/74464117/range/r-23',
      'https://view.nls.uk/iiif/7446/74464117/range/r-24',
      'https://view.nls.uk/iiif/7446/74464117/range/r-25',
      'https://view.nls.uk/iiif/7446/74464117/range/r-26',
      'https://view.nls.uk/iiif/7446/74464117/range/r-27',
      'https://view.nls.uk/iiif/7446/74464117/range/r-28',
      'https://view.nls.uk/iiif/7446/74464117/range/r-29',
      'https://view.nls.uk/iiif/7446/74464117/range/r-30',
      'https://view.nls.uk/iiif/7446/74464117/range/r-31',
      'https://view.nls.uk/iiif/7446/74464117/range/r-32',
      'https://view.nls.uk/iiif/7446/74464117/range/r-33',
      'https://view.nls.uk/iiif/7446/74464117/range/r-34',
      'https://view.nls.uk/iiif/7446/74464117/range/r-35',
      'https://view.nls.uk/iiif/7446/74464117/range/r-36',
      'https://view.nls.uk/iiif/7446/74464117/range/r-37',
      'https://view.nls.uk/iiif/7446/74464117/range/r-38',
      'https://view.nls.uk/iiif/7446/74464117/range/r-39',
      'https://view.nls.uk/iiif/7446/74464117/range/r-40',
    ]);

    expect(Object.keys(secondState.externalResources)).toEqual([
      'http://seealso.com/page-1.json',
      'http://seealso.com/page-2.json',
      'http://seealso.com/page-3.json',
    ]);
  });

  it('should create state that works with selectors', async () => {
    const store = createStore({}, [], [], {
      config: {
        defaultLanguage: 'en',
      },
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
      canvasThumbnails: createSelector(
        currentSequence.getCanvases,
        getDefaultLanguage,
        (canvases, lang) =>
          canvases.map(
            createStructuredSelector({
              label: descriptive.getLabel(lang),
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
                'You have permission to make copies of this work under the <a target="_top" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International Licence</a> unless otherwise stated.',
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
});
