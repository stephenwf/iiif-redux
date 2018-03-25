import {
  getLabel,
  getDescription,
  getMetadata,
} from '../../src/api/current-collection';

describe('api/current-collection', () => {
  const state1 = {
    routing: { currentCollection: 'http://iiif.com/collection-1.json' },
    config: { defaultLanguage: 'en' },
    collections: {
      'http://iiif.com/collection-1.json': {
        '@id': 'http://iiif.com/collection-1.json',
        label: 'Test collection label',
        description: 'Test collection <strong>description</strong>',
        metadata: [
          { label: 'test metadata label', value: 'test metadata value' },
        ],
      },
    },
  };

  describe('getLabel', () => {
    it('should load label from collection', () => {
      expect(getLabel(state1)).toEqual([
        { '@language': 'en', '@value': 'Test collection label' },
      ]);
    });
  });

  describe('getDescription', () => {
    it('should load description from collection', () => {
      expect(getDescription(state1)).toEqual([
        {
          '@language': 'en',
          '@value': 'Test collection <strong>description</strong>',
        },
      ]);
    });
  });

  describe('getMetadata', () => {
    it('should load description from collection', () => {
      expect(getMetadata(state1)).toEqual([
        {
          label: [{ '@language': 'en', '@value': 'test metadata label' }],
          value: [{ '@language': 'en', '@value': 'test metadata value' }],
        },
      ]);
    });
  });
});
