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

export type LinkedResource = Array<string>;

export interface LinkingProperties {
  seeAlso?: LinkedResource;
  service?: LinkedResource;
  related?: LinkedResource;
  rendering?: LinkedResource;
  within?: LinkedResource;
  startCanvas?: LinkedResource;
}

const getSeeAlso = (resource: LinkingProperties): LinkedResource =>
  resource.seeAlso || [];

const getService = (resource: LinkingProperties): LinkedResource =>
  resource.service || [];

const getRelated = (resource: LinkingProperties): LinkedResource =>
  resource.related || [];

const getRendering = (resource: LinkingProperties): LinkedResource =>
  resource.rendering || [];

const getWithin = (resource: LinkingProperties): LinkedResource =>
  resource.within || [];

const getStartCanvas = (resource: LinkingProperties): LinkedResource =>
  resource.startCanvas || [];

export {
  getSeeAlso,
  getService,
  getRelated,
  getRendering,
  getStartCanvas,
  getWithin,
};
