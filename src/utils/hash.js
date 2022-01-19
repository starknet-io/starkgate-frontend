import {hash, number} from 'starknet';

import {byChainId} from '../enums';

export const txHash = (
  txHashPrefix,
  fromAddress,
  toAddress,
  selector,
  payload,
  chainId,
  ...additionalData
) => {
  const calldata = [number.hexToDecimalString(fromAddress), ...payload];
  const calldataHash = hash.hashCalldata(calldata);
  const {l2IdPrefix} = byChainId(chainId);
  return hash.computeHashOnElements([
    txHashPrefix,
    toAddress,
    selector,
    calldataHash,
    l2IdPrefix,
    ...additionalData
  ]);
};

export const hashEquals = (data1, data2) => {
  return hash.computeHashOnElements(data1) === hash.computeHashOnElements(data2);
};
