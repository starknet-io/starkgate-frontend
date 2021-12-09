import {getStarknet} from '@argent/get-starknet';
import {Contract} from 'starknet';

import {web3} from '../web3';

export const getContract = (address, ABI) => new web3.eth.Contract(ABI, address);

export const callContract = async (contract, method, args, isStarknet) => {
  try {
    return await contract.methods?.[method](...args).call();
  } catch (ex) {
    return ex;
  }
};

export const getStarknetContract = (address, ABI) =>
  new Contract(ABI, address, getStarknet().provider);

export const callStarknetContract = async (contract, method, args) => {
  try {
    return await contract.call(method, ...args);
  } catch (ex) {
    return ex;
  }
};
