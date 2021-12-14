import {sendTransaction} from '../utils/contract';

export const deposit = async (contract, fromAddress, toAddress, amount) => {
  try {
    return await sendTransaction(contract, 'deposit', [amount, toAddress], fromAddress);
  } catch (ex) {
    return Promise.reject(ex);
  }
};
