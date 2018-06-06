import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Collection from './components/Collection/Collection';
import { Layout } from 'antd';
import Manifest from './components/Manifest/Manifest';
import Sequence from './components/Sequence/Sequence';
import Canvas from './components/Canvas/Canvas';

export default () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Layout>
          <Route path="/collection" component={Collection} />
          <Route path="/manifest" component={Manifest} />
          <Route path="/sequence" component={Sequence} />
          <Route path="/canvas" component={Canvas} />
        </Layout>
      </Switch>
    </HashRouter>
  );
};
