import sequence from '../../../../src/api/2.x/sequence';

describe('api/2.x/sequence/technical', () => {
  const { getId, getType, getViewingHint, getViewingDirection } = sequence(
    s => s.resources.sequences['http://iiif.com/sequence-1.json']
  );
  const createStateWithCustomProperties = props => ({
    resources: {
      sequences: {
        'http://iiif.com/sequence-1.json': {
          '@id': 'http://iiif.com/sequence-1.json',
          ...props,
        },
      },
    },
  });
  const state = {
    resources: {
      sequences: {
        'http://iiif.com/sequence-1.json': {
          '@id': 'http://iiif.com/sequence-1.json',
          '@type': 'sc:Sequence',
          viewingDirection: 'top-to-bottom',
          viewingHint: 'individuals',
        },
      },
    },
  };

  describe('getId', () => {
    it('should load id from sequence', () => {
      expect(getId(state)).toEqual('http://iiif.com/sequence-1.json');
    });
  });

  describe('getType', () => {
    it('should load type from sequence', () => {
      expect(getType(state)).toEqual('sc:Sequence');
    });
  });

  describe('getViewingDirection', () => {
    it('should load viewingDirection from sequence', () => {
      expect(getViewingDirection(state)).toEqual('top-to-bottom');
    });

    it('should load top-to-bottom', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'top-to-bottom',
          })
        )
      ).toEqual('top-to-bottom');
    });

    it('should load bottom-to-top', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'bottom-to-top',
          })
        )
      ).toEqual('bottom-to-top');
    });

    it('should load left-to-right', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'left-to-right',
          })
        )
      ).toEqual('left-to-right');
    });

    it('should load right-to-left', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'right-to-left',
          })
        )
      ).toEqual('right-to-left');
    });

    it('should load default to left-to-right when invalid', () => {
      expect(
        getViewingDirection(
          createStateWithCustomProperties({
            viewingDirection: 'NOT REAL',
          })
        )
      ).toEqual('left-to-right');
    });
  });

  describe('getViewingHint', () => {
    it('should load a valid viewing hint from sequence', () => {
      expect(
        getViewingHint(
          createStateWithCustomProperties({
            viewingHint: 'http://example.org/viewingHint',
          })
        )
      ).toEqual('http://example.org/viewingHint');
      expect(getViewingHint(state)).toEqual('individuals');
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
