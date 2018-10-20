import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import SetContextLink from 'apollo-link-set-context';
import { ApolloLink } from 'apollo-link';
import { createStore } from 'iiif-redux';
import ApolloClient from 'apollo-client';
import schema from './schema';

const store = createStore();

// const link = ApolloLink.from([
//   consoleLink,
//   TestLink,
//   new SchemaLink({ schema, context: { store } }),
// ]);

const client = new ApolloClient({
  link: new SchemaLink({ schema, context: { store } }),
  cache: new InMemoryCache(),
});

export default client;
