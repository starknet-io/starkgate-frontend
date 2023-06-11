import {isDai, isEth} from '@utils';

describe('isEth', () => {
  it('should return true for eth symbol', () => {
    expect(isEth('ETH')).toBeTruthy();
  });

  it('should return false for non-eth symbol', () => {
    expect(isEth('DAI')).toBeFalsy();
  });
});

describe('isDai', () => {
  it('should return true for dai symbol', () => {
    expect(isDai('DAI')).toBeTruthy();
  });

  it('should return false for non-dai symbol', () => {
    expect(isDai('ETH')).toBeFalsy();
  });
});
