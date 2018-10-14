import { normalize } from '../../../src/schema/presentation3';
describe('schema/presentation-3/resource-type', () => {
  test('it can detect services', () => {
    const { entities, result } = normalize({
      id: 'https://example.org/service',
      type: 'Service',
      profile: 'https://example.org/docs/service',
    });

    expect(entities).toEqual({
      services: {
        'https://example.org/service': {
          id: 'https://example.org/service',
          profile: 'https://example.org/docs/service',
          type: 'Service',
        },
      },
    });
    expect(result).toEqual({
      id: 'https://example.org/service',
      schema: 'service',
    });
  });

  test('unknown resource type', () => {
    expect(() => {
      normalize({});
    }).toThrowError();
  });

  test('it can detect selectors as strings', () => {
    const { entities, result } = normalize({
      '@context': [
        'http://www.w3.org/ns/anno.jsonld',
        'http://iiif.io/api/presentation/3/context.json',
      ],
      id: 'https://example.org/iiif/annotation/2',
      type: 'Annotation',
      target: ['https://example.org/iiif/canvas/1#xywh=10,20,30,40'],
    });

    expect(entities).toEqual({
      annotations: {
        'https://example.org/iiif/annotation/2': {
          '@context': [
            'http://www.w3.org/ns/anno.jsonld',
            'http://iiif.io/api/presentation/3/context.json',
          ],
          id: 'https://example.org/iiif/annotation/2',
          target: ['https://example.org/iiif/canvas/1#xywh=10,20,30,40'],
          type: 'Annotation',
        },
      },
    });
    expect(result).toEqual({
      id: 'https://example.org/iiif/annotation/2',
      schema: 'annotation',
    });
  });
});
