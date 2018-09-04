/**
 * @flow
 */

import OpenSeadragon from 'openseadragon';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { canvasByIdSelector } from 'iiif-redux/es/api/canvas';
// import {s} from 'iiif-redux/es/spaces/services';

type OpenSeadragonViewerPropTypes = {
  width: number,
  height: number,
  tileSources: Array<any>,
  onImageLoaded: (typeof OpenSeadragon, any) => any,
  maxWidth: ?number,
  maxHeight: ?number,
  getRef: any => void,
  osdOptions: any,
  useMaxDimensions: boolean,
  imageService: { ['@id']: string },
  style: any,
};

type OpenSeadragonViewerState = {
  fallback: boolean,
};

type Bounds = { x: number, y: number, width: number, height: number };

class OpenSeadragonViewer extends Component<
  OpenSeadragonViewerPropTypes,
  OpenSeadragonViewerState
> {
  state = {
    fallback: false,
  };
  viewer: ?OpenSeadragon = null;
  element: any = null;
  static defaultProps = {
    osdOptions: {},
    useMaxDimensions: false,
    height: 500,
    style: {},
  };

  componentWillReceiveProps(newProps: OpenSeadragonViewerPropTypes) {
    const { imageService } = this.props;
    if (imageService !== newProps.imageService) {
      this.loadImageService(newProps.imageService);
    }
  }

  loadImageService(imageService) {
    if (imageService) {
      fetch(
        imageService['@id'].endsWith('info.json')
          ? imageService['@id']
          : `${imageService['@id']}/info.json`
      )
        .then(resp => resp.json())
        .then(tileSource => {
          if (tileSource) {
            this.viewer.close();
            this.asyncAddTile({ tileSource }).then(() => {
              this.viewer.viewport.goHome(true);
            });
          }
        });
    }
  }

  componentWillMount() {
    this.loadImageService(this.props.imageService);
  }

  componentDidMount() {
    const { getRef, onImageLoaded, tileSources = [], osdOptions } = this.props;
    this.setState({ fallback: false });
    this.viewer = OpenSeadragon({
      element: this.element,
      ajaxWithCredentials: false,
      showNavigator: false,
      showRotationControl: true,
      defaultZoomLevel: 0,
      maxZoomPixelRatio: 1,
      navigatorPosition: 'BOTTOM_RIGHT',
      animationTime: 0.5,
      immediateRender: false,
      preserveViewport: true,
      blendTime: 0.1,
      minPixelRatio: 0.5,
      visibilityRatio: 0.65,
      minZoomImageRatio: 1,
      constrainDuringPan: false,
      showSequenceControl: false,
      showNavigationControl: false,
      showZoomControl: true,
      showHomeControl: false,
      showFullPageControl: false,
      sequenceMode: true,
      ...osdOptions,
    });
    if (getRef) {
      getRef(this);
    }
  }

  asyncAddTile = (args: any): Promise<void> => {
    return new Promise((success, err) => {
      if (!this.viewer) {
        return null;
      }

      try {
        this.viewer.addTiledImage.call(this.viewer, { success, ...args });
      } catch (e) {
        err(e);
      }
    });
  };

  createRelativePoint = (x: number, y: number): ?OpenSeadragon.Point => {
    if (!this.viewer) {
      return null;
    }

    return this.viewer.viewport.viewerElementToImageCoordinates(
      new OpenSeadragon.Point(x, y)
    );
  };

  createViewportPoint = (x: number, y: number) => {
    if (!this.viewer) {
      return null;
    }
    return this.viewer.viewport.imageToViewerElementCoordinates(
      new OpenSeadragon.Point(x, y)
    );
  };

  getImageSize = () => {
    return {
      width: this.props.width,
      height: this.props.height,
    };
  };

  getMinZoom = () => {
    if (this.viewer) {
      return this.viewer.viewport.getMinZoom();
    }
    return 0;
  };

  getMaxZoom = () => {
    if (this.viewer) {
      return this.viewer.viewport.getMaxZoom();
    }
    return 1;
  };

  getZoom = () => {
    if (this.viewer) {
      return this.viewer.viewport.getZoom();
    }
    return 0;
  };

  zoomIn = (speed: number) => {
    if (this.getZoom() < this.getMaxZoom()) {
      this.viewportAction('zoomBy', [1 / 0.7], speed);
    }
  };

  zoomOut = (speed: number) => {
    if (this.getZoom() > this.getMinZoom()) {
      this.viewportAction('zoomBy', [0.7], speed);
    }
  };

  resetView = (speed: number) => {
    this.viewportAction('goHome', [], speed);
  };

  goToRect = (
    { x, y, width, height }: Bounds,
    padding: number = 0,
    speed: ?number
  ) => {
    if (!this.viewer) {
      return null;
    }
    const selectHighlight = this.viewer.viewport.imageToViewportRectangle(
      new OpenSeadragon.Rect(
        x - padding / 2,
        y - padding / 2,
        width + padding,
        height + padding,
        0
      )
    );

    this.viewportAction(
      'fitBounds',
      [selectHighlight],
      speed || speed === 0 ? speed : 1
    );
  };

  panTo = (x: number, y: number, speed: number) => {
    this.viewportAction('panTo', [new OpenSeadragon.Point(x, y)], speed);
  };

  zoomTo = (
    zoom: number,
    refPoint: OpenSeadragon.Point = null,
    immediately: boolean = false,
    speed: number
  ) => {
    this.viewportAction('zoomTo', [zoom, refPoint, immediately], speed);
  };

  viewportAction = (name: string, args: Array<any> = [], speed: number) => {
    if (!this.viewer) {
      return null;
    }
    const func = this.viewer.viewport[name];
    if (func) {
      if (speed) {
        return this.runAtSpeed(
          speed,
          () => (this.viewer ? func.apply(this.viewer.viewport, args) : null)
        );
      }
      return this.viewer ? func.apply(this.viewer.viewport, args) : null;
    }
  };

  runAtSpeed = (speed: number, callback: () => any) => {
    if (!this.viewer) {
      return null;
    }

    const centerSpringX = this.viewer.viewport.centerSpringX.animationTime;
    const centerSpringY = this.viewer.viewport.centerSpringY.animationTime;
    const zoomSprint = this.viewer.viewport.zoomSpring.animationTime;

    this.viewer.viewport.centerSpringX.animationTime = speed;
    this.viewer.viewport.centerSpringY.animationTime = speed;
    this.viewer.viewport.zoomSpring.animationTime = speed;

    callback();

    if (!this.viewer) {
      return null;
    }

    this.viewer.viewport.centerSpringX.animationTime = centerSpringX;
    this.viewer.viewport.centerSpringY.animationTime = centerSpringY;
    this.viewer.viewport.zoomSpring.animationTime = zoomSprint;
  };

  getPosition = () => {
    if (!this.viewer) {
      return null;
    }

    const { x, y } = this.viewer.viewport.getCenter();

    return { x, y, zoom: this.getZoom() };
  };

  setRef = (el: any) => (this.element = el);

  render() {
    const {
      height,
      width,
      maxWidth,
      maxHeight,
      useMaxDimensions = false,
      style,
    } = this.props;
    const heightRatio = maxHeight ? maxHeight / height : 1;
    const widthRatio = maxWidth ? maxWidth / width : 1;
    const scale = heightRatio < widthRatio ? heightRatio : widthRatio;
    const actualHeight =
      useMaxDimensions && maxHeight ? maxHeight : height * scale;

    if (this.state.fallback) {
      return null;
    }

    return (
      <div
        ref={this.setRef}
        style={{ height: actualHeight, width: '100%', ...style }}
      />
    );
  }
}

export default connect(
  canvasByIdSelector(currentCanvas => ({
    imageService: currentCanvas.getImageService,
  }))
)(OpenSeadragonViewer);
