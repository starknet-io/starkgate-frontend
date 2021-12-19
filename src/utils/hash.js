import {hash, number} from 'starknet';

import {STARKNET_INVOKE_TX_PREFIX} from '../constants';
import {byChainId} from '../enums';

export const txHash = (fromAddress, toAddress, selector, payload, chainId) => {
  const calldata = [number.hexToDecimalString(fromAddress), ...payload];
  const calldataHash = hash.hashCalldata(calldata);
  const {starknetIdPrefix} = byChainId(chainId);
  return hash.computeHashOnElements([
    STARKNET_INVOKE_TX_PREFIX,
    toAddress,
    selector,
    calldataHash,
    starknetIdPrefix
  ]);
};

export const hashEquals = (data1, data2) =>
  hash.computeHashOnElements(data1) === hash.computeHashOnElements(data2);
