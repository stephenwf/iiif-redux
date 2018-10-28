import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const queryText = gql`
  query {
    collection(id: "https://view.nls.uk/collections/7446/74466699.json") {
      id
      type
      label
      metadata {
        label
        value
      }
    }
    manifest(id: "https://wellcomelibrary.org/iiif/b20432033/manifest") {
      id
      type
      label
      metadata {
        label
        value
      }
    }
  }
`;

class HelloWorld extends Component {
  render() {
    return (
      <Query query={queryText}>
        {({ data, loading, error }) => {
          if (loading) {
            return <h2> Loading </h2>;
          }
          if (error) {
            return <h2> {JSON.stringify(error)} </h2>;
          }

          return <pre>{JSON.stringify(data, null, 2)}</pre>;
        }}
      </Query>
    );
  }
}

export default HelloWorld;
