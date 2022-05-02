import {NetworkType} from '../enums';
import {getStarknet} from '../libs';

export const isEth = tokenData => {
  let symbol = '';
  if (typeof tokenData === 'object') {
    /* eslint-disable-next-line prefer-destructuring */
    symbol = tokenData.symbol;
  } else if (typeof tokenData === 'string') {
    symbol = tokenData;
  }
  return symbol === NetworkType.L1.symbol;
};

export const addToken = async address => {
  try {
    await getStarknet().request({
      type: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address
        }
      }
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};
