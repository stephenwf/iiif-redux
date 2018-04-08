# Resources
Different resources will track different state (only their own state.)

This is a reference implementation of how state could be represented and could be
thrown out and extended in a custom Redux implementation.

## Collection state
```js
const state = {
  currentCollection: 'http://.../',
}
```

## Manifest state
```js
const state = {
  currentSequence: 'http://.../',
  currentRange: 'http://.../',
}
```

## Sequence
```js
const state = {
  currentCanvas: 'http://.../',
}
```

## Canvas
```js
const state = {
  visibleOtherContentLists: [ /* ... */ ],
  thumbnailSize: null,
}
```

