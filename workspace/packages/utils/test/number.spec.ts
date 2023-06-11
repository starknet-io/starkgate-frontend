import {afterDecimal, isNegative, isZero} from '../src';

describe('afterDecimal', () => {
  it('should return number of decimals places', () => {
    expect(afterDecimal('')).toEqual(0);
    expect(afterDecimal('0')).toEqual(0);
    expect(afterDecimal('0.1')).toEqual(1);
    expect(afterDecimal('0.00000001')).toEqual(8);
  });
});

describe('isZero', () => {
  it('should return true for zero numbers', () => {
    expect(isZero(0.0)).toBeTruthy();
    expect(isZero(-0.0)).toBeTruthy();
    expect(isZero(0)).toBeTruthy();
    expect(isZero(0.1)).toBeFalsy();
    expect(isZero(0.000001)).toBeFalsy();
  });
});

describe('isNegative', () => {
  it('should return true for negative numbers', () => {
    expect(isNegative(0)).toBeFalsy();
    expect(isNegative(-1)).toBeTruthy();
    expect(isNegative(-0.1)).toBeTruthy();
  });
});
