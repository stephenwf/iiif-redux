# UI Guidelines

This is a work in progress document covering guidelines for developers
using IIIF Redux to create applications and viewers.

## IIIF Specifications checklist

If you are looking for a complete IIIF implementation, there are some
specifications, hints and other considerations.

* Viewing directions
* Viewing hints
* Internationalization

### Viewing Directions

There are 4 viewing directions, that can be applied to Manifests, Sequences and Ranges:

* Left to right (default)
* Right to left
* Top to bottom
* Bottom to top

In presentation 2, viewing directions on Manifests mean the same as on sequences if there
is only one sequence. What this refers to is how the Canvases should be presented in order
to best reflect what the Manifest is representing.

When crafting UIs, if you are aiming to provide an authentic representation of the work
displayed, you should respect the viewing direction when displaying thumbnails of canvases
or visually representing ranges.

#### Quirks

Generally the viewing direction between Manifest and Sequence is inherited. So if the manifest
has a viewing direction, all of the sequences should have this viewing direction. However, in presentation 3
sequences are replaced by Ranges, with Manifests having a list of Canvases directly. **It is not known if in presentation 3
if Ranges should inherit Manifest level viewing direction** [See GitHub issue](https://github.com/IIIF/api/issues/1612)

#### Test manifests

There are 4 test manifests that you can use for testing, although more examples may be added covering more complex cases.

* [Manifest: 11 - Viewing direction l-t-r](http://iiif.io/api/presentation/2.1/example/fixtures/11/manifest.json)
* [Manifest: 12 - Viewing direction r-t-l](http://iiif.io/api/presentation/2.1/example/fixtures/12/manifest.json)
* [Manifest: 13 - Viewing direction t-t-b](http://iiif.io/api/presentation/2.1/example/fixtures/13/manifest.json)
* [Manifest: 14 - Viewing direction b-t-t](http://iiif.io/api/presentation/2.1/example/fixtures/14/manifest.json)

### Viewing hints

Viewing hints are used to let viewers know more context about resources, giving developers extra
branches to develop better suited experiences for different mediums of work.

* individuals (collection, manifest, sequence, range)
* paged (manifest, sequence, range)
* continuous (manifest, sequence, range)
* multi-part (collection)
* non-paged (canvas)
* top (range)
* facing-pages (canvas)

The table here in the [IIIF Specification](http://iiif.io/api/presentation/2.1/#viewinghint) better explain these.

#### Quirks

If you want to build a viewer that show 2-up views of books, generally you will want to look out for:

* paged on a manifest/sequence
* facing-pages on individual canvases

Facing pages must not be shown in a 2-up view, these are generally used for the front and back covers in manifests.
This will allow you to correctly represent books. Subsequent canvases can be paired and shown. Keep in mind, you may
also have to abide by the Viewing Hints in order to correctly display the canvases.

#### Test manifests

* [Manifest: 15 - ViewingHint: paged](http://iiif.io/api/presentation/2.1/example/fixtures/15/manifest.json)
* [Manifest: 16 - ViewingHint: continuous](http://iiif.io/api/presentation/2.1/example/fixtures/16/manifest.json)
* [Manifest: 17 - ViewingHint: individuals](http://iiif.io/api/presentation/2.1/example/fixtures/17/manifest.json)
