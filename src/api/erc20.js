import {TransactionStatus} from '../enums';
import {web3} from '../libs';
import {parseFromDecimals, parseFromUint256} from '../utils';
import blockchainUtils from '../utils/blockchain';

export const approve = async ({spender, value, contract, options}) => {
  try {
    return await blockchainUtils.ethereum.sendTransaction(
      contract,
      'approve',
      [spender, value],
      options
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const allowance = async ({owner, spender, decimals, contract}) => {
  try {
    const allow = await blockchainUtils.ethereum.callContract(contract, 'allowance', [
      owner,
      spender
    ]);
    return parseFromDecimals(allow, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const balanceOf = async ({account, decimals, contract}, isL1 = true) => {
  try {
    if (isL1) {
      const balance = await blockchainUtils.ethereum.callContract(contract, 'balanceOf', [account]);
      return parseFromDecimals(balance, decimals);
    } else {
      const {balance} = await blockchainUtils.starknet.callContract(
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
