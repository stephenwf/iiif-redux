import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/16/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/16 Manifest: ViewingHint: continuous', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render correct viewing hint', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        viewingHint: currentManifest.getViewingHint,
      })(state)
    ).toMatchSnapshot();
  });
});
