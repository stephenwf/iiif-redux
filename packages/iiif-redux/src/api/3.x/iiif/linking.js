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
import { getLogo } from '../../2.x/iiif/descriptive';

const getHomepage = resource => resource.homepage;

const getPartOf = resource => resource.partOf;

const getStart = resource => resource.start;

const getSupplementary = resource => resource.supplementary;

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
