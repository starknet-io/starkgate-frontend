import {parseToDecimals, parseToFelt, parseToUint256} from '../utils';
import {eth_sendTransaction, starknet_sendTransaction} from '../utils/contract';
import {decimals} from './erc20';

export const eth_deposit = async (recipient, amount, tokenBridgeContract, from) => {
  try {
    return await eth_sendTransaction(
      tokenBridgeContract,
      'deposit',
      [parseToDecimals(amount), recipient],
      {
        from
      }
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const eth_depositEth = async (recipient, amount, ethBridgeContract, from) => {
  try {
    return await eth_sendTransaction(ethBridgeContract, 'deposit', [recipient], {
      from,
      value: parseToDecimals(amount)
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const eth_withdraw = async (recipient, amount, tokenBridgeContract) => {
  try {
    return await eth_sendTransaction(
      tokenBridgeContract,
      'withdraw',
      [parseToDecimals(amount), recipient],
      {
        from: recipient
      }
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const starknet_initiateWithdraw = async (
  recipient,
  amount,
  tokenBridgeContract,
  tokenContract
) => {
  try {
    const dec = await decimals(tokenContract, false);
    return await starknet_sendTransaction(tokenBridgeContract, 'initiate_withdraw', {
      l1Recipient: parseToFelt(recipient),
      amount: parseToUint256(amount, dec)
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};
