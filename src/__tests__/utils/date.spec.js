import {get24Time, getDate} from '../../utils';

describe('getDate', () => {
  it('should get date', () => {
    expect(getDate(1644828892412)).toEqual('14/02/2022');
  });
});

describe('get24Time', () => {
  it('should get 24 time', () => {
    expect(get24Time(1644828892412)).toEqual('10:54:52');
  });
});
