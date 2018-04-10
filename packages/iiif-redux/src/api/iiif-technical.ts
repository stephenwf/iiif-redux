import * as validUrl from 'valid-url';

interface TechnicalProperties {
  '@id': string;
  '@type': string;
  viewingDirection?: string;
  navDate?: string;
  format?: string;
  height?: string | number;
  width?: string | number;
  viewingHint?: string;
}

const getId = (resource: TechnicalProperties): string => resource['@id'];

const getType = (resource: TechnicalProperties): string => resource['@type'];

const getNavDate = (resource: TechnicalProperties): string | null =>
  resource.navDate || null;

type ViewingDirection =
  | 'left-to-right'
  | 'right-to-left'
  | 'top-to-bottom'
  | 'bottom-to-top';

type ViewingDirectionMap = {
  [key: string]: ViewingDirection;
};

const VIEWING_DIRECTIONS: ViewingDirectionMap = {
  LEFT_TO_RIGHT: 'left-to-right',
  RIGHT_TO_LEFT: 'right-to-left',
  TOP_TO_BOTTOM: 'top-to-bottom',
  BOTTOM_TO_TOP: 'bottom-to-top',
};

const getViewingDirection = (
  resource: TechnicalProperties
): ViewingDirection => {
  const viewingDirection = resource.viewingDirection;
  if (typeof viewingDirection !== 'string') {
    return VIEWING_DIRECTIONS.LEFT_TO_RIGHT;
  }
  const trimmedDir = viewingDirection.toLowerCase().trim();
  switch (trimmedDir) {
    case VIEWING_DIRECTIONS.LEFT_TO_RIGHT:
      return VIEWING_DIRECTIONS.LEFT_TO_RIGHT;
    case VIEWING_DIRECTIONS.RIGHT_TO_LEFT:
      return VIEWING_DIRECTIONS.RIGHT_TO_LEFT;
    case VIEWING_DIRECTIONS.TOP_TO_BOTTOM:
      return VIEWING_DIRECTIONS.TOP_TO_BOTTOM;
    case VIEWING_DIRECTIONS.BOTTOM_TO_TOP:
      return VIEWING_DIRECTIONS.BOTTOM_TO_TOP;
    default:
      return VIEWING_DIRECTIONS.LEFT_TO_RIGHT;
  }
};

function castToNumber(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }
  return parseInt(value, 10);
}

const getFormat = (resource: TechnicalProperties): string | null =>
  resource.format || null;

const getHeight = (resource: TechnicalProperties): number =>
  resource.height ? castToNumber(resource.height) : 0;

const getWidth = (resource: TechnicalProperties): number =>
  resource.width ? castToNumber(resource.width) : 0;

const VIEWING_HINTS = {
  INDIVIUALS: 'individuals',
  PAGED: 'paged',
  CONTINUOUS: 'continuous',
  MULTI_PART: 'multi-part',
  NON_PAGES: 'non-paged',
  TOP: 'top',
  FACING_PAGES: 'facing-pages',
};

const getViewingHint = (resource: TechnicalProperties): string | null => {
  const viewingHint = resource.viewingHint;
  if (typeof viewingHint !== 'string') {
    return null;
  }
  switch (viewingHint.toLowerCase().trim()) {
    case VIEWING_HINTS.INDIVIUALS:
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

export {
  getId,
  getType,
  getViewingHint,
  getNavDate,
  getViewingDirection,
  getFormat,
  getHeight,
  getWidth,
  VIEWING_DIRECTIONS,
  VIEWING_HINTS,
};
