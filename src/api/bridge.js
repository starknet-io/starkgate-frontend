import {
  sendL1Transaction,
  callL1Contract,
  sendL2Transaction,
  parseFromDecimals,
  parseToDecimals,
  parseToFelt,
  parseToUint256,
  isDai
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
  try {
    const maxDeposit = await callL1Contract(contract, 'maxDeposit');
    return parseFromDecimals(maxDeposit, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const maxTotalBalance = async ({decimals, symbol, contract}) => {
  try {
    const maxTotalBalance = await callL1Contract(
      contract,
      isDai(symbol) ? 'ceiling' : 'maxTotalBalance'
    );
    return parseFromDecimals(maxTotalBalance, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const initiateWithdrawCall = ({bridge, recipient, amount, decimals}) => {
  return {
    contract: bridge,
    method: 'initiate_withdraw',
    args: {
      l1Recipient: parseToFelt(recipient),
      amount: parseToUint256(amount, decimals)
    }
  };
};

const increaseAllowanceCall = ({bridge, token, amount, decimals}) => {
  return {
    contract: token,
    method: 'increaseAllowance',
    args: {
      spender: bridge.address,
      amount: parseToUint256(amount, decimals)
    }
  };
};

export const initiateWithdraw = async ({symbol, bridge, token, recipient, amount, decimals}) => {
  return sendL2Transaction([
    ...(isDai(symbol) ? [increaseAllowanceCall({bridge, token, amount, decimals})] : []),
    initiateWithdrawCall({bridge, recipient, amount, decimals})
  ]);
};
