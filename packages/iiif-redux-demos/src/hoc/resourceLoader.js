/**
 * Resource loader
 *
 * Props will be built from URIs to track state. Example:
 * - /collection?id={id}
 * - /manifest?id={id}
 * - /sequence?id={id}&resourceId={resourceId}
 * - /canvas?id={id}&manifestId={resourceId}
 * - /image?id={id}&manifestId={resourceId}
 * - /range?id={id}&manifestId={resourceId}
 * - /otherContent?id={id}
 *
 * It uses these IDs to load the resource it needs to in order to render the lower components.
 *
 * In addition, it also will control how these URIs are built, and pass down navigation.
 *
 * selectCollection(id)
 * selectManifest(id)
 * selectSequence(id)
 * selectOtherContent(id)
 *
 * And it will pre-fill these with the current resource in order to maintain the correct resource types.
 *
 * @todo still a work in progress.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import { selectCollection, selectManifest } from 'iiif-redux/es/spaces/routing';

function resourceLoader(WrappedComponent) {
  return connect()(
    class extends Component {
      getManifestId = () => {
        const { location } = this.props;
        const { id, manifestId } = qs.parse(location.search);

        return manifestId ? manifestId : id;
      };

      getId = () => {
        const { location } = this.props;
        const { id } = qs.parse(location.search);
        return id;
      };

      getType = () => {
        const { location } = this.props;
        return location.pathname.slice(1);
      };

      updateResource({ location }) {
        const { id, manifestId } = qs.parse(location.search);
        const type = location.pathname.slice(1);

        if (['sequence', 'canvas', 'image', 'range'].indexOf(type) === -1) {
          // We are just loading the type.
          this.loadResource(id, type);
        } else {
          // We are loading the manifest.
          this.loadResource(manifestId, 'manifest');
        }
      }

      componentWillMount() {
        this.updateResource(this.props);
      }

      componentWillReceiveProps(newProps) {
        if (this.props.location !== newProps.location) {
          this.updateResource(newProps);
        }
      }

      selectCollection = id => {
        this.props.history.push(`/collection?id=${id}`);
      };

      selectManifest = id => {
        this.props.history.push(`/manifest?id=${id}`);
      };

      selectSequence = id => {
        const manifestId = this.getManifestId();
        this.props.history.push(`/sequence?id=${id}&manifestId=${manifestId}`);
      };

      selectCanvas = id => {
        const manifestId = this.getManifestId();
        this.props.history.push(`/canvas?id=${id}&manifestId=${manifestId}`);
      };

      selectImage = id => {
        const manifestId = this.getManifestId();
        this.props.history.push(`/image?id=${id}&manifestId=${manifestId}`);
      };

      selectRange = id => {
        const manifestId = this.getManifestId();
        this.props.history.push(`/range?id=${id}&manifestId=${manifestId}`);
      };

      selectOtherContent = otherContentId => {
        this.props.history.push(`/otherContent?id=${otherContentId}`);
      };

      loadResource = (id, type) => {
        switch (type) {
          case 'collection':
            return this.props.dispatch(selectCollection({ id }));
          case 'manifest':
            return this.props.dispatch(selectManifest({ id }));
          default:
            console.warn('Come add this.', type, id);
        }
      };

      getMethods() {
        const type = this.getType();
        switch (type) {
          case 'collection':
            return {
              type,
              selectCollection: this.selectCollection,
              selectManifest: this.selectManifest,
            };
          default:
            return {
              type,
              manifestId: this.getManifestId(),
              selectSequence: this.selectSequence,
              selectCanvas: this.selectCanvas,
              selectImage: this.selectImage,
              selectRange: this.selectRange,
              selectOtherContent: this.selectOtherContent,
            };
        }
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...this.getMethods()}
            id={this.getId()}
          />
        );
      }
    }
  );
}

export default resourceLoader;
