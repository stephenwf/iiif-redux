export const STANFORD_IIIF_IMAGE_COMPLIANCE_0 =
  'http://library.stanford.edu/iiif/image-api/compliance.html#level0';
export const STANFORD_IIIF_IMAGE_COMPLIANCE_1 =
  'http://library.stanford.edu/iiif/image-api/compliance.html#level1';
export const STANFORD_IIIF_IMAGE_COMPLIANCE_2 =
  'http://library.stanford.edu/iiif/image-api/compliance.html#level2';
export const STANFORD_IIIF_IMAGE_CONFORMANCE_0 =
  'http://library.stanford.edu/iiif/image-api/conformance.html#level0';
export const STANFORD_IIIF_IMAGE_CONFORMANCE_1 =
  'http://library.stanford.edu/iiif/image-api/conformance.html#level1';
export const STANFORD_IIIF_IMAGE_CONFORMANCE_2 =
  'http://library.stanford.edu/iiif/image-api/conformance.html#level2';
export const STANFORD_IIIF_1_IMAGE_COMPLIANCE_0 =
  'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0';
export const STANFORD_IIIF_1_IMAGE_COMPLIANCE_1 =
  'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1';
export const STANFORD_IIIF_1_IMAGE_COMPLIANCE_2 =
  'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2';
export const STANFORD_IIIF_1_IMAGE_CONFORMANCE_0 =
  'http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0';
export const STANFORD_IIIF_1_IMAGE_CONFORMANCE_1 =
  'http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1';
export const STANFORD_IIIF_1_IMAGE_CONFORMANCE_2 =
  'http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2';
export const IIIF_1_IMAGE_LEVEL_0 = 'http://iiif.io/api/image/1/level0.json';
export const IIIF_1_IMAGE_LEVEL_0_PROFILE =
  'http://iiif.io/api/image/1/profiles/level0.json';
export const IIIF_1_IMAGE_LEVEL_1 = 'http://iiif.io/api/image/1/level1.json';
export const IIIF_1_IMAGE_LEVEL_1_PROFILE =
  'http://iiif.io/api/image/1/profiles/level1.json';
export const IIIF_1_IMAGE_LEVEL_2 = 'http://iiif.io/api/image/1/level2.json';
export const IIIF_1_IMAGE_LEVEL_2_PROFILE =
  'http://iiif.io/api/image/1/profiles/level2.json';
export const IIIF_2_IMAGE_LEVEL_0 = 'http://iiif.io/api/image/2/level0.json';
export const IIIF_2_IMAGE_LEVEL_0_PROFILE =
  'http://iiif.io/api/image/2/profiles/level0.json';
export const IIIF_2_IMAGE_LEVEL_1 = 'http://iiif.io/api/image/2/level1.json';
export const IIIF_2_IMAGE_LEVEL_1_PROFILE =
  'http://iiif.io/api/image/2/profiles/level1.json';
export const IIIF_2_IMAGE_LEVEL_2 = 'http://iiif.io/api/image/2/level2.json';
export const IIIF_2_IMAGE_LEVEL_2_PROFILE =
  'http://iiif.io/api/image/2/profiles/level2.json';
export const IIIF_3_IMAGE_LEVEL_0 = 'level0';
export const IIIF_3_IMAGE_LEVEL_1 = 'level1';
export const IIIF_3_IMAGE_LEVEL_2 = 'level2';

export function isImageService(service) {
  switch (service) {
    case STANFORD_IIIF_IMAGE_COMPLIANCE_0:
    case STANFORD_IIIF_IMAGE_COMPLIANCE_1:
    case STANFORD_IIIF_IMAGE_COMPLIANCE_2:
    case STANFORD_IIIF_IMAGE_CONFORMANCE_0:
    case STANFORD_IIIF_IMAGE_CONFORMANCE_1:
    case STANFORD_IIIF_IMAGE_CONFORMANCE_2:
    case STANFORD_IIIF_1_IMAGE_COMPLIANCE_0:
    case STANFORD_IIIF_1_IMAGE_COMPLIANCE_1:
    case STANFORD_IIIF_1_IMAGE_COMPLIANCE_2:
    case STANFORD_IIIF_1_IMAGE_CONFORMANCE_0:
    case STANFORD_IIIF_1_IMAGE_CONFORMANCE_1:
    case STANFORD_IIIF_1_IMAGE_CONFORMANCE_2:
    case IIIF_1_IMAGE_LEVEL_0:
    case IIIF_1_IMAGE_LEVEL_0_PROFILE:
    case IIIF_1_IMAGE_LEVEL_1:
    case IIIF_1_IMAGE_LEVEL_1_PROFILE:
    case IIIF_1_IMAGE_LEVEL_2:
    case IIIF_1_IMAGE_LEVEL_2_PROFILE:
    case IIIF_2_IMAGE_LEVEL_0:
    case IIIF_2_IMAGE_LEVEL_0_PROFILE:
    case IIIF_2_IMAGE_LEVEL_1:
    case IIIF_2_IMAGE_LEVEL_1_PROFILE:
    case IIIF_2_IMAGE_LEVEL_2:
    case IIIF_2_IMAGE_LEVEL_2_PROFILE:
    case IIIF_3_IMAGE_LEVEL_0:
    case IIIF_3_IMAGE_LEVEL_1:
    case IIIF_3_IMAGE_LEVEL_2:
      return true;
    default:
      return false;
  }
}
