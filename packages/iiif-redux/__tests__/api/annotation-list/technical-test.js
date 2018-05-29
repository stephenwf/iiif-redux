import annotationList from '../../../src/api/annotation-list';

describe('api/annotationList/technical', () => {
  const createStateWithCustomProperties = props => ({
    resources: {
      annotationLists: {
        'http://iiif.com/annotation-list-1.json': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          ...props,
        },
      },
    },
  });
  const state = {
    resources: {
      annotationLists: {
        'http://iiif.com/annotation-list-1.json': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          '@type': 'sc:AnnotationList',
          viewingHint: 'http://iiif.com/custom-hint',
        },
      },
    },
  };

  const { getId, getType, getViewingHint } = annotationList(
    s => s.resources.annotationLists['http://iiif.com/annotation-list-1.json']
  );

  describe('getId', () => {
    it('should load id from image', () => {
      expect(getId(state)).toEqual('http://iiif.com/annotation-list-1.json');
    });
  });

  describe('getType', () => {
    it('should load type from image', () => {
      expect(getType(state)).toEqual('sc:AnnotationList');
    });
  });

  describe('getViewingHint', () => {
    it('should load a valid viewing hint from image', () => {
      expect(getViewingHint(state)).toEqual('http://iiif.com/custom-hint');
    });
    it('should ignore an invalid viewing hint', () => {
      expect(
        getViewingHint(
          createStateWithCustomProperties({
            viewingHint: 'something-invalid',
          })
        )
      ).toEqual(null);
      expect(
        getViewingHint(
          createStateWithCustomProperties({
            viewingHint: 0 / 0,
          })
        )
      ).toEqual(null);
    });
  });
});
