import {hash, number} from 'starknet';

import {L2_INVOKE_TX_PREFIX} from '../constants';
import {byChainId} from '../enums';

export const txHash = (fromAddress, toAddress, selector, payload, chainId) => {
  const calldata = [number.hexToDecimalString(fromAddress), ...payload];
  const calldataHash = hash.hashCalldata(calldata);
  const {l2IdPrefix} = byChainId(chainId);
  return hash.computeHashOnElements([
    L2_INVOKE_TX_PREFIX,
    toAddress,
    selector,
    calldataHash,
    l2IdPrefix
  ]);
};

export const hashEquals = (data1, data2) => {
 return hash.computeHashOnElements(data1) === hash.computeHashOnElements(data2);
}
