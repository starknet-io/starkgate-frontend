import {getStarknet} from '@argent/get-starknet';
import {Contract} from 'starknet';

import {web3} from '../web3';

export const getContract = (address, ABI) => new web3.eth.Contract(ABI, address);

export const callContract = async (contract, method, args = []) => {
  try {
    return await contract.methods?.[method](...args).call();
  } catch (ex) {
    return ex;
  }
};

export const sendTransaction = async (contract, method, args = [], options = {}) => {
  try {
    return contract.methods?.[method](...args).send(options);
  } catch (ex) {
    return ex;
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
    return ex;
  }
};
