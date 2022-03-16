import {web3, starknet} from '../blockchain';
import {TransactionStatus} from '../enums';
import {parseFromDecimals, parseFromUint256} from '../utils';

export const approve = async ({spender, value, contract, options}) => {
  try {
    return await web3.sendTransaction(contract, 'approve', [spender, value], options);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const allowance = async ({owner, spender, decimals, contract}) => {
  try {
    const allow = await web3.callContract(contract, 'allowance', [owner, spender]);
    return parseFromDecimals(allow, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const balanceOf = async ({account, decimals, contract}, isL1 = true) => {
  try {
    if (isL1) {
      const balance = await web3.callContract(contract, 'balanceOf', [account]);
      return parseFromDecimals(balance, decimals);
    } else {
      const {balance} = await starknet.callContract(
        contract,
        'balanceOf',
        [{account}],
        TransactionStatus.PENDING.toLowerCase()
      );
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
