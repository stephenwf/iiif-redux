import { createStructuredSelector } from 'reselect';
import { manifestByIdSelector } from '../../../src/api/manifest';
import { sequences } from '../../../src/api/sequence';
import testJson from '../../fixtures/presentation/2.1/20/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/20 Manifest: Multiple Canvases', () => {
  global.fetch = require('jest-fetch-mock');

  it('should load both sequences', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      manifestByIdSelector(
        currentManifest =>
          sequences(currentManifest.getSequences, currentSequence => ({
            label: currentSequence.getLabel,
            type: currentSequence.getType,
            canvases: currentSequence.getCanvasIds,
          })),
        {
          getId: () => testJson['@id'],
        }
      )(state)
    ).toMatchSnapshot();
  });
});
