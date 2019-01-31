import React, { useContext, useState } from 'react';
import {
  Canvas,
  ManifestContext,
  useCanvas,
  useManifest,
} from '../../context/manifest';
import t from '../../utils/t';
import { canvases } from 'iiif-redux/src/api/canvas';

// This is all the bits we need for the canvas listing page.
const manifestSelector = manifest => ({
  label: manifest.getLabel,
  canvasList: canvases(manifest.getCanvases, canvas => ({
    id: canvas.getId,
    label: canvas.getLabel,
  })),
});

// This is our image viewer, very very simple.
function ImageViewer() {
  const { id, label, thumbnailId } = useCanvas();

  return (
    <div>
      <div>
        {t(label)} ({id})
      </div>
      <img src={thumbnailId} alt={t(label)} />
    </div>
  );
}

// This is an abstraction to get the manifest loading state.
function useManifestLoaded() {
  const { manifest } = useContext(ManifestContext);
  return manifest.fetched;
}

const styles = {
  container: { display: 'flex' },
  left: { width: 300, margin: 20 },
  right: { flex: '1 0 0%', margin: 20 },
  link: { cursor: 'pointer', margin: 4, background: '#eee', listStyle: 'none' },
  list: { margin: 0, padding: 0, textAlign: 'center' },
};

// This is our viewer.
function HookViewer() {
  // Get the fetched status of our manifest
  const fetched = useManifestLoaded();
  // Grab the label and list
  const { label, canvasList } = useManifest(manifestSelector);
  // Create some state to manage the current manifest
  const [currentCanvas, setCurrentCanvas] = useState();

  // If we're fetching, return early.
  if (fetched === false) {
    return <div>Loading...</div>;
  }

  // Render our viewer.
  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h3>{t(label)}</h3>
        <ul style={styles.list}>
          {canvasList.map(canvas => (
            // Here we are setting the canvas id for our viewer.
            <li
              style={styles.link}
              key={canvas.id}
              onClick={() => setCurrentCanvas(canvas.id)}
            >
              {t(canvas.label)}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.right}>
        {/*
          Here we are creating a new "Context" for the select canvas.
          This will be available to ALL children no matter how deep
          using `useCanvas` hook.
        */}
        {currentCanvas ? (
          <Canvas id={currentCanvas}>
            <ImageViewer />
          </Canvas>
        ) : (
          <div>Please Select a canvas</div>
        )}
      </div>
    </div>
  );
}

export default HookViewer;
