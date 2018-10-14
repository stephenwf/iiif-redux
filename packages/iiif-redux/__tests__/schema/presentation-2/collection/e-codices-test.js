import { collection, normalize } from '../../../../src/schema/presentation2';
import eCodicesFixture from '../../../fixtures/e-codices';

describe('e-codices collection', () => {
  const { entities } = normalize(eCodicesFixture, collection);
  test('it normalize', () => {
    expect(entities).toMatchSnapshot();
  });
});
