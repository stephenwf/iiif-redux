import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collection from './Collection';
import { iiifResourceRequest } from '../../iiif-redux/es/spaces/iiif-resource';
import { collection } from '../../iiif-redux/es/schema/presentation2';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(
      iiifResourceRequest(
        this.props.collection,
        ['COLLECTION_REQUEST', 'COLLECTION_SUCCESS', 'COLLECTION_ERROR'],
        collection
      )
    );
  }

  render() {
    return <div>{this.props.isLoaded ? <Collection /> : 'loading...'}</div>;
  }
}

export default connect((state, props) => ({
  isLoaded:
    state.dereferenced[props.collection] &&
    state.dereferenced[props.collection].loading === false,
}))(App);
