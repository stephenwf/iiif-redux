import { createSelector, OutputSelector } from 'reselect';
import * as technical from './iiif-technical';
import { TechnicalProperties } from './iiif-technical';
import { DescriptiveProperties, Language, Logo } from './iiif-descriptive';
import { getAllImages } from './all';
import { getCurrentCanvas } from './current';
import * as descriptive from './iiif-descriptive';

interface CanvasFactory {
  // Technical
  getId: OutputSelector<{}, string, (res: TechnicalProperties) => string>;
  getType: OutputSelector<{}, string, (res: TechnicalProperties) => string>;
  getViewingHint: OutputSelector<
    {},
    string | null,
    (res: TechnicalProperties) => string | null
  >;
  getHeight: OutputSelector<{}, number, (res: TechnicalProperties) => number>;
  getWidth: OutputSelector<{}, number, (res: TechnicalProperties) => number>;

  // Descriptive.
  getLabel: OutputSelector<
    {},
    Language,
    (res: DescriptiveProperties) => Language
  >;
  getDescription: OutputSelector<
    {},
    Language,
    (res: DescriptiveProperties) => Language
  >;
  getAttribution: OutputSelector<
    {},
    Language,
    (res: DescriptiveProperties) => Language
  >;
  getMetadata: OutputSelector<
    {},
    Language,
    (res: DescriptiveProperties) => Language
  >;
  getThumbnailId: OutputSelector<
    {},
    string | Array<string>,
    (res: DescriptiveProperties) => string | Array<string>
  >;
  getLicense: OutputSelector<
    {},
    Array<string>,
    (res: DescriptiveProperties) => Array<string>
  >;
  getLogo: OutputSelector<
    {},
    Logo | Array<Logo> | string | Array<string>,
    (res: DescriptiveProperties) => Logo | Array<Logo> | string | Array<string>
  >;
}

type CanvasSelector = () => any;

function createCanvasSelectors(canvasSelector: CanvasSelector): CanvasFactory {
  /**************************************************
   * Technical properties
   *
   * - getId
   * - getType
   * - getViewingHint
   * - getHeight
   * - getWidth
   **************************************************/

  const getId = createSelector(canvasSelector, technical.getId);

  const getType = createSelector(canvasSelector, technical.getType);

  const getViewingHint = createSelector(
    canvasSelector,
    technical.getWhitelistedViewingHint(['non-paged', 'facing-pages'])
  );

  const getHeight = createSelector(canvasSelector, technical.getHeight);

  const getWidth = createSelector(canvasSelector, technical.getWidth);

  /**************************************************
   * Descriptive properties
   *
   * - getLabel
   * - getMetadata
   * - getDescription
   * - getThumbnail
   * - getAttribution
   * - getLicense
   * - getLogo
   **************************************************/

  const getLabel = createSelector(getCurrentCanvas, descriptive.getLabel);

  const getDescription = createSelector(
    getCurrentCanvas,
    descriptive.getDescription
  );

  const getMetadata = createSelector(getCurrentCanvas, descriptive.getMetadata);

  const getAttribution = createSelector(
    getCurrentCanvas,
    descriptive.getAttribution
  );

  const getLogo = createSelector(getCurrentCanvas, descriptive.getLogo);

  const getLicense = createSelector(getCurrentCanvas, descriptive.getLicense);

  const getThumbnailId = createSelector(
    getCurrentCanvas,
    descriptive.getThumbnailId
  );

  return {
    getId,
    getType,
    getViewingHint,
    getHeight,
    getWidth,
    getLabel,
    getDescription,
    getMetadata,
    getAttribution,
    getLogo,
    getLicense,
    getThumbnailId,
  };
}

export default createCanvasSelectors;
