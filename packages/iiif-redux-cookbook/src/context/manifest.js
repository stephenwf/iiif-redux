import React, { Component, useContext, useMemo } from 'react';
import { ReactReduxContext } from 'react-redux';
import connect from '../hoc/connect';
import manifest from 'iiif-redux/es/api/manifest';
import canvas from 'iiif-redux/es/api/canvas';
import { getAllManifests } from 'iiif-redux/es/api/all';
import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
import { getAllCanvases } from 'iiif-redux/src/api/all';

const defaultContext = {
  id: null,
  manifest: null,
};

export const ManifestContext = React.createContext(defaultContext);
export const CanvasContext = React.createContext({ id: null });

const manifestSelector = memoize(id =>
  createSelector(
    getAllManifests,
    manifests => {
      return manifests[id];
    }
  )
);

const canvasSelector = memoize(id =>
  createSelector(
    getAllCanvases,
    canvases => {
      return canvases[id];
    }
  )
);

export function useManifest(customApi = null) {
  const { id } = useContext(ManifestContext);
  const { storeState } = useContext(ReactReduxContext);
  const selector = useMemo(() => manifestSelector(id), [id]);

  return manifest(
    selector,
    customApi || (api => ({ id: api.getId, label: api.getLabel }))
  )(storeState);
}

export function useCanvas(customApi = null) {
  const { id } = useContext(CanvasContext);
  const { storeState } = useContext(ReactReduxContext);
  const selector = useMemo(() => canvasSelector(id), [id]);

  return canvas(
    selector,
    customApi ||
      (api => ({
        id: api.getId,
        label: api.getLabel,
        thumbnailId: api.getThumbnailId,
      }))
  )(storeState);
}

export function Canvas({ id, children }) {
  return (
    <CanvasContext.Provider value={{ id }}>{children}</CanvasContext.Provider>
  );
}

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
