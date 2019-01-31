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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <h1>IIIF Redux demos</h1>
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
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
