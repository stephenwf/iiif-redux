import validUrl from 'valid-url';

const getId = resource => resource['@id'];

const getType = resource => resource['@type'];

const getNavDate = resource => resource.navDate || null;

const VIEWING_DIRECTIONS = {
  LEFT_TO_RIGHT: 'left-to-right',
  RIGHT_TO_LEFT: 'right-to-left',
  TOP_TO_BOTTOM: 'top-to-bottom',
  BOTTOM_TO_TOP: 'bottom-to-top',
};

const getViewingDirection = resource => {
  const viewingDirection = resource.viewingDirection;
  if (typeof viewingDirection !== 'string') {
    return VIEWING_DIRECTIONS.LEFT_TO_RIGHT;
  }
  switch (viewingDirection.toLowerCase().trim()) {
    case VIEWING_DIRECTIONS.LEFT_TO_RIGHT:
    case VIEWING_DIRECTIONS.RIGHT_TO_LEFT:
    case VIEWING_DIRECTIONS.TOP_TO_BOTTOM:
    case VIEWING_DIRECTIONS.BOTTOM_TO_TOP:
      return viewingDirection.toLowerCase().trim();
    default:
      return VIEWING_DIRECTIONS.LEFT_TO_RIGHT;
  }
};

const getFormat = resource => resource.format || null;

const getHeight = resource =>
  resource.height ? parseInt(resource.height, 10) : 0;

const getWidth = resource =>
  resource.width ? parseInt(resource.width, 10) : 0;

const VIEWING_HINTS = {
  INDIVIDUALS: 'individuals',
  PAGED: 'paged',
  CONTINUOUS: 'continuous',
  MULTI_PART: 'multi-part',
  NON_PAGES: 'non-paged',
  TOP: 'top',
  FACING_PAGES: 'facing-pages',
};
const getViewingHint = resource => {
  const viewingHint = resource.viewingHint;
  if (typeof viewingHint !== 'string') {
    return null;
  }
  switch (viewingHint.toLowerCase().trim()) {
    case VIEWING_HINTS.INDIVIDUALS:
    case VIEWING_HINTS.PAGED:
    case VIEWING_HINTS.CONTINUOUS:
    case VIEWING_HINTS.MULTI_PART:
    case VIEWING_HINTS.NON_PAGES:
    case VIEWING_HINTS.TOP:
    case VIEWING_HINTS.FACING_PAGES:
      return viewingHint.toLowerCase().trim();
    default:
      // Should we handle custom viewing hints differently?
      return validUrl.isWebUri(viewingHint) ? viewingHint : null;
  }
};

const getWhitelistedViewingHint = whitelist => resource => {
  const viewingHint = getViewingHint(resource);
  if (!viewingHint) {
    return null;
  }
  if (whitelist.indexOf(viewingHint) >= 0) {
    return viewingHint;
  }
  return validUrl.isWebUri(viewingHint) ? viewingHint : null;
};

// @todo whitelist motivations + URIs.
const getMotivation = resource => resource.motivation;

export {
  getId,
  getType,
  getViewingHint,
  getWhitelistedViewingHint,
  getNavDate,
  getViewingDirection,
  getFormat,
  getHeight,
  getWidth,
  getMotivation,
  VIEWING_DIRECTIONS,
  VIEWING_HINTS,
};
