const getId = resource => resource['@id'];

const getType = resource => resource['@type'];

const getViewingHint = resource => resource.viewingHint;

const getNavDate = resource => resource.navDate;

const VIEWING_DIRECTIONS = {
  LEFT_TO_RIGHT: 'left-to-right',
  RIGHT_TO_LEFT: 'right-to-left',
  TOP_TO_BOTTOM: 'top-to-bottom',
  BOTTOM_TO_TOP: 'bottom-to-top',
};
const getViewingDirection = resource => {
  const viewingDirection = resource.viewingDirection;
  switch (viewingDirection) {
    case VIEWING_DIRECTIONS.LEFT_TO_RIGHT:
    case VIEWING_DIRECTIONS.RIGHT_TO_LEFT:
    case VIEWING_DIRECTIONS.TOP_TO_BOTTOM:
    case VIEWING_DIRECTIONS.BOTTOM_TO_TOP:
      return viewingDirection;
    default:
      return VIEWING_DIRECTIONS.LEFT_TO_RIGHT;
  }
};

export { getId, getType, getViewingHint, getNavDate, getViewingDirection };
