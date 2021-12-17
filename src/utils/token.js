import {NetworkType} from '../enums';

export const isEth = tokenData => {
  let symbol = '';
  if (typeof tokenData === 'object') {
    symbol = tokenData.symbol;
  } else if (typeof tokenData === 'string') {
    symbol = tokenData;
  }
  return symbol === NetworkType.ETHEREUM.symbol;
};
