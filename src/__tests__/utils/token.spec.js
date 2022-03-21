import utils from '../../utils';

const {isEth} = utils.token;

describe('isEth', () => {
  it('should return true for eth symbol as string', () => {
    expect(isEth('ETH')).toBeTruthy();
  });

  it('should return true for eth token as object', () => {
    expect(isEth({symbol: 'ETH'})).toBeTruthy();
  });

  it('should return false for non-eth symbol as string', () => {
    expect(isEth('DAI')).toBeFalsy();
  });

  it('should return false for non-eth token as object', () => {
    expect(isEth({symbol: 'DAI'})).toBeFalsy();
  });
});
