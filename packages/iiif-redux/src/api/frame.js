// Frame API.
import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

const frame = selector => {
  const noop = () => null;

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
    currentResource => currentResource.id
  );
  const getCurrentResourceType = createSelector(
    getCurrentResource,
    currentResource => currentResource.schema
  );
  const getCurrentResourceByType = memoize(schema =>
    createSelector(getCurrentPath, path =>
      path.reduce((acc, next) => (next.schema === schema ? next : acc))
    )
  );

  // History API.
  const getTopLevel = createSelector(
    getCurrentPath,
    currentPath => currentPath[0] || null
  );
  const getAllTypes = createSelector(getCurrentPath, currentPath =>
    currentPath.reduce((types, type) => {
      if (types.indexOf(type) !== -1) {
        types.push(type);
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
    (currentPath, currentIndex) => currentPath.length - 1 >= currentIndex
  );
  const getHistory = createSelector(
    getCurrentPath,
    getCurrentPathIndex,
    (currentPath, currentIndex) =>
      currentPath.length ? currentPath.slice(0, currentIndex + 1) : []
  );
  const getFullHistory = getCurrentPath;
  const canGoBackToType = memoize(schema =>
    createSelector(
      getHistory,
      history =>
        history.filter(pathItem => pathItem.schema === schema).length !== 0
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
    if (typeof allExtensions[id] === 'string') {
      return { id, config: state[id][allExtensions[id]] };
    }
    return { id, config: allExtensions[id] };
  };
  const getAllExtensions = createSelector(
    getAllExtensionIds,
    getAllExtensionsInternal,
    state => state,
    (extensionIds, allExtensions, state) => {
      return allExtensions.map(id =>
        mapSingleExtension(state, allExtensions, id)
      );
    }
  );
  const getExtensionById = memoize(id =>
    createSelector(
      getAllExtensions,
      state => state,
      (allExtensions, state) => mapSingleExtension(state, allExtensions, id)
    )
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
      return allExtensions.map(id =>
        mapSingleExtension(state, allExtensions, id)
      );
    }
  );
  const getEnabledExtensions = createSelector(
    getEnabledExtensionIds,
    getAllExtensionsInternal,
    state => state,
    (extensionIds, allExtensions, state) => {
      return allExtensions.map(id =>
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

// Allows for Tab interface.
export function focusedFrame() {}

// Allows for Window interface.
export function frameByIdSelector() {}

// Allows for lists, defaults to all.
export function frames(arrayOfFramesSelector = null) {}

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

export function connectFrameBehaviours(
  connect,
  extensions,
  mapStateToProps = null,
  mapDispatchToProps = null
) {
  // HOC for injecting actions + state, itself will wrap connect.
}
