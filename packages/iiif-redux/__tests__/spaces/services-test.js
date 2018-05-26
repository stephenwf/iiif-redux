import {
  serviceActivate,
  serviceAnnounce,
  serviceDeactivate,
  serviceDisable,
  serviceEnable,
  serviceError,
  reducer,
  DEFAULT_STATE,
} from '../../src/spaces/services';

describe('spaces/services', () => {
  describe('actions', () => {
    it('should create serviceAnnounce action', () => {
      const id = '1234';
      const serviceId = 'http://service/id/';
      const resource = 'http://resource/id/';
      const label = 'test label';
      expect(serviceAnnounce(id, serviceId, resource, label)).toEqual({
        payload: {
          id: '1234',
          label: 'test label',
          resource: 'http://resource/id/',
          serviceId: 'http://service/id/',
        },
        type: 'SERVICE_ANNOUNCE',
      });
    });

    it('should create serviceActivate action', () => {
      const id = '1234';
      const label = 'test label';
      const config = { myCustomProp: 'value' };
      expect(serviceActivate(id, config, { label })).toEqual({
        payload: {
          config: { myCustomProp: 'value' },
          id: '1234',
          label: 'test label',
        },
        type: 'SERVICE_ACTIVATE',
      });
    });

    it('should create serviceError action', () => {
      const id = '1234';
      expect(serviceError(id, 'something went wrong')).toEqual({
        payload: { error: 'something went wrong', id: '1234' },
        type: 'SERVICE_ERROR',
      });
    });

    it('should create serviceDeactivate action', () => {
      const id = '1234';
      expect(serviceDeactivate(id)).toEqual({
        payload: { id: '1234' },
        type: 'SERVICE_DEACTIVATE',
      });
    });

    it('should create serviceEnable action', () => {
      const id = '1234';
      expect(serviceEnable(id)).toEqual({
        payload: { id: '1234' },
        type: 'SERVICE_ENABLE',
      });
    });

    it('should create serviceDisable action', () => {
      const id = '1234';
      expect(serviceDisable(id)).toEqual({
        payload: { id: '1234' },
        type: 'SERVICE_DISABLE',
      });
    });
  });

  describe('reducer', () => {
    it('should handle serviceAnnounce actions', () => {
      const id = '1234';
      const serviceId = 'http://service/id/';
      const resource = 'http://resource/id/';
      const label = 'test label';

      expect(
        [serviceAnnounce(id, serviceId, resource, label)].reduce(
          reducer,
          DEFAULT_STATE
        )
      ).toMatchSnapshot();
    });

    it('should handle serviceAnnounce and then serviceActivate actions', () => {
      const id = '1234';
      const serviceId = 'http://service/id/';
      const resource = 'http://resource/id/';
      const label = 'test label';
      const config = { myCustomProp: 'some value' };

      expect(
        [
          serviceAnnounce(id, serviceId, resource, label),
          serviceActivate(id, config),
        ].reduce(reducer, DEFAULT_STATE)
      ).toMatchSnapshot();
    });

    it('should be able to override label when activating service', () => {
      const id = '1234';
      const serviceId = 'http://service/id/';
      const resource = 'http://resource/id/';
      const label = 'test label';
      const config = { myCustomProp: 'some value' };

      expect(
        [
          serviceAnnounce(id, serviceId, resource, label),
          serviceActivate(id, config, { label: 'test override label' }),
        ].reduce(reducer, DEFAULT_STATE)
      ).toMatchSnapshot();
    });

    it('should handle serviceAnnounce, serviceActivate and then serviceEnable actions', () => {
      const id = '1234';
      const serviceId = 'http://service/id/';
      const resource = 'http://resource/id/';
      const label = 'test label';
      const config = { myCustomProp: 'some value' };

      expect(
        [
          serviceAnnounce(id, serviceId, resource, label),
          serviceActivate(id, config),
          serviceEnable(id),
        ].reduce(reducer, DEFAULT_STATE)
      ).toMatchSnapshot();
    });

    it('should handle serviceAnnounce, serviceActivate, serviceEnable and then serviceDisable actions', () => {
      const id = '1234';
      const serviceId = 'http://service/id/';
      const resource = 'http://resource/id/';
      const label = 'test label';
      const config = { myCustomProp: 'some value' };

      expect(
        [
          serviceAnnounce(id, serviceId, resource, label),
          serviceActivate(id, config),
          serviceEnable(id),
          serviceDisable(id),
        ].reduce(reducer, DEFAULT_STATE)
      ).toMatchSnapshot();
    });

    it('should deactivate and disable service after error', () => {
      const id = '1234';
      const serviceId = 'http://service/id/';
      const resource = 'http://resource/id/';
      const label = 'test label';
      const config = { myCustomProp: 'some value' };

      expect(
        [
          serviceAnnounce(id, serviceId, resource, label),
          serviceActivate(id, config),
          serviceEnable(id),
          serviceError(id, 'Something went wrong'),
        ].reduce(reducer, DEFAULT_STATE)
      ).toMatchSnapshot();
    });

    it('should be able to deactivate service', () => {
      const id = '1234';
      const serviceId = 'http://service/id/';
      const resource = 'http://resource/id/';
      const label = 'test label';
      const config = { myCustomProp: 'some value' };

      expect(
        [
          serviceAnnounce(id, serviceId, resource, label),
          serviceActivate(id, config),
          serviceEnable(id),
          serviceDeactivate(id),
        ].reduce(reducer, DEFAULT_STATE)
      ).toMatchSnapshot();
    });

    it('should be able to handle multiple resources', () => {
      expect(
        [
          serviceAnnounce('1', 'service-1', 'resource-1', 'label 1'),
          serviceAnnounce('2', 'service-2', 'resource-2', 'label 2'),
          serviceAnnounce('3', 'service-3', 'resource-3', 'label 3'),
        ].reduce(reducer, DEFAULT_STATE)
      ).toMatchSnapshot();
    });

    it('should be able to handle multiple services on a resource', () => {
      expect(
        [
          serviceAnnounce('1', 'service-1', 'resource-1', 'label 1'),
          serviceAnnounce('2', 'service-2', 'resource-1', 'label 2'),
          serviceAnnounce('3', 'service-3', 'resource-1', 'label 3'),
        ].reduce(reducer, DEFAULT_STATE)
      ).toMatchSnapshot();
    });
  });
});
