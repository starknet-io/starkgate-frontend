import {fromFelt, fromUint256, fromWei, toFelt, toUint256} from '../utils';
import {
  callContract,
  callStarknetContract,
  invokeStarknetTransaction,
  sendTransaction
} from '../utils/contract';
import {web3} from '../web3';

export const approve = async (spender, value, contract, from, isEthereum = true) => {
  try {
    if (isEthereum) {
      return await sendTransaction(contract, 'approve', [spender, web3.utils.toWei(value)], {from});
    } else {
      const tokenDecimals = await decimals(contract, false);
      return await invokeStarknetTransaction(contract, 'approve', {
        spender: toFelt(spender),
        amount: toUint256(value, tokenDecimals)
      });
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const getTokenBalance = async (account, contract, isEthereum = true) => {
  try {
    if (isEthereum) {
      const balance = await callContract(contract, 'balanceOf', [account]);
      return fromWei(balance);
    } else {
      const {balance} = await callStarknetContract(contract, 'balanceOf', [{account}]);
      const tokenDecimals = await decimals(contract, false);
      return fromUint256(balance, tokenDecimals);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const getEthBalance = async account => {
  try {
    const balance = await web3.eth.getBalance(account);
    return fromWei(balance);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const decimals = async (contract, isEthereum = true) => {
  try {
    if (isEthereum) {
      // TODO: call ethereum contract decimals
    } else {
      const {decimals} = await callStarknetContract(contract, 'decimals');
      return fromFelt(decimals);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};
