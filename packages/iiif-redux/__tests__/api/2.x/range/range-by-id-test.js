import { rangeByIdSelector, ranges } from '../../../../src/api/range';
import bridges from '../../../fixtures/bridges';
import createStore from '../../../../src/createStore';
import { iiifResourceRequest } from '../../../../src/spaces/iiif-resource';
import { manifest } from '../../../../src/schema/presentation2';
import { waitForRequest } from '../../../../test-utils';
import { canvases } from '../../../../src/api/canvas';

describe('iiif/api/2.x/range/range-by-id', () => {
  global.fetch = require('jest-fetch-mock');

  it('should be able to generate selector for any range', async () => {
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

    await whenRequestFinishes;

    const state = store.getState();

    function mapRange(rangeApi) {
      return {
        id: rangeApi.getId,
        type: rangeApi.getType,
        label: rangeApi.getLabel,
        ranges: ranges(rangeApi.getRanges, mapRange),
        canvases: canvases(rangeApi.getCanvases, canvasApi => ({
          id: canvasApi.getId,
          type: canvasApi.getType,
          label: canvasApi.getLabel,
        })),
      };
    }

    const select = rangeByIdSelector(mapRange);

    expect(
      select(state, {
        id: 'https://view.nls.uk/iiif/7446/74464117/range/custom-ranges',
      })
    ).toEqual({
      id: 'https://view.nls.uk/iiif/7446/74464117/range/custom-ranges',
      type: 'sc:Range',
      label: [{ '@language': 'en', '@value': 'Custom range with members' }],
      canvases: [
        {
          id: 'https://view.nls.uk/iiif/7446/74464117/canvas/1',
          type: 'sc:Canvas',
          label: [{ '@language': 'en', '@value': '1' }],
        },
        {
          id: 'https://view.nls.uk/iiif/7446/74464117/canvas/2',
          type: 'sc:Canvas',
          label: [{ '@language': 'en', '@value': '2' }],
        },
        {
          id: 'https://view.nls.uk/iiif/7446/74464117/canvas/3',
          type: 'sc:Canvas',
          label: [{ '@language': 'en', '@value': '3' }],
        },
        {
          id: 'https://view.nls.uk/iiif/7446/74464117/canvas/4',
          type: 'sc:Canvas',
          label: [{ '@language': 'en', '@value': '4' }],
        },
      ],
      ranges: [
        {
          id: 'https://view.nls.uk/iiif/7446/74464117/range/custom',
          type: 'sc:Range',
          label: [
            {
              '@language': 'en',
              '@value': 'Custom range with canvases and ranges',
            },
          ],
          canvases: [
            {
              id: 'https://view.nls.uk/iiif/7446/74464117/canvas/5',
              label: [{ '@language': 'en', '@value': '5' }],
              type: 'sc:Canvas',
            },
            {
              id: 'https://view.nls.uk/iiif/7446/74464117/canvas/6',
              label: [{ '@language': 'en', '@value': '6' }],
              type: 'sc:Canvas',
            },
            {
              id: 'https://view.nls.uk/iiif/7446/74464117/canvas/7',
              label: [{ '@language': 'en', '@value': '7' }],
              type: 'sc:Canvas',
            },
            {
              id: 'https://view.nls.uk/iiif/7446/74464117/canvas/8',
              label: [{ '@language': 'en', '@value': '8' }],
              type: 'sc:Canvas',
            },
          ],
          ranges: [
            {
              id: 'https://view.nls.uk/iiif/7446/74464117/range/r-3',
              label: [
                {
                  '@language': 'en',
                  '@value': 'No. 3 - Superstructure, Fife, 15 Sept. 1886',
                },
              ],
              canvases: [
                {
                  id: 'https://view.nls.uk/iiif/7446/74464117/canvas/3',
                  label: [{ '@language': 'en', '@value': '3' }],
                  type: 'sc:Canvas',
                },
              ],
              ranges: [],
              type: 'sc:Range',
            },
            {
              id: 'https://view.nls.uk/iiif/7446/74464117/range/r-4',
              type: 'sc:Range',
              label: [
                {
                  '@language': 'en',
                  '@value': 'No. 4 - Superstructure, North Side',
                },
              ],
              canvases: [
                {
                  id: 'https://view.nls.uk/iiif/7446/74464117/canvas/4',
                  label: [{ '@language': 'en', '@value': '4' }],
                  type: 'sc:Canvas',
                },
              ],
              ranges: [],
            },
          ],
        },
      ],
    });
  });
});
