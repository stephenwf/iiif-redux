import bronzeAmulet from '../../../fixtures/bronze-amulet';
import { normalize } from '../../../../src/schema/presentation2';

describe('schema/presentation-2/manifest/bronze-amulet', () => {
  it('should parse manifest', () => {
    const entity = normalize(bronzeAmulet);
    expect(entity).toMatchSnapshot();
  });
});
