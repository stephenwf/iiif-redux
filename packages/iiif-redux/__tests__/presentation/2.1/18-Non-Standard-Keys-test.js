import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/18/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';
import { manifestByIdSelector } from '../../../src/api/manifest';
import { sequences } from '../../../src/api/sequence';
import { canvases } from '../../../src/api/canvas';

describe('iiif/presentation/2.1/18 Manifest: Non Standard Keys', () => {
  global.fetch = require('jest-fetch-mock');

  it('should ignore non-standard keys', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      manifestByIdSelector(
        currentManifest => ({
          label: currentManifest.getLabel,
          within: currentManifest.getWithin,
          sequence: sequences(
            currentManifest.getSequences,
            currentSequence => ({
              label: currentSequence.getLabel,
              type: currentSequence.getType,
              canvas: canvases(currentSequence.getCanvases, currentCanvas => ({
                id: currentCanvas.getId,
                type: currentCanvas.getType,
                label: currentCanvas.getLabel,
                height: currentCanvas.getHeight,
                width: currentCanvas.getWidth,
                images: currentCanvas.getImages,
              })),
            })
          ),
        }),
        {
          getId: () => testJson['@id'],
        }
      )(state)
    ).toMatchSnapshot();
  });
});
