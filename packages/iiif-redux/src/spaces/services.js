import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';

const SERVICE_ANNOUNCE = 'SERVICE_ANNOUNCE';
const SERVICE_ACTIVATE = 'SERVICE_ACTIVATE';
const SERVICE_ERROR = 'SERVICE_ERROR';
const SERVICE_DEACTIVATE = 'SERVICE_DEACTIVATE';
const SERVICE_ENABLE = 'SERVICE_ENABLE';
const SERVICE_DISABLE = 'SERVICE_DISABLE';

const DEFAULT_STATE = {
  list: {},
  resourceIndex: {},
};

const {
  serviceAnnounce,
  serviceActivate,
  serviceError,
  serviceDeactivate,
  serviceEnable,
  serviceDisable,
} = createActions({
  [SERVICE_ANNOUNCE]: (id, serviceId, resource, label) => ({
    id,
    serviceId,
    resource,
    label,
  }),
  [SERVICE_ACTIVATE]: (id, config, { label } = {}) => ({
    id,
    config,
    label,
  }),
  [SERVICE_ERROR]: (id, error) => ({
    id,
    error,
  }),
  [SERVICE_DEACTIVATE]: id => ({ id }),
  [SERVICE_ENABLE]: id => ({ id }),
  [SERVICE_DISABLE]: id => ({ id }),
});

const reducer = handleActions(
  {
    [serviceAnnounce]: (
      state,
      { payload: { id, serviceId, resource, label } }
    ) =>
      update(state, {
        list: {
          [id]: {
            $set: {
              id,
              serviceId,
              resource,
              label,
              isActive: false,
              isEnabled: false,
            },
          },
        },
        resourceIndex: {
          [resource]: { $apply: val => (val ? [...val, id] : [id]) },
        },
      }),
    [serviceActivate]: (state, { payload: { id, config, label } }) =>
      update(state, {
        list: {
          [id]: {
            config: { $set: config },
            label: { $apply: currentLabel => (label ? label : currentLabel) },
            isActive: { $set: true },
          },
        },
      }),
    [serviceError]: (state, { payload: { id, error } }) =>
      update(state, {
        list: {
          [id]: {
            isActive: { $set: false },
            isEnabled: { $set: false },
            error: { $set: error },
          },
        },
      }),
    [serviceDeactivate]: (state, { payload: { id } }) =>
      update(state, {
        list: {
          [id]: {
            isActive: { $set: false },
            isEnabled: { $set: false },
          },
        },
      }),
    [serviceEnable]: (state, { payload: { id } }) =>
      update(state, {
        list: {
          [id]: {
            isEnabled: { $set: true },
          },
        },
      }),
    [serviceDisable]: (state, { payload: { id } }) =>
      update(state, {
        list: {
          [id]: {
            isEnabled: { $set: false },
          },
        },
      }),
  },
  DEFAULT_STATE
);

export {
  serviceAnnounce,
  serviceActivate,
  serviceError,
  serviceDeactivate,
  serviceEnable,
  serviceDisable,
  SERVICE_ACTIVATE,
  SERVICE_ANNOUNCE,
  SERVICE_ERROR,
  SERVICE_DEACTIVATE,
  DEFAULT_STATE,
  reducer,
};
