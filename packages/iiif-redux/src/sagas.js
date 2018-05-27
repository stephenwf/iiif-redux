import { saga as iiifResourceSaga } from './spaces/iiif-resource';
import { saga as collectionSaga } from './spaces/collections';
import { saga as manifestSaga } from './spaces/manifests';
import { saga as serviceSaga } from './spaces/services';

const sagas = [iiifResourceSaga, collectionSaga, manifestSaga, serviceSaga];

export default sagas;
