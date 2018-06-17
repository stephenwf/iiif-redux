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
import { iiifResourceRequestUnknown } from '../../../../iiif-redux/src/spaces/iiif-resource';
import resource from '../../../../iiif-redux/src/api/resource';

class App extends Component {
  componentWillMount() {
    this.props.createNewTab('new-tab-0', 'new tab', 0);
  }

  componentWillReceiveProps(newProps, newContext) {
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
    this.props.dispatch(iiifResourceRequestUnknown(text));
    this.props.setResource(this.props.focused, text);
    this.setState({
      pendingResource: text,
    });
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

        {this.props.currentResource &&
        this.props.currentResource.entity &&
        this.props.currentResource.entity.error ? (
          <div
            style={{
              color: '#fff',
              marginTop: 100,
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
            }}
          >
            <h1 style={{ color: '#fff' }}>Something went wrong</h1>
            <p>{this.props.currentResource.entity.error}</p>
          </div>
        ) : null}

        {this.props.currentResource &&
        this.props.currentResource.id &&
        this.props.currentResource.entity &&
        !this.props.currentResource.entity.error ? (
          <div
            style={{
              color: '#fff',
              marginTop: 100,
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
            }}
          >
            {this.props.currentResource.entity ? (
              <div>
                <h2 style={{ color: '#fff' }}>
                  {this.props.currentResource.entity.label[0]['@value']}
                </h2>
              </div>
            ) : (
              <div>
                Loading resource:
                <h1 style={{ color: '#fff' }}>
                  {this.props.currentResource.id}
                </h1>
                <p>
                  Type: <strong>{this.props.currentResource.type}</strong>
                </p>
              </div>
            )}
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
    // Currently tabs resource.
    currentResource: focusedFrame(api => ({
      id: api.getCurrentResourceId,
      type: api.getCurrentResourceType,

      // The resource itself.
      entity: resource(api.getCurrentResource, {
        // When its a collection, we map like this:
        collection: colApi => ({
          id: colApi.getId,
          label: colApi.getLabel,
        }),
        // When its a manifest, we map like this:
        manifest: manApi => ({
          id: manApi.getId,
          label: manApi.getLabel,
        }),
      }),
    })),

    // Currently focused tab
    focused: getFocusedFrameId,
    allFrameIds: getAllFrameIds,

    // All tabs.
    allFrames: frames(getAllFrameIds, singleFrame => ({
      id: singleFrame.getId,
      enabled: singleFrame.getEnabledExtensions,

      // Custom extension for tab state
      tabState: createSelector(
        singleFrame.getExtensionById('tabState'),
        tabState => tabState.config
      ),
    })),
  }),
  tabActions
)(App);
