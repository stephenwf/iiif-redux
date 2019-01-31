import React, { Component } from 'react';
import { ReactReduxContext } from 'react-redux';
import connect from '../hoc/connect';
import manifest from 'iiif-redux/es/api/manifest';
import { getAllManifests } from 'iiif-redux/es/api/all';
import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const defaultContext = {
  id: null,
  manifest: null,
};

export const ManifestContext = React.createContext(defaultContext);

const manifestSelector = memoize(id =>
  createSelector(
    getAllManifests,
    manifests => {
      return manifests[id];
    }
  )
);

class ManifestProvider extends Component {
  static defaultProps = Object.assign({}, defaultContext);

  static contextType = ReactReduxContext;

  render() {
    const { id, children } = this.props;
    return (
      <ManifestContext.Provider
        value={{
          id,
          manifest: manifest(manifestSelector(id), api => ({
            label: api.getLabel,
            license: api.getLicense,
            logo: api.getLogo,
            metadata: api.getMetadata,
          }))(this.context.storeState),
        }}
      >
        {children}
      </ManifestContext.Provider>
    );
  }
}

export const Manifest = connect()(ManifestProvider);
