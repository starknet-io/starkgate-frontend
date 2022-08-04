import {fromWeiByDecimals, toWeiByDecimals} from '@normalizex/ethjs-unit';
import {starknet} from '@starkware-industries/commons-js-libs';

const {number, uint256} = starknet;

const DEFAULT_DECIMALS = 18;

export const parseToDecimals = (value, decimals = DEFAULT_DECIMALS) => {
  return toWeiByDecimals(value, decimals);
};

export const parseFromDecimals = (value, decimals = DEFAULT_DECIMALS) => {
  return fromWeiByDecimals(value, decimals);
};

export const parseFromFelt = value => {
  return number.toBN(value).toNumber();
};

export const parseToFelt = value => {
  return number.toBN(value).toString();
};

export const parseToUint256 = (value, decimals = DEFAULT_DECIMALS) => {
  const decimalsValue = parseToDecimals(value, decimals);
  const uint256Value = uint256.bnToUint256(number.toBN(decimalsValue));
  return {
    type: 'struct',
    ...uint256Value
  };
};

export const parseFromUint256 = (value, decimals = DEFAULT_DECIMALS) => {
  const bnString = uint256.uint256ToBN(value).toString();
  return parseFromDecimals(bnString, decimals);
};
