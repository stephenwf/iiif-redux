import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/19/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import * as currentSequence from '../../../src/api/current-sequence';
import * as currentCanvas from '../../../src/api/current-canvas';
import { createStoreAndImportManifest } from '../../../test-utils';
import { selectCanvas } from '../../../src/spaces/routing';

describe('iiif/presentation/2.1/19 Manifest: Multiple Canvases', () => {
  global.fetch = require('jest-fetch-mock');

  it('should load first canvas', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    const canvasIds = currentSequence.getCanvasIds(state);
    store.dispatch(selectCanvas({ id: canvasIds[0] }));

    expect(
      createStructuredSelector({
        id: currentCanvas.getId,
        type: currentCanvas.getType,
        label: currentCanvas.getLabel,
        height: currentCanvas.getHeight,
        width: currentCanvas.getWidth,
        images: currentCanvas.getImages,
      })(store.getState())
    ).toMatchSnapshot();
  });

  it('should load second canvas', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    const canvasIds = currentSequence.getCanvasIds(state);
    store.dispatch(selectCanvas({ id: canvasIds[1] }));

    expect(
      createStructuredSelector({
        id: currentCanvas.getId,
        type: currentCanvas.getType,
        label: currentCanvas.getLabel,
        height: currentCanvas.getHeight,
        width: currentCanvas.getWidth,
        images: currentCanvas.getImages,
      })(store.getState())
    ).toMatchSnapshot();
  });
});
