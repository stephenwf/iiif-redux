import React, { useContext } from 'react';
import { ManifestContext, useManifest } from '../../context/manifest';
import t from '../../utils/t';
import { externalResources } from 'iiif-redux/src/api/external-resource';

function Example1() {
  // Default selector.
  const { label } = useManifest();

  return (
    <div>
      <h3>Example 1</h3>
      <b>Label:</b> {t(label)}
    </div>
  );
}

function Example2() {
  // Single field, custom selector.
  const license = useManifest(api => api.getLicense);

  return (
    <div>
      <h3>Example 2</h3>
      <b>License:</b> {license}
    </div>
  );
}

function Example3() {
  // You can call useManifest more than once.
  const label = useManifest(api => api.getLabel);
  const license = useManifest(api => api.getLicense);

  return (
    <div>
      <h3>Example 3</h3>
      <b>Label:</b> {t(label)} <br />
      <b>License:</b> {license}
    </div>
  );
}

function Example4() {
  // Bigger example, 2 fields selected at once.
  const { label, metadata } = useManifest(api => ({
    label: api.getLabel,
    metadata: api.getMetadata,
  }));

  // Also selecting the see also links (note you will be able to leave second)
  //   argument blank to get sensible default selector.
  const seeAlso = useManifest(manifest =>
    // This could also have been combined into the selector above, but is
    //  split out for clarity.
    externalResources(manifest.getSeeAlso, resource => ({
      id: resource.getId,
      format: resource.getFormat,
    }))
  );

  const linkStyle = { margin: 5, padding: 5, border: '2px solid #000' };

  return (
    <div>
      <h3>Example 4</h3>
      <b>Label:</b> {t(label)}
      {metadata.map((pair, n) => (
        <div key={n}>
          <b>{t(pair.label)}</b>:{' '}
          <span dangerouslySetInnerHTML={{ __html: t(pair.value) }} />
        </div>
      ))}
      <div>
        <h4>See also</h4>
        {seeAlso.map(link => (
          <div key={link.id} style={linkStyle}>
            <b>Id:</b> {link.id} <br />
            <b>format:</b> {link.format}
          </div>
        ))}
      </div>
    </div>
  );
}

function HooksExample() {
  // Pure hooks example.
  const { manifest } = useContext(ManifestContext);

  if (manifest.fetched === false) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Example1 />
      <Example2 />
      <Example3 />
      <Example4 />
    </div>
  );

  return <div>Hooks example {t(manifest.label)}</div>;
}

export default HooksExample;
