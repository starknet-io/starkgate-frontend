import {TransactionStatus} from '../enums';
import {web3} from '../libs';
import {
  sendL1Transaction,
  sendL2Transaction,
  callL1Contract,
  callL2Contract,
  parseFromDecimals,
  parseToFelt,
  parseToUint256,
  parseFromUint256
} from '../utils';

export const approve = async ({spender, value, contract, options}) => {
  return sendL1Transaction(contract, 'approve', [spender, value], options);
};

export const approveL2 = async ({spender, amount, contract}) => {
  return sendL2Transaction(contract, 'approve', {
    spender: parseToFelt(spender),
    amount: parseToUint256(amount, 0)
  });
};

export const allowance = async ({owner, spender, decimals, contract}) => {
  try {
    const allow = await callL1Contract(contract, 'allowance', [owner, spender]);
    return parseFromDecimals(allow, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const allowanceL2 = async ({owner, spender, decimals, contract}) => {
  try {
    const {remaining} = await callL2Contract(
      contract,
      'allowance',
      parseToFelt(owner),
      parseToFelt(spender)
    );
    return parseFromUint256(remaining, decimals);
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
