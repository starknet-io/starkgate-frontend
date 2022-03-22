import utils from '../../utils';

const {get24Time, getDate} = utils.date;

describe('getDate', () => {
  it('should get date', () => {
    expect(getDate(1644828892412)).toEqual('14/02/2022');
  });
});

describe('get24Time', () => {
  it('should get 24 time', () => {
    expect(get24Time(1644828892412).endsWith(':54:52')).toBeTruthy();
  });
});
