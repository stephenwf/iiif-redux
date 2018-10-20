const typeDefs = `#graphql

  directive @intl on FIELD_DEFINITION

  interface InCollection {
    id: String
    type: String
    label: String @intl
  }

  type Metadata {
    label: String @intl
    value: String @intl
  }

  type Collection implements InCollection{
    id: String
    type: String
    label: String @intl
    items: [InCollection]
    metadata: [Metadata]
  }

  type Manifest implements InCollection {
    id: String
    type: String
    label: String @intl
    metadata: [Metadata]
  }

  type Hello {
    message: String
  }

  type Test {
    label: String
  }

  type Query {
    sayHello: Hello
    getCollection(collectionId: String): Collection
    getTest: Test
    getManifest(manifestId: String): Manifest
  }
`;

export default typeDefs;
