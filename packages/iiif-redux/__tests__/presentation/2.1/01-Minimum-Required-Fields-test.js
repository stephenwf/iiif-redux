import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/01/manifest';
import * as currentManifest from '../../../src/api/current-manifest';
import * as currentCanvas from '../../../src/api/current-canvas';
import { imageByIdSelector } from '../../../src/api/image';
import { createStoreAndImportManifest } from '../../../test-utils';

describe('iiif/presentation/2.1/01 Minimum Required Fields', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render all fields on manifest', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        manifest: createStructuredSelector({
          id: currentManifest.getId,
          type: currentManifest.getType,
          label: currentManifest.getLabel,
          within: currentManifest.getWithin,
          sequences: currentManifest.getSequences,
        }),
        canvas: createStructuredSelector({
          // Canvas
          id: currentCanvas.getId,
          label: currentCanvas.getLabel,
          height: currentCanvas.getHeight,
          width: currentCanvas.getWidth,
          images: currentCanvas.getImages,
          imageService: currentCanvas.getImageService,
          image: imageByIdSelector(
            image => ({
              id: image.getId,
              motivation: image.getMotivation,
              on: image.getOn,
              resource: image.getResource,
            }),
            () => 'https://23b7cac9e952d1868e598100cd25352f482db919'
          ),
        }),
      })(state)
    ).toMatchSnapshot();
  });
});
