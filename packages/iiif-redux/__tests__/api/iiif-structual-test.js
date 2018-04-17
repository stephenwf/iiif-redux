import {
  getSequences,
  getCanvases,
  getCollections,
  getImages,
  getManifests,
  getMembers,
  getOtherContent,
  getRanges,
  getStructures,
  alwaysArray,
} from '../../src/api/iiif-structural';

describe('api/iiif-structural', () => {
  describe('getSequences', () => {
    it('should get Sequences from resource', () => {
      expect(
        getSequences({
          sequences: [
            'https://example.org/sequnce/1',
            'https://example.org/sequnce/2',
          ],
        })
      ).toEqual([
        'https://example.org/sequnce/1',
        'https://example.org/sequnce/2',
      ]);
    });
    it('should always return an array', () => {
      expect(getSequences({})).toEqual([]);
    });
  });
  describe('getCanvases', () => {
    it('should get Canvases from resource', () => {
      expect(
        getCanvases({
          canvases: [
            'https://example.org/canvas/1',
            'https://example.org/canvas/2',
          ],
        })
      ).toEqual([
        'https://example.org/canvas/1',
        'https://example.org/canvas/2',
      ]);
    });
    it('should always return an array', () => {
      expect(getCanvases({})).toEqual([]);
    });
  });
  describe('getCollections', () => {
    it('should get Collections from resource', () => {
      expect(
        getCollections({
          collections: [
            { id: 'https://example.org/collection/1', schema: 'collection' },
            { id: 'https://example.org/collection/2', schema: 'collection' },
          ],
        })
      ).toEqual([
        'https://example.org/collection/1',
        'https://example.org/collection/2',
      ]);
    });
    it('should get Collections from resource, when mixed', () => {
      expect(
        getCollections({
          collections: [
            { id: 'https://example.org/collection/1', schema: 'collection' },
            { id: 'https://example.org/manifest/1', schema: 'manifest' },
            { id: 'https://example.org/collection/2', schema: 'collection' },
            { id: 'https://example.org/manifest/2', schema: 'manifest' },
          ],
        })
      ).toEqual([
        'https://example.org/collection/1',
        'https://example.org/collection/2',
      ]);
    });
    it('should always return an array', () => {
      expect(getCollections({})).toEqual([]);
    });
  });
  describe('getImages', () => {
    it('should get Images from resource', () => {
      expect(
        getImages({
          images: [
            'https://example.org/image/1',
            'https://example.org/image/2',
          ],
        })
      ).toEqual(['https://example.org/image/1', 'https://example.org/image/2']);
    });
    it('should always return an array', () => {
      expect(getImages({})).toEqual([]);
    });
  });
  describe('getManifests', () => {
    it('should get Manifests from resource', () => {
      expect(
        getManifests({
          manifests: [
            'https://example.org/manifest/1',
            'https://example.org/manifest/2',
          ],
        })
      ).toEqual([
        'https://example.org/manifest/1',
        'https://example.org/manifest/2',
      ]);
    });
    it('should always return an array', () => {
      expect(getManifests({})).toEqual([]);
    });
    it('should get Manifests from collections property resource, when mixed', () => {
      expect(
        getManifests({
          collections: [
            { id: 'https://example.org/collection/1', schema: 'collection' },
            { id: 'https://example.org/manifest/1', schema: 'manifest' },
            { id: 'https://example.org/collection/2', schema: 'collection' },
            { id: 'https://example.org/manifest/2', schema: 'manifest' },
          ],
        })
      ).toEqual([
        'https://example.org/manifest/1',
        'https://example.org/manifest/2',
      ]);
      expect(
        getManifests({
          collections: [
            { id: 'https://example.org/collection/1', schema: 'collection' },
            { id: 'https://example.org/manifest/3', schema: 'manifest' },
            { id: 'https://example.org/collection/2', schema: 'collection' },
            { id: 'https://example.org/manifest/4', schema: 'manifest' },
          ],
          manifests: [
            'https://example.org/manifest/1',
            'https://example.org/manifest/2',
          ],
        })
      ).toEqual([
        'https://example.org/manifest/1',
        'https://example.org/manifest/2',
        'https://example.org/manifest/3',
        'https://example.org/manifest/4',
      ]);
    });
  });
  describe('getMembers', () => {
    it('should get Members from resource', () => {
      expect(
        getMembers({
          members: [
            { id: 'https://example.org/member/1', schema: 'collection' },
            { id: 'https://example.org/member/2', schema: 'collection' },
          ],
        })
      ).toEqual([
        'https://example.org/member/1',
        'https://example.org/member/2',
      ]);
    });
    it('should always return an array', () => {
      expect(getMembers({})).toEqual([]);
    });
  });
  describe('getOtherContent', () => {
    it('should get OtherContent from resource', () => {
      expect(
        getOtherContent({
          otherContent: [
            {
              id: 'https://example.org/annotationList/1',
              schema: 'annotationList',
            },
            {
              id: 'https://example.org/externalContent/1',
              schema: 'externalContent',
            },
          ],
        })
      ).toEqual([
        'https://example.org/annotationList/1',
        'https://example.org/externalContent/1',
      ]);
    });
    it('should always return an array', () => {
      expect(getOtherContent({})).toEqual([]);
    });
  });
  describe('getRanges', () => {
    it('should get Ranges from resource', () => {
      expect(
        getRanges({
          structures: [
            'https://example.org/range/1',
            'https://example.org/range/2',
          ],
        })
      ).toEqual(['https://example.org/range/1', 'https://example.org/range/2']);
    });
    it('should always return an array', () => {
      expect(getRanges({})).toEqual([]);
    });
  });
  describe('getStructures', () => {
    it('should get Structures from resource', () => {
      expect(
        getStructures({
          structures: [
            'https://example.org/range/1',
            'https://example.org/range/2',
          ],
        })
      ).toEqual(['https://example.org/range/1', 'https://example.org/range/2']);
    });
    it('should always return an array', () => {
      expect(getStructures({})).toEqual([]);
    });
  });
  describe('alwaysArray', () => {
    expect(alwaysArray('test')).toEqual(['test']);
  });
});
