import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/20/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import * as currentSequence from '../../../src/api/current-sequence';
import { createStoreAndImportManifest } from '../../../test-utils';
import { selectSequence } from '../../../src/spaces/routing';

describe('iiif/presentation/2.1/20 Manifest: Multiple Canvases', () => {
  global.fetch = require('jest-fetch-mock');

  it('should load first sequence', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    const sequenceIds = currentManifest.getSequenceIds(state);
    store.dispatch(selectSequence({ id: sequenceIds[0] }));

    expect(
      createStructuredSelector({
        label: currentSequence.getLabel,
        type: currentSequence.getType,
        canvases: currentSequence.getCanvasIds,
      })(store.getState())
    ).toMatchSnapshot();
  });

  it('should load second canvas', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    const sequenceIds = currentManifest.getSequenceIds(state);
    store.dispatch(selectSequence({ id: sequenceIds[1] }));

    expect(
      createStructuredSelector({
        label: currentSequence.getLabel,
        type: currentSequence.getType,
        canvases: currentSequence.getCanvasIds,
      })(store.getState())
    ).toMatchSnapshot();
  });
});
