import {byChainId, isRejected, TransactionStatusStep} from '../../enums';
import {getStarknet, starknet} from '../../libs';

const {compileCalldata, Contract, defaultProvider, stark, hash, number} = starknet;

export const createContract = (address, ABI) => {
  return new Contract(ABI, address);
};

export const callContract = async (contract, method, args = [], blockIdentifier = null) => {
  try {
    return await contract.call(method, ...args, blockIdentifier);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const sendTransaction = async (contract, method, args = {}) => {
  try {
    const methodSelector = stark.getSelectorFromName(method);
    const compiledCalldata = compileCalldata(args);
    return getStarknet().signer.invokeFunction(
      contract.connectedTo,
      methodSelector,
      compiledCalldata
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const waitForTransaction = async (transactionHash, requiredStatus, retryInterval = 5000) => {
  return new Promise((resolve, reject) => {
    let processing = false;
    const intervalId = setInterval(async () => {
      if (processing) return;
      const statusPromise = defaultProvider.getTransactionStatus(transactionHash);
      processing = true;
      try {
        const {tx_status} = await statusPromise;
        if (
          tx_status === requiredStatus ||
          (TransactionStatusStep[tx_status] > TransactionStatusStep[requiredStatus] &&
            !isRejected(tx_status))
        ) {
          clearInterval(intervalId);
          resolve(tx_status);
        } else if (isRejected(tx_status)) {
          clearInterval(intervalId);
          reject();
        } else {
          processing = false;
        }
      } catch (ex) {
        processing = false;
      }
    }, retryInterval);
  });
};

export const getTransactionHash = (
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
    0, // version
    toAddress,
    selector,
    calldataHash,
    0, // max_fee
    l2IdPrefix,
    ...additionalData
  ]);
};

export const hashEquals = (...data) => {
  return !!data.reduce((d1, d2) =>
    starknet.hash.computeHashOnElements(d1) === starknet.hash.computeHashOnElements(d2) ? d1 : ''
  );
};
