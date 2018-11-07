import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../schema.graphql';
import resolvers from '../resolvers';
import schemaDirectives from './directives';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives,
});

export default schema;
