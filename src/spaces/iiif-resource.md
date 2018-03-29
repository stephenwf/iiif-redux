# IIIF Resources
This state is where all of our entities get imported into. The actions here are dynamic
and will call off to other spaces with follow up actions.

## State structure
```js
const state = {
  dereferenced: {
    'http://.../collection.json': { 
      loading: true,
      requested: '00-00-0000:00:00:00', 
      ttl: 600,
      error: null, // or { message: 'Failed to fetch', ... }
    },
  },
  collections: {
    'http://.../collection.json': {/* ... */},
  },
  manifests: {},
  sequences: {},
  canvass: {},
  annotations: {},
  annotationLists: {},
  ranges: {},
  layers: {},
  imageResources: {},
  externalResources: {},
  services: {},
}
```

## Reusable actions
Requesting an item that can definitely be referenced (i.e. manifest):
```js
dispatch({
  type: 'REQUEST_IIIF_RESOURCE',
  payload: {
    resource: 'http://.../manifest.json',
    types: ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
    schema: schemas.manifest,
  }
});
```

Requesting an items fields, dereferencing if they don't exist.
```js
dispatch({
  type: 'REQUEST_IIIF_RESOURCE',
  payload: {
    resource: 'http://.../manifest.json',
    types: ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
    dereferenceIfMissing: ['sequences'],
    schema: schemas.imageService,
  }
});
```

Requesting a resource, with a TTL so if its requested again a fresh copy may be requested.
```js
dispatch({
  type: 'REQUEST_IIIF_RESOURCE',
  payload: {
    resource: 'http://.../manifest.json',
    types: ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
    ttl: 600,
    schema: schemas.manifest,
  }
});
```

Force-requesting an item, includes cache busting
```js
dispatch({
  type: 'REQUEST_IIIF_RESOURCE',
  payload: {
    resource: 'http://.../manifest.json',
    types: ['MANIFEST_REQUEST', 'MANIFEST_SUCCESS', 'MANIFEST_ERROR'],
    ttl: 600,
    forceFresh: true,
    schema: schemas.manifest,
  }
});
```

## Helper selectors
For use in containers for a more verbose way of showing resources current state while requesting.
```js
isResourceLoaded(id); // returns true/false, for loading screens.
didResourceError(id); // returns error object or null
```

## Potential sagas
In each of the spaces for the different resource types, we can have different reactions and
store different state. 

```js
function* manifestSaga() {
  yield takeEvery('MANIFEST_SUCCESS', handleSuccess);
} 

function* handleSuccess({ payload: { id } }) {
  // Set the current manifest to the one we just requested.
  yield put(setCurrentManifest(id));
  
  // Grab the state + start canvas
  const state = yield select();
  const startCanvas = getStartCanvas(state);

  // Set the canvas if its set.
  if (startCanvas) {
    yield put(setCurrentCanvasIndex(startCanvas)); // Another action creator.
  }
}
```
