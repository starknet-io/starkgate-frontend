import {formatBalance, shortenAddress, shortenBalance} from '../../web3-utils/src';

describe('formatBalance', () => {
  it('should format balance as string', () => {
    expect(formatBalance('1.222243232')).toEqual('1.222243232');
    expect(formatBalance('3000.232143123212')).toEqual('3000.232143123212');
    expect(formatBalance('10.000000001')).toEqual('10.000000001');
  });

  it('should return N/A for non-numbers', () => {
    expect(formatBalance('')).toBe('N/A');
    expect(formatBalance(null)).toBe('N/A');
  });
});

describe('shortenAddress', () => {
  it('should shorten long address', () => {
    expect(shortenAddress('0x9e2bd0a6b6b98f4586a867678f5ebd3dcfda02e7')).toEqual('0x9e2...2e7');
  });

  it('should shorten long address according the head and tail params', () => {
    expect(shortenAddress('0x9e2bd0a6b6b98f4586a867678f5ebd3dcfda02e7', 10, 8)).toEqual(
      '0x9e2bd0a6...cfda02e7'
    );
  });

  it('should return the same address for short address', () => {
    expect(shortenAddress('0x9ed0a')).toEqual('0x9ed0a');
    expect(shortenAddress('')).toBe('');
  });
});

describe('shortenBalance', () => {
  it('should shorten long balance', () => {
    expect(shortenBalance('0.00000001')).toEqual('0.00000...');
    expect(shortenBalance('0.1234567')).toEqual('0.12345...');
  });

  it('should return the same balance for short balance', () => {
    expect(shortenBalance('0.00001')).toEqual('0.00001');
    expect(shortenBalance('0.123')).toEqual('0.123');
  });
});
