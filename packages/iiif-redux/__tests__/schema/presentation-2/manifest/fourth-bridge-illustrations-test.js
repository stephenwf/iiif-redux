import { normalize } from '../../../../src/schema/presentation2';
import bridgesFixture from '../../../fixtures/bridges';
import * as currentManifest from '../../../../src/api/current-manifest';
import * as currentSequence from '../../../../src/api/current-sequence';

describe('Forth Bridge illustrations manifest', () => {
  const entity = normalize(bridgesFixture);
  const state = {
    resources: {
      ...entity.entities,
    },
    config: {
      defaultLanguage: 'en',
    },
    routing: {
      currentCollection: null,
      currentManifest: entity.result.id,
      currentSequence: Object.keys(entity.entities.sequences)[0],
    },
  };

  it('should match snapshot', () => {
    expect(entity.entities).toMatchSnapshot();
  });

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

  it('should have an id', () => {
    expect(currentManifest.getId(state)).toEqual(
      'https://view.nls.uk/manifest/7446/74464117/manifest.json'
    );
  });

  it('should have a type of manifest', () => {
    expect(currentManifest.getType(state)).toEqual('sc:Manifest');
  });

  it('should get current sequence', () => {
    expect(currentSequence.getCurrentSequence(state).label).toEqual([
      { '@language': 'en', '@value': 'default' },
    ]);
  });

  it('should get start canvas id', () => {
    expect(currentSequence.getStartCanvasId(state)).toEqual(
      'https://view.nls.uk/iiif/7446/74464117/canvas/3'
    );
  });

  it('should get start canvas id', () => {
    expect(currentSequence.getStartCanvas(state).label).toEqual([
      { '@language': 'en', '@value': '3' },
    ]);
  });

  it('should return see also link', () => {
    expect(currentManifest.getSeeAlso(state)).toEqual([
      { '@id': 'http://seealso.com/page-1.json', label: 'Page 1' },
      { '@id': 'http://seealso.com/page-2.json', label: 'Page 2' },
      { '@id': 'http://seealso.com/page-3.json' },
    ]);
  });

  it('should get range ids', () => {
    expect(currentManifest.getRangeIds(state)).toEqual([
      'https://view.nls.uk/iiif/7446/74464117/range/r-1',
      'https://view.nls.uk/iiif/7446/74464117/range/r-2',
      'https://view.nls.uk/iiif/7446/74464117/range/r-3',
      'https://view.nls.uk/iiif/7446/74464117/range/r-4',
      'https://view.nls.uk/iiif/7446/74464117/range/r-5',
      'https://view.nls.uk/iiif/7446/74464117/range/r-6',
      'https://view.nls.uk/iiif/7446/74464117/range/r-7',
      'https://view.nls.uk/iiif/7446/74464117/range/r-8',
      'https://view.nls.uk/iiif/7446/74464117/range/r-9',
      'https://view.nls.uk/iiif/7446/74464117/range/r-10',
      'https://view.nls.uk/iiif/7446/74464117/range/r-11',
      'https://view.nls.uk/iiif/7446/74464117/range/r-12',
      'https://view.nls.uk/iiif/7446/74464117/range/r-13',
      'https://view.nls.uk/iiif/7446/74464117/range/r-14',
      'https://view.nls.uk/iiif/7446/74464117/range/r-15',
      'https://view.nls.uk/iiif/7446/74464117/range/r-16',
      'https://view.nls.uk/iiif/7446/74464117/range/r-17',
      'https://view.nls.uk/iiif/7446/74464117/range/r-18',
      'https://view.nls.uk/iiif/7446/74464117/range/r-19',
      'https://view.nls.uk/iiif/7446/74464117/range/r-20',
      'https://view.nls.uk/iiif/7446/74464117/range/r-21',
      'https://view.nls.uk/iiif/7446/74464117/range/r-22',
      'https://view.nls.uk/iiif/7446/74464117/range/r-23',
      'https://view.nls.uk/iiif/7446/74464117/range/r-24',
      'https://view.nls.uk/iiif/7446/74464117/range/r-25',
      'https://view.nls.uk/iiif/7446/74464117/range/r-26',
      'https://view.nls.uk/iiif/7446/74464117/range/r-27',
      'https://view.nls.uk/iiif/7446/74464117/range/r-28',
      'https://view.nls.uk/iiif/7446/74464117/range/r-29',
      'https://view.nls.uk/iiif/7446/74464117/range/r-30',
      'https://view.nls.uk/iiif/7446/74464117/range/r-31',
      'https://view.nls.uk/iiif/7446/74464117/range/r-32',
      'https://view.nls.uk/iiif/7446/74464117/range/r-33',
      'https://view.nls.uk/iiif/7446/74464117/range/r-34',
      'https://view.nls.uk/iiif/7446/74464117/range/r-35',
      'https://view.nls.uk/iiif/7446/74464117/range/r-36',
      'https://view.nls.uk/iiif/7446/74464117/range/r-37',
      'https://view.nls.uk/iiif/7446/74464117/range/r-38',
      'https://view.nls.uk/iiif/7446/74464117/range/r-39',
      'https://view.nls.uk/iiif/7446/74464117/range/r-40',
    ]);
  });

  it('should get full ranges', () => {
    expect(
      currentManifest.getRanges(state).map(range => range.label[0]['@value'])
    ).toEqual([
      'Imaginative depiction of the completed Forth Rail Bridge',
      'No. 2 - Fife S.W. skewback & tubes in  construction, 7 Sept. 1886',
      'No. 3 - Superstructure, Fife, 15 Sept. 1886',
      'No. 4 - Superstructure, North Side',
      'General views from high ground back of South Queensferry',
      'General views from high ground back of South Queensferry',
      'Fife superstructure from sea shore',
      'Queensferry superstructure, showing arrangement of lifting platforms',
      'Inchgarvie superstructure, showing erection of skewbacks',
      'Detail of top member joint',
      'Works at Inchgarvie, showing completion of lifting platforms',
      'Queensferry cantilever from end of approach viaduct',
      'Detail of the top member',
      'Queensferry cantilever at rail level',
      'Inchgarvie cantilever as seen from the landing stage',
      'Fife cantilever from the east side',
      'Fife from Village Pier (west side)',
      'Works at Inchgarvie after first three lifts',
      'Queensferry cantilever two thirds full height',
      'Works at Inchgarvie from wind gauge on castle ruins',
      'Queensferry cantilever at full height from north end of approach viaduct',
      'Three cantilevers from the south shore on the occasion of Queensferry superstructure attaining its full height',
      'Three cantilevers from the south shore on the occasion of Queensferry superstructure attaining its full height',
      'Fife cantilever, at full height from village pier',
      'General view from Port Edgar, with trees in the foreground',
      'General view taken from the east end of South Queensferry',
      'General view taken from Dalmeny Park at water level',
      'General view taken late in the evening',
      'Queensferry cantilever and eight spans of approach viaduct',
      'Inchgarvie cantilever, three-fourths full height',
      'General view from North Queensferry hills depicting the three cantilevers at very nearly their full height',
      "Birds'-eye view of Inchgarvie and surrounding country",
      'Fife cantilever, showing arrangement of platforms for construction of struts and ties',
      'Queensferry approach viaduct and half span of cantilever',
      'General view from the high ground situated S.W. of South Queensferry',
      'General view from back of Newhalls Inn, South Queensferry',
      'Fife cantilever with No. 1 strut and lifting platform nearly up to rail level',
      'Queensferry cantilever from end of Hawes Pier',
      'Inchgarvie superstructure at full height',
      'Part of Inchgarvie and Queensferry works, showing the span to be bridged',
    ]);
  });
});
