// Frame API.
import memoize from 'lodash.memoize';
import { createSelector, createStructuredSelector } from 'reselect';
import { DEFAULT_FRAME_ID } from '../spaces/frames';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';

const frame = selector => {
  // Metadata API.
  const getId = createSelector(selector, currentFrame => currentFrame.id);
  const isFocused = createSelector(
    getId,
    state => state.frames.focusedFrame,
    (currentFrameId, focusedFrameId) => focusedFrameId === currentFrameId
  );
  // @todo first extension - metadata
  // const getLabel = noop;
  // const getDescription = noop;

  // Current API.
  const getCurrentPath = createSelector(
    selector,
    currentFrame => currentFrame.path
  );
  const getCurrentPathIndex = createSelector(
    selector,
    currentFrame => currentFrame.current
  );
  const getCurrentResource = createSelector(
    getCurrentPath,
    getCurrentPathIndex,
    (currentPath, currentIndex) => currentPath[currentIndex]
  );
  const getCurrentResourceId = createSelector(
    getCurrentResource,
    currentResource => (currentResource ? currentResource.id : null)
  );
  const getCurrentResourceType = createSelector(
    getCurrentResource,
    currentResource => (currentResource ? currentResource.schema : null)
  );
  const getCurrentResourceByType = memoize(schema =>
    createSelector(getCurrentPath, path =>
      path.reduce((acc, next) => (next.schema === schema ? next : acc), null)
    )
  );

  // History API.
  const getTopLevel = createSelector(
    getCurrentPath,
    currentPath => currentPath[0] || null
  );
  const getAllTypes = createSelector(getCurrentPath, currentPath =>
    currentPath.reduce((types, path) => {
      if (types.indexOf(path.schema) === -1) {
        types.push(path.schema);
      }
      return types;
    }, [])
  );
  const canGoBack = createSelector(
    getCurrentPathIndex,
    pathIndex => pathIndex > 0
  );
  const canGoForward = createSelector(
    getCurrentPath,
    getCurrentPathIndex,
    (currentPath, currentIndex) =>
      currentPath.length === 0 ? false : currentPath.length - 1 > currentIndex
  );
  const getHistory = createSelector(
    getCurrentPath,
    getCurrentPathIndex,
    (currentPath, currentIndex) =>
      currentPath.length ? currentPath.slice(0, currentIndex) : []
  );
  const getFullHistory = getCurrentPath;
  const canGoBackToType = memoize(schema =>
    createSelector(
      getHistory,
      history =>
        history.filter(pathItem => pathItem.schema === schema).length > 0
    )
  );

  // Extensions API.
  const getAllExtensionsInternal = createSelector(
    selector,
    currentFrame => currentFrame.extensions
  );
  const getAllExtensionIds = createSelector(selector, currentFrame =>
    Object.keys(currentFrame.extensions)
  );
  const mapSingleExtension = (state, allExtensions, id) => {
    if (!allExtensions[id]) {
      return { id };
    }
    if (
      typeof allExtensions[id] === 'string' &&
      state[id] &&
      state[id][allExtensions[id]]
    ) {
      return { id, config: state[id][allExtensions[id]] };
    }
    return { id, config: allExtensions[id] };
  };
  const getAllExtensions = createSelector(
    getAllExtensionIds,
    getAllExtensionsInternal,
    state => state,
    (extensionIds, allExtensions, state) => {
      return extensionIds.map(id =>
        mapSingleExtension(state, allExtensions, id)
      );
    }
  );
  const getExtensionById = id =>
    createSelector(
      getAllExtensionsInternal,
      state => state,
      (allExtensions, state) => mapSingleExtension(state, allExtensions, id)
    );

  const getEnabledExtensionIds = createSelector(
    selector,
    currentFrame => currentFrame.enabledExtensions
  );
  const isExtensionEnabled = memoize(id =>
    createSelector(
      getEnabledExtensionIds,
      enabledExtensions => enabledExtensions.indexOf(id) !== -1
    )
  );
  const getDisabledExtensionIds = createSelector(
    getAllExtensionIds,
    getEnabledExtensionIds,
    (allExtensionIds, enabledExtensionIds) =>
      allExtensionIds.reduce((disabled, ext) => {
        if (enabledExtensionIds.indexOf(ext) === -1) {
          disabled.push(ext);
        }
        return disabled;
      }, [])
  );
  const getDisabledExtensions = createSelector(
    getDisabledExtensionIds,
    getAllExtensionsInternal,
    state => state,
    (extensionIds, allExtensions, state) => {
      return extensionIds.map(id =>
        mapSingleExtension(state, allExtensions, id)
      );
    }
  );
  const getEnabledExtensions = createSelector(
    getEnabledExtensionIds,
    getAllExtensionsInternal,
    state => state,
    (extensionIds, allExtensions, state) => {
      return extensionIds.map(id =>
        mapSingleExtension(state, allExtensions, id)
      );
    }
  );
  // const getExtensionApi = noop; // @todo come back to.

  // @todo Some resource helpers.
  // const isNavigatingCanvases = noop;
  // const getCurrentCanvasId = noop;
  // const getCurrentCanvas = noop;
  // const isNavigatingManifests = noop;
  // const getCurrentManifestId = noop;
  // const getCurrentManifest = noop;

  return {
    // Metadata API.
    getId,
    isFocused,

    // Current API.
    getCurrentPath,
    getCurrentPathIndex,
    getCurrentResource,
    getCurrentResourceId,
    getCurrentResourceType,
    getCurrentResourceByType,

    // History API.
    getTopLevel,
    getAllTypes,
    canGoBack,
    canGoForward,
    getHistory,
    getFullHistory,
    canGoBackToType,

    // Extensions API.
    getAllExtensionIds,
    getAllExtensions,
    getExtensionById,
    isExtensionEnabled,
    getDisabledExtensions,
    getEnabledExtensions,
    // getExtensionApi,

    // Some resource helpers.
    // isNavigatingCanvases,
    // getCurrentCanvasId,
    // getCurrentCanvas,
    // isNavigatingManifests,
    // getCurrentManifestId,
    // getCurrentManifest,
  };
};

export default frame;

// Allows for Window interface.
export const frameByIdSelector = memoize(
  (callable, { getId = null } = {}) => (state, props) => {
    const id = getId
      ? getId(state, props)
      : props
        ? props.frameId
        : DEFAULT_FRAME_ID;

    const selectorOrStructure = callable(frame(s => s.frames.list[id]));

    return (selectorOrStructure &&
    {}.toString.call(selectorOrStructure) === '[object Function]'
      ? selector => passThroughState => selector(passThroughState)
      : createStructuredSelector)(selectorOrStructure)(state);
  }
);

export const getFocusedFrameId = state => state.frames.focusedFrame;

export const getAllFrames = state => state.frames.list;

export const getAllFrameIds = createSelector(getAllFrames, frames =>
  Object.keys(frames)
);

export const getFocusedFrame = createSelector(
  getFocusedFrameId,
  getAllFrames,
  (id, frames) => frames[id]
);

export const focusedFrame = api => (state, props) => {
  const focusedFrameId = getFocusedFrameId(state);
  if (!focusedFrameId) {
    return null;
  }
  return createStructuredSelector(api(frame(getFocusedFrame)))(state, props);
};

export const frames = resourceListSelectorFactory(getAllFrames, frame);

/*
@todo check feasibility of this. Shouldn't be needed with simplified model.

export function registerFrameExtension(
  name,
  getFrameState = null,
  provideCustomApi = null,
  actions = {}
) {
  // name is the ID used for the KEY. Could be URI?
  // getFrameState is the `(extensionId, frameId) => state => state.myCustomRedux[extensionId]`
  // provide custom API is a IIIF Redux standard selector format. `api => selector => state => stateSubset`
  // actions will be wrapped in dispatch and given to component, possibly?
}

export function connectFramebehaviors(
  connect,
  extensions,
  mapStateToProps = null,
  mapDispatchToProps = null
) {
  // HOC for injecting actions + state, itself will wrap connect.
}
*/
