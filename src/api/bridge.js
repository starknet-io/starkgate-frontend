import {
  sendL1Transaction,
  callL1Contract,
  sendL2Transaction,
  parseFromDecimals,
  parseToDecimals,
  parseToFelt,
  parseToUint256,
  isDai,
  promiseHandler
} from '../utils';

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
  const [maxDeposit, error] = await promiseHandler(callL1Contract(contract, 'maxDeposit'));
  if (error) {
    return Promise.reject(error);
  }
  return parseFromDecimals(maxDeposit, decimals);
};

export const maxTotalBalance = async ({decimals, symbol, contract}) => {
  const [maxTotalBalance, error] = await promiseHandler(
    callL1Contract(contract, isDai(symbol) ? 'ceiling' : 'maxTotalBalance')
  );
  if (error) {
    return Promise.reject(error);
  }
  return parseFromDecimals(maxTotalBalance, decimals);
};

export const initiateWithdraw = async ({recipient, amount, decimals, contract}) => {
  return sendL2Transaction(contract, 'initiate_withdraw', {
    l1Recipient: parseToFelt(recipient),
    amount: parseToUint256(amount, decimals)
  });
};
