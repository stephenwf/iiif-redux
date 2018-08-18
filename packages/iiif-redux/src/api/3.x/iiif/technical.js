import {
  getFormat,
  getHeight,
  getWidth,
  getViewingDirection,
} from '../../2.x/iiif/technical';

const getId = resource => resource.id;

const getType = resource => resource.type;

const getProfile = resource => resource.profile || null;

const getDuration = resource => {
  if (typeof resource.duration === 'string') {
    const attempt = parseFloat(resource.duration);
    // Is NaN
    if (attempt !== attempt) {
      return 0.0;
    }
    return attempt;
  }
  return 0 + resource.duration || 0.0;
};

const getBehavior = resource => resource.behavior || null;

const getTimeMode = resource => resource.timeMode || null;

const getMotivation = resource => resource.motivation || null;

export {
  getId,
  getType,
  getFormat,
  getProfile,
  getHeight,
  getWidth,
  getDuration,
  getViewingDirection,
  getBehavior,
  getTimeMode,
  getMotivation,
};
