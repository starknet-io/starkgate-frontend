import {Struct, number, uint256} from 'starknet';

import {fromWeiByDecimals, toWeiByDecimals} from '@normalizex/ethjs-unit';

const DEFAULT_DECIMALS = 18;

type BigNumberish = string | number;

type Uint256 = {
  low: BigNumberish;
  high: BigNumberish;
};

export const parseToDecimals = (
  value: BigNumberish,
  decimals: number = DEFAULT_DECIMALS
): string => {
  return toWeiByDecimals(value, decimals);
};

export const parseFromDecimals = (
  value: BigNumberish,
  decimals: number = DEFAULT_DECIMALS
): string => {
  return fromWeiByDecimals(value, decimals);
};

export const parseFromFelt = (value: BigNumberish): number => {
  return number.toBN(value).toNumber();
};

export const parseToFelt = (value: BigNumberish): string => {
  return number.toBN(value).toString();
};

export const parseToUint256 = (
  value: BigNumberish,
  decimals: number = DEFAULT_DECIMALS
): Struct => {
  const decimalsValue = parseToDecimals(value, decimals);
  const uint256Value = uint256.bnToUint256(number.toBN(decimalsValue));
  return {
    type: 'struct',
    ...uint256Value
  };
};

export const parseFromUint256 = (value: Uint256, decimals: number = DEFAULT_DECIMALS): string => {
  const bnString = uint256.uint256ToBN(value).toString();
  return parseFromDecimals(bnString, decimals);
};
