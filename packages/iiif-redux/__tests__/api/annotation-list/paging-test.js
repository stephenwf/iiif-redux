import annotationList from '../../../src/api/annotation-list';

describe('api/annotation-list/descriptive', () => {
  const {
    getNextId,
    getNext,
    getPreviousId,
    getPrevious,
    getStartIndex,
  } = annotationList(
    s =>
      s.resources.annotationLists[
        'http://iiif.com/annotation-list-1.json?page=3'
      ]
  );
  const t = text => [{ '@value': text, '@language': 'en' }];
  const state = {
    resources: {
      annotationLists: {
        'http://iiif.com/annotation-list-1.json?page=1': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          label: t('Page 1'),
          first: ['http://iiif.com/annotation-list-1.json?page=1'],
          last: ['http://iiif.com/annotation-list-1.json?page=5'],
          total: 200,
          next: ['http://iiif.com/annotation-list-1.json?page=2'],
          startIndex: 0,
        },
        'http://iiif.com/annotation-list-1.json?page=2': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          label: t('Page 2'),
          first: ['http://iiif.com/annotation-list-1.json?page=1'],
          last: ['http://iiif.com/annotation-list-1.json?page=5'],
          total: 200,
          prev: ['http://iiif.com/annotation-list-1.json?page=1'],
          next: ['http://iiif.com/annotation-list-1.json?page=2'],
          startIndex: 0,
        },
        'http://iiif.com/annotation-list-1.json?page=3': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          label: t('Page 3'),
          first: ['http://iiif.com/annotation-list-1.json?page=1'],
          last: ['http://iiif.com/annotation-list-1.json?page=5'],
          total: 200,
          next: ['http://iiif.com/annotation-list-1.json?page=4'],
          prev: ['http://iiif.com/annotation-list-1.json?page=2'],
          startIndex: 0,
        },
        'http://iiif.com/annotation-list-1.json?page=4': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          label: t('Page 4'),
          first: ['http://iiif.com/annotation-list-1.json?page=1'],
          last: ['http://iiif.com/annotation-list-1.json?page=5'],
          total: 200,
          prev: ['http://iiif.com/annotation-list-1.json?page=3'],
          next: ['http://iiif.com/annotation-list-1.json?page=5'],
          startIndex: 0,
        },
        'http://iiif.com/annotation-list-1.json?page=5': {
          '@id': 'http://iiif.com/annotation-list-1.json',
          label: t('Page 5'),
          first: ['http://iiif.com/annotation-list-1.json?page=1'],
          last: ['http://iiif.com/annotation-list-1.json?page=5'],
          total: 200,
          prev: ['http://iiif.com/annotation-list-1.json?page=4'],
          startIndex: 0,
        },
      },
    },
  };

  it('should load getNextId', () => {
    expect(getNextId(state)).toEqual(
      'http://iiif.com/annotation-list-1.json?page=4'
    );
  });
  it('should load getNext', () => {
    expect(getNext(state).label).toEqual([
      { '@language': 'en', '@value': 'Page 4' },
    ]);
  });
  it('should load getPreviousId', () => {
    expect(getPreviousId(state)).toEqual(
      'http://iiif.com/annotation-list-1.json?page=2'
    );
  });
  it('should load getPrevious', () => {
    expect(getPrevious(state).label).toEqual([
      { '@language': 'en', '@value': 'Page 2' },
    ]);
  });
  it('should load getStartIndex', () => {
    expect(getStartIndex(state)).toEqual(0);
  });
});
