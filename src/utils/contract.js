import {getStarknet} from '@argent/get-starknet';
import {compileCalldata, Contract, stark} from 'starknet';

import {web3} from '../web3';

export const eth_getContract = (address, ABI) => new web3.eth.Contract(ABI, address);

export const eth_callContract = async (contract, method, args = []) => {
  try {
    return await contract.methods?.[method](...args).call();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const eth_sendTransaction = async (contract, method, args = [], options = {}) => {
  try {
    return contract.methods?.[method](...args).send(options);
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
    return await getStarknet().signer.invokeFunction(
      contract.connectedTo,
      methodSelector,
      compiledCalldata
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const starknet_waitForTransaction = async hash =>
  await getStarknet().provider.waitForTx(hash);
