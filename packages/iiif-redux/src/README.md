# Proposed API
The API that this library is aiming to provide can be split into three parts:
* Redux store + actions
* Selector library
* Manifesto compatibility

## Redux store + actions
The foundation of this library is the redux store and the actions is provides.
```js
import { createStore } from 'iiif-redux';
import { requestManifest, nextCanvas, previousCanvas } from 'iiif-redux/actions';
import { customThumbnails } from 'iiif-redux/api/currentCanvas';

const store = createStore();

store.dispatch(requestManifest('http://.../'));

store.subscribe(function() {
  const state = store.getState();
  const thumbnails = customThumbnails(state);
  
  document.querySelector('#image').innerHTML = `<img src="${thumbnails(200)}" />`
});

document.querySelector('#next').addEventListener(function() {
  store.dispatch(nextCanvas());
});

document.querySelector('#prev').addEventListener(function() {
  store.dispatch(previousCanvas());
});
```

While also allow you to integrate into an existing Redux application, or with your own custom reducers in a new project.
```js
import {applyMiddleware, createStore, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducers, middleware, sagas, defaultState } from 'iiif-redux/store'

import * as customReducers from './reducers';
import customSagas from './sagas';

const extraMiddleware = [ /* ... */ ];
const defaultStateCombined = { ...defaultState, myOtherFields: { /* ... */ } };

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ ...reducers, ...customReducers }),
  defaultStateCombined,
  applyMiddleware(sagaMiddleware, ...extraMiddleware)
);

sagas.map(saga => sagaMiddleware.run(saga));
customSagas.map(saga => sagaMiddleware.run(saga));

export default store;
```

## Selector library
Currently in Manifesto, the selectors for data and content live on Object (Manifests, Annotations etc.) which you call
from instances. In almost all instances when using Manifesto you will create a single manifest object and pass it down
through your application, calling its various methods to get values to display. Even if you are passing down a subset of
Manifesto, like a Canvas (driven by current canvas in some state) you are still working off that single source of truth.

### Examples:
```js
// get label from current manifest
import { getLabel } from 'iiif-redux/api/currentManifest';

// get label + thumbnail from current canvas
import { getLabel, getThumbnail } from 'iiif-redux/api/currentCanvas';
```

Possibility of creating your own selectors too:
```js
import { getCanvases } from 'iiif-redux/api/currentManifest';
import { getLabel, getThumbnail } from 'iiif-redux/api/canvas';
import { createSelector, createStructuredSelector } from 'reselect';

const myCustomCanvasSelector = createSelector(
  getCanvases,
  canvases => canvases.map(
    createStructuredSelector({
      thumbnail: getThumbnail(200),
      label: getLabel,
    })
  )
);

myCustomCanvasSelector(state); // [ { label: '..', thumbnail: '..' }, { label: '..', thumbnail: '..' }, ... ]
```
:warning: This might have implications on memoization

## Manifesto Compatibility

I think too its important for community adoption that we also provide a Manifesto compatible API:

```js
import Manifesto from 'iiif-redux/manifesto';

const myManifest = Manifesto.load('http://...').then(
  manifest => Manifesto.create(manifest)
);

myManifest.getDefaultLabel(); // label (ignoring promise!)
```

Which will wrap up the Redux into this API with the same types. If we do this though, I think we should also be aiming for 
a clear and easy upgrade path. So you can start transitioning to Redux from the top down, with deeper components still using 
Manifesto objects, but further up using redux.
```js
import { createStore } from 'iiif-redux';
import { createManifestoWrapper } from 'iiif-redux/manifesto'
import { requestManifest } from 'iiif-redux/actions';
import { getMetadata, loadingStatus } from 'iiif-redux/api/currentManifest';

const store = createStore();

store.dispatch(requestManifest('http://...'));

store.subscribe(function () {
  const $el = doucment.querySelector('#app');
  const state = store.getState();
  const isLoaded = loadingStatus(state) === 'done';
  if (!isLoaded) {
    $el.innerText = 'loading...';
    return;
  }
  // This is a Manifesto.Manifest compatible type.
  const manifest = createManifestoWrapper(state);
  $el.innerText = manifest.getDefaultLabel();
});
```

## Library usage 
But ultimately modeling an API that can power future components using Redux. Typically redux
is used in top-down data driven libraries such as Stencil, VueJS + React.

### Stencil JS
The future of the Universal Viewer and potentially other Typescript based is WebComponents and Stencil JS offers a
great Typescript path to WebComponents. Much like all component based libraries, I expect these to be split into [Presentational and Container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
so the following example is simplified but demonstrative. 

```typescript jsx
import { Store, Action } from '@stencil/redux';
import { getLabel, getDescription } from 'iiif-redux/api/currentManifest';
import { createStructuredSelector } from 'reselect';

@Component({
  tag: 'my-description-component',
  styleUrl: 'my-description-component.scss'
})
export class MyDescriptionComponent {
  @Prop({ context: 'store' }) store: Store;
 
  @State() label: string;
  @State() description: string;
  
  componentWillLoad() {
    // Here we bind our state using the selector library.
    this.store.mapStateToProps(this, 
      createStructuredSelector({
        label: getLabel,
        description: getDescription,
      })
    );
  }
  
  render() {
    return (
      <div>
        <h1>{ this.label }</h1>
        <p>{ this.description }</p>
      </div>
    );
  }
}
```

You can read more over at [Stencil Redux](https://github.com/ionic-team/stencil-redux)

### VueJS
Another common and increasingly popular framework for building web applications is VueJS. 

With VueJS there are 2 main ways to create components. But both work in much the same way.

```js
import { connect } from 'redux-vue';
import { getLabel, getDescription } from 'iiif-redux/api/currentManifest';
import { createStructuredSelector } from 'reselect';

const MyDescriptionComponent = {
  props: {
    title: { type: String },
    description: { type: String },
  },
  
  render(h) {
    return (
      <div>
        <h1>{ this.label }</h1>
        <p>{ this.description }</p>
      </div>
    );
  }
};

// Here we bind our state using the selector library.
export default connect(
  createStructuredSelector({
    label: getLabel,
    description: getDescription,
  })
)(MyDescriptionComponent)
```

But also in single file components, where you have to connect it separately
```html
<template>
  <div>
    <h1>{{ label }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'my-description-component',
}
</script>

<style>
</style>
```

And then the binding:
```js
import { connect } from 'redux-vue';
import { getLabel, getDescription } from 'iiif-redux/api/currentManifest';
import { createStructuredSelector } from 'reselect';
import MyDescriptionComponent from './my-description-component.vue';

// Here we bind our state using the selector library.
export default connect(
  createStructuredSelector({
    label: getLabel,
    description: getDescription,
  })
)(MyDescriptionComponent)
```

### React
The more contraversial library, but also covering React-like libraries (Preact, Inferno, Virtual-DOM, Deku) which follow
the same basic model of `props => jsx`.

```js
import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLabel, getDescription } from 'iiif-redux/api/currentManifest';
import { createStructuredSelector } from 'reselect';

@connect(
  createStructuredSelector({
    label: getLabel,
    description: getDescription,
  })
)
export default class MyDescriptionComponent {
  render() {
    const { label, description } = this.props;
    return (
      <div>
        <h1>{ label }</h1>
        <p>{ description }</p>
      </div>
    );
  }
} 
```

<details>
  <summary>:warning: this example uses decorators, which is an unstable proposal and likely to change (click to see without)</summary>

```js
import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLabel, getDescription } from 'iiif-redux/api/currentManifest';
import { createStructuredSelector } from 'reselect';

class MyDescriptionComponent {
 render() {
   const { label, description } = this.props;
   return (
     <div>
       <h1>{ label }</h1>
       <p>{ description }</p>
     </div>
   );
 }
} 

export default connect(
  createStructuredSelector({
    label: getLabel,
    description: getDescription,
  })
)(MyDescriptionComponent)
```
</details>
