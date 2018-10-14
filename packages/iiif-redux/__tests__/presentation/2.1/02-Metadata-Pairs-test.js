import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/02/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';
import { manifestByIdSelector } from '../../../src/api/manifest';

describe('iiif/presentation/2.1/02 Metadata pairs', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render metadata', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      manifestByIdSelector(
        currentManifest => ({
          metadata: currentManifest.getMetadata,
        }),
        {
          getId: () => testJson['@id'],
        }
      )(state)
    ).toMatchSnapshot();
  });
});
