import {
  getId,
  getType,
  getFormat,
  getHeight,
  getWidth,
  getViewingDirection,
} from '../../2.x/iiif/technical';

const getProfile = resource => resource.profile;

const getDuration = resource => resource.duration;

const getBehaviour = resource => resource.behaviour;

const getTimeMode = resource => resource.timeMode;

export {
  getId,
  getType,
  getFormat,
  getProfile,
  getHeight,
  getWidth,
  getDuration,
  getViewingDirection,
  getBehaviour,
  getTimeMode,
};
