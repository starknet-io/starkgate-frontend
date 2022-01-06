import {parseFromDecimals, parseFromUint256} from '../utils';
import {eth_callContract, eth_sendTransaction, starknet_callContract} from '../utils/contract';
import {web3} from '../web3';

export const approve = async ({spender, value, contract, options}) => {
  try {
    return await eth_sendTransaction(contract, 'approve', [spender, value], options);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const allowance = async ({owner, spender, decimals, contract}) => {
  try {
    const allow = await eth_callContract(contract, 'allowance', [owner, spender]);
    return parseFromDecimals(allow, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const balanceOf = async ({account, decimals, contract}, isEthereum = true) => {
  try {
    if (isEthereum) {
      const balance = await eth_callContract(contract, 'balanceOf', [account]);
      return parseFromDecimals(balance, decimals);
    } else {
      const {balance} = await starknet_callContract(contract, 'balanceOf', [{account}]);
      return parseFromUint256(balance, decimals);
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
