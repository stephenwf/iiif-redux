import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/05/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/05 Description field', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render description', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        description: currentManifest.getDescription,
      })(state)
    ).toMatchSnapshot();
  });
});
