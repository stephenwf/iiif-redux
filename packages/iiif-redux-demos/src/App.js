import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collection from './Collection';
import {
  selectCollection,
  selectManifest,
} from 'iiif-redux/lib/spaces/routing';
import { Spin, Icon, Layout } from 'antd';
import IntlString from './components/IntlString/IntlString';
import * as currentCollection from 'iiif-redux/es/api/current-collection';
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
        { type: 'collection', id: this.props.collection },
      ],
    }));
  };

  goBack = () => {
    const previous = this.state.breadcrumbs[this.state.breadcrumbs.length - 1];
    if (previous.type === 'collection') {
      this.props.dispatch(selectCollection({ id: previous.id }));
    }
    if (previous.type === 'manifest') {
      this.props.dispatch(selectManifest({ id: previous.id }));
    }
    this.setState(state => ({
      breadcrumbs: state.breadcrumbs.slice(0, -1),
    }));
  };

  handleManifestClick = () => {};

  render() {
    const { label } = this.props;
    return (
      <div>
        <Layout>
          {this.props.isLoaded ? (
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
              <Collection
                onClickCollection={this.handleCollectionClick}
                onClickManifest={this.handleManifestClick}
              />
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

export default connect((state, props) => ({
  label:
    state.dereferenced[props.collection] &&
    state.dereferenced[props.collection].loading === false
      ? currentCollection.getLabel(state)
      : null,
  isLoaded:
    state.dereferenced[props.collection] &&
    state.dereferenced[props.collection].loading === false,
}))(App);
