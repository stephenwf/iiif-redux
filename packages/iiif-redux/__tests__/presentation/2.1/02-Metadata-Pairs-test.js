import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/02/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/02 Metadata pairs', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render metadata', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        metadata: currentManifest.getMetadata,
      })(state)
    ).toMatchSnapshot();
  });
});
