import {Tokens} from '@starkgate/shared';

export const isEth = symbol => {
  return symbol === Tokens.L1.ETH.symbol;
};

export const isDai = symbol => {
  return symbol === Tokens.L1.DAI.symbol;
};
