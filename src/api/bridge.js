import {parseToDecimals, parseToFelt, parseToUint256} from '../utils';
import {eth_sendTransaction, starknet_sendTransaction} from '../utils/contract';
import {decimals} from './erc20';

export const deposit = async (recipient, amount, tokenBridgeContract, from, emitter) => {
  try {
    return eth_sendTransaction(
      tokenBridgeContract,
      'deposit',
      [parseToDecimals(amount), recipient],
      {
        from
      },
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const depositEth = async (recipient, amount, ethBridgeContract, from, emitter) => {
  try {
    return eth_sendTransaction(
      ethBridgeContract,
      'deposit',
      [recipient],
      {
        from,
        value: parseToDecimals(amount)
      },
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const withdraw = async (recipient, amount, tokenBridgeContract, emitter) => {
  try {
    return eth_sendTransaction(
      tokenBridgeContract,
      'withdraw',
      [parseToDecimals(amount), recipient],
      {
        from: recipient
      },
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const initiateWithdraw = async (
  recipient,
  amount,
  tokenBridgeContract,
  tokenContract,
  emitter
) => {
  try {
    const dec = await decimals(tokenContract, false);
    return starknet_sendTransaction(
      tokenBridgeContract,
      'initiate_withdraw',
      {
        l1Recipient: parseToFelt(recipient),
        amount: parseToUint256(amount, dec)
      },
      emitter
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};
