import React, { Component, PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Link, Router } from '@reach/router';
import { createStore } from 'iiif-redux';
import './App.css';
import ManifestSimple from '../ManifestSimple/ManifestSimple';
import CanvasList from '../CanvasList/CanvasList';
import { Manifest, ManifestContext } from '../../context/manifest';
import t from '../../utils/t';
import TestManifestContext from '../ManifestWithContext/ManifestWithContext';
import HooksExample from '../HooksExample/HooksExample';
import HookViewer from '../HookViewer/HookViewer';

const store = createStore();

const Home = () => (
  <div>
    <ul>
      <li>
        <Link to="/manifest-simple">Manifest simple</Link>
      </li>
      <li>
        <Link to="/manifest-simple-p3">Manifest simple (Presentation 3)</Link>
      </li>
      <li>
        <Link to="/canvases-simple">Canvases simple</Link>
      </li>
      <li>
        <Link to="/canvases-simple-p3">Canvases simple (Presentation 3)</Link>
      </li>
      <h3>React 16 Context</h3>
      <li>
        <Link to="/manifest-context">Manifest context (p2)</Link>
      </li>
      <li>
        <Link to="/hooks/1">Hooks example 1</Link>
      </li>
      <li>
        <Link to="/hooks/2">Hooks example 2</Link>
      </li>
    </ul>
  </div>
);

const ContextTest = () => (
  <div>
    <Manifest id="https://wellcomelibrary.org/iiif/b18035723/manifest">
      <TestManifestContext />
    </Manifest>
  </div>
);

const HooksTest = () => (
  <div>
    <Manifest id="https://wellcomelibrary.org/iiif/b18035723/manifest">
      <HooksExample />
    </Manifest>
  </div>
);

const HooksViewerTest = () => (
  <div>
    <Manifest id="https://wellcomelibrary.org/iiif/b18035723/manifest">
      <HookViewer />
    </Manifest>
  </div>
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Link to="/" as="h1">
            <h1>IIIF Redux demos</h1>
          </Link>
          <Router>
            <Home path="/" default />
            <ManifestSimple
              path="/manifest-simple"
              id="https://wellcomelibrary.org/iiif/b18035723/manifest"
            />
            <ManifestSimple
              path="/manifest-simple-p3"
              id="https://raw.githubusercontent.com/digirati-co-uk/prezi2to3-js/master/tests/spec/fixtures/out/manifests.britishart.yale.edu__manifest__1474.json"
            />
            <CanvasList
              path="/canvases-simple"
              id="https://wellcomelibrary.org/iiif/b18035723/manifest"
            />
            <CanvasList
              path="/canvases-simple-p3"
              id="https://raw.githubusercontent.com/digirati-co-uk/prezi2to3-js/master/tests/spec/fixtures/out/manifests.britishart.yale.edu__manifest__1474.json"
            />
            <ContextTest path="/manifest-context" />
            <HooksTest path="/hooks/1" />
            <HooksViewerTest path="/hooks/2" />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
