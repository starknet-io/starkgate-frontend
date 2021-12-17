import {toFelt, toUint256, toWei} from '../utils';
import {invokeStarknetTransaction, sendTransaction} from '../utils/contract';
import {decimals} from './erc20';

export const depositToken = async (recipient, amount, tokenBridgeContract, from) => {
  try {
    return await sendTransaction(tokenBridgeContract, 'deposit', [toWei(amount), recipient], {
      from
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const depositEth = async (recipient, amount, ethBridgeContract, from) => {
  try {
    return await sendTransaction(ethBridgeContract, 'deposit', [recipient], {
      from,
      value: toWei(amount)
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const initiateWithdrawToken = async (
  recipient,
  amount,
  tokenBridgeContract,
  tokenContract
) => {
  try {
    const tokenDecimals = await decimals(tokenContract, false);
    return await invokeStarknetTransaction(tokenBridgeContract, 'initiate_withdraw', {
      l1Recipient: toFelt(recipient),
      amount: toUint256(amount, tokenDecimals)
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const withdrawToken = async (recipient, amount, tokenBridgeContract) => {
  try {
    return await sendTransaction(tokenBridgeContract, 'withdraw', [toWei(amount), recipient], {
      from: recipient
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};
