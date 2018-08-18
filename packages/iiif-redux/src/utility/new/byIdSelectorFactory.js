import memoize from 'lodash.memoize';
import { getAllResources } from '../../api/all';
import selectorError from './selectorError';

export default function byIdSelectorFactory(rootApi, resourceKey) {
  return memoize(
    (callable, { getId = null, ...config } = {}) => (state, props) => {
      const id = getId ? getId(props) : props ? props.id : null;
      if (!id) {
        return selectorError('No ID found on resource');
      }

      return rootApi(s => s.resources[resourceKey][id], callable, config)(
        state
      );
    }
  );
}
