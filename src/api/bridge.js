import {parseFromDecimals, parseToDecimals, parseToFelt, parseToUint256} from '../utils';
import {sendTransaction as sendL1Transaction, callContract} from '../utils/ethereum';
import {sendTransaction as sendL2Transaction} from '../utils/starknet';

export const deposit = async ({recipient, amount, decimals, contract, options, emitter}) => {
  return sendL1Transaction(
    contract,
    'deposit',
    [parseToDecimals(amount, decimals), recipient],
    options,
    emitter
  );
};

export const depositEth = async ({recipient, amount, contract, options, emitter}) => {
  return sendL1Transaction(
    contract,
    'deposit',
    [recipient],
    {
      ...options,
      value: parseToDecimals(amount)
    },
    emitter
  );
};

export const withdraw = async ({recipient, amount, decimals, contract, emitter}) => {
  return sendL1Transaction(
    contract,
    'withdraw',
    [parseToDecimals(amount, decimals), recipient],
    {
      from: recipient
    },
    emitter
  );
};

export const maxDeposit = async ({decimals, contract}) => {
  try {
    const maxDeposit = await callContract(contract, 'maxDeposit');
    return parseFromDecimals(maxDeposit, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const maxTotalBalance = async ({decimals, contract}) => {
  try {
    const maxTotalBalance = await callContract(contract, 'maxTotalBalance');
    return parseFromDecimals(maxTotalBalance, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const initiateWithdraw = async ({recipient, amount, decimals, contract}) => {
  return sendL2Transaction(contract, 'initiate_withdraw', {
    l1Recipient: parseToFelt(recipient),
    amount: parseToUint256(amount, decimals)
  });
};
