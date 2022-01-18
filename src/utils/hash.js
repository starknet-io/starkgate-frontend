import {hash, number} from 'starknet';

import {L2_INVOKE_TX_PREFIX} from '../constants';
import {byChainId} from '../enums';

export const txHash = (fromAddress, toAddress, selector, payload, chainId, ...additionalData) => {
  const calldata = [number.hexToDecimalString(fromAddress), ...payload];
  const calldataHash = hash.hashCalldata(calldata);
  const {l2IdPrefix} = byChainId(chainId);
  return hash.computeHashOnElements([
    L2_INVOKE_TX_PREFIX,
    toAddress,
    selector,
    calldataHash,
    l2IdPrefix,
    ...additionalData
  ]);
};

export const hashEquals = (data1, data2) =>
  hash.computeHashOnElements(data1) === hash.computeHashOnElements(data2);

export const b64e = str =>
  window.btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode('0x' + p1)
    )
  );

export const b64d = str =>
  decodeURIComponent(
    Array.prototype.map.call(window.atob(str), c => '%' + c.charCodeAt(0).toString(16)).join('')
  );
