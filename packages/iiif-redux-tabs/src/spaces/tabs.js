import {
  frameConfigureExtension,
  frameCreate,
  frameDelete,
  frameEnableExtension,
  frameFocus,
  frameGoToResource,
  frameSetInitialResource,
} from '../../../iiif-redux/src/spaces/frames';
import { arrayMove } from 'react-sortable-hoc';

function createNewTab(dispatch) {
  return (id, label, index) => {
    dispatch(frameCreate({}, id));
    dispatch(
      frameEnableExtension(
        'tabState',
        {
          tabIndex: index,
          tabLabel: label,
        },
        id
      )
    );
  };
}

function selectTab(dispatch) {
  return id => {
    dispatch(frameFocus(id));
  };
}

function closeTab(dispatch) {
  return id => {
    dispatch(frameDelete(id));
  };
}

function updateSortOrder(dispatch) {
  return (allFrames, oldIndex, newIndex) => {
    const tabs = sortTabs(allFrames);
    const newOrder = arrayMove(tabs, oldIndex, newIndex);

    newOrder.forEach((tab, index) => {
      dispatch(
        frameConfigureExtension('tabState', { tabIndex: index }, tab.id)
      );
    });
  };
}

export function setResource(dispatch) {
  return (frameId, resourceId, resourceType) => {
    dispatch(frameSetInitialResource({ resourceId, resourceType }, frameId));
  };
}

export function sortTabs(allFrames) {
  return allFrames
    .map(frame => ({
      id: frame.id,
      value: frame.tabState.tabLabel,
      order: frame.tabState.tabIndex,
    }))
    .sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
}

export function tabActions(dispatch) {
  return {
    createNewTab: createNewTab(dispatch),
    selectTab: selectTab(dispatch),
    closeTab: closeTab(dispatch),
    updateSortOrder: updateSortOrder(dispatch),
    setResource: setResource(dispatch),
  };
}
