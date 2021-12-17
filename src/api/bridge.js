import {starknet_toFelt, starknet_toUint256, eth_toWei} from '../utils';
import {starknet_sendTransaction, eth_sendTransaction} from '../utils/contract';
import {decimals} from './erc20';

export const eth_deposit = async (recipient, amount, tokenBridgeContract, from) => {
  try {
    return await eth_sendTransaction(
      tokenBridgeContract,
      'deposit',
      [eth_toWei(amount), recipient],
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
      value: eth_toWei(amount)
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
      [eth_toWei(amount), recipient],
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
    const tokenDecimals = await decimals(tokenContract, false);
    return await starknet_sendTransaction(tokenBridgeContract, 'initiate_withdraw', {
      l1Recipient: starknet_toFelt(recipient),
      amount: starknet_toUint256(amount, tokenDecimals)
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};
