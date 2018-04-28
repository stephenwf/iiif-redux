import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/08/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/07 SeeAlso link', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render attribution + license', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        seeAlso: currentManifest.getSeeAlso,
      })(state)
    ).toMatchSnapshot();
  });
});
