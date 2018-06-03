import { annotationListByIdSelector } from '../../src/api/annotation-list';

describe('iiif/api/annotationList', () => {
  it('should be able to generate selector for any annotation list', () => {
    const state = {
      resources: {
        annotationLists: {
          'http://iiif.com/annotation-list-1.json': {
            '@id': 'http://iiif.com/annotation-list-1.json',
            '@type': 'sc:AnnotationList',
            label: [{ '@language': 'en', '@value': 'annotation list label' }],
          },
        },
      },
    };

    const select = annotationListByIdSelector(annotationList => ({
      id: annotationList.getId,
      type: annotationList.getType,
      label: annotationList.getLabel,
    }));

    expect(
      select(state, { id: 'http://iiif.com/annotation-list-1.json' })
    ).toEqual({
      id: 'http://iiif.com/annotation-list-1.json',
      type: 'sc:AnnotationList',
      label: [{ '@language': 'en', '@value': 'annotation list label' }],
    });

    const select2 = annotationListByIdSelector(
      annotationList => ({
        id: annotationList.getId,
        type: annotationList.getType,
        label: annotationList.getLabel,
      }),
      {
        getId: () => 'http://iiif.com/annotation-list-1.json',
      }
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/annotation-list-1.json',
      type: 'sc:AnnotationList',
      label: [{ '@language': 'en', '@value': 'annotation list label' }],
    });
  });
});
