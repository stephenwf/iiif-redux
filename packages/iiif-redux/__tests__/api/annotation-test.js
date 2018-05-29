import { annotationByIdSelector } from '../../src/api/annotation';

describe('iiif/api/annotation', () => {
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
      () => 'http://iiif.com/annotation-1.json'
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/annotation-1.json',
      type: 'sc:Annotation',
      label: [{ '@language': 'en', '@value': 'annotation label' }],
    });
  });
});
