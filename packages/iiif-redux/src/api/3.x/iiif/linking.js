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

const getHomepage = resource => resource.homepage;

const getPartOf = resource => resource.partOf;

const getStart = resource => resource.start;

const getSupplementary = resource => resource.supplementary;

const getLogo = resource => resource.logo;

export {
  getSeeAlso,
  getService,
  getLogo,
  getHomepage,
  getRendering,
  getPartOf,
  getStart,
  getSupplementary,
};
