import externalResource from '../../../src/api/external-resource';

describe('api/external-resource/technical', () => {
  const createStateWithCustomProperties = props => ({
    resources: {
      externalResources: {
        'http://iiif.com/external-resource-1.json': {
          '@id': 'http://iiif.com/external-resource-1.json',
          ...props,
        },
      },
    },
  });
  const state = {
    resources: {
      externalResources: {
        'http://iiif.com/external-resource-1.json': {
          '@id': 'http://iiif.com/external-resource-1.json',
          '@type': 'dctypes:Image',
          format: 'image/jpeg',
          viewingHint: 'http://iiif.com/custom-hint',
          height: 2000,
          width: 3000,
        },
      },
    },
  };

  const {
    getId,
    getType,
    getHeight,
    getWidth,
    getFormat,
    getViewingHint,
  } = externalResource(
    s =>
      s.resources.externalResources['http://iiif.com/external-resource-1.json']
  );

  describe('getId', () => {
    it('should load id from image', () => {
      expect(getId(state)).toEqual('http://iiif.com/external-resource-1.json');
    });
  });

  describe('getType', () => {
    it('should load type from image', () => {
      expect(getType(state)).toEqual('dctypes:Image');
    });
  });

  describe('getHeight', () => {
    it('should load height from image', () => {
      expect(getHeight(state)).toEqual(2000);
    });
  });

  describe('getWidth', () => {
    it('should load type from image', () => {
      expect(getWidth(state)).toEqual(3000);
    });
  });

  describe('getFormat', () => {
    it('should load type from image', () => {
      expect(getFormat(state)).toEqual('image/jpeg');
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
