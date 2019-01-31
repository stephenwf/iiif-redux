import React, { Component } from 'react';
import { manifestByIdSelector } from 'iiif-redux/es/api/manifest';
import connect from '../../hoc/connect';
import t from '../../utils/t';

class ManifestSimple extends Component {
  render() {
    const { label, license, logo, metadata } = this.props;

    return (
      <div>
        <h2>Manifest simple</h2>
        <p>Simple example of loading in a manifest.</p>
        <ul>
          <li>
            <strong>Label:</strong> {t(label)}
          </li>
          <li>
            <strong>license:</strong> {license}
          </li>
          <li>
            <strong>Logo:</strong>
            <img width="50" src={logo[0] ? logo[0].id : logo} />
          </li>
          <li>
            <strong>Metadata:</strong>
            <ul>
              {(metadata || []).map((metadataPair, key) => (
                <li key={key}>
                  {metadataPair.label ? (
                    <strong>{t(metadataPair.label)}: </strong>
                  ) : null}
                  <span
                    dangerouslySetInnerHTML={{ __html: t(metadataPair.value) }}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(
  manifestByIdSelector(currentManifest => ({
    label: currentManifest.getLabel,
    license: currentManifest.getLicense,
    logo: currentManifest.getLogo,
    metadata: currentManifest.getMetadata,
  }))
)(ManifestSimple);
