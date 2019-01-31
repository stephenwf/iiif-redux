import React, { Component } from 'react';
import connect from '../../hoc/connect';
import { manifestByIdSelector } from 'iiif-redux/es/api/manifest';
import { canvases } from 'iiif-redux/es/api/canvas';
import t from '../../utils/t';

class CanvasList extends Component {
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
  }))
)(CanvasList);
