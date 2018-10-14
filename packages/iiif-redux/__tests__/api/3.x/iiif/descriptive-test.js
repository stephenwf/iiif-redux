import {
  getLabel,
  getMetadata,
  getSummary,
  getThumbnailId,
  getPosterCanvas,
  getRequiredStatement,
  getRights,
  getNavDate,
  getLanguage,
} from '../../../../src/api/3.x/iiif/descriptive';

describe('api/3.x/iiif/descriptive', () => {
  const t = text => ({ en: [text] });

  test('label', () => {
    expect(getLabel({ label: t('test label') })).toEqual({
      en: ['test label'],
    });
  });

  test('metadata', () => {
    expect(
      getMetadata({
        metadata: [
          { label: t('label a'), value: t('value a') },
          { label: t('label b'), value: t('value b') },
        ],
      })
    ).toEqual([
      { label: { en: ['label a'] }, value: { en: ['value a'] } },
      { label: { en: ['label b'] }, value: { en: ['value b'] } },
    ]);
  });

  test('summary', () => {
    expect(getSummary({ summary: t('testing summary') })).toEqual({
      en: ['testing summary'],
    });
  });

  test('thumbnail', () => {
    expect(
      getThumbnailId({ thumbnail: 'http://iiif.com/thumbnail/1.jpg' })
    ).toEqual('http://iiif.com/thumbnail/1.jpg');
  });

  test('posterCanvas', () => {
    expect(
      getPosterCanvas({
        posterCanvas: { schema: 'canvas', id: 'https://iiif.com/canvas/1' },
      })
    ).toEqual({ schema: 'canvas', id: 'https://iiif.com/canvas/1' });
  });

  test('requiredStatement', () => {
    expect(
      getRequiredStatement({
        requiredStatement: {
          label: t('Attribution'),
          value: t('Provided by Example Organization'),
        },
      })
    ).toEqual({
      label: { en: ['Attribution'] },
      value: { en: ['Provided by Example Organization'] },
    });
  });

  test('rights', () => {
    expect(
      getRights({
        rights: 'https://creativecommons.org/licenses/by/4.0/',
      })
    ).toEqual('https://creativecommons.org/licenses/by/4.0/');
  });

  test('navDate', () => {
    expect(
      getNavDate({
        navDate: '1856-01-01T00:00:00Z',
      })
    ).toEqual('1856-01-01T00:00:00Z');
  });

  test('language', () => {
    expect(getLanguage({ language: ['en'] })).toEqual(['en']);
  });
});
