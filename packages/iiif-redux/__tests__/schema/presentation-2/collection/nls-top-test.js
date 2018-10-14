import { collection, normalize } from '../../../../src/schema/presentation2';
import nlsTop from '../../../fixtures/nls-top';

describe('National Library of Scotland: Top level collection', () => {
  const { entities } = normalize(nlsTop, collection);
  test('it should normalize', () => {
    expect(entities).toMatchSnapshot();
  });
});
