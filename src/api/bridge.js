import {
  sendL1Transaction,
  callL1Contract,
  sendL2Transaction,
  parseFromDecimals,
  parseToDecimals,
  parseToFelt,
  parseToUint256
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

export const finalizeRegisterWormhole = async ({
  sourceDomain,
  targetDomain,
  receiver,
  operator,
  amount,
  decimals,
  nonce,
  timestamp,
  contract,
  options,
  emitter
}) => {
  return sendL1Transaction(
    contract,
    'finalizeRegisterWormhole',
    [
      sourceDomain,
      targetDomain,
      receiver,
      operator,
      parseToDecimals(amount, decimals),
      nonce,
      timestamp
    ],
    options,
    emitter
  );
};

export const requestMint = async ({
  sourceDomain,
  targetDomain,
  receiver,
  operator,
  amount,
  nonce,
  timestamp,
  signatures,
  contract,
  options,
  emitter
}) => {
  return sendL1Transaction(
    contract,
    'requestMint',
    [[sourceDomain, targetDomain, receiver, operator, amount, nonce, timestamp], signatures, 0, 0],
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
    const maxDeposit = await callL1Contract(contract, 'maxDeposit');
    return parseFromDecimals(maxDeposit, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const maxTotalBalance = async ({decimals, contract}) => {
  try {
    const maxTotalBalance = await callL1Contract(contract, 'maxTotalBalance');
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

export const initiateWormhole = async ({
  targetDomain,
  receiver,
  amount,
  decimals,
  operator,
  contract
}) => {
  return sendL2Transaction(contract, 'initiate_wormhole', {
    target_domain: parseToFelt(targetDomain),
    receiver: parseToFelt(receiver),
    amount: parseToDecimals(amount, decimals),
    operator: parseToFelt(operator)
  });
};
