import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import HelloWorld from './HelloWorld';

import client from '../graphql/client';

class App extends Component {
  state = {
    client: null,
  };

  async componentWillMount() {
    this.setState({ client: await client });
  }

  render() {
    if (!this.state.client) {
      return 'Loading ...';
    }
    return (
      <ApolloProvider client={this.state.client}>
        <HelloWorld />
      </ApolloProvider>
    );
  }
}

export default App;
