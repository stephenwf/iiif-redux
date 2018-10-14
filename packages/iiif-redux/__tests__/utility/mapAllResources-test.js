import mapAllResources from '../../src/utility/mapAllResources';
describe('mapAllResources', () => {
  test('will add es to the end of resources that end in s', () => {
    const resources = {
      canvases: { '1': { id: '1' }, '2': { id: '2' } },
      manifests: { '3': { id: '3' }, '4': { id: '4' } },
    };
    const mapped = mapAllResources(
      [{ id: '1', schema: 'canvas' }, { id: '4', schema: 'manifest' }],
      resources
    );

    expect(mapped).toEqual([{ id: '1' }, { id: '4' }]);
  });
});
