import normalizeLinkedResourceToObject from './normalizeLinkedResourceToObject';
import memoize from 'lodash.memoize';
import validUrl from 'valid-url';

const normalizeLinkedResources = memoize(property => {
  if (!property) {
    return [];
  }
  if (typeof property === 'string') {
    if (!validUrl.isWebUri(property)) {
      return null;
    }
    return [{ '@id': property }];
  }
  if (Array.isArray(property)) {
    return property
      .map(prop => normalizeLinkedResourceToObject(prop))
      .reduce((a, b) => a.concat(b), [])
      .filter(e => e);
  }
  return normalizeLinkedResourceToObject(property);
});

export default normalizeLinkedResources;
