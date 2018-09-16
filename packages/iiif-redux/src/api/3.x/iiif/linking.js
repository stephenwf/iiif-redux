/**
 * - seeAlso
 * - service
 * - logo
 * - homepage
 * - rendering
 * - partOf
 * - start
 * - supplementary
 */

import { getSeeAlso, getService, getRendering } from '../../2.x/iiif/linking';

const getHomepage = resource => resource.homepage || null;

const getPartOf = resource => resource.partOf || null;

const getStart = resource => resource.start || null;

const getSupplementary = resource => resource.supplementary;

const getLogo = resource => resource.logo || [];

const getBody = resource => resource.body || [];

const getTarget = resource => resource.target || [];

export {
  getSeeAlso,
  getService,
  getLogo,
  getHomepage,
  getRendering,
  getPartOf,
  getStart,
  getSupplementary,
  getBody,
  getTarget,
};
