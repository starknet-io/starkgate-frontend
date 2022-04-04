import utils from '../../utils';

const {get24Time, getDate} = utils.date;

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
