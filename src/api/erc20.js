import {TransactionStatus} from '../enums';
import {web3} from '../libs';
import utils from '../utils';

export const approve = async ({spender, value, contract, options}) => {
  try {
    return await utils.blockchain.ethereum.sendTransaction(
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
    const allow = await utils.blockchain.ethereum.callContract(contract, 'allowance', [
      owner,
      spender
    ]);
    return utils.parser.parseFromDecimals(allow, decimals);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const balanceOf = async ({account, decimals, contract}, isL1 = true) => {
  try {
    if (isL1) {
      const balance = await utils.blockchain.ethereum.callContract(contract, 'balanceOf', [
        account
      ]);
      return utils.parser.parseFromDecimals(balance, decimals);
    } else {
      const {balance} = await utils.blockchain.starknet.callContract(
        contract,
        'balanceOf',
        [{account}],
        TransactionStatus.PENDING.toLowerCase()
      );
      return utils.parser.parseFromUint256(balance, decimals);
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const ethBalanceOf = async account => {
  try {
    const balance = await web3.eth.getBalance(account);
    return utils.parser.parseFromDecimals(balance);
  } catch (ex) {
    return Promise.reject(ex);
  }
};
