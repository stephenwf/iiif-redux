/**
 * Move start canvas to sequence.
 *
 * This compatibility looks for a start canvas property on a manifest and
 * moves it to a sequence which will then become a valid manifest.
 *
 * If there are multiple sequences, it will look for the sequence in which
 * the start canvas exists.
 */
export default function moveStartCanvasToSequence(resource) {
  if (resource['@type'] === 'sc:Manifest' && resource.startCanvas) {
    // We have a start canvas that needs moved.
    if (resource.sequences.length === 1) {
      return {
        ...resource,
        startCanvas: null,
        sequences: [
          {
            ...resource.sequences[0],
            startCanvas: resource.startCanvas,
          },
        ],
      };
    } else {
      // @todo handle multiple sequences.
    }
  }
  return resource;
}
