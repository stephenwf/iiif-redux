import {
  getCurrentSequenceId,
  getCurrentManifestId,
  getCurrentCollectionId,
  getCurrentCanvasId,
} from '../../src/api/current';

describe('api/current', () => {
  const state = {
    routing: {
      currentCollection: 'http://example.org/collection.json',
      currentSequence: 'http://example.org/sequence.json',
      currentManifest: 'http://example.org/manifest.json',
      currentCanvas: 'http://example.org/canvas.json',
    },
  };

  it('should load current collection', () => {
    expect(getCurrentCollectionId(state)).toEqual(
      'http://example.org/collection.json'
    );
  });

  it('should load current sequence', () => {
    expect(getCurrentSequenceId(state)).toEqual(
      'http://example.org/sequence.json'
    );
  });

  it('should load current manifest', () => {
    expect(getCurrentManifestId(state)).toEqual(
      'http://example.org/manifest.json'
    );
  });

  it('should load current canvas', () => {
    expect(getCurrentCanvasId(state)).toEqual('http://example.org/canvas.json');
  });
});
