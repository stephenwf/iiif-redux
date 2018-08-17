import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/14/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';
import { manifestByIdSelector } from '../../../src/api/manifest';

describe('iiif/presentation/2.1/14 Manifest: ViewingDirection: b-t-t', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render correct viewing direction', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      manifestByIdSelector(
        currentManifest => ({
          service: currentManifest.getViewingDirection,
        }),
        {
          getId: () => testJson['@id'],
        }
      )(state)
    ).toMatchSnapshot();
  });
});
