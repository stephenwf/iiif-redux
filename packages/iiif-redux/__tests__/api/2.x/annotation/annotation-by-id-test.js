import {
  annotationByIdSelector,
  annotations,
} from '../../../../src/api/annotation';
import { annotationListByIdSelector } from '../../../../src/api/annotation-list';

describe('iiif/api/2.x/annotation/annotation-by-id', () => {
  it('should be able to generate selector for any annotation', () => {
    const state = {
      resources: {
        annotations: {
          'http://iiif.com/annotation-1.json': {
            '@id': 'http://iiif.com/annotation-1.json',
            '@type': 'sc:Annotation',
            label: [{ '@language': 'en', '@value': 'annotation label' }],
          },
        },
      },
    };

    const select = annotationByIdSelector(annotation => ({
      id: annotation.getId,
      type: annotation.getType,
      label: annotation.getLabel,
    }));

    expect(select(state, { id: 'http://iiif.com/annotation-1.json' })).toEqual({
      id: 'http://iiif.com/annotation-1.json',
      type: 'sc:Annotation',
      label: [{ '@language': 'en', '@value': 'annotation label' }],
    });

    const select2 = annotationByIdSelector(
      annotation => ({
        id: annotation.getId,
        type: annotation.getType,
        label: annotation.getLabel,
      }),
      {
        getId: () => 'http://iiif.com/annotation-1.json',
      }
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/annotation-1.json',
      type: 'sc:Annotation',
      label: [{ '@language': 'en', '@value': 'annotation label' }],
    });
  });

  it('should be able to select more than one annotation', () => {
    const state = {
      resources: {
        annotations: {
          'http://iiif.com/annotation-1.json': {
            '@id': 'http://iiif.com/annotation-1.json',
            '@type': 'sc:Annotation',
            label: [{ '@language': 'en', '@value': 'annotation label' }],
          },
          'http://iiif.com/annotation-2.json': {
            '@id': 'http://iiif.com/annotation-2.json',
            '@type': 'sc:Annotation',
            label: [{ '@language': 'en', '@value': 'annotation label 2' }],
          },
          'http://iiif.com/annotation-3.json': {
            '@id': 'http://iiif.com/annotation-3.json',
            '@type': 'sc:Annotation',
            label: [{ '@language': 'en', '@value': 'annotation label 3' }],
          },
        },
      },
    };

    const select = annotations(
      () => [
        'http://iiif.com/annotation-1.json',
        'http://iiif.com/annotation-2.json',
        'http://iiif.com/annotation-3.json',
      ],
      api => ({
        id: api.getId,
        label: api.getLabel,
      })
    );

    expect(select(state)).toEqual([
      {
        id: 'http://iiif.com/annotation-1.json',
        label: [{ '@language': 'en', '@value': 'annotation label' }],
      },
      {
        id: 'http://iiif.com/annotation-2.json',
        label: [{ '@language': 'en', '@value': 'annotation label 2' }],
      },
      {
        id: 'http://iiif.com/annotation-3.json',
        label: [{ '@language': 'en', '@value': 'annotation label 3' }],
      },
    ]);
  });

  it('should be able to select more than one annotation from pre-exising list.', () => {
    const state = {
      resources: {
        annotations: {
          'http://iiif.com/annotation-1.json': {
            '@id': 'http://iiif.com/annotation-1.json',
            '@type': 'sc:Annotation',
            label: [{ '@language': 'en', '@value': 'annotation label' }],
          },
          'http://iiif.com/annotation-2.json': {
            '@id': 'http://iiif.com/annotation-2.json',
            '@type': 'sc:Annotation',
            label: [{ '@language': 'en', '@value': 'annotation label 2' }],
          },
          'http://iiif.com/annotation-3.json': {
            '@id': 'http://iiif.com/annotation-3.json',
            '@type': 'sc:Annotation',
            label: [{ '@language': 'en', '@value': 'annotation label 3' }],
          },
        },
        annotationLists: {
          'http://iiif.com/annotation-list-1.json': {
            '@id': 'http://iiif.com/annotation-1.json',
            '@type': 'sc:AnnotationList',
            label: [{ '@language': 'en', '@value': 'annotation list label' }],
            resources: [
              'http://iiif.com/annotation-1.json',
              'http://iiif.com/annotation-2.json',
              'http://iiif.com/annotation-3.json',
            ],
          },
        },
      },
    };

    const select = annotationListByIdSelector(
      api =>
        annotations(api.getResources, annotationApi => ({
          id: annotationApi.getId,
          label: annotationApi.getLabel,
        })),
      {
        getId: () => 'http://iiif.com/annotation-list-1.json',
      }
    );

    expect(select(state)).toEqual([
      {
        id: 'http://iiif.com/annotation-1.json',
        label: [{ '@language': 'en', '@value': 'annotation label' }],
      },
      {
        id: 'http://iiif.com/annotation-2.json',
        label: [{ '@language': 'en', '@value': 'annotation label 2' }],
      },
      {
        id: 'http://iiif.com/annotation-3.json',
        label: [{ '@language': 'en', '@value': 'annotation label 3' }],
      },
    ]);

    const selectIds = annotationListByIdSelector(
      api =>
        annotations(api.getResources, annotationApi => annotationApi.getId),
      {
        getId: () => 'http://iiif.com/annotation-list-1.json',
      }
    );
    expect(selectIds(state)).toEqual([
      'http://iiif.com/annotation-1.json',
      'http://iiif.com/annotation-2.json',
      'http://iiif.com/annotation-3.json',
    ]);
  });
});
