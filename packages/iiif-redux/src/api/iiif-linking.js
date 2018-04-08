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
const getSeeAlso = resource => resource.seeAlso;

const getService = resource => resource.service;

const getRelated = resource => resource.related;

const getRendering = resource => resource.rendering;

const getWithin = resource => resource.within;

const getStartCanvas = resource => resource.startCanvas;

export {
  getSeeAlso,
  getService,
  getRelated,
  getRendering,
  getStartCanvas,
  getWithin,
};
