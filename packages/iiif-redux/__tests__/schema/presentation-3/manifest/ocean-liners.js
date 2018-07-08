import oceanLiners from '../../../fixtures/presentation/3.0/v-a/ocean-liners';
import { manifest, normalize } from '../../../../src/schema/presentation3';

describe('schema/presentation-3 V&A - Ocean liners', () => {
  test('normalize', () => {
    const { entities, result } = normalize(oceanLiners, manifest);
    expect(entities).toMatchSnapshot('Normalized entities');
    expect(result).toEqual(
      'https://iiif.vam.ac.uk/collections/O1023003/manifest.json'
    );
  });
});
