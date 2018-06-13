// Frames API.
import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';

const FRAME_CREATE = 'FRAME_CREATE';
const FRAME_SET_INITIAL_RESOURCE = 'FRAME_SET_INITIAL_RESOURCE';
const FRAME_GO_TO_RESOURCE = 'FRAME_GO_TO_RESOURCE';
const FRAME_GO_BACK = 'FRAME_GO_BACK';
const FRAME_GO_BACK_TO_TYPE = 'FRAME_GO_BACK_TO_TYPE';
const FRAME_GO_FORWARD = 'FRAME_GO_FORWARD';
const FRAME_ENABLE_EXTENSION = 'FRAME_ENABLE_EXTENSION';
const FRAME_CONFIGURE_EXTENSION = 'FRAME_CONFIGURE_EXTENSION';
const FRAME_DISABLE_EXTENSION = 'FRAME_DISABLE_EXTENSION';
const FRAME_NEXT_CANVAS = 'FRAME_NEXT_CANVAS';
const FRAME_PREVIOUS_CANVAS = 'FRAME_PREVIOUS_CANVAS';
const FRAME_FOCUS = 'FRAME_FOCUS';

const DEFAULT_STATE = {
  list: {},
  focusedFrame: null,
};

const DEFAULT_FRAME_ID = 'default-frame';

const requireProps = requiredProps => retValue => {
  /* istanbul ignore next line */
  if (process.env.NODE_ENV === 'production') return retValue;

  requiredProps.forEach(prop => {
    if (!retValue[prop]) {
      throw new Error(`Dev error: missing required prop ${prop}`);
    }
  });

  return retValue;
};

const {
  frameCreate,
  frameSetInitialResource,
  frameGoToResource,
  frameGoBack,
  frameGoBackToType,
  frameGoForward,
  frameEnableExtension,
  frameConfigureExtension,
  frameDisableExtension,
  frameNextCanvas,
  framePreviousCanvas,
  frameFocus,
} = createActions({
  [FRAME_CREATE]: (
    { resourceType, resourceId, ...config } = {},
    frameId = DEFAULT_FRAME_ID
  ) =>
    requireProps(['frameId'])({
      frameId,
      resourceType,
      resourceId,
      config,
    }),

  [FRAME_SET_INITIAL_RESOURCE]: (
    { resourceType, resourceId } = {},
    frameId = DEFAULT_FRAME_ID
  ) =>
    requireProps(['resourceType', 'frameId', 'resourceId'])({
      frameId,
      resourceType,
      resourceId,
    }),

  [FRAME_GO_TO_RESOURCE]: (
    { resourceType, resourceId, smartJump = true } = {},
    frameId = DEFAULT_FRAME_ID
  ) =>
    requireProps(['resourceType', 'resourceId', 'frameId'])({
      frameId,
      resourceType,
      resourceId,
      smartJump,
    }),

  [FRAME_GO_BACK]: (frameId = DEFAULT_FRAME_ID) =>
    requireProps(['frameId'])({ frameId }),

  [FRAME_GO_BACK_TO_TYPE]: (resourceType, frameId = DEFAULT_FRAME_ID) =>
    requireProps(['frameId', 'resourceType'])({
      frameId,
      resourceType,
    }),

  [FRAME_GO_FORWARD]: (frameId = DEFAULT_FRAME_ID) =>
    requireProps(['frameId'])({ frameId }),

  [FRAME_ENABLE_EXTENSION]: (
    extensionId,
    extensionConfig,
    frameId = DEFAULT_FRAME_ID
  ) =>
    requireProps(['extensionId', 'frameId'])({
      extensionId,
      extensionConfig,
      frameId,
    }),

  [FRAME_CONFIGURE_EXTENSION]: (
    extensionId,
    extensionConfig,
    frameId = DEFAULT_FRAME_ID
  ) =>
    requireProps(['extensionId', 'frameId'])({
      extensionId,
      extensionConfig,
      frameId,
    }),

  [FRAME_DISABLE_EXTENSION]: (extensionId, frameId = DEFAULT_FRAME_ID) =>
    requireProps(['extensionId', 'frameId'])({
      extensionId,
      frameId,
    }),

  [FRAME_NEXT_CANVAS]: (frameId = DEFAULT_FRAME_ID) =>
    requireProps(['frameId'])({
      frameId,
    }),

  [FRAME_PREVIOUS_CANVAS]: (frameId = DEFAULT_FRAME_ID) =>
    requireProps(['frameId'])({
      frameId,
    }),

  [FRAME_FOCUS]: (frameId = DEFAULT_FRAME_ID) =>
    requireProps(['frameId'])({
      frameId,
    }),
});

const reducer = handleActions(
  {
    [frameCreate]: (
      state,
      { payload: { frameId, resourceType, resourceId, config } }
    ) =>
      update(state, {
        focusedFrame: { $set: frameId },
        list: {
          [frameId]: {
            $set: {
              id: frameId,
              current: 0,
              path:
                resourceId && resourceType
                  ? [{ id: resourceId, schema: resourceType }]
                  : [],
              enabledExtensions: [],
              extensions: {},
              config,
            },
          },
        },
      }),

    [frameSetInitialResource]: (
      state,
      { payload: { frameId, resourceType, resourceId } }
    ) =>
      update(state, {
        list: {
          [frameId]: {
            current: { $set: 0 },
            path: { $set: [{ id: resourceId, schema: resourceType }] },
          },
        },
      }),

    [frameGoToResource]: (
      state,
      { payload: { frameId, resourceType, resourceId, smartJump } }
    ) =>
      update(state, {
        list: {
          [frameId]: {
            $apply: frame => {
              // If element is already in history, jump to it instead.
              if (
                smartJump &&
                frame.path.filter(path => path.id === resourceId).length
              ) {
                const ids = frame.path.reduce((acc, next) => {
                  acc.push(next.id);
                  return acc;
                }, []);

                return update(frame, {
                  current: { $set: ids.indexOf(resourceId) },
                });
              }

              // The same as set initial resource.
              if (frame.path.length === 0) {
                return update(frame, {
                  current: { $set: 0 },
                  path: { $set: [{ id: resourceId, schema: resourceType }] },
                });
              }

              // If not chop of lost history
              const current = state.list[frameId].current || 0;
              const newCurrent = current + 1;
              const newPath = frame.path.slice(0, newCurrent);
              newPath.push({ id: resourceId, schema: resourceType });
              return update(frame, {
                current: { $set: newCurrent },
                path: { $set: newPath },
              });
            },
          },
        },
      }),

    [frameGoBack]: (state, { payload: { frameId } }) =>
      update(state, {
        list: {
          [frameId]: {
            current: {
              $apply: current => (current === 0 ? 0 : current - 1),
            },
          },
        },
      }),

    [frameGoForward]: (state, { payload: { frameId } }) =>
      update(state, {
        list: {
          [frameId]: {
            $apply: frame => {
              if (frame.path.length - 1 <= frame.current) {
                return frame;
              }
              return update(frame, {
                current: { $set: frame.current + 1 },
              });
            },
          },
        },
      }),

    [frameEnableExtension]: (
      state,
      { payload: { extensionId, extensionConfig, frameId } }
    ) =>
      update(state, {
        list: {
          [frameId]: {
            enabledExtensions: {
              $apply: enabledExtensions =>
                enabledExtensions.indexOf(extensionId) === -1
                  ? [...enabledExtensions, extensionId]
                  : enabledExtensions,
            },
            extensions: {
              [extensionId]: { $set: extensionConfig },
            },
          },
        },
      }),

    [frameConfigureExtension]: (
      state,
      { payload: { extensionId, extensionConfig, frameId } }
    ) =>
      update(state, {
        list: {
          [frameId]: {
            extensions: {
              [extensionId]: { $set: extensionConfig },
            },
          },
        },
      }),

    [frameDisableExtension]: (state, { payload: { extensionId, frameId } }) =>
      update(state, {
        list: {
          [frameId]: {
            enabledExtensions: {
              $apply: enabledExtensions =>
                enabledExtensions.reduce((acc, ext) => {
                  if (ext !== extensionId) {
                    acc.push(ext);
                  }
                  return acc;
                }, []),
            },
          },
        },
      }),

    [frameFocus]: (state, { payload: { frameId } }) =>
      update(state, {
        focusedFrame: { $set: frameId },
      }),
  },
  DEFAULT_STATE
);

//function* saga() {
// frameGoBackToType -> go to correct resource.
// frameNextCanvas -> go to next canvas.
// framePreviousCanvas -> go to previous canvas.
//}

export {
  // constants.
  FRAME_CREATE,
  FRAME_SET_INITIAL_RESOURCE,
  FRAME_GO_TO_RESOURCE,
  FRAME_GO_BACK,
  FRAME_GO_BACK_TO_TYPE,
  FRAME_GO_FORWARD,
  FRAME_ENABLE_EXTENSION,
  FRAME_CONFIGURE_EXTENSION,
  FRAME_DISABLE_EXTENSION,
  FRAME_NEXT_CANVAS,
  FRAME_PREVIOUS_CANVAS,
  // actions.
  frameCreate,
  frameSetInitialResource,
  frameGoToResource,
  frameGoBack,
  frameGoBackToType,
  frameGoForward,
  frameEnableExtension,
  frameConfigureExtension,
  frameDisableExtension,
  frameNextCanvas,
  framePreviousCanvas,
  frameFocus,
  // redux.
  // saga,
  reducer,
  DEFAULT_STATE,
  DEFAULT_FRAME_ID,
};
