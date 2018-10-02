import React, { Component } from 'react';
import { connect } from 'react-redux';
import { manifestByIdSelector } from 'iiif-redux/es/api/manifest';
import { iiifResourceRequestUnknown } from 'iiif-redux/es/spaces/iiif-resource';

function t(str) {
  if (!str) {
    return '';
  }
  if (Array.isArray(str)) {
    return str && str[0] ? str[0]['@value'] || '' : '';
  }
  return str[Object.keys(str)[0]][0] || '';
}

class ManifestSimple extends Component {
  componentWillMount() {
    this.props.iiifResourceRequestUnknown(this.props.id);
  }

  render() {
    const { label, license, logo, metadata, fetched, error } = this.props;

    if (error) {
      return <div>Error</div>;
    }

    if (fetched === false) {
      return <div>Loading...</div>;
    }

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
  })),
  { iiifResourceRequestUnknown }
)(ManifestSimple);
