import {getStarknet} from '@argent/get-starknet';
import {compileCalldata, Contract, stark} from 'starknet';

import {TransactionConsumedStatuses} from '../enums';
import {web3} from '../web3';

export const eth_getContract = (address, ABI) => new web3.eth.Contract(ABI, address);

export const eth_callContract = async (contract, method, args = []) => {
  try {
    return await contract.methods?.[method](...args).call();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const eth_sendTransaction = async (contract, method, args = [], options = {}, emitter) => {
  try {
    const promise = contract.methods?.[method](...args).send(options);
    if (emitter) {
      return new Promise((resolve, reject) => {
        promise
          .on('transactionHash', hash => emitter?.transactionHash(hash))
          .on('confirmation', (confNumber, receipt) => emitter?.confirmation(confNumber, receipt))
          .on('receipt', receipt => resolve(receipt))
          .on('error', (error, receipt) => reject(error, receipt));
      });
    }
    return promise;
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const eth_listenOnce = async (contract, event, callback) => {
  contract.once(event, null, (error, event) => callback(error, event));
};

export const starknet_getContract = (address, ABI) =>
  new Contract(ABI, address, getStarknet().provider);

export const starknet_callContract = async (contract, method, args = []) => {
  try {
    return await contract.call(method, ...args);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const starknet_sendTransaction = async (contract, method, args = {}) => {
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

export const starknet_waitForTransaction = async (hash, customStatus, retryInterval = 5000) => {
  return new Promise(resolve => {
    let processing = false;
    const waitingForStatuses = customStatus ? [customStatus] : TransactionConsumedStatuses;
    console.log(`Waiting for transaction with statuses ${waitingForStatuses.join(' ')}`);
    const intervalId = setInterval(async () => {
      if (processing) return;
      console.log(`Checking transaction again`);
      const statusPromise = getStarknet().provider.getTransactionStatus(hash);
      processing = true;
      const {tx_status} = await statusPromise;
      console.log(`Transaction status is ${tx_status}`);
      if (waitingForStatuses.includes(tx_status)) {
        console.log(`We got our desired status!`);
        clearInterval(intervalId);
        resolve();
      } else {
        console.log(`We haven't got our desired status, trying again.`);
        processing = false;
      }
    }, retryInterval);
  });
};
