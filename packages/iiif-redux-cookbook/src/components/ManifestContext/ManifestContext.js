import React from 'react';
import t from '../../utils/t';

function Manifest() {}

function useManifest(selector) {}

function ManifestMetadata(props) {
  const { label, license, logo, metadata } = useManifest(api => ({
    label: api.getLabel,
    license: api.getLicense,
    logo: api.getLogo,
    metadata: api.getMetadata,
  }));

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

function targetApi(props) {
  return (
    <Manifest id={props.id}>
      <ManifestMetadata />
    </Manifest>
  );
}

function ManifestContext(props) {
  return <div>Manifest: {props.id}</div>;
}

export default ManifestContext;
