import { PRESENTATION_2, PRESENTATION_3 } from '../constants/presentation';
import resourceSelectorFactory from '../utility/new/resourceSelectorFactory';
import presentation2Manifest from './2.x/manifest';
import presentation3Manifest from './3.x/manifest';
import { getAllManifests } from './all';
import resourceListSelectorFactory from '../utility/new/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/new/byIdSelectorFactory';

const manifest = resourceSelectorFactory(
  'manifests',
  {
    [PRESENTATION_2]: presentation2Manifest,
    [PRESENTATION_3]: presentation3Manifest,
  },
  PRESENTATION_2
);

export default manifest;

export const manifests = resourceListSelectorFactory(getAllManifests, manifest);

export const manifestByIdSelector = byIdSelectorFactory(manifest, 'manifests');
