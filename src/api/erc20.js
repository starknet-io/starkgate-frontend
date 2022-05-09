import {TransactionStatus} from '../enums';
import {web3} from '../libs';
import {parseFromDecimals, parseFromUint256} from '../utils';
import {sendTransaction, callContract as callL1Contract} from '../utils/ethereum';
import {callContract as callL2Contract} from '../utils/starknet';

export const approve = async ({spender, value, contract, options}) => {
  return sendTransaction(contract, 'approve', [spender, value], options);
};

export const allowance = async ({owner, spender, decimals, contract}) => {
  try {
    const allow = await callL1Contract(contract, 'allowance', [owner, spender]);
    return parseFromDecimals(allow, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const balanceOf = async ({account, decimals, contract}, isL1 = true) => {
  try {
    if (isL1) {
      const balance = await callL1Contract(contract, 'balanceOf', [account]);
      return parseFromDecimals(balance, decimals);
    } else {
      const {balance} = await callL2Contract(contract, 'balanceOf', account, {
        blockIdentifier: TransactionStatus.PENDING.toLowerCase()
      });
      return parseFromUint256(balance, decimals);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const ethBalanceOf = async account => {
  try {
    const balance = await web3.eth.getBalance(account);
    return parseFromDecimals(balance);
  } catch (ex) {
    return Promise.reject(ex);
  }
};
