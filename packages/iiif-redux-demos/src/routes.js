import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Collection from './components/Collection/Collection';
import * as qs from 'query-string';
import { Layout } from 'antd';

function renderId(Comp) {
  return ({ location }) => <Comp id={qs.parse(location.search).id} />;
}

export default () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Layout>
          <Route path="/collection" render={renderId(Collection)} />
        </Layout>
      </Switch>
    </HashRouter>
  );
};
