import {
  parseFromDecimals,
  parseFromFelt,
  parseFromUint256,
  parseToFelt,
  parseToUint256
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
      return await eth_sendTransaction(contract, 'approve', [spender, value], {from});
    } else {
      const dec = await decimals(contract, false);
      return await starknet_sendTransaction(contract, 'approve', {
        spender: parseToFelt(spender),
        amount: parseToUint256(value, dec)
      });
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const allowance = async (owner, spender, contract, isEthereum = true) => {
  try {
    if (isEthereum) {
      const allow = await eth_callContract(contract, 'allowance', [owner, spender]);
      return parseFromDecimals(allow);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const balanceOf = async (account, contract, isEthereum = true) => {
  try {
    if (isEthereum) {
      const balance = await eth_callContract(contract, 'balanceOf', [account]);
      return parseFromDecimals(balance);
    } else {
      const [{balance}, dec] = await Promise.all([
        starknet_callContract(contract, 'balanceOf', [{account}]),
        decimals(contract, false)
      ]);
      return parseFromUint256(balance, dec);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const decimals = async (contract, isEthereum = true) => {
  try {
    if (isEthereum) {
      return await eth_callContract(contract, 'decimals');
    } else {
      const {decimals} = await starknet_callContract(contract, 'decimals');
      return parseFromFelt(decimals);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const eth_ethBalanceOf = async account => {
  try {
    const balance = await web3.eth.getBalance(account);
    return parseFromDecimals(balance);
  } catch (ex) {
    return Promise.reject(ex);
  }
};
