# Presentation 2.x and 3.x

This library aims to give full coverage for both presentation 2 and presentation 3 APIs both for importing and selecting content.

When you import Presentation 2 or 3 content it will automatically be detected and imported. Mixed Presentation 2 and 3 content in a single document is
not supported. When importing presentation 2 content, due to inconsistencies you may find the original documents have been modified. This is intentional
to provide a predictable and normalized structure. Descriptive properties also get expanded out to the international specification, defaulting to english,
for these properties. Future exporting tools may revert this during an export. Future exporting will also offer an option to upgrade presentation 2 documents
to the latest stable presentation version.

## API Changes

When presentation updates happen, some parts of the API are deprecated and finally removed, and as such this library does not support calling deprecated
APIs on sources that are not the latest version. For example, between Presentation 2.1 and 3.0 the property `viewingHint` was changed to `behavior`. Along
with this change the scope of the property changed to expand what `behavior` may contain. Because of this, the following behavior applies:

- Calling `getViewingHint` on Presentation 2 document will return `document.viewingHint` (deprecation notice logged in development)
- Calling `getBehavior` on Presentation 2 document will return `document.viewingHint`
- Calling `getViewingHint` on Presentation 3 document will return `null` (deprecation notice logged in development)
- Calling `getBehavior` on Presentation 3 document will return `document.behavior`

Although this library does aim to have full coverage of all presentation versions, it also provides an upgrade path where possible from lower versions of
the specification in your application. If remove all deprecation notices from your application, your application will be compatible with the latest versions
of the specification.

Note: This compatibility only extends to structural differences, and not semantics that may have changed.

## Opting for strict selectors

If you know all of your content conforms strictly to one version of the specification, you can access the selectors directly:

```js
import { canvasByIdSelector } from 'iiif-redux/api/2.x/canvas';
// or
import { canvasByIdSelector } from 'iiif-redux/api/3.x/canvas';

// instead of
import { canvasByIdSelector } from 'iiif-redux/api/canvas';
```

Similarly, if you want to access the IIIF specification compliant selectors (maybe for your own library) you can access them here:

```js
import * as descriptive from 'iiif-redux/api/2.x/iiif/descriptive';
```

Its possible choosing a strict version implementation may improve performance on large documents. This will have undesired effects on the wrong
presentation versions though, so it should only be used on data-sets you control and not driven by user-input like traditional viewers.

## Sequences between 2.x and 3.x

Sequences are a special case in the change between versions 2 and 3. In Presentation 3 you can still call `getSequences` and `getDefaultSequence` on a manifest, but
instead of this being defined in the structure, its a special range that's returned. This acts in the same way as the sequence in presentation 2 and can be used to
reflect the same structure. However, its more common to instead just use the canvases directly off of the manifest. Because of this, presentation 2 has been retro-fitted
with a `getCanvases` selector that will skip the sequence. This is common practice for viewers.

## Language properties

In Presentation 2 and 3 descriptive (human-readable) strings are stored native to their presentation version. When you select, say, a label, you get returned one of 2 structures
representing the string:

```js
// Presentation 2
const p2Label = [{ '@language': 'en', '@value': ['some label'] }];

// Presentation 3
const p3Label = {
  en: ['some label'],
};
```

Its up to the end implementation to support these 2 language implementations. IIIF Redux does offer a function for rendering these strings.

```js
import { intlString } from 'iiif-redux/utility';

const englishString = intlString('en');

// Both return 'some label'
englishString([{ '@language': 'en', '@value': ['some label'] }]);

englishString({
  en: ['some label'],
});
```

## Annotation changes

Annotations have changed a lot between Presentation 2 and 3. It is still unknown how IIIF Redux will differ between implementations. There is a
1-to-1 parity between structural components, which should help to align the changes.

## Paging

Annotation paging defined in W3C remains, but is not supported in Presentation 2 or 3 in this library due to its relatively low usage. This may change
if demand changes.

## Implementation details

When you import a document either manually specifying a presentation version, or if you choose it to be auto-detected, for every resource imported an
index will be created that contains the schema version.

```js
const state = {
  schemaVersions: {
    'https://../1': 3,
    'https://../2': 3,
    'https://../3': 2,
  },
};
```

Although this does add an overhead to the redux store, it ensures that any resource that is loaded is identified correctly when you apply a selector.

You can opt-out of this extra overhead by creating a store targeting a specific version

## Presentation 3 questions

- For the field `seeAlso` and `partOf`, the specification does not provide a list of valid IIIF resources that can be found here, implying all IIIF resources are valid.
- Annotation pages only have one required field `type` which seems counter productive as it cannot function as an annotation page without annotations, should ID also be required?

## Changes to selector framework

Previously if you wanted to get just the label selector, you could do something like this:

```js
import collection from 'iiif-redux/api/collection';

const state = {
  /* ... */
};

const getFirstCollection = () => /***/ null;

const { getLabel } = collection(getFirstCollection);

const label = getLabel(state);

console.log(label);
```

So you could effectively have access to the individual selectors. Because of the uncertainty using multiple presentation versions, this model has now changed to match
the select by ID and collection selectors.

```js
import collection from 'iiif-redux/api/collection';

const state = {
  /* ... */
};

const getFirstCollection = () => /***/ null;

const firstCollection = collection(getFirstCollection);

const selector = firstCollection(api => ({
  label: api.getLabel,
}));

console.log(selector(state).label);

// Alternatively
const getLabel = firstCollection(api => api.getLabel);

const label = getLabel(state);

console.log(label);
```

This unifies how the other selectors work too. If you still want access to individual selectors, say to build up your own library, you can still access each selector
library for each presentation version:

```js
import presentation2Collection from 'iiif-redux/api/2.x/collection';
import presentation3Collection from 'iiif-redux/api/3.x/collection';

const getFirstCollection = () => /***/ null;

const { getLabel, getId } = presentation2Collection(getFirstCollection);

const myCustomP2Selector = createStructuredSelector({
  label: getLabel,
  id: getId,
});
```

This is only recommended if you know what version of the specification you are using as you will have to manage the different versions yourself at this point.

If there is demand for a universal API that exposes single selectors, it may be added and work like this:

```js
import collection from 'iiif-redux/api/2.x-3.x/collection';

const getFirstCollection = () => /***/ null;

const { getLabel, getId } = collection(getFirstCollection);
```

But this is likely to have a negative impact on performance as the version look up will happen for each individual field, instead of once per selector.
