import { saga as iiifResourceSaga } from './spaces/iiif-resource';
import { saga as collectionSaga } from './spaces/collections';
import { saga as manifestSaga } from './spaces/manifests';
// import { saga as frameSaga } from './spaces/frames';

const sagas = [iiifResourceSaga, collectionSaga, manifestSaga];

export default sagas;
