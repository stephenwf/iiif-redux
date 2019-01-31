import React, { Component } from 'react';
import t from '../../utils/t';
import { ManifestContext } from '../../context/manifest';

class TestManifestContext extends Component {
  static contextType = ManifestContext;

  render() {
    const { manifest } = this.context;

    if (manifest.fetched === false) {
      return <div>Loading...</div>;
    }

    return <div>Manifest label: {t(manifest.label)}</div>;
  }
}

export default TestManifestContext;
