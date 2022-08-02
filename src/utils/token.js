import {getStarknet} from '@starkware-industries/starkware-commons-js-libs';

import Tokens from '../config/tokens';

export const isEth = symbol => {
  return symbol === Tokens.L1.ETH.symbol;
};

export const isDai = symbol => {
  return symbol === Tokens.L1.DAI.symbol;
};

export const addToken = async address => {
  await getStarknet().request({
    type: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address
      }
    }
  });
};
