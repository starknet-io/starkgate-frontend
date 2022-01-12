import {parseToDecimals, parseToFelt, parseToUint256} from '../utils';
import {l1_sendTransaction, l2_sendTransaction} from '../utils/contract';

export const deposit = async ({recipient, amount, decimals, contract, options, emitter}) => {
  try {
    return l1_sendTransaction(
      contract,
      'deposit',
      [parseToDecimals(amount, decimals), recipient],
      options,
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const depositEth = async ({recipient, amount, contract, options, emitter}) => {
  try {
    return l1_sendTransaction(
      contract,
      'deposit',
      [recipient],
      {
        ...options,
        value: parseToDecimals(amount)
      },
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const withdraw = async ({recipient, amount, decimals, contract, emitter}) => {
  try {
    return l1_sendTransaction(
      contract,
      'withdraw',
      [parseToDecimals(amount, decimals), recipient],
      {
        from: recipient
      },
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const maxDeposit = async ({decimals, contract}) => {
  try {
    const maxDeposit = await l1_callContract(contract, 'maxDeposit');
    return parseFromDecimals(maxDeposit, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const initiateWithdraw = async ({recipient, amount, decimals, contract}) => {
  try {
    return l2_sendTransaction(contract, 'initiate_withdraw', {
      l1Recipient: parseToFelt(recipient),
      amount: parseToUint256(amount, decimals)
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};
