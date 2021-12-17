import {
  eth_fromWei,
  eth_toWei,
  starknet_fromFelt,
  starknet_fromUint256,
  starknet_toFelt,
  starknet_toUint256
} from '../utils';
import {
  eth_callContract,
  eth_sendTransaction,
  starknet_callContract,
  starknet_sendTransaction
} from '../utils/contract';
import {web3} from '../web3';

export const approve = async (spender, value, contract, from, isEthereum = true) => {
  try {
    if (isEthereum) {
      return await eth_sendTransaction(contract, 'approve', [spender, eth_toWei(value)], {from});
    } else {
      const tokenDecimals = await decimals(contract, false);
      return await starknet_sendTransaction(contract, 'approve', {
        spender: starknet_toFelt(spender),
        amount: starknet_toUint256(value, tokenDecimals)
      });
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const balanceOf = async (account, contract, isEthereum = true) => {
  try {
    if (isEthereum) {
      const balance = await eth_callContract(contract, 'balanceOf', [account]);
      return eth_fromWei(balance);
    } else {
      const {balance} = await starknet_callContract(contract, 'balanceOf', [{account}]);
      const tokenDecimals = await decimals(contract, false);
      return starknet_fromUint256(balance, tokenDecimals);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const decimals = async (contract, isEthereum = true) => {
  try {
    if (isEthereum) {
      // TODO: call ethereum contract decimals
    } else {
      const {decimals} = await starknet_callContract(contract, 'decimals');
      return starknet_fromFelt(decimals);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const eth_ethBalanceOf = async account => {
  try {
    const balance = await web3.eth.getBalance(account);
    return eth_fromWei(balance);
  } catch (ex) {
    return Promise.reject(ex);
  }
};
