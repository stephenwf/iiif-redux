# IIIF Graphql

IIIF specification through GraphQL over rest. Thats the goal, this is the start. It is a heavy client-side implementation built on top of IIIF Redux, which acts as safe-access and a unified API to both IIIF Presentation 2 and Presentation 3 resources.

The goal of this library will be to offer both a server implementation and client side implementation. The server implementation will have the option to be hooked up to a non-IIIF data source through a layer over the resolver API for institutions collections. It will also feature an out of the box proxy to content hosted in the IIIF space so you can host your own IIIF GraphQL instance that can query any IIIF content, composed together for building your own applications and tools.

The client implementation will get better with time, but the main focus is building a single implementation that can work both on the server and on the client.

## The why

At the moment the IIIF space is full of duplicate code, multiple solutions to the same problem and lots of already solved problems that are hard to discover. This implementation of GraphQL is intended to become a place to colabourate on solving common problems parsing IIIF data and building a library of GraphQL resolvers and custom queries that can be used quickly in small to large projects.

## The what

Heres the dream query:

```graphql
query getManifest($id: String, $q: String!) {
  manifest(id: $id) {
    id
    label
    metadata {
      label
      value
    }
    search(query: $q) {
      results {
        canvasId
        contentAsText
        selector {
          x
          y
          width
          height
        }
      }
    }
    canvases {
      id
      label
      thumbnail: thumbnailAtSize(size: 200) {
        src
        height
        width
      }
      tiledImages {
        height
        width
        tiles
        scaleFactor
      }
    }
  }
}
```

If you are unfamiliar with GraphQL, the key concept is that they query language descibes a JSON format that you want returned. You can read this query and know what the fields will be and so can predicably start using these fields.

Reading through this query, you can see we are grabbing some basic properties like `id` and `label` from the manifest. We are also requesting the metadata pairs. This is always an array, so each item in the array will match the format `{label: "str", value: "str"}`. Translation is done automatically using a global context (to be documented).

The next section is where the power of GraphQL starts coming through, theres a search block that accepts `query` just like the IIIF specification. Behind the scenes this will be doing many things:

- Checking if the resource has a search service
- Fetching the service
- Constructing and executing the search
- Formatting and parsing that back in your desired format

In addition, because this is using IIIF Redux under the hood, any references (such as targets) in the search results or any request are maintained as logical links. IIIF Redux maintains that graph and makes it query-able here.

The next section `canvases` is dropping deeper into the graph of the manifest. You can go as deep as you want or need to here. You can see another non-IIIF property in the query `thumbnailAtSize` being assigned to the `thumbnail` property. This is another theoretical extension where some derived data is being reduced into a handful of fields. Under the hood this could be:

- Finding a thumbnail service
- Finding a thumbnail static image, checking its height/width against your requested height
- Looking for an image service in the annotations

In the end its goal is to find the best thumbnail given the criteria. This is immediately available in the query language to be reused once created. It can be improved.

## The how

Slowly. This is the start of this project that I am working on in my down-time. Currently with IIIF Redux you can use functional composition to create a bunch of queries for IIIF content, but the interface to that is low-level but fail-safe. The goal of IIIF-GraphQL is to be both fail-safe and nice to work with.

GraphQL and apollo, the library that this is using, has integrations with every Frontend framework under the sun. There is no lock-in with this library, this broadens the developer interest and collabouration.

## Roadmap

The road map is not in any particular order. The first goal is a base for collabouration. The second goal is exploring some of the challenges in IIIF-space using GraphQL.

### v1.0

- Fully IIIF compliant GraphQL type definition
- Full compatibility with Presentation 2 over a presentation 3 query interface
- Extension model to start adding derived fields to queries
- v1.0 IIIF explorer using GraphQL
- Cookbook of GraphQL queries for common UI interfaces

### v1.x

- W3C Annotation compliant GraphQL type definition
- IIIF Image 2.x compliant GraphQL type definition
- IIIF Activity stream compliant GraphQL type definition
- IIIF Discovery integration in GraphQL server (invalidating caches)
- IIIF Authentication compliant GraphQL type defintion
- Authentication extensions
