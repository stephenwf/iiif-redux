import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/18/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import * as currentSequence from '../../../src/api/current-sequence';
import * as currentCanvas from '../../../src/api/current-canvas';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/18 Manifest: Non Standard Keys', () => {
  global.fetch = require('jest-fetch-mock');

  it('should ignore non-standard keys', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        label: currentManifest.getLabel,
        within: currentManifest.getWithin,
        sequence: createStructuredSelector({
          label: currentSequence.getLabel,
          type: currentSequence.getType,
          canvas: createStructuredSelector({
            id: currentCanvas.getId,
            type: currentCanvas.getType,
            label: currentCanvas.getLabel,
            height: currentCanvas.getHeight,
            width: currentCanvas.getWidth,
            images: currentCanvas.getImages,
          }),
        }),
      })(state)
    ).toMatchSnapshot();
  });
});
