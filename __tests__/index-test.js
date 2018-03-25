import bridgesJson from '../src/fixtures/bridges';
import {
  getSequences,
  getCanvasesFromDefaultSequence,
} from '../src/api/currentManifest';
import { presentation2 } from '../src/schema';
import { normalize } from 'normalizr';

const bridgesEntity = normalize(bridgesJson, presentation2.manifest);
const bridges = bridgesEntity.entities.manifests[bridgesEntity.result];
const state = {
  currentManifest: bridgesEntity.result,
  ...bridgesEntity.entities,
};

describe('api/manifests', () => {
  it('should load sequences', () => {
    const sequences = getSequences(state);
    expect(sequences.length).toEqual(1);
    expect(sequences[0]['@id']).toEqual(
      'https://view.nls.uk/manifest/7446/74464117/canvas/default'
    );
  });

  it('should load thumbnails', () => {
    const canvases = getCanvasesFromDefaultSequence(state);
    expect(canvases.length).toEqual(40);
    expect(canvases[0]['@id']).toEqual(
      'https://view.nls.uk/iiif/7446/74464117/canvas/1'
    );

    // console.log(canvases);
  });
});
