import {web3, starknet} from '../libs';

const TEN = 10;
const DEFAULT_DECIMALS = 18;
const UNIT_MAP = {};

for (let key in web3.utils.unitMap) {
  UNIT_MAP[web3.utils.unitMap[key]] = key;
}

export const parseToDecimals = (value, decimals = DEFAULT_DECIMALS) => {
  return web3.utils.toWei(value, UNIT_MAP[Math.pow(TEN, decimals)]);
};

export const parseFromDecimals = (value, decimals = DEFAULT_DECIMALS) => {
  return Number(web3.utils.fromWei(value, UNIT_MAP[Math.pow(TEN, decimals)]));
};

export const parseFromFelt = value => {
  return starknet.number.toBN(value).toNumber();
};

export const parseToFelt = value => {
  return starknet.number.toBN(value).toString();
};

export const parseToUint256 = (value, decimals = DEFAULT_DECIMALS) => {
  const decimalsValue = parseToDecimals(value, decimals);
  const uint256 = starknet.uint256.bnToUint256(toBN(decimalsValue));
  return {
    type: 'struct',
    ...uint256
  };
};

export const parseFromUint256 = (value, decimals = DEFAULT_DECIMALS) => {
  const bnString = starknet.uint256.uint256ToBN(value).toString();
  return parseFromDecimals(bnString, decimals);
};
