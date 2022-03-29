import utils from '../../utils';

const {get24Time, getDate, getMsFromHrs} = utils.date;

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

describe('getMsFromHrs', () => {
  it('should return the equivalent time from hours to milliseconds', () => {
    expect(getMsFromHrs(1)).toEqual(3600000);
    expect(getMsFromHrs('24')).toEqual(86400000);
    expect(getMsFromHrs('0')).toEqual(0);
  });

  it('should return undefined if parseFloat got NaN', () => {
    expect(getMsFromHrs('something')).toEqual(undefined);
    expect(getMsFromHrs(undefined)).toEqual(undefined);
  });
});
