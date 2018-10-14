import { createStructuredSelector } from 'reselect';
import { canvases } from '../../../src/api/canvas';
import { manifestByIdSelector } from '../../../src/api/manifest';
import { sequences } from '../../../src/api/sequence';
import testJson from '../../fixtures/presentation/2.1/19/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';
import { selectCanvas } from '../../../src/spaces/routing';

describe('iiif/presentation/2.1/19 Manifest: Multiple Canvases', () => {
  global.fetch = require('jest-fetch-mock');

  it('should load both canvases', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      manifestByIdSelector(
        currentManifest =>
          sequences(currentManifest.getSequences, currentSequence =>
            canvases(currentSequence.getCanvases, currentCanvas => ({
              id: currentCanvas.getId,
              type: currentCanvas.getType,
              label: currentCanvas.getLabel,
              height: currentCanvas.getHeight,
              width: currentCanvas.getWidth,
              images: currentCanvas.getImages,
            }))
          ),
        {
          getId: () => testJson['@id'],
        }
      )(state)
    ).toMatchSnapshot();
  });
});
