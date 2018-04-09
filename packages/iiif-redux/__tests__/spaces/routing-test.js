import { deselectUpdater, selectUpdater } from '../../src/spaces/routing';

describe('spaces/routing', () => {
  describe('selectUpdater', () => {
    it('should select item', () => {
      const testUpdater = selectUpdater('Test');
      expect(testUpdater({}, { payload: { id: 'test-id' } })).toEqual({
        currentTest: 'test-id',
      });
    });
  });

  describe('deselectUpdater', () => {
    it('should select item', () => {
      const testUpdater = deselectUpdater('Test');
      expect(
        testUpdater({
          currentTest: 'test-id',
        })
      ).toEqual({
        currentTest: null,
      });
    });
  });

  describe('selectUpdater + deselectUpdater integration', () => {
    const selectTest = selectUpdater('Test');
    const deselectTest = deselectUpdater('Test');

    expect(
      deselectTest(
        selectTest({ currentTest: null }, { payload: { id: 'test-id' } })
      )
    ).toEqual({ currentTest: null });
  });
});
