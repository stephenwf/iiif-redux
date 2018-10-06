import manifest from '../../../../src/api/2.x/manifest';

describe('api/2.x/manifest/structural', () => {
  const {
    getSequenceIds,
    getSequences,
    getRangeIds,
    getRanges,
    getStructureIds,
    getStructures,
    getOtherContent,
    getOtherContentIds,
    getCanvasIds,
    getCanvases,
  } = manifest(s => s.resources.manifests['http://iiif.com/manifest-1.json']);
  const t = text => [{ '@value': text, '@language': 'en' }];
  const state = {
    resources: {
      manifests: {
        'http://iiif.com/manifest-1.json': {
          '@id': 'http://iiif.com/manifest-1.json',
          label: t('Manifest 1'),
          sequences: ['http://iiif.com/sequence-1.json'],
          structures: [
            'http://iiif.com/range-1.json',
            'http://iiif.com/range-2.json',
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
      sequences: {
        'http://iiif.com/sequence-1.json': {
          '@id': 'http://iiif.com/sequence-1.json',
          label: t('Sequence 1'),
          canvases: [
            'http://iiif.com/canvas-1.json',
            'http://iiif.com/canvas-2.json',
            'http://iiif.com/canvas-3.json',
            'http://iiif.com/canvas-4.json',
          ],
        },
      },
      canvases: {
        'http://iiif.com/canvas-1.json': {
          '@id': 'http://iiif.com/canvas-1.json',
          label: t('Canvas 1'),
        },
        'http://iiif.com/canvas-2.json': {
          '@id': 'http://iiif.com/canvas-2.json',
          label: t('Canvas 2'),
        },
        'http://iiif.com/canvas-3.json': {
          '@id': 'http://iiif.com/canvas-3.json',
          label: t('Canvas 3'),
        },
        'http://iiif.com/canvas-4.json': {
          '@id': 'http://iiif.com/canvas-4.json',
          label: t('Canvas 4'),
        },
      },
      ranges: {
        'http://iiif.com/range-1.json': {
          '@id': 'http://iiif.com/range-1.json',
          label: t('Range 1'),
        },
        'http://iiif.com/range-2.json': {
          '@id': 'http://iiif.com/range-2.json',
          label: t('Range 2'),
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

  test('sequence ids', () => {
    expect(getSequenceIds(state)).toEqual(['http://iiif.com/sequence-1.json']);
  });

  test('full sequences', () => {
    expect(
      getSequences(state).map(sequence => sequence.label[0]['@value'])
    ).toEqual(['Sequence 1']);
  });

  test('range ids', () => {
    expect(getRangeIds(state)).toEqual([
      'http://iiif.com/range-1.json',
      'http://iiif.com/range-2.json',
    ]);
    expect(getStructureIds(state)).toEqual([
      'http://iiif.com/range-1.json',
      'http://iiif.com/range-2.json',
    ]);
  });
  test('ranges', () => {
    expect(getRanges(state).map(range => range.label[0]['@value'])).toEqual([
      'Range 1',
      'Range 2',
    ]);
    expect(getStructures(state).map(range => range.label[0]['@value'])).toEqual(
      ['Range 1', 'Range 2']
    );
  });

  test('other content ids', () => {
    expect(getOtherContentIds(state)).toEqual([
      'http://iiif.com/external-1.json',
      'http://iiif.com/annotation-list-1.json',
      'http://iiif.com/external-2.json',
      'http://iiif.com/annotation-list-2.json',
      'http://iiif.com/external-3.json',
    ]);
  });

  test('Other content', () => {
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

  test('getCanvasIds', () => {
    expect(getCanvasIds(state)).toEqual([
      'http://iiif.com/canvas-1.json',
      'http://iiif.com/canvas-2.json',
      'http://iiif.com/canvas-3.json',
      'http://iiif.com/canvas-4.json',
    ]);
  });

  test('getCanvases', () => {
    expect(getCanvases(state).map(canvas => canvas.label[0]['@value'])).toEqual(
      ['Canvas 1', 'Canvas 2', 'Canvas 3', 'Canvas 4']
    );
  });
});
