import { createStructuredSelector } from 'reselect';
import { manifestByIdSelector } from '../../../src/api/manifest';
import testJson from '../../fixtures/presentation/2.1/13/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/13 Manifest: ViewingDirection: t-t-b', () => {
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
