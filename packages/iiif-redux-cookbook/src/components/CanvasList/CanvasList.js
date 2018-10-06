import React, { Component } from 'react';
import { connect } from 'react-redux';
import { manifestByIdSelector } from 'iiif-redux/es/api/manifest';
import { canvases } from 'iiif-redux/es/api/canvas';
import { iiifResourceRequestUnknown } from 'iiif-redux/es/spaces/iiif-resource';
import withLoadingState from '../../hoc/withLoadingState';
import t from '../../utils/t';

class CanvasList extends Component {
  componentWillMount() {
    this.props.iiifResourceRequestUnknown(this.props.id);
  }

  render() {
    const { label, canvasList } = this.props;

    return (
      <div>
        <h2>Canvas list</h2>
        <h3>Manifest label: {t(label)}</h3>
        <div>
          {canvasList.map((canvas, id) => (
            <div key={id}>Canvas Label: {t(canvas.label)}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  manifestByIdSelector(currentManifest => ({
    label: currentManifest.getLabel,
    canvasList: canvases(currentManifest.getCanvases, canvas => ({
      label: canvas.getLabel,
    })),
  })),
  { iiifResourceRequestUnknown }
)(withLoadingState(CanvasList));
