import {parseFromDecimals, parseFromUint256} from '../utils';
import {l1_callContract, l1_sendTransaction, l2_callContract} from '../utils/contract';
import {web3} from '../web3';

export const approve = async ({spender, value, contract, options}) => {
  try {
    return await l1_sendTransaction(contract, 'approve', [spender, value], options);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const allowance = async ({owner, spender, decimals, contract}) => {
  try {
    const allow = await l1_callContract(contract, 'allowance', [owner, spender]);
    return parseFromDecimals(allow, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const balanceOf = async ({account, decimals, contract}, isL1 = true) => {
  try {
    if (isL1) {
      const balance = await l1_callContract(contract, 'balanceOf', [account]);
      return parseFromDecimals(balance, decimals);
    } else {
      const {balance} = await l2_callContract(contract, 'balanceOf', [{account}]);
      return parseFromUint256(balance, decimals);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const l1_ethBalanceOf = async account => {
  try {
    const balance = await web3.eth.getBalance(account);
    return parseFromDecimals(balance);
  } catch (ex) {
    return Promise.reject(ex);
  }
};
