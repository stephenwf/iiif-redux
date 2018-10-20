import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import schemaDirectives from './directives';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives,
});

export default schema;
