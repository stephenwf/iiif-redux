import presentation2Manifest from './2.x/manifest';
import { getAllAnnotationLists } from './all';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';

const manifest = presentation2Manifest;

export default manifest;

export const manifests = resourceListSelectorFactory(
  getAllAnnotationLists,
  manifest
);

export const manifestByIdSelector = byIdSelectorFactory(manifest, 'manifests');
