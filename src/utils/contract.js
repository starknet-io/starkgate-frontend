import {getStarknet} from '@argent/get-starknet';
import {compileCalldata, Contract, stark} from 'starknet';

import {web3} from '../web3';

export const getContract = (address, ABI) => new web3.eth.Contract(ABI, address);

export const callContract = async (contract, method, args = []) => {
  try {
    return await contract.methods?.[method](...args).call();
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const sendTransaction = async (contract, method, args = [], options = {}) => {
  try {
    return contract.methods?.[method](...args).send(options);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const listen = async (contract, event, callback) => {
  try {
    contract.events?.[event]({}, (error, event) => callback(error, event));
  } catch (ex) {
    callback(ex);
  }
};

export const listenOnce = async (contract, event, callback) => {
  contract.once(event, null, (error, event) => callback(error, event));
};

export const getStarknetContract = (address, ABI) =>
  new Contract(ABI, address, getStarknet().provider);

export const callStarknetContract = async (contract, method, args = []) => {
  try {
    return await contract.call(method, ...args);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const invokeStarknetTransaction = async (contract, method, args = {}) => {
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

export const waitForStarknetTransaction = async hash =>
  await getStarknet().provider.waitForTx(hash);
