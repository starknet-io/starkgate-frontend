import utils from '../../utils';

const {formatBalance, shortenAddress} = utils.wallet;

describe('formatBalance', () => {
  it('should format balance to 5 digits precision', () => {
    expect(formatBalance(1.222243232)).toEqual(1.22224);
    expect(formatBalance(3000.232143123212)).toEqual(3000.23214);
    expect(formatBalance(10.000000001)).toEqual(10);
  });

  it('should return N/A for non-numbers', () => {
    expect(formatBalance('')).toBe('N/A');
    expect(formatBalance(null)).toBe('N/A');
    expect(formatBalance()).toBe('N/A');
  });
});

describe('shortenAddress', () => {
  it('should shorten long address', () => {
    expect(shortenAddress('0x9e2bd0a6b6b98f4586a867678f5ebd3dcfda02e7')).toEqual('0x9e2...2e7');
  });

  it('should return the same address for short address', () => {
    expect(shortenAddress('0x9ed0a')).toEqual('0x9ed0a');
  });

  it('should return empty string for bad input', () => {
    expect(shortenAddress('')).toBe('');
    expect(shortenAddress()).toBe('');
    expect(shortenAddress(null)).toBe('');
  });
});
