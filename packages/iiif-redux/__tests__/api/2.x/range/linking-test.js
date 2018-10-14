import range from '../../../../src/api/2.x/range';

describe('api/2.x/range/linking', () => {
  const {
    getSeeAlsoIds,
    getSeeAlso,
    getServiceIds,
    getService,
    getRelatedIds,
    getRelated,
    getRenderingIds,
    getRendering,
    getWithinIds,
    getWithin,
    getStartCanvas,
    getStartCanvasId,
  } = range(s => s.resources.ranges['http://iiif.com/range-1.json']);
  const t = text => [{ '@value': text, '@language': 'en' }];
  const state = {
    resources: {
      ranges: {
        'http://iiif.com/range-1.json': {
          seeAlso: [
            'http://iiif.com/extern-1.json',
            'http://iiif.com/extern-5.json',
          ],
          service: ['http://iiif.com/service-1.json'],
          related: ['http://iiif.com/extern-2.json'],
          rendering: ['http://iiif.com/extern-3.json'],
          startCanvas: 'http://iiif.com/canvas-1.json',
          within: [
            { id: 'http://iiif.com/layer-1.json', schema: 'layer' },
            { id: 'http://iiif.com/extern-4.json', schema: 'externalResource' },
          ],
        },
      },
      services: {
        'http://iiif.com/service-1.json': {
          '@id': 'http://iiif.com/service-1.json',
          label: t('Service 1'),
        },
      },
      externalResources: {
        'http://iiif.com/extern-1.json': {
          '@id': 'http://iiif.com/extern-1.json',
          label: t('External 1'),
        },
        'http://iiif.com/extern-2.json': {
          '@id': 'http://iiif.com/extern-2.json',
          label: t('External 2'),
        },
        'http://iiif.com/extern-3.json': {
          '@id': 'http://iiif.com/extern-3.json',
          label: t('External 3'),
        },
        'http://iiif.com/extern-4.json': {
          '@id': 'http://iiif.com/extern-4.json',
          label: t('External 4'),
        },
      },
      layers: {
        'http://iiif.com/layer-1.json': {
          '@id': 'http://iiif.com/layer-1.json',
          label: t('Layer 1'),
        },
      },
      canvases: {
        'http://iiif.com/canvas-1.json': {
          '@id': 'http://iiif.com/canvas-1.json',
          label: t('Canvas 1'),
        },
      },
    },
  };

  it('should get SeeAlsoIds', () => {
    expect(getSeeAlsoIds(state)).toEqual([
      'http://iiif.com/extern-1.json',
      'http://iiif.com/extern-5.json',
    ]);
  });
  it('should get SeeAlso', () => {
    expect(getSeeAlso(state)[0].label[0]['@value']).toEqual('External 1');
    expect(getSeeAlso(state)[1].label[0]['@value']).toEqual('unknown');
  });
  it('should get ServiceIds', () => {
    expect(getServiceIds(state)).toEqual(['http://iiif.com/service-1.json']);
  });
  it('should get Service', () => {
    expect(getService(state)[0].label[0]['@value']).toEqual('Service 1');
  });
  it('should get RelatedIds', () => {
    expect(getRelatedIds(state)).toEqual(['http://iiif.com/extern-2.json']);
  });
  it('should get Related', () => {
    expect(getRelated(state)[0].label[0]['@value']).toEqual('External 2');
  });
  it('should get RenderingIds', () => {
    expect(getRenderingIds(state)).toEqual(['http://iiif.com/extern-3.json']);
  });
  it('should get Rendering', () => {
    expect(getRendering(state)[0].label[0]['@value']).toEqual('External 3');
  });
  it('should get WithinIds', () => {
    expect(getWithinIds(state)).toEqual([
      { id: 'http://iiif.com/layer-1.json', schema: 'layer' },
      { id: 'http://iiif.com/extern-4.json', schema: 'externalResource' },
    ]);
  });
  it('should get Within', () => {
    expect(getWithin(state)[0].label[0]['@value']).toEqual('Layer 1');
    expect(getWithin(state)[1].label[0]['@value']).toEqual('External 4');
  });
  it('should get start canvas id', () => {
    expect(getStartCanvasId(state)).toEqual('http://iiif.com/canvas-1.json');
  });
  it('should get start canvas', () => {
    expect(getStartCanvas(state).label[0]['@value']).toEqual('Canvas 1');
  });
});
