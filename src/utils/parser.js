import {web3, starknet} from '../libs';

const {number, uint256} = starknet;
const {utils} = web3;

const TEN = 10;
const DEFAULT_DECIMALS = 18;
export const UNIT_MAP = {};

for (const key in utils.unitMap) {
  UNIT_MAP[utils.unitMap[key]] = key;
}

export const parseToDecimals = (value, decimals = DEFAULT_DECIMALS) => {
  return utils.toWei(value, UNIT_MAP[Math.pow(TEN, decimals)]);
};

export const parseFromDecimals = (value, decimals = DEFAULT_DECIMALS) => {
  return Number(utils.fromWei(value, UNIT_MAP[Math.pow(TEN, decimals)]));
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
