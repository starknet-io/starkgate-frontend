import {ChainInfo, isRejected, TransactionStatusStep} from '../../enums';
import {getStarknet, starknet} from '../../libs';

const {Contract, stark, hash, number} = starknet;

export const createContract = (address, ABI) => {
  return new Contract(ABI, address, getStarknet().provider);
};

export const callContract = async (contract, method, ...args) => {
  try {
    return await contract.call(method, args);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const sendTransaction = async (contract, method, args = {}) => {
  try {
    const calldata = stark.compileCalldata(args);
    const transaction = {
      contractAddress: contract.address,
      entrypoint: method,
      calldata
    };
    return await getStarknet().account.execute(transaction);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const waitForTransaction = async (transactionHash, requiredStatus, retryInterval = 5000) => {
  return new Promise((resolve, reject) => {
    let processing = false;
    const intervalId = setInterval(async () => {
      if (processing) return;
      const statusPromise = getStarknet().provider.getTransactionStatus(transactionHash);
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
  const calldataHash = hash.computeHashOnElements(calldata);
  return hash.computeHashOnElements([
    txHashPrefix,
    0, // version
    toAddress,
    selector,
    calldataHash,
    0, // max_fee
    ChainInfo.L2[chainId].ID_PREFIX,
    ...additionalData
  ]);
};

export const hashEquals = (...data) => {
  return !!data.reduce((d1, d2) => {
    return starknet.hash.computeHashOnElements(d1) === starknet.hash.computeHashOnElements(d2)
      ? d1
      : '';
  });
};
