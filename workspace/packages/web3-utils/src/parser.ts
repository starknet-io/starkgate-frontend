import {BigNumberish, Uint256, num, uint256} from 'starknet';
import {toHex as _toHex, padLeft} from 'web3-utils';
import {isHex as _isHex} from 'web3-validator';

import {fromWeiByDecimals, toWeiByDecimals} from '@normalizex/ethjs-unit';

const DEFAULT_DECIMALS = 18;

export const parseToDecimals = (
  value: BigNumberish,
  decimals: number = DEFAULT_DECIMALS
): string => {
  return toWeiByDecimals(value.toString(), decimals);
};

export const parseFromDecimals = (
  value: BigNumberish,
  decimals: number = DEFAULT_DECIMALS
): string => {
  return fromWeiByDecimals(value.toString(), decimals);
};

export const parseFromFelt = (value: BigNumberish): bigint => {
  return num.toBigInt(value);
};

export const parseToFelt = (value: BigNumberish): string => {
  return num.toBigInt(value).toString();
};

export const parseToUint256 = (
  value: BigNumberish,
  decimals: number = DEFAULT_DECIMALS
): Uint256 => {
  const decimalsValue = parseToDecimals(value, decimals);
  return uint256.bnToUint256(num.toBigInt(decimalsValue));
};

export const parseFromUint256 = (value: Uint256, decimals: number = DEFAULT_DECIMALS): string => {
  const bnString = uint256.uint256ToBN(value).toString();
  return parseFromDecimals(bnString, decimals);
};

export const toHexLength = (value: BigNumberish, length = 16) => {
  if (_isHex(value)) {
    return padLeft(_toHex(value), length);
  }
};

export const isHex = (value: BigNumberish) => {
  if (_isHex(value)) {
    return value;
  }
};

export const toHex256 = (value: BigNumberish) => {
  return toHexLength(value, 64);
};

export const toHex128 = (value: BigNumberish) => {
  return toHexLength(value, 32);
};
