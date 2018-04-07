import { isImageService } from '../src/constants/services';

describe('constants', () => {
  describe('isImageService', () => {
    it('should support all available service profiles', () => {
      const shouldReturnTrue = [
        'http://library.stanford.edu/iiif/image-api/compliance.html#level0',
        'http://library.stanford.edu/iiif/image-api/compliance.html#level1',
        'http://library.stanford.edu/iiif/image-api/compliance.html#level2',
        'http://library.stanford.edu/iiif/image-api/conformance.html#level0',
        'http://library.stanford.edu/iiif/image-api/conformance.html#level1',
        'http://library.stanford.edu/iiif/image-api/conformance.html#level2',
        'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0',
        'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1',
        'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2',
        'http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0',
        'http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1',
        'http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2',
        'http://iiif.io/api/image/1/level0.json',
        'http://iiif.io/api/image/1/profiles/level0.json',
        'http://iiif.io/api/image/1/level1.json',
        'http://iiif.io/api/image/1/profiles/level1.json',
        'http://iiif.io/api/image/1/level2.json',
        'http://iiif.io/api/image/1/profiles/level2.json',
        'http://iiif.io/api/image/2/level0.json',
        'http://iiif.io/api/image/2/profiles/level0.json',
        'http://iiif.io/api/image/2/level1.json',
        'http://iiif.io/api/image/2/profiles/level1.json',
        'http://iiif.io/api/image/2/level2.json',
        'http://iiif.io/api/image/2/profiles/level2.json',
      ];

      shouldReturnTrue.forEach(serivceProfile => {
        expect(isImageService(serivceProfile)).toEqual(true);
      });
    });

    it('should return false if invalid', () => {
      expect(isImageService('NOT REAL PROFILE')).toEqual(false);
    });
  });
});
