/**
 * IIIF Linking API
 * ============================================================================
 * This section is still a work in progress. Its not clear what will be
 * normalized on the way into the redux state.
 *
 * - getSeeAlso
 * - getService
 * - getRelated
 * - getRendering
 * - getWithin
 * - getStartCanvas
 */
import memoize from 'lodash.memoize';
import validUrl from 'valid-url';

const preprocessLinkedEntities = (value, parent, key) => {
  return Object.entries(value).reduce((acc, [entryKey, entryValue]) => {
    switch (entryKey) {
      case 'seeAlso':
      case 'service':
      case 'related':
      case 'rendering':
      case 'within':
        acc[entryKey] = normalizeLinkedResources(entryValue);
        break;

      case 'startCanvas':
      case 'first':
      case 'last':
      case 'next':
      case 'prev':
        const resource = normalizeLinkedResources(entryValue);
        acc[entryKey] = resource ? resource[0] : null;
        break;

      default:
        acc[entryKey] = entryValue;
        break;
    }
    return acc;
  }, {});
};

const normalizeLinkedResourceToObject = memoize(property => {
  if (!property) {
    return null;
  }
  if (typeof property === 'string') {
    if (!validUrl.isWebUri(property)) {
      return null;
    }
    return [{ '@id': property }];
  }
  if (Array.isArray(property)) {
    return normalizeLinkedResourceToObject(property[0]); // only allow one value?
  }
  if (property['@value'] || property['@id']) {
    // presentation 2.
    return [property];
  }
  return null;
});

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

const getSeeAlso = resource => resource.seeAlso;

const getService = resource => resource.service;

const getRelated = resource => resource.related;

const getRendering = resource => resource.rendering;

const getWithin = resource => resource.within;

const getStartCanvas = resource => resource.startCanvas;

export {
  preprocessLinkedEntities,
  normalizeLinkedResources,
  normalizeLinkedResourceToObject,
  getSeeAlso,
  getService,
  getRelated,
  getRendering,
  getStartCanvas,
  getWithin,
};
