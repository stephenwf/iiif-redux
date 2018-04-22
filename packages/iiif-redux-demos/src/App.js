import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collection from './Collection';
import { selectCollection } from 'iiif-redux/lib/spaces/routing';
import { Spin } from 'antd';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(selectCollection({ id: this.props.collection }));
  }

  render() {
    return (
      <div>
        {this.props.isLoaded ? (
          <Collection />
        ) : (
          <div style={{ padding: 80, textAlign: 'center' }}>
            <Spin />
          </div>
        )}
      </div>
    );
  }
}

export default connect((state, props) => ({
  isLoaded:
    state.dereferenced[props.collection] &&
    state.dereferenced[props.collection].loading === false,
}))(App);
