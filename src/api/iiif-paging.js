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

// Linking
const getFirst = resource =>
  resource.first ? resource.first[0] || null : null;

const getLast = resource => (resource.last ? resource.last[0] || null : null);

const getNext = resource => (resource.next ? resource.next[0] || null : null);

const getPrevious = resource =>
  resource.prev ? resource.prev[0] || null : null;

// Numbers
const getTotal = resource =>
  resource.total ? parseInt(resource.total, 10) : null;

const getStartIndex = resource =>
  resource.startIndex ? parseInt(resource.startIndex, 10) : 0;

export { getFirst, getLast, getNext, getPrevious, getStartIndex, getTotal };
