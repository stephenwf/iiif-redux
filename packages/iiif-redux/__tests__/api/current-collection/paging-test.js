import {
  getFirstId,
  getFirst,
  getLastId,
  getLast,
  getTotal,
  getNextId,
  getNext,
  getPreviousId,
  getPrevious,
  getStartIndex,
} from '../../../src/api/current-collection';

describe('api/current-collection/descriptive', () => {
  const state = {
    routing: { currentCollection: 'http://iiif.com/collection-1.json?page=3' },
    config: { defaultLanguage: 'en' },
    resources: {
      collections: {
        'http://iiif.com/collection-1.json?page=1': {
          '@id': 'http://iiif.com/collection-1.json',
          label: 'Page 1',
          first: ['http://iiif.com/collection-1.json?page=1'],
          last: ['http://iiif.com/collection-1.json?page=5'],
          total: 200,
          next: ['http://iiif.com/collection-1.json?page=2'],
          startIndex: 0,
        },
        'http://iiif.com/collection-1.json?page=2': {
          '@id': 'http://iiif.com/collection-1.json',
          label: 'Page 2',
          first: ['http://iiif.com/collection-1.json?page=1'],
          last: ['http://iiif.com/collection-1.json?page=5'],
          total: 200,
          prev: ['http://iiif.com/collection-1.json?page=1'],
          next: ['http://iiif.com/collection-1.json?page=2'],
          startIndex: 0,
        },
        'http://iiif.com/collection-1.json?page=3': {
          '@id': 'http://iiif.com/collection-1.json',
          label: 'Page 3',
          first: ['http://iiif.com/collection-1.json?page=1'],
          last: ['http://iiif.com/collection-1.json?page=5'],
          total: 200,
          next: ['http://iiif.com/collection-1.json?page=4'],
          prev: ['http://iiif.com/collection-1.json?page=2'],
          startIndex: 0,
        },
        'http://iiif.com/collection-1.json?page=4': {
          '@id': 'http://iiif.com/collection-1.json',
          label: 'Page 4',
          first: ['http://iiif.com/collection-1.json?page=1'],
          last: ['http://iiif.com/collection-1.json?page=5'],
          total: 200,
          prev: ['http://iiif.com/collection-1.json?page=3'],
          next: ['http://iiif.com/collection-1.json?page=5'],
          startIndex: 0,
        },
        'http://iiif.com/collection-1.json?page=5': {
          '@id': 'http://iiif.com/collection-1.json',
          label: 'Page 5',
          first: ['http://iiif.com/collection-1.json?page=1'],
          last: ['http://iiif.com/collection-1.json?page=5'],
          total: 200,
          prev: ['http://iiif.com/collection-1.json?page=4'],
          startIndex: 0,
        },
      },
    },
  };

  it('should load getFirstId', () => {
    expect(getFirstId(state)).toEqual(
      'http://iiif.com/collection-1.json?page=1'
    );
  });
  it('should load getFirst', () => {
    expect(getFirst(state).label).toEqual('Page 1');
  });
  it('should load getLastId', () => {
    expect(getLastId(state)).toEqual(
      'http://iiif.com/collection-1.json?page=5'
    );
  });
  it('should load getLast', () => {
    expect(getLast(state).label).toEqual('Page 5');
  });
  it('should load getTotal', () => {
    expect(getTotal(state)).toEqual(200);
  });
  it('should load getNextId', () => {
    expect(getNextId(state)).toEqual(
      'http://iiif.com/collection-1.json?page=4'
    );
  });
  it('should load getNext', () => {
    expect(getNext(state).label).toEqual('Page 4');
  });
  it('should load getPreviousId', () => {
    expect(getPreviousId(state)).toEqual(
      'http://iiif.com/collection-1.json?page=2'
    );
  });
  it('should load getPrevious', () => {
    expect(getPrevious(state).label).toEqual('Page 2');
  });
  it('should load getStartIndex', () => {
    expect(getStartIndex(state)).toEqual(0);
  });
});
