import {
  DEFAULT_STATE,
  frameCreate,
  reducer,
} from '../../../src/spaces/frames';
import frame from '../../../src/api/frame';
import { makeStateFromActions } from '../../../test-utils';

describe('iiif/api/frame metadata', () => {
  const state = makeStateFromActions(frameCreate());
  const defaultFrame = frame(s => s.frames.list['default-frame']);

  test('getId', () => {
    expect(defaultFrame.getId(state)).toEqual('default-frame');
  });

  test('isFocused', () => {
    expect(defaultFrame.isFocused(state)).toEqual(true);
  });
});
