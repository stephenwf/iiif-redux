import { sequenceByIdSelector } from '../../../../src/api/sequence';

describe('iiif/api/2.x/sequence/sequence-by-id', () => {
  it('should be able to generate selector for any sequence', () => {
    const state = {
      resources: {
        sequences: {
          'http://iiif.com/sequence-1.json': {
            '@id': 'http://iiif.com/sequence-1.json',
            '@type': 'sc:Sequence',
          },
        },
      },
    };

    const select = sequenceByIdSelector(sequence => ({
      id: sequence.getId,
      type: sequence.getType,
    }));

    expect(select(state, { id: 'http://iiif.com/sequence-1.json' })).toEqual({
      id: 'http://iiif.com/sequence-1.json',
      type: 'sc:Sequence',
    });

    const select2 = sequenceByIdSelector(
      sequence => ({
        id: sequence.getId,
        type: sequence.getType,
      }),
      {
        getId: () => 'http://iiif.com/sequence-1.json',
      }
    );

    expect(select2(state)).toEqual({
      id: 'http://iiif.com/sequence-1.json',
      type: 'sc:Sequence',
    });
  });
});
