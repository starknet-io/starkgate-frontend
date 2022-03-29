import utils from '../../utils';

const {get24Time, getDate, getMsFromHs} = utils.date;

describe('getDate', () => {
  it('should return date of the form DD/MM/YYYY from timestamp', () => {
    expect(getDate(1644828892412)).toEqual('14/02/2022');
  });
});

describe('get24Time', () => {
  it('should return 24 time of the form HH:MM:SS from timestamp', () => {
    expect(get24Time(1644828892412).endsWith(':54:52')).toBeTruthy();
  });
});

describe('getMsFromHs', () => {
  it('should return the equivalant time from hours to milliseconds', () => {
    expect(getMsFromHs(1)).toEqual(3600000);
    expect(getMsFromHs('24')).toEqual(86400000);
  });
  it('should return 0 if parseFloat got NaN', () => {
    expect(getMsFromHs('something')).toEqual(undefined);
    expect(getMsFromHs(undefined)).toEqual(undefined);
    expect(getMsFromHs('0')).toEqual(0);
  });
});
