import { collection, normalize } from '../../../../src/schema/presentation2';
import boxes from '../../../fixtures/wellcome-boxes';

describe('Wellcome Genre: Boxes collection', () => {
  const { entities } = normalize(boxes, collection);
  test('should normalize', () => {
    expect(entities).toMatchSnapshot();
  });
});
