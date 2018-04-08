import { normalize } from 'normalizr';
import { collection } from '../../../../src/schema/presentation2';
import nlsTop from '../../../fixtures/nls-top';
import * as currentCollection from '../../../../src/api/current-collection';

describe('National Library of Scotland: Top level collection', () => {
  const entity = normalize(nlsTop, collection);
  const state = {
    resources: {
      ...entity.entities,
    },
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
      'https://view.nls.uk/collections/top.json'
    );
  });

  it('should have a type of collection', () => {
    expect(currentCollection.getType(state)).toEqual('sc:Collection');
  });

  it('should have a label', () => {
    expect(currentCollection.getLabel(state)).toEqual([
      {
        '@language': 'en',
        '@value': 'National Library of Scotland IIIF Collections',
      },
    ]);
  });

  it('should have members', () => {
    expect(currentCollection.getMemberIds(state)).toEqual([
      'https://view.nls.uk/collections/1208/2191/120821910.json',
      'https://view.nls.uk/collections/1258/8396/125883965.json',
      'https://view.nls.uk/collections/1334/7486/133474867.json',
      'https://view.nls.uk/collections/1256/5201/125652019.json',
      'https://view.nls.uk/collections/7446/74466699.json',
      'https://view.nls.uk/collections/7446/74466728.json',
      'https://view.nls.uk/collections/7446/74462370.json',
      'https://view.nls.uk/collections/7446/74466682.json',
      'https://view.nls.uk/collections/1256/4477/125644778.json',
      'https://view.nls.uk/collections/9350/93506071.json',
      'https://view.nls.uk/collections/1041/8410/104184103.json',
      'https://view.nls.uk/manifest/7445/74457611/manifest.json',
      'https://view.nls.uk/manifest/7445/74457640/manifest.json',
      'https://view.nls.uk/manifest/7446/74464614/manifest.json',
      'https://view.nls.uk/manifest/7446/74465058/manifest.json',
      'https://view.nls.uk/manifest/7492/74921376/manifest.json',
    ]);
  });

  it('should have members, containing manifests and collections', () => {
    const members = currentCollection.getMembers(state);
    expect(members.length).toEqual(16);
    expect(
      members.filter(member => member['@type'] === 'sc:Manifest').length
    ).toEqual(5);
    expect(
      members.filter(member => member['@type'] === 'sc:Collection').length
    ).toEqual(11);
  });

  it('should have manifests accessible on their own', () => {
    expect(currentCollection.getManifestIds(state)).toEqual([
      'https://view.nls.uk/manifest/7445/74457611/manifest.json',
      'https://view.nls.uk/manifest/7445/74457640/manifest.json',
      'https://view.nls.uk/manifest/7446/74464614/manifest.json',
      'https://view.nls.uk/manifest/7446/74465058/manifest.json',
      'https://view.nls.uk/manifest/7492/74921376/manifest.json',
    ]);
    const manifests = currentCollection.getManifests(state);
    expect(manifests).toHaveLength(5);
    expect(manifests[0].label).toEqual([
      {
        '@language': 'en',
        '@value': 'Photographs of the south side of Edinburgh',
      },
    ]);
  });

  it('should have collections accessible on their own', () => {
    expect(currentCollection.getCollectionIds(state).length).toEqual(11);
  });
});
