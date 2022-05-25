import {TransactionStatus} from '../enums';
import {web3} from '../libs';
import {
  sendL1Transaction,
  callL1Contract,
  callL2Contract,
  parseFromDecimals,
  parseFromUint256,
  promiseHandler
} from '../utils';

export const approve = async ({spender, value, contract, options}) => {
  return sendL1Transaction(contract, 'approve', [spender, value], options);
};

export const allowance = async ({owner, spender, decimals, contract}) => {
  const [allow, error] = await promiseHandler(
    callL1Contract(contract, 'allowance', [owner, spender])
  );
  if (error) {
    return Promise.reject(error);
  }
  return parseFromDecimals(allow, decimals);
};

export const balanceOf = async ({account, decimals, contract}, isL1 = true) => {
  return isL1
    ? balanceOfL1({account, decimals, contract})
    : balanceOfL2({account, decimals, contract});
};

export const ethBalanceOf = async account => {
  const [balance, error] = await promiseHandler(web3.eth.getBalance(account));
  if (error) {
    return Promise.reject(error);
  }
  return parseFromDecimals(balance);
};

const balanceOfL1 = async ({account, decimals, contract}) => {
  const [balance, error] = await promiseHandler(callL1Contract(contract, 'balanceOf', [account]));
  if (error) {
    return Promise.reject(error);
  }
  return parseFromDecimals(balance, decimals);
};

const balanceOfL2 = async ({account, decimals, contract}) => {
  const [{balance}, error] = await promiseHandler(
    callL2Contract(contract, 'balanceOf', account, {
      blockIdentifier: TransactionStatus.PENDING.toLowerCase()
    })
  );
  if (error) {
    return Promise.reject(error);
  }
  return parseFromUint256(balance, decimals);
};
