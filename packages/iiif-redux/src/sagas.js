import { saga as iiifResourceSaga } from './spaces/iiif-resource';
import { saga as collectionSaga } from './spaces/collections';

const sagas = [iiifResourceSaga, collectionSaga];

export default sagas;
