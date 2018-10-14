import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/03/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';
import { manifestByIdSelector } from '../../../src/api/manifest';

describe('iiif/presentation/2.1/03 Metadata pairs with Languages', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render metadata with languages', async () => {
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
