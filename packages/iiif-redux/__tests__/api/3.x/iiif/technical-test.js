import {
  getId,
  getType,
  getFormat,
  getProfile,
  getHeight,
  getWidth,
  getDuration,
  getViewingDirection,
  getBehaviour,
  getTimeMode,
} from '../../../../src/api/3.x/iiif/technical';
import { createStructuredSelector } from 'reselect';

describe('api/3.x/iiif/technical', () => {
  test('id', () => {
    expect(getId({ id: 123 })).toEqual(123);
  });

  test('type', () => {
    expect(getType({ type: 'Canvas' })).toEqual('Canvas');
  });

  test('format', () => {
    expect(getFormat({ format: 'text/plain' })).toEqual('text/plain');
  });

  test('profile', () => {
    expect(getProfile({ profile: 'level1' })).toEqual('level1');
  });

  test('height', () => {
    expect(getHeight({ height: 1000 })).toEqual(1000);
  });

  test('width', () => {
    expect(getWidth({ width: 1200 })).toEqual(1200);
  });

  test('duration', () => {
    expect(getDuration({ duration: 123.59 })).toEqual(123.59);

    expect(getDuration({})).toEqual(0.0);

    expect(getDuration({ duration: '123.45' })).toEqual(123.45);

    expect(getDuration({ duration: 'not real' })).toEqual(0);
  });

  test('viewingDirection', () => {
    expect(getViewingDirection({ viewingDirection: 'left-to-right' })).toEqual(
      'left-to-right'
    );
  });

  test('behaviour', () => {
    expect(getBehaviour({ behaviour: ['paged'] })).toEqual(['paged']);
  });

  test('timeMode', () => {
    expect(getTimeMode({ timeMode: 'trim' })).toEqual('trim');
  });

  test('full document', () => {
    const document = {
      id: 'http://iiif.com/3/technical',
      type: 'Collection',
      format: 'application/json+ld',
      profile: 'level3',
      height: 2000,
      width: 3000,
      duration: 20.34,
      viewingDirection: 'top-to-bottom',
      behaviour: ['paged'],
      timeMode: 'trim',
    };

    const selector = createStructuredSelector({
      id: getId,
      type: getType,
      format: getFormat,
      profile: getProfile,
      height: getHeight,
      width: getWidth,
      duration: getDuration,
      viewingDirection: getViewingDirection,
      behaviour: getBehaviour,
      timeMode: getTimeMode,
    });

    expect(selector(document)).toEqual(document);
  });
});
