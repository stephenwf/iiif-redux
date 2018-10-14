import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/09/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';
import { manifestByIdSelector } from '../../../src/api/manifest';

describe('iiif/presentation/2.1/09 Service link', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render service link', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      manifestByIdSelector(
        currentManifest => ({
          service: currentManifest.getService,
        }),
        {
          getId: () => testJson['@id'],
        }
      )(state)
    ).toMatchSnapshot();
  });
});
