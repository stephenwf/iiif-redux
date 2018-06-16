import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { frames, getAllFrameIds } from 'iiif-redux/es/api/frame';
import { getFocusedFrameId } from 'iiif-redux/es/api/frame';
import ChromeTabs from '../ChromeTabs/ChromeTabs';
import ChromeIcon from '../ChromeIcon/ChromeIcon';
import ChromeNavigation from '../ChromeNavigation/ChromeNavigation';
import { sortTabs, tabActions } from '../../spaces/tabs';
import './App.css';
import { focusedFrame } from 'iiif-redux/es/api/frame';

class App extends Component {
  state = {
    tabs: [{ id: 0, value: 'testing - 1' }, { id: 1, value: 'testing - 2' }],
    current: 0,
  };

  componentWillMount() {
    this.props.createNewTab('new-tab-0', 'new tab', 0);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.focused === null && newProps.allFrameIds.length) {
      this.props.selectTab(newProps.allFrameIds[0]);
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.updateSortOrder(this.props.allFrames, oldIndex, newIndex);
  };

  addNewTab = () => {
    const num = Math.round(Math.random() * 100000);
    const id = `new-tab-${num}`;
    this.props.createNewTab(id, 'new tab', this.props.allFrames.length);
  };

  onClickTab = id => {
    this.props.selectTab(id);
  };

  onClose = id => {
    this.props.closeTab(id);
  };

  handleSearch = text => {
    this.props.setResource(this.props.focused, text, 'collection');
  };

  render() {
    const { focused, allFrames } = this.props;
    const tabs = sortTabs(allFrames);

    return (
      <div>
        <ChromeTabs
          tabs={tabs}
          current={focused}
          onClick={this.onClickTab}
          onSortEnd={this.onSortEnd}
          onClose={this.onClose}
        />
        <ChromeNavigation
          searchValue={
            this.props.currentResource
              ? this.props.currentResource.id || ''
              : ''
          }
          onSearch={this.handleSearch}
          left={() => [
            <ChromeIcon key="left" type="left" />,
            <ChromeIcon key="right" type="right" />,
            <ChromeIcon key="reload" type="reload" />,
            <ChromeIcon key="plus" type="plus" onClick={this.addNewTab} />,
          ]}
          right={() => <ChromeIcon type="star" />}
        />

        {this.props.currentResource && this.props.currentResource.id ? (
          <div
            style={{
              color: '#fff',
              marginTop: 100,
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
            }}
          >
            Current resource:
            <h1 style={{ color: '#fff' }}>{this.props.currentResource.id}</h1>
            <p>
              Type: <strong>{this.props.currentResource.type}</strong>
            </p>
          </div>
        ) : (
          <div
            style={{
              color: '#fff',
              marginTop: 100,
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
            }}
          >
            <h1 style={{ color: '#999' }}>
              Enter a collection URL and hit enter...
            </h1>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  createStructuredSelector({
    currentResource: focusedFrame(api => ({
      id: api.getCurrentResourceId,
      type: api.getCurrentResourceType,
    })),
    focused: getFocusedFrameId,
    allFrameIds: getAllFrameIds,
    allFrames: frames(getAllFrameIds, singleFrame => ({
      id: singleFrame.getId,
      enabled: singleFrame.getEnabledExtensions,
      tabState: createSelector(
        singleFrame.getExtensionById('tabState'),
        tabState => tabState.config
      ),
    })),
  }),
  tabActions
)(App);