import { createStructuredSelector } from 'reselect';
import testJson from '../../fixtures/presentation/2.1/01/manifest';
import { annotationByIdSelector } from '../../../src/api/annotation';
import { createStoreAndImportManifest } from '../../../test-utils';
import { canvasByIdSelector } from '../../../src/api/canvas';
import { manifestByIdSelector } from '../../../src/api/manifest';

describe('iiif/presentation/2.1/01 Minimum Required Fields', () => {
  global.fetch = require('jest-fetch-mock');

  it('should render all fields on manifest', async () => {
    const store = await createStoreAndImportManifest(testJson);
    const state = store.getState();

    expect(
      createStructuredSelector({
        manifest: manifestByIdSelector(
          currentManifest => ({
            id: currentManifest.getId,
            type: currentManifest.getType,
            label: currentManifest.getLabel,
            within: currentManifest.getWithin,
            sequences: currentManifest.getSequences,
          }),
          {
            getId: () => testJson['@id'],
          }
        ),
        canvas: canvasByIdSelector(
          currentCanvas => ({
            // Canvas
            id: currentCanvas.getId,
            label: currentCanvas.getLabel,
            height: currentCanvas.getHeight,
            width: currentCanvas.getWidth,
            images: currentCanvas.getImages,
            imageService: currentCanvas.getImageService,
            image: annotationByIdSelector(
              image => ({
                id: image.getId,
                motivation: image.getMotivation,
                on: image.getOn,
                resource: image.getResource,
              }),
              {
                getId: () => 'https://23b7cac9e952d1868e598100cd25352f482db919',
              }
            ),
          }),
          {
            getId: () =>
              'http://iiif.io/api/presentation/2.1/example/fixtures/canvas/1/c1.json',
          }
        ),
      })(state)
    ).toMatchSnapshot();
  });
});
