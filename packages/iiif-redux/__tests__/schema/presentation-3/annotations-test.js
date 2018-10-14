import { normalize, resource } from '../../../src/schema/presentation3';

describe('Presentation 3 annotations', () => {
  test('Annotation can be normalized', () => {
    const { result, entities } = normalize(
      {
        id: 'http://example.org/iiif/annotation/1.json',
        type: 'Annotation',
        body: {
          type: 'TextualBody',
          format: 'text/plain',
          value: 'health',
          generator: 'https://omeka.dlcs-ida.org/s/ida/montague/open',
          purpose: 'tagging',
        },
      },
      resource
    );

    expect(result).toEqual({
      id: 'http://example.org/iiif/annotation/1.json',
      schema: 'annotation',
    });
    expect(entities).toMatchSnapshot();
  });
  test('Annotation with specific resource', () => {
    const { result, entities } = normalize({
      id: 'http://example.org/iiif/annotation/2.json',
      type: 'Annotation',
      body: {
        type: 'SpecificResource',
        format: 'application/html',
        generator:
          'https://omeka.dlcs-ida.org/s/ida/montague/open/topicmanager/',
        purpose: 'tagging',
        source: 'https://omeka.dlcs-ida.org/s/ida/page/topics/theme/health',
      },
    });

    expect(result).toEqual({
      id: 'http://example.org/iiif/annotation/2.json',
      schema: 'annotation',
    });
    expect(entities).toMatchSnapshot();
  });
  test('External web resource (from the data model)', () => {
    const { result, entities } = normalize({
      '@context': 'http://www.w3.org/ns/anno.jsonld',
      id: 'http://example.org/anno2',
      type: 'Annotation',
      body: {
        id: 'http://example.org/analysis1.mp3',
        format: 'audio/mpeg',
        language: 'fr',
      },
      target: {
        id: 'http://example.gov/patent1.pdf',
        format: 'application/pdf',
        language: ['en', 'ar'],
        textDirection: 'ltr',
        processingLanguage: 'en',
      },
    });

    expect(result).toEqual({
      id: 'http://example.org/anno2',
      schema: 'annotation',
    });
    expect(entities).toMatchSnapshot();
  });
});
