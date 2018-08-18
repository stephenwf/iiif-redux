import {
  getLabel,
  getMetadata,
  getThumbnailId,
} from '../../2.x/iiif/descriptive';
import { getNavDate } from '../../2.x/iiif/technical';

const getSummary = resource => resource.summary || null;

const getRequiredStatement = resource => resource.requiredStatement || null;

const getRights = resource => resource.rights || null;

const getPosterCanvas = resource => resource.posterCanvas || null;

const getLanguage = resource => resource.language || null;

export {
  getLabel,
  getMetadata,
  getSummary,
  getThumbnailId,
  getPosterCanvas,
  getRequiredStatement,
  getRights,
  getNavDate,
  getLanguage,
};
