import { connect } from 'react-redux';
import withLoadingState from './withLoadingState';
import { iiifResourceRequestUnknown } from 'iiif-redux/es/spaces/iiif-resource';

const customConnect = (selector, actions) => WrappedComponent => {
  return connect(
    selector,
    { iiifResourceRequestUnknown, ...actions }
  )(withLoadingState(WrappedComponent));
};

export default customConnect;
