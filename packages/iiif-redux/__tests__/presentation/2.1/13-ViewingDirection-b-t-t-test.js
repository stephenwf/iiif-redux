import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/14/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/14 Manifest: ViewingDirection: b-t-t', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render correct viewing direction', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        service: currentManifest.getViewingDirection,
      })(state)
    ).toMatchSnapshot();
  });
});
