import {
  getLabel,
  getMetadata,
  getThumbnailId,
} from '../../2.x/iiif/descriptive';
import { getNavDate } from '../../2.x/iiif/technical';

const getSummary = resource => resource.summary;

const getRequiredStatement = resource => resource.requiredStatement;

const getRights = resource => resource.rights;

const getPosterCanvas = resource => resource.posterCanvas;

const getLanguage = resource => resource.language;

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
