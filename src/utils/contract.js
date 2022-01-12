import {getStarknet} from '@argent/get-starknet';
import {compileCalldata, Contract, stark} from 'starknet';

import {TransactionConsumedStatuses} from '../enums';
import {getLogger} from '../services';
import {web3} from '../web3';

export const l1_getContract = (address, ABI) => new web3.eth.Contract(ABI, address);

export const l1_callContract = async (contract, method, args = []) => {
  try {
    return await contract.methods?.[method](...args).call();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const l1_sendTransaction = async (
  contract,
  method,
  args = [],
  options = {},
  cb = () => {}
) => {
  try {
    return contract.methods?.[method](...args).send(options, cb);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const l2_getContract = (address, ABI) => new Contract(ABI, address, getStarknet().provider);

export const l2_callContract = async (contract, method, args = []) => {
  try {
    return await contract.call(method, ...args);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const l2_sendTransaction = async (contract, method, args = {}) => {
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

export const l2_waitForTransaction = async (hash, customStatus, retryInterval = 5000) => {
  const logger = getLogger('l2_waitForTransaction');
  return new Promise(resolve => {
    let processing = false;
    const waitingForStatuses = customStatus ? [customStatus] : TransactionConsumedStatuses;
    logger.debug(`Waiting for transaction with statuses ${waitingForStatuses.join(' ')}`);
    const intervalId = setInterval(async () => {
      if (processing) return;
      logger.debug(`Checking transaction again`);
      const statusPromise = getStarknet().provider.getTransactionStatus(hash);
      processing = true;
      const {tx_status} = await statusPromise;
      logger.debug(`Transaction status is ${tx_status}`);
      if (waitingForStatuses.includes(tx_status)) {
        logger.debug(`We got our desired status!`);
        clearInterval(intervalId);
        resolve();
      } else {
        logger.debug(`We haven't got our desired status, trying again.`);
        processing = false;
      }
    }, retryInterval);
  });
};
