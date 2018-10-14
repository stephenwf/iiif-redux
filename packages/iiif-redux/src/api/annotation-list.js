import { getAllAnnotationLists } from './all';
import byIdSelectorFactory from '../utility/byIdSelectorFactory';
import resourceListSelectorFactory from '../utility/resourceListSelectorFactory';
import presentation2annotationList from './2.x/annotation-list';

const annotationList = presentation2annotationList;

export default annotationList;

export const annotationLists = resourceListSelectorFactory(
  getAllAnnotationLists,
  annotationList
);

export const annotationListByIdSelector = byIdSelectorFactory(
  annotationList,
  'annotationLists'
);
