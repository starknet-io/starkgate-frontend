import {ChainInfo, isRejected, TransactionStatusStep} from '../enums';
import {getStarknet, starknet} from '../libs';
import {promiseHandler} from './index';

const {Contract, stark, hash, number} = starknet;

export const createL2Contract = (address, ABI) => {
  return new Contract(ABI, address, getStarknet().provider);
};

export const callL2Contract = async (contract, method, ...args) => {
  const [response, error] = await promiseHandler(contract.call(method, args));
  if (error) {
    return Promise.reject(error);
  }
  return response;
};

export const sendL2Transaction = async (contract, method, args = {}) => {
  const calldata = stark.compileCalldata(args);
  const transaction = {
    contractAddress: contract.address,
    entrypoint: method,
    calldata
  };
  const [response, error] = await promiseHandler(getStarknet().account.execute(transaction));
  if (error) {
    return Promise.reject(error);
  }
  return response;
};

export const waitForTransaction = async (transactionHash, requiredStatus, retryInterval = 5000) => {
  return new Promise((resolve, reject) => {
    let processing = false;
    const intervalId = setInterval(async () => {
      if (processing) return;
      processing = true;
      const [{tx_status}, error] = await promiseHandler(
        getStarknet().provider.getTransactionStatus(transactionHash)
      );
      if (error) {
        processing = false;
        return;
      }
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
