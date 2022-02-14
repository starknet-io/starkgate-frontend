import {isEth} from '../../utils';

describe('isEth', () => {
  it('should return true for eth symbol as string', () => {
    expect(isEth('ETH')).toEqual(true);
  });
  it('should return true for eth token as object', () => {
    expect(isEth({symbol: 'ETH'})).toEqual(true);
  });
  it('should return false for non-eth symbol as string', () => {
    expect(isEth('DAI')).toEqual(false);
  });
  it('should return false for non-eth token as object', () => {
    expect(isEth({symbol: 'DAI'})).toEqual(false);
  });
});
