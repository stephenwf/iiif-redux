import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Link, Router } from '@reach/router';
import { createStore } from 'iiif-redux';
import './App.css';
import ManifestSimple from '../ManifestSimple/ManifestSimple';
import CanvasList from '../CanvasList/CanvasList';
import ManifestContext from '../ManifestContext/ManifestContext';

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
      <li>
        <Link to="/manifest-context-1">Manifest (using context)</Link>
      </li>
    </ul>
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
            <ManifestContext
              path="/manifest-context-1"
              id="https://wellcomelibrary.org/iiif/b18035723/manifest"
            />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
