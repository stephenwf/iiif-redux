import { getAllExternalResources } from './all';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';
import presentation2ExternalResource from './2.x/external-resource';

const externalResource = presentation2ExternalResource;

export default externalResource;

export const externalResources = resourceListSelectorFactory(
  getAllExternalResources,
  externalResource
);

export const externalResourceByIdSelector = byIdSelectorFactory(
  externalResource,
  'externalResources'
);
