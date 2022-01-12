import {NetworkType} from '../enums';

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
