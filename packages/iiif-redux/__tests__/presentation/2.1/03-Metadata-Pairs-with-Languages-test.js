import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/03/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/03 Metadata pairs with Languages', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render metadata with languages', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        metadata: currentManifest.getMetadata,
      })(state)
    ).toMatchSnapshot();
  });
});
