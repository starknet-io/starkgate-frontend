import {byChainId} from '../enums';
import {starknet} from '../libs';

export const txHash = (
  txHashPrefix,
  fromAddress,
  toAddress,
  selector,
  payload,
  chainId,
  ...additionalData
) => {
  const calldata = [starknet.number.hexToDecimalString(fromAddress), ...payload];
  const calldataHash = starknet.hash.hashCalldata(calldata);
  const {l2IdPrefix} = byChainId(chainId);
  return starknet.hash.computeHashOnElements([
    txHashPrefix,
    toAddress,
    selector,
    calldataHash,
    l2IdPrefix,
    ...additionalData
  ]);
};

export const hashEquals = (...data) => {
  return !!data.reduce((d1, d2) =>
    starknet.hash.computeHashOnElements(d1) === starknet.hash.computeHashOnElements(d2) ? d1 : ''
  );
};
