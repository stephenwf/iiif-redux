import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/12/manifest';
import { createStoreAndImportManifest } from '../../../test-utils';
import { manifestByIdSelector } from '../../../src/api/manifest';

describe('iiif/presentation/2.1/12 ViewingDirection l-t-r', () => {
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
