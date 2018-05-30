import canvas from '../../../src/api/canvas';

describe('api/canvas/structural', () => {
  const {
    getOtherContentIds,
    getOtherContent,
    getImageIds,
    getImages,
  } = canvas(s => s.resources.canvases['http://iiif.com/canvas-1.json']);
  const t = text => [{ '@value': text, '@language': 'en' }];
  const state = {
    resources: {
      canvases: {
        'http://iiif.com/canvas-1.json': {
          '@type': 'sc:Canvas',
          images: [
            'http://iiif.com/image-1.json',
            'http://iiif.com/image-2.json',
            'http://iiif.com/image-3.json',
          ],
          otherContent: [
            {
              id: 'http://iiif.com/external-1.json',
              schema: 'externalResource',
            },
            {
              id: 'http://iiif.com/annotation-list-1.json',
              schema: 'annotationList',
            },
            {
              id: 'http://iiif.com/external-2.json',
              schema: 'externalResource',
            },
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
      annotations: {
        'http://iiif.com/image-1.json': {
          '@id': 'http://iiif.com/image-1.json',
          label: t('Image 1'),
        },
        'http://iiif.com/image-2.json': {
          '@id': 'http://iiif.com/image-2.json',
          label: t('Image 2'),
        },
        'http://iiif.com/image-3.json': {
          '@id': 'http://iiif.com/image-3.json',
          label: t('Image 3'),
        },
      },
      annotationLists: {
        'http://iiif.com/annotation-list-1.json': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          label: t('Annotation List 1'),
        },
        'http://iiif.com/annotation-list-2.json': {
          '@id': 'http://iiif.com/annotation-list-2.json',
          label: t('Annotation List 2'),
        },
      },
      externalResources: {
        'http://iiif.com/external-1.json': {
          '@id': 'http://iiif.com/external-1.json',
          label: t('External 1'),
        },
        'http://iiif.com/external-2.json': {
          '@id': 'http://iiif.com/external-2.json',
          label: t('External 2'),
        },
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
      getOtherContent(state).map(
        otherContent => otherContent.label[0]['@value']
      )
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
    expect(getImages(state).map(image => image.label[0]['@value'])).toEqual([
      'Image 1',
      'Image 2',
      'Image 3',
    ]);
  });
});
