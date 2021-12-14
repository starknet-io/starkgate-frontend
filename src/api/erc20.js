import {callContract, sendTransaction} from '../utils/contract';

export const approve = async (contract, toAddress, fromAddress, amount) => {
  try {
    return await sendTransaction(contract, 'approve', [toAddress, amount], fromAddress);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const balanceOf = async (contract, address) => {
  try {
    return await callContract(contract, 'balanceOf', [], address);
  } catch (ex) {
    return Promise.reject(ex);
  }
};
