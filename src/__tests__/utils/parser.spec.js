import {
  parseFromDecimals,
  parseFromFelt,
  parseFromUint256,
  parseToDecimals,
  parseToUint256,
  UNIT_MAP
} from '../../utils';

describe('parseToDecimals', () => {
  it('should parse to decimals', () => {
    expect(parseToDecimals('1')).toEqual('1000000000000000000');
    expect(parseToDecimals('1', 3)).toEqual('1000');
    expect(parseToDecimals('1', 6)).toEqual('1000000');
    expect(parseToDecimals('1', 8)).toEqual('100000000');
    expect(parseToDecimals('1', 9)).toEqual('1000000000');
    expect(parseToDecimals('1', 12)).toEqual('1000000000000');
    expect(parseToDecimals('1', 15)).toEqual('1000000000000000');
    expect(parseToDecimals('1', 18)).toEqual('1000000000000000000');
  });
});

describe('parseFromDecimals', () => {
  it('should parse from decimals', () => {
    expect(parseFromDecimals('1000000000000000000')).toEqual(1);
    expect(parseFromDecimals('1000000000000000000', 3)).toEqual(1000000000000000);
    expect(parseFromDecimals('1000000000000000000', 6)).toEqual(1000000000000);
    expect(parseFromDecimals('1000000000000000000', 8)).toEqual(10000000000);
    expect(parseFromDecimals('1000000000000000000', 9)).toEqual(1000000000);
    expect(parseFromDecimals('1000000000000000000', 12)).toEqual(1000000);
    expect(parseFromDecimals('1000000000000000000', 15)).toEqual(1000);
    expect(parseFromDecimals('1000000000000000000', 18)).toEqual(1);
  });
});

describe('parseFromFelt', () => {
  it('should parse from felt', () => {
    expect(parseFromFelt('0x1')).toEqual(1);
    expect(parseFromFelt('0x10')).toEqual(16);
    expect(parseFromFelt('0x100')).toEqual(256);
  });
});

describe('parseToUint256', () => {
  it('should parse to uint256', () => {
    expect(parseToUint256('100')).toEqual({
      high: '0x0',
      low: '0x56bc75e2d63100000',
      type: 'struct'
    });
    expect(parseToUint256('10000')).toEqual({
      high: '0x0',
      low: '0x21e19e0c9bab2400000',
      type: 'struct'
    });
    expect(parseToUint256('10000000')).toEqual({
      high: '0x0',
      low: '0x84595161401484a000000',
      type: 'struct'
    });
  });
});

describe('parseFromUint256', () => {
  it('should parse from uint256', () => {
    expect(parseFromUint256({high: '0x0', low: '0x56bc75e2d63100000', type: 'struct'})).toEqual(
      100
    );
    expect(parseFromUint256({high: '0x0', low: '0x21e19e0c9bab2400000', type: 'struct'})).toEqual(
      10000
    );
    expect(
      parseFromUint256({high: '0x0', low: '0x84595161401484a000000', type: 'struct'})
    ).toEqual(10000000);
  });
});
