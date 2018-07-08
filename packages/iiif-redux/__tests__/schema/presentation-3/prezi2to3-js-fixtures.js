import fixtures from '../../fixtures/presentation/3.0/2-to-3-converter';
import { resource, normalize } from '../../../src/schema/presentation3';

describe('Prezi2to3js fixtures', () => {
  fixtures.forEach((fixture, n) => {
    test(`Fixture number ${n}`, () => {
      const { result, entities } = normalize(fixture, resource);
      expect(result).toMatchSnapshot(`Fixture result ${n}`);
      expect(entities).toMatchSnapshot(`Fixture entities ${n}`);
    });
  });
});
