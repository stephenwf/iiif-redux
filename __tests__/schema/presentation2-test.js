import { manifest, collection } from '../../src/schema/presentation2';
import { normalize } from 'normalizr';
import bridgesFixture from '../../src/fixtures/bridges';
import eCodicesFixture from '../../src/fixtures/e-codices';
import * as currentManifest from '../../src/api/current-manifest';
import * as currentCollection from '../../src/api/current-collection';

describe('schema/presentation2', () => {
  describe('e-codices collection', () => {
    const entity = normalize(eCodicesFixture, collection);
    const state = {
      ...entity.entities,
      config: {
        defaultLanguage: 'en',
      },
      routing: {
        currentCollection: entity.result,
        currentManifest: null,
      },
    };

    it('should have a label', () => {
      expect(currentCollection.getLabel(state)).toEqual([
        {
          '@language': 'en',
          '@value': 'e-codices – Virtual Manuscript Library of Switzerland',
        },
      ]);
    });

    it('should have a logo', () => {
      expect(currentCollection.getLogo(state)).toEqual(
        'http://www.e-codices.ch/img/logo-for-iiif-manifest.png'
      );
    });

    it('should have attribution', () => {
      expect(currentCollection.getAttribution(state)).toEqual([
        {
          '@language': 'en',
          '@value': 'e-codices - Virtual Manuscript Library of Switzerland',
        },
      ]);
    });
  });

  describe('Forth Bridge illustrations manifest', () => {
    const entity = normalize(bridgesFixture, manifest);
    const state = {
      ...entity.entities,
      config: {
        defaultLanguage: 'en',
      },
      routing: {
        currentCollection: null,
        currentManifest: entity.result,
      },
    };

    it('should have a label', () => {
      expect(currentManifest.getLabel(state)).toEqual([
        { '@language': 'en', '@value': 'Forth Bridge illustrations 1886-1887' },
      ]);
    });

    it('should have a type of manifest', () => {
      expect(currentManifest.getType(state)).toEqual('sc:Manifest');
    });

    it('should have an attribution field', () => {
      expect(currentManifest.getAttribution(state)).toEqual([
        {
          '@language': 'en',
          '@value':
            'National Library of Scotland<br/>License: <a target="_top" href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>',
        },
      ]);
    });

    it('should have metadata back metadata', () => {
      expect(currentManifest.getMetadata(state)).toEqual([
        {
          label: [{ '@language': 'en', '@value': 'Title' }],
          value: [
            {
              '@language': 'en',
              '@value': 'Forth Bridge illustrations 1886-1887',
            },
          ],
        },
        {
          label: [{ '@language': 'en', '@value': 'Description' }],
          value: [
            {
              '@language': 'en',
              '@value':
                '40 black-and-white photographs capturing the construction of the Forth Bridge by Glasgow-based Sir William Arrol & Co. Close-up and distance views of superstructure, cantilevers, lifting platforms and viaduct. Taken at weekly or fortnightly intervals from 1886-1887 by Philip Phillips, son of one of the contractors. Silver gelatin prints.',
            },
          ],
        },
        {
          label: [{ '@language': 'en', '@value': 'Shelfmark' }],
          value: [{ '@language': 'en', '@value': 'RB.l.229' }],
        },
        {
          label: [],
          value: [
            {
              '@language': 'en',
              '@value':
                '<a href="http://digital.nls.uk/74464117">View in our digital gallery</a>',
            },
          ],
        },
        {
          label: [{ '@language': 'en', '@value': 'Full conditions of use' }],
          value: [
            {
              '@language': 'en',
              '@value':
                'You have permission to make copies of this work under the <a target="_top" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International Licence</a> unless otherwise stated.',
            },
          ],
        },
      ]);
    });
  });
});
