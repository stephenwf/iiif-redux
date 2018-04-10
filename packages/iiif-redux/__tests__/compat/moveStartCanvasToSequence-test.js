import moveStartCanvasToSequence from '../../src/compat/moveStartCanvasToSequence';
import bridgesFixture from '../fixtures/bridges.json';

describe('compat/moveStartCanvasToSequence', () => {
  it('should set start canvas on manifest to null', () => {
    expect(moveStartCanvasToSequence(bridgesFixture).startCanvas).toBeNull();
  });
  it('should set start canvas on first sequence', () => {
    expect(
      moveStartCanvasToSequence(bridgesFixture).sequences[0].startCanvas
    ).toEqual('https://view.nls.uk/iiif/7446/74464117/canvas/3');
  });

  it('should be immutable', () => {
    expect(moveStartCanvasToSequence(bridgesFixture)).not.toBe(bridgesFixture);
  });

  it('should ignore other manifests', () => {
    const fakeManifest = {
      '@id': 'http://example.org/manifest.json',
      '@type': 'sc:Manifest',
    };
    expect(moveStartCanvasToSequence(fakeManifest)).toBe(fakeManifest);
  });

  it('should ignore other json', () => {
    const fakeCollection = {
      '@id': 'http://example.org/collection.json',
      '@type': 'sc:Collection',
      startCanvas: 'malformed data',
    };
    expect(moveStartCanvasToSequence(fakeCollection)).toBe(fakeCollection);
  });

  it('should ignore manifests with multiple sequences', () => {
    const fakeManifest = {
      '@id': 'http://example.org/manifest.json',
      '@type': 'sc:Manifest',
      startCanvas: 'http://example.org/canvas-1.json',
      sequences: [
        { '@id': 'http://example.org/sequence-1' },
        { '@id': 'http://example.org/sequence-2' },
      ],
    };
    expect(moveStartCanvasToSequence(fakeManifest)).toBe(fakeManifest);
  });
});
