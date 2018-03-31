import {
  getOtherContentIds,
  getOtherContent,
  getImageIds,
  getImages,
} from '../../../src/api/current-canvas';

describe('api/current-canvas/linking', () => {
  const state = {
    routing: { currentCanvas: 'http://iiif.com/canvas-1.json' },
    config: { defaultLanguage: 'en' },
    canvases: {
      'http://iiif.com/canvas-1.json': {
        '@type': 'sc:Canvas',
        images: [
          'http://iiif.com/image-1.json',
          'http://iiif.com/image-2.json',
          'http://iiif.com/image-3.json',
        ],
        otherContent: [
          { id: 'http://iiif.com/external-1.json', schema: 'externalResource' },
          {
            id: 'http://iiif.com/annotation-list-1.json',
            schema: 'annotationList',
          },
          { id: 'http://iiif.com/external-2.json', schema: 'externalResource' },
          {
            id: 'http://iiif.com/annotation-list-2.json',
            schema: 'annotationList',
          },
          {
            id: 'http://iiif.com/external-3.json',
            schema: 'externalResource',
          },
        ],
      },
    },
    images: {
      'http://iiif.com/image-1.json': {
        '@id': 'http://iiif.com/image-1.json',
        label: 'Image 1',
      },
      'http://iiif.com/image-2.json': {
        '@id': 'http://iiif.com/image-2.json',
        label: 'Image 2',
      },
      'http://iiif.com/image-3.json': {
        '@id': 'http://iiif.com/image-3.json',
        label: 'Image 3',
      },
    },
    annotationLists: {
      'http://iiif.com/annotation-list-1.json': {
        '@id': 'http://iiif.com/annotation-list-1.json',
        label: 'Annotation List 1',
      },
      'http://iiif.com/annotation-list-2.json': {
        '@id': 'http://iiif.com/annotation-list-2.json',
        label: 'Annotation List 2',
      },
    },
    externalResources: {
      'http://iiif.com/external-1.json': {
        '@id': 'http://iiif.com/external-1.json',
        label: 'External 1',
      },
      'http://iiif.com/external-2.json': {
        '@id': 'http://iiif.com/external-2.json',
        label: 'External 2',
      },
    },
  };

  it('should get other content ids', () => {
    expect(getOtherContentIds(state)).toEqual([
      'http://iiif.com/external-1.json',
      'http://iiif.com/annotation-list-1.json',
      'http://iiif.com/external-2.json',
      'http://iiif.com/annotation-list-2.json',
      'http://iiif.com/external-3.json',
    ]);
  });

  it('should get Other content', () => {
    expect(
      getOtherContent(state).map(otherContent => otherContent.label)
    ).toEqual([
      'External 1',
      'Annotation List 1',
      'External 2',
      'Annotation List 2',
      'unknown',
    ]);
  });

  it('should get image ids', () => {
    expect(getImageIds(state)).toEqual([
      'http://iiif.com/image-1.json',
      'http://iiif.com/image-2.json',
      'http://iiif.com/image-3.json',
    ]);
  });

  it('should get images', () => {
    expect(getImages(state).map(image => image.label)).toEqual([
      'Image 1',
      'Image 2',
      'Image 3',
    ]);
  });
});
