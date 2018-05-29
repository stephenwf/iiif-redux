import annotationList from '../../../src/api/annotation-list';

describe('api/annotationList/structural', () => {
  const t = text => [{ '@value': text, '@language': 'en' }];
  const state = {
    resources: {
      annotationLists: {
        'http://iiif.com/annotation-list-1.json': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          '@type': 'sc:AnnotationList',
          resources: [
            'http://iiif.com/annotation-1.json',
            'http://iiif.com/annotation-2.json',
            'http://iiif.com/annotation-3.json',
            'http://iiif.com/annotation-4.json',
          ],
        },
      },
      annotations: {
        'http://iiif.com/annotation-1.json': {
          '@id': 'http://iiif.com/annotation-1.json',
          '@type': 'sc:Annotation',
          label: t('Annotation 1'),
        },
        'http://iiif.com/annotation-2.json': {
          '@id': 'http://iiif.com/annotation-2.json',
          '@type': 'sc:Annotation',
          label: t('Annotation 2'),
        },
        'http://iiif.com/annotation-3.json': {
          '@id': 'http://iiif.com/annotation-3.json',
          '@type': 'sc:Annotation',
          label: t('Annotation 3'),
        },
        'http://iiif.com/annotation-4.json': {
          '@id': 'http://iiif.com/annotation-4.json',
          '@type': 'sc:Annotation',
          label: t('Annotation 4'),
        },
      },
    },
  };
  const {
    getResourceIds,
    getResources,
    getAnnotationIds,
    getAnnotations,
  } = annotationList(
    s => s.resources.annotationLists['http://iiif.com/annotation-list-1.json']
  );

  it('should get all resource ids', () => {
    expect(getResourceIds(state)).toEqual([
      'http://iiif.com/annotation-1.json',
      'http://iiif.com/annotation-2.json',
      'http://iiif.com/annotation-3.json',
      'http://iiif.com/annotation-4.json',
    ]);
  });

  it('should get all annotation ids (alias)', () => {
    expect(getAnnotationIds(state)).toEqual([
      'http://iiif.com/annotation-1.json',
      'http://iiif.com/annotation-2.json',
      'http://iiif.com/annotation-3.json',
      'http://iiif.com/annotation-4.json',
    ]);
  });

  it('should get all resources', () => {
    expect(getResources(state)).toEqual([
      {
        '@id': 'http://iiif.com/annotation-1.json',
        '@type': 'sc:Annotation',
        label: [{ '@language': 'en', '@value': 'Annotation 1' }],
      },
      {
        '@id': 'http://iiif.com/annotation-2.json',
        '@type': 'sc:Annotation',
        label: [{ '@language': 'en', '@value': 'Annotation 2' }],
      },
      {
        '@id': 'http://iiif.com/annotation-3.json',
        '@type': 'sc:Annotation',
        label: [{ '@language': 'en', '@value': 'Annotation 3' }],
      },
      {
        '@id': 'http://iiif.com/annotation-4.json',
        '@type': 'sc:Annotation',
        label: [{ '@language': 'en', '@value': 'Annotation 4' }],
      },
    ]);
  });

  it('should get all annotations (alias)', () => {
    expect(getAnnotations(state)).toEqual([
      {
        '@id': 'http://iiif.com/annotation-1.json',
        '@type': 'sc:Annotation',
        label: [{ '@language': 'en', '@value': 'Annotation 1' }],
      },
      {
        '@id': 'http://iiif.com/annotation-2.json',
        '@type': 'sc:Annotation',
        label: [{ '@language': 'en', '@value': 'Annotation 2' }],
      },
      {
        '@id': 'http://iiif.com/annotation-3.json',
        '@type': 'sc:Annotation',
        label: [{ '@language': 'en', '@value': 'Annotation 3' }],
      },
      {
        '@id': 'http://iiif.com/annotation-4.json',
        '@type': 'sc:Annotation',
        label: [{ '@language': 'en', '@value': 'Annotation 4' }],
      },
    ]);
  });
});
