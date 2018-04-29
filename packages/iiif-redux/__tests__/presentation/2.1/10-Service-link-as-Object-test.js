import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/10/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/10 Service link as Object', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render service link', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        service: currentManifest.getService,
      })(state)
    ).toMatchSnapshot();
  });
});
