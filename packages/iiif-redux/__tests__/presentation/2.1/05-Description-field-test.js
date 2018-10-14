import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/05/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';
import { manifestByIdSelector } from '../../../src/api/manifest';

describe('iiif/presentation/2.1/05 Description field', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render description', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      manifestByIdSelector(
        currentManifest => ({
          description: currentManifest.getDescription,
        }),
        {
          getId: () => testJson['@id'],
        }
      )(state)
    ).toMatchSnapshot();
  });
});
