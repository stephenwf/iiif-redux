# API

IIIF API

## IIIF Specific APIs

As described in the table on the IIIF specification page.

### Descriptive properties

* [x] getLabel
* [x] getMetadata
* [x] getDescription
* [x] getThumbnail
* [x] getAttribution
* [x] getLicence
* [x] getLogo

### Technical properties

* [x] getId
* [x] getType
* [x] getViewingHint
* [x] getNavDate
* [x] getFormat
* [x] getHeight
* [x] getWidth
* [x] getViewingHint

### Linking properties

* [x] getSeeAlso
* [x] getService
* [x] getRelated
* [x] getRendering
* [x] getWithin
* [x] getStartCanvas

### Paging properties

* [x] getFirst
* [x] getLast
* [x] getTotal
* [x] getNext
* [x] getPrevious
* [x] getStartIndex

### Structural properties

* [x] getCollections
* [x] getManifests
* [x] getMembers
* [x] getSequences
* [x] getCanvases
* [x] getStructures / getRanges
* [x] getOtherContent
* [x] getImages

## Resource specific API

Methods that work on specific resources. (currentCollection, currentManifest etc.)

### Descriptive properties

* [x] Collection
  * [x] getLabel (Required)
  * [x] getMetadata (Recommended)
  * [x] getDescription (Recommended)
  * [x] getThumbnail (Recommended)
  * [x] getAttribution (Optional)
  * [x] getLicence (Optional)
  * [x] getLogo (Optional)
* [x] Manifest
  * [x] getLabel (Required)
  * [x] getMetadata (Recommended)
  * [x] getDescription (Recommended)
  * [x] getThumbnail (Recommended)
  * [x] getAttribution (Optional)
  * [x] getLicence (Optional)
  * [x] getLogo (Optional)
* [x] Sequence
  * [x] getLabel (Optional)
  * [x] getMetadata (Optional)
  * [x] getDescription (Optional)
  * [x] getThumbnail (Optional)
  * [x] getAttribution (Optional)
  * [x] getLicence (Optional)
  * [x] getLogo (Optional)
* [x] Canvas
  * [x] getLabel (Required)
  * [x] getMetadata (Optional)
  * [x] getDescription (Optional)
  * [x] getThumbnail (Recommended)
  * [x] getAttribution (Optional)
  * [x] getLicence (Optional)
  * [x] getLogo (Optional)
* [x] Annotation
  * [x] getLabel (Optional)
  * [x] getMetadata (Optional)
  * [x] getDescription (Optional)
  * [x] getThumbnail (Optional)
  * [x] getAttribution (Optional)
  * [x] getLicence (Optional)
  * [x] getLogo (Optional)
* [x] AnnotationList
  * [x] getLabel (Optional)
  * [x] getMetadata (Optional)
  * [x] getDescription (Optional)
  * [x] getThumbnail (Optional)
  * [x] getAttribution (Optional)
  * [x] getLicence (Optional)
  * [x] getLogo (Optional)
* [ ] Range
  * [ ] getLabel (Required)
  * [ ] getMetadata (Optional)
  * [ ] getDescription (Optional)
  * [ ] getThumbnail (Optional)
  * [ ] getAttribution (Optional)
  * [ ] getLicence (Optional)
  * [ ] getLogo (Optional)
* [ ] Layer
  * [ ] getLabel (Required)
  * [ ] getMetadata (Optional)
  * [ ] getDescription (Optional)
  * [ ] getThumbnail (Optional)
  * [ ] getAttribution (Optional)
  * [ ] getLicence (Optional)
  * [ ] getLogo (Optional)
* [x] Image content
  * [x] getLabel (Optional)
  * [x] getMetadata (Optional)
  * [x] getDescription (Optional)
  * [x] getThumbnail (Optional)
  * [x] getAttribution (Optional)
  * [x] getLicence (Optional)
  * [x] getLogo (Optional)
* [ ] Other content
  * [ ] getLabel (Optional)
  * [ ] getMetadata (Optional)
  * [ ] getDescription (Optional)
  * [ ] getThumbnail (Optional)
  * [ ] getAttribution (Optional)
  * [ ] getLicence (Optional)
  * [ ] getLogo (Optional)

### Technical properties

* [x] Collection
  * [x] getId (Required)
  * [x] getType (Required - probably not needed for this)
  * [x] getViewingHint (Optional)
  * [x] getNavDate (Optional)
* [x] Manifest
  * [x] getId (Required)
  * [x] getType (Required - probably not needed for this)
  * [x] getViewingDirection (Optional)
  * [x] getViewingHint (Optional)
  * [x] getNavDate (Optional)
* [x] Sequence
  * [x] getId (Optional - auto-generated)
  * [x] getType (Required - probably not needed for this)
  * [x] getViewingDirection (Optional)
  * [x] getViewingHint (Optional)
* [x] Canvas
  * [x] getId (Required)
  * [x] getType (Required - probably not needed for this)
  * [x] getHeight (Required)
  * [x] getWidth (Required)
  * [x] getViewingHint (Optional)
* [x] Annotation
  * [x] getId (Recommended - auto-generated)
  * [x] getType (Required - probably not needed for this)
  * [x] getViewingHint (Optional)
* [x] AnnotationList
  * [x] getId (Required)
  * [x] getType (Required - probably not needed for this)
  * [x] getViewingHint (Optional)
* [ ] Range
  * [ ] getId (Required)
  * [ ] getType (Required - probably not needed for this)
  * [ ] getViewingDirection (Optional)
  * [ ] getViewingHint (Optional)
* [ ] Layer
  * [ ] getId (Required)
  * [ ] getType (Required - probably not needed for this)
  * [ ] getViewingDirection (Optional)
  * [ ] getViewingHint (Optional)
* [x] Image Content (imageResources)
  * [x] getId (Required)
  * [x] getType (Required - probably not needed for this)
  * [x] getFormat (Optional - default?)
  * [x] getHeight (Optional)
  * [x] getWidth (Optional)
  * [x] getViewingHint (Optional)
* [ ] Other Content (externalResources)
  * [ ] getId (Required)
  * [ ] getType (Required - probably not needed for this)
  * [ ] getFormat (Optional - [ ] default?)
  * [ ] getHeight (Optional)
  * [ ] getWidth (Optional)
  * [ ] getViewingHint (Optional)

### Linking Properties (all optional)

* [x] Collection
  * [x] getSeeAlso
  * [x] getService
  * [x] getRelated
  * [x] getRendering
  * [x] getWithin
* [x] Manifest
  * [x] getSeeAlso
  * [x] getService
  * [x] getRelated
  * [x] getRendering
  * [x] getWithin
* [x] Sequence
  * [x] getSeeAlso
  * [x] getService
  * [x] getRelated
  * [x] getRendering
  * [x] getWithin
  * [x] getStartCanvas
* [x] Canvas
  * [x] getSeeAlso
  * [x] getService
  * [x] getRelated
  * [x] getRendering
  * [x] getWithin
* [x] Annotation
  * [x] getSeeAlso
  * [x] getService
  * [x] getRelated
  * [x] getRendering
  * [x] getWithin
* [x] AnnotationList
  * [x] getSeeAlso
  * [x] getService
  * [x] getRelated
  * [x] getRendering
  * [x] getWithin
* [ ] Range
  * [ ] getSeeAlso
  * [ ] getService
  * [ ] getRelated
  * [ ] getRendering
  * [ ] getWithin
  * [ ] getStartCanvas
* [ ] Layer
  * [ ] getSeeAlso
  * [ ] getService
  * [ ] getRelated
  * [ ] getRendering
  * [ ] getWithin
* [x] Image Content (imageResources)
  * [x] getSeeAlso
  * [x] getService
  * [x] getRelated
  * [x] getRendering
  * [x] getWithin
* [ ] Other Content (externalResources)
  * [ ] getSeeAlso
  * [ ] getService
  * [ ] getRelated
  * [ ] getRendering
  * [ ] getWithin

### Paging properties (all optional)

* [x] Collection
  * [x] getFirst
  * [x] getLast
  * [x] getTotal
  * [x] getNext
  * [x] getPrevious
  * [x] getStartIndex
* [x] AnnotationList
  * [x] getNext
  * [x] getPrevious
  * [x] getStartIndex
* [ ] Layer
  * [ ] getFirst
  * [ ] getLast
  * [ ] getTotal

### Structural properties (all optional, unless stated)

* [x] Collection
  * [x] getCollections
  * [x] getManifests
  * [x] getMembers
  * [x] getOtherContent (implicit)
* [x] Manifest
  * [x] getSequences (Required)
  * [x] getStructures / getRanges
  * [x] getOtherContent (implicit)
* [x] Sequence
  * [x] getCanvases
* [x] Canvas
  * [x] getOtherContent
  * [x] getImages
* [x] AnnotationList
  * [x] getResources / getAnnotations
* [ ] Range
  * [ ] getMembers
  * [ ] getCanvases
  * [ ] getRanges
* [ ] Layer
  * [ ] getOtherContent

## Dereferenceable guide

* [ ] Collection (Required)
* [ ] Manifest (Required)
* [ ] First Sequence (Optional)
* [ ] Nth Sequence (Required)
* [ ] Canvas (Optional)
* [ ] Annotation (Recommended)
* [ ] AnnotationList (Required)
* [ ] Range (Optional)
* [ ] Layer (Optional)
* [ ] Image Content (Required)
* [ ] Other Content (externalResources) (Required)
