import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collection from './components/Collection/Collection';
import {
  selectCollection,
  selectManifest,
} from 'iiif-redux/lib/spaces/routing';
import { Spin, Icon, Layout } from 'antd';
import IntlString from './components/IntlString/IntlString';
import * as currentCollection from 'iiif-redux/es/api/current-collection';
import * as currentManifest from 'iiif-redux/es/api/current-manifest';
import * as currentSequence from 'iiif-redux/es/api/current-sequence';
import * as currentCanvas from 'iiif-redux/es/api/current-canvas';
import Manifest from './components/Manifest/Manifest';
import {
  deselectCanvas,
  deselectManifest,
  deselectSequence,
  selectCanvas,
  selectSequence,
} from 'iiif-redux/es/spaces/routing';
import Sequence from './components/Sequence/Sequence';
import Canvas from './components/Canvas/Canvas';
const { Header } = Layout;

class App extends Component {
  state = {
    breadcrumbs: [],
  };

  componentWillMount() {
    this.props.dispatch(selectCollection({ id: this.props.collection }));
    this.setState({
      breadcrumbs: [{ type: 'collection', id: this.props.collection }],
    });
  }

  handleCollectionClick = collectionId => {
    this.props.dispatch(selectCollection({ id: collectionId }));
    this.setState(state => ({
      breadcrumbs: [
        ...state.breadcrumbs,
        { type: 'collection', id: collectionId },
      ],
    }));
  };

  goBack = () => {
    const current = this.state.breadcrumbs[this.state.breadcrumbs.length - 1];
    const previous = this.state.breadcrumbs[this.state.breadcrumbs.length - 2];
    if (current.type === 'manifest') {
      this.props.dispatch(deselectManifest());
    }
    if (current.type === 'sequence') {
      this.props.dispatch(deselectSequence());
    }
    if (current.type === 'canvas') {
      this.props.dispatch(deselectCanvas());
    }
    if (previous.type === 'collection') {
      this.props.dispatch(selectCollection({ id: previous.id }));
    }
    if (previous.type === 'manifest') {
      this.props.dispatch(selectManifest({ id: previous.id }));
    }
    if (previous.type === 'sequence') {
      this.props.dispatch(selectSequence({ id: previous.id }));
    }
    if (previous.type === 'canvas') {
      this.props.dispatch(selectCanvas({ id: previous.id }));
    }
    this.setState(state => ({
      breadcrumbs: state.breadcrumbs.slice(0, -1),
    }));
  };

  handleManifestClick = manifestId => {
    this.props.dispatch(selectManifest({ id: manifestId }));
    this.setState(state => ({
      breadcrumbs: [...state.breadcrumbs, { type: 'manifest', id: manifestId }],
    }));
  };

  handleSequenceClick = sequenceId => {
    this.props.dispatch(selectSequence({ id: sequenceId }));
    this.setState(state => ({
      breadcrumbs: [...state.breadcrumbs, { type: 'sequence', id: sequenceId }],
    }));
  };

  handleCanvasClick = canvasId => {
    this.props.dispatch(selectCanvas({ id: canvasId }));
    this.setState(state => ({
      breadcrumbs: [...state.breadcrumbs, { type: 'canvas', id: canvasId }],
    }));
  };

  renderCurrentFrame(type) {
    if (type === 'collection') {
      return (
        <Collection
          onClickCollection={this.handleCollectionClick}
          onClickManifest={this.handleManifestClick}
        />
      );
    }
    if (type === 'manifest') {
      return (
        <Manifest
          onClickSequence={this.handleSequenceClick}
          onClickCanvas={this.handleCanvasClick}
        />
      );
    }
    if (type === 'sequence') {
      return <Sequence onClickCanvas={this.handleCanvasClick} />;
    }
    if (type === 'canvas') {
      return <Canvas />;
    }
    return <Spin />;
  }

  render() {
    const { label, type, isLoaded } = this.props;
    return (
      <div>
        <Layout>
          {isLoaded ? (
            <div>
              <Header>
                <h3 style={{ color: '#fff' }}>
                  {this.state.breadcrumbs.length !== 1 ? (
                    <Icon
                      onClick={this.goBack}
                      type="arrow-left"
                      style={{ marginRight: 15 }}
                    />
                  ) : null}
                  {label ? <IntlString>{label}</IntlString> : null}
                </h3>
              </Header>
              {this.renderCurrentFrame(type)}
            </div>
          ) : (
            <div style={{ padding: 80, textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </Layout>
      </div>
    );
  }
}

export default connect((state, props) => {
  if (currentCanvas.getCurrentCanvas(state)) {
    return {
      label: currentCanvas.getLabel(state),
      type: 'canvas',
      isLoaded: true,
    };
  }
  if (currentSequence.getCurrentSequence(state)) {
    return {
      label: currentSequence.getLabel(state),
      type: 'sequence',
      isLoaded: true,
    };
  }

  if (currentManifest.getCurrentManifest(state)) {
    return {
      label: currentManifest.getLabel(state),
      type: 'manifest',
      isLoaded: true,
    };
  }

  return {
    label:
      state.dereferenced[props.collection] &&
      state.dereferenced[props.collection].loading === false
        ? currentCollection.getLabel(state)
        : null,
    type: 'collection',
    isLoaded:
      state.dereferenced[props.collection] &&
      state.dereferenced[props.collection].loading === false,
  };
})(App);
