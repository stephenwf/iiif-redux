import annotation from '../../../../src/api/2.x/annotation';

describe('api/2.x/annotation/technical', () => {
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
          motivation: 'sc:painting',
        },
      },
    },
  };

  const { getId, getType, getViewingHint, getMotivation } = annotation(
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

  describe('getMotivation', () => {
    it('should load motivation from image annotation', () => {
      expect(getMotivation(state)).toEqual('sc:painting');
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
