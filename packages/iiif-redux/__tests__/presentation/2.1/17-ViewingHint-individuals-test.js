import { createStructuredSelector } from 'reselect';
import { manifestByIdSelector } from '../../../src/api/manifest';
import testJson from '../../fixtures/presentation/2.1/17/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/17 Manifest: ViewingHint: individuals', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render correct viewing hint', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      manifestByIdSelector(
        currentManifest => ({
          viewingHint: currentManifest.getViewingHint,
        }),
        {
          getId: () => testJson['@id'],
        }
      )(state)
    ).toMatchSnapshot();
  });
});
