import {getStarknet} from '@argent/get-starknet';
import * as starknetJS from 'starknet';

import {getLogger} from '../services';

const {compileCalldata, Contract, defaultProvider, stark} = starknetJS;

const starknet = {
  createContract: (address, ABI) => {
    return new Contract(ABI, address);
  },
  callContract: async (contract, method, args = [], blockIdentifier = null) => {
    try {
      return await contract.call(method, ...args, blockIdentifier);
    } catch (ex) {
      return Promise.reject(ex);
    }
  },
  sendTransaction: async (contract, method, args = {}) => {
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
  },
  waitForTransaction: async (hash, customStatus, retryInterval = 5000) => {
    const logger = getLogger('l2_waitForTransaction');
    return new Promise(resolve => {
      let processing = false;
      const waitingForStatuses = customStatus ? [customStatus] : TransactionConsumedStatuses;
      logger.debug(`Waiting for transaction with statuses ${waitingForStatuses.join(' ')}`);
      const intervalId = setInterval(async () => {
        if (processing) return;
        logger.debug(`Checking transaction again`);
        const statusPromise = defaultProvider.getTransactionStatus(hash);
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
  },
  ...starknetJS
};

export {starknet, getStarknet};
