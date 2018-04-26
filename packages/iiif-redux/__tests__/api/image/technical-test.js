import image from '../../../src/api/image';

describe('api/image/technical', () => {
  const createStateWithCustomProperties = props => ({
    resources: {
      annotations: {
        'http://iiif.com/image-1.json': {
          '@id': 'http://iiif.com/image-1.json',
          ...props,
        },
      },
    },
  });
  const state = {
    resources: {
      annotations: {
        'http://iiif.com/image-1.json': {
          '@id': 'http://iiif.com/image-1.json',
          '@type': 'sc:Annotation',
          viewingHint: 'http://iiif.com/custom-hint',
        },
      },
    },
  };

  const { getId, getType, getViewingHint } = image(
    s => s.resources.annotations['http://iiif.com/image-1.json']
  );

  describe('getId', () => {
    it('should load id from image', () => {
      expect(getId(state)).toEqual('http://iiif.com/image-1.json');
    });
  });

  describe('getType', () => {
    it('should load type from image', () => {
      expect(getType(state)).toEqual('sc:Annotation');
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
