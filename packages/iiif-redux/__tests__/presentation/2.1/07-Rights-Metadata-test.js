import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/07/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';
import { manifestByIdSelector } from '../../../src/api/manifest';

describe('iiif/presentation/2.1/07 Rights Metadata', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render attribution + license', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      manifestByIdSelector(
        currentManifest => ({
          attribution: currentManifest.getAttribution,
          license: currentManifest.getLicense,
        }),
        {
          getId: () => testJson['@id'],
        }
      )(state)
    ).toMatchSnapshot();
  });
});
