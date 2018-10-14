import { normalize } from '../../../../src/schema/presentation2';
import bridgesFixture from '../../../fixtures/bridges';

describe('Forth Bridge illustrations manifest', () => {
  const { entities } = normalize(bridgesFixture);
  it('should match snapshot', () => {
    expect(entities).toMatchSnapshot();
  });
});
