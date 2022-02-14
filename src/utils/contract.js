import {TransactionConsumedStatuses} from '../enums';
import {getStarknet, starknet, web3} from '../libs';
import {getLogger} from '../services';

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

export const l2_getContract = (address, ABI) => new starknet.Contract(ABI, address);

export const l2_callContract = async (contract, method, args = [], blockIdentifier = null) => {
  try {
    return await contract.call(method, ...args, blockIdentifier);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const l2_sendTransaction = async (contract, method, args = {}) => {
  try {
    const methodSelector = starknet.stark.getSelectorFromName(method);
    const compiledCalldata = starknet.compileCalldata(args);
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
      const statusPromise = starknet.defaultProvider.getTransactionStatus(hash);
      processing = true;
      try {
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
      } catch (ex) {
        logger.error(`Error while calling get status: ${ex.message}, trying again.`);
        processing = false;
      }
    }, retryInterval);
  });
};
