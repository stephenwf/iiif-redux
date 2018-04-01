# API
The API for this library is in the form of a collective of selectors. They are grouped
in 2 main ways. Low-level selectors and state selectors. 

## Low level selectors
The first lower-level selectors are for all the different properties
found across all IIIF resources. 

- Descriptive properties
- Linking properties
- Paging properties
- Structural properties
- Technical properties

They are usually in the form:
```
(resource) => string | Array<string>
```

There are a few exceptions, descriptive properties can return multi-language strings:
```js
const label = [
  { '@language': 'en', '@value': 'Some label' }
];
```
These are normalized to always return in this format of an array with at least one value. 

For string values (or arrays of strings) returned they are usually either:
- URIs pointing to other internal resources
- URIs pointing to external resources
- constants known internally (e.g. viewing hints)

## State selectors
These selectors work on the global redux state to return values, opposed to individual
resources. They introduce concepts that are more state driven (selected items for example)
that are not directly related to the IIIF specification. They are also made to be replaceable 
in applications that need a different state model.

They are usually in the form:
```
(state) => resource | string | Array<string>
```
They can return resources or values from resources. Currently the built-in state selector
apis are:
- Current collection
- Current Manifest
- Current Sequence
- Current Canvas

Each of them are driven from a single item in state (selectedSomething) that will determine
which of the values are returned. For example:
```js
// ! Assumes state object exists in scope.
import { getLabel } from 'iiif-redux/api/current-collection';

console.log(
  getLabel({
     routing: { currentCollection: 'http://collection.org/1' },
     collections: {
       'http://collection.org/1': { 
         '@id': 'http://collection.org/1', 
         label: 'First label' 
       }
     }
  })
); // First label
```

The state normally would of course be the redux state, but this shows what the job of the 
selectors is, reducing large states into values.

## Future APIs
There are many ways that we could go from here to expand out the different ways to represent state
in an application or viewer.

- **Image content** - a priority for image viewing experiences, providing various APIs to parse image services, get tile sources for deep zoom or optimised thumbnails.
- **Viewport** - another important one for viewing experiences: providing state + apis for tracking position of a virtual camera exploring canvases.
- **Selected Annotation Lists** - selecting multiple annotation lists would need a different API to what we have now
- **Selected Annotation** - a common pattern when searching or viewing annotations is the concept of selecting an annotation, and navigating to next / previous.
- **Range + position in range** - a more complex tracking example going through ranges (sometimes multilevel)
- **Layers** - Using the layers grouping concept to enable/disable different layers with annotations or resources and giving access to whats makes up each layer.  
- **Service specific APIs** - A bit more ambiguous, but a model for creating service specific APIs would be really powerful, enabling a "transcription service" for example to be fully featured from a data perspective and enable rich components to provide richer experiences.

In addition to this, a way of scaling this model up so more than one "selected" item can be viewed and tracked. 

## Verbosity of the API
One question that might crop up is the verbosity of this API, and its granularity. Why have a function 
for every single property, not just dynamically build them on the fly? Partially this is a design choice,
while using reselect library. The other is from a performance and size point of view. Many code-bundling 
offerings come with some form of tree-shaking or dead-code elimination. The way this API is built up makes
it very easy to build an app, use what you need and then shake the rest away.

### Downsides of this approach
The big downside of this is a lot of similar code, especially in the tests and the `currentXYZ.js` files. This
will make updating harder, but they are all simple compositions built from the low-level selectors.

### Upsides of this approach
When it comes to updating APIs and properties, usually there will be only one place to change. Did a property
change name? Or the return value changed? It should be 99% of the time a change in one place.

### But I want a less verbose API
That is great, and it should be easy to compose that. Reselect comes with a method `createStructuredSelector`
that you can use very easily to build up more traditional JS object models. This is the intention of this 
API is to be composed:

```js
// my-project/selectors/currentCollection.js 
import { createSelector, defaultMemoize, createStructuredSelector } from 'reselect';
import { getDefaultLanguage } from 'iiif-redux/api/config';
import * as currentManifest from 'iiif-redux/api/currentManifest';
import * as currentSequence from 'iiif-redux/api/currentSequence';
import * as descriptive from 'iiif-redux/api/iiif-descriptive'; 

export default createStructuredSelector({
 label: currentManifest.getLabel,
 metadata: currentManifest.getMetadata,
 canvasThumbnails: createSelector(
   currentSequence.getCanvases,
   getDefaultLanguage,
   defaultMemoize((canvases, lang) =>
     canvases.map(
       createStructuredSelector({
         label: descriptive.getLabel(lang),
         thumbnail: descriptive.getThumbnailId,
       })
     )
   )
 ),
});
```  

This will return something that looks like, when passed the state:
```js
const collection = {
  label: [{ '@language': 'en', '@value': 'collection label' }],
  metadata: [{ 
    label: [{ '@language': 'en', '@value': 'metadata label' }],
    value: [{ '@language': 'en', '@value': 'metadata value' }]
    // ... 
  }],
  canvasThumbnails: [
    {
      label: [{ '@language': 'en', '@value': 'canvas label' }],
      thumbnail: 'http://example.org/canvas-1/thumb.jpg'
    }
    // ...
  ]  
};
```

There will be a cookbook of these types of compositions. They should be easy to grab
and change to suit the needs of various applications.
