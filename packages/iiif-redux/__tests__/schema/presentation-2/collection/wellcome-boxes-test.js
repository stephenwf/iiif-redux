import { normalize } from 'normalizr';
import { collection } from '../../../../src/schema/presentation2';
import boxes from '../../../fixtures/wellcome-boxes';
import * as currentCollection from '../../../../src/api/current-collection';

describe('Wellcome Genre: Boxes collection', () => {
  const entity = normalize(boxes, collection);
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

  it('should have an id', () => {
    expect(currentCollection.getId(state)).toEqual(
      'https://wellcomelibrary.org/service/collections/genres/Boxes/'
    );
  });

  it('should have a type of collection', () => {
    expect(currentCollection.getType(state)).toEqual('sc:Collection');
  });

  it('should have a label', () => {
    expect(currentCollection.getLabel(state)).toEqual([
      {
        '@language': 'en',
        '@value': ' Genre: Boxes',
      },
    ]);
  });

  it('should have members', () => {
    expect(currentCollection.getMemberIds(state)).toEqual([
      'https://wellcomelibrary.org/iiif/b28560577/manifest',
      'https://wellcomelibrary.org/iiif/b28560644/manifest',
      'https://wellcomelibrary.org/iiif/b28668844/manifest',
      'https://wellcomelibrary.org/iiif/b28671624/manifest',
      'https://wellcomelibrary.org/iiif/b28671600/manifest',
    ]);
    const members = currentCollection.getMembers(state);
    expect(members.length).toEqual(5);
    expect(members[0].label).toEqual([
      {
        '@language': 'en',
        '@value':
          'Bio-Light :the 3-day detox diet : lose weight, look good, feel great',
      },
    ]);
  });

  it('should have manifests', () => {
    const manifests = currentCollection.getManifests(state);
    expect(manifests.length).toEqual(5);
    expect(manifests[0].label).toEqual([
      {
        '@language': 'en',
        '@value':
          'Bio-Light :the 3-day detox diet : lose weight, look good, feel great',
      },
    ]);
  });
});
