import {
  getSeeAlso,
  getServiceIds,
  getService,
  getRelatedIds,
  getRelated,
  getRenderingIds,
  getRendering,
  getWithinIds,
  getWithin,
} from '../../../src/api/current-collection';

describe('api/current-collection/linking', () => {
  const state = {
    routing: { currentCollection: 'http://iiif.com/collection-1.json' },
    config: { defaultLanguage: 'en' },
    collections: {
      'http://iiif.com/collection-1.json': {
        seeAlso: ['http://iiif.com/extern-1.json'],
        service: ['http://iiif.com/service-1.json'],
        related: ['http://iiif.com/extern-2.json'],
        rendering: ['http://iiif.com/extern-3.json'],
        within: ['http://iiif.com/layer-1.json'],
      },
    },
    services: {
      'http://iiif.com/service-1.json': {
        '@id': 'http://iiif.com/service-1.json',
        label: 'Service 1',
      },
    },
    externalResources: {
      'http://iiif.com/extern-1.json': {
        '@id': 'http://iiif.com/extern-1.json',
        label: 'External 1',
      },
      'http://iiif.com/extern-2.json': {
        '@id': 'http://iiif.com/extern-2.json',
        label: 'External 2',
      },
      'http://iiif.com/extern-3.json': {
        '@id': 'http://iiif.com/extern-3.json',
        label: 'External 3',
      },
    },
    layers: {
      'http://iiif.com/layer-1.json': {
        '@id': 'http://iiif.com/layer-1.json',
        label: 'Layer 1',
      },
    },
  };

  it('should get SeeAlso', () => {
    expect(getSeeAlso(state)[0].label).toEqual('External 1');
  });
  it('should get ServiceIds', () => {
    expect(getServiceIds(state)).toEqual(['http://iiif.com/service-1.json']);
  });
  it('should get Service', () => {
    expect(getService(state)[0].label).toEqual('Service 1');
  });
  it('should get RelatedIds', () => {
    expect(getRelatedIds(state)).toEqual(['http://iiif.com/extern-2.json']);
  });
  it('should get Related', () => {
    expect(getRelated(state)[0].label).toEqual('External 2');
  });
  it('should get RenderingIds', () => {
    expect(getRenderingIds(state)).toEqual(['http://iiif.com/extern-3.json']);
  });
  it('should get Rendering', () => {
    expect(getRendering(state)[0].label).toEqual('External 3');
  });
  it('should get WithinIds', () => {
    expect(getWithinIds(state)).toEqual(['http://iiif.com/layer-1.json']);
  });
  it('should get Within', () => {
    expect(getWithin(state)[0].label).toEqual('Layer 1');
  });
});
