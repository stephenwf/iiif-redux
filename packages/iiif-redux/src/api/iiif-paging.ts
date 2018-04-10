/**
 * IIIF Paging properties
 *
 * - getFirst
 * - getLast
 * - getTotal
 * - getNext
 * - getPrevious
 * - getStartIndex
 */

export type PagingProperty = string | Array<string>;

interface LinkingProperties {
  first?: PagingProperty;
  last?: PagingProperty;
  prev?: PagingProperty;
  next?: PagingProperty;
  total?: number | string;
  startIndex?: number | string;
}

function castToNumber(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }
  return parseInt(value, 10);
}

// Linking
const getFirst = (resource: LinkingProperties): string | null =>
  resource.first ? resource.first[0] || null : null;

const getLast = (resource: LinkingProperties): string | null =>
  resource.last ? resource.last[0] || null : null;

const getNext = (resource: LinkingProperties): string | null =>
  resource.next ? resource.next[0] || null : null;

const getPrevious = (resource: LinkingProperties): string | null =>
  resource.prev ? resource.prev[0] || null : null;

// Numbers
const getTotal = (resource: LinkingProperties): number | null =>
  resource.total ? castToNumber(resource.total) : null;

const getStartIndex = (resource: LinkingProperties): number =>
  resource.startIndex ? castToNumber(resource.startIndex) : 0;

export { getFirst, getLast, getNext, getPrevious, getStartIndex, getTotal };
