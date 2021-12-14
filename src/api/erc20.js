import {uint256} from 'starknet';

import {callContract, callStarknetContract, sendTransaction} from '../utils/contract';
import {web3} from '../web3';

export const approve = async (spender, value, contract, from, isEthereum = true) => {
  try {
    if (isEthereum) {
      return await sendTransaction(contract, 'approve', [spender, web3.utils.toWei(value)], {from});
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const getTokenBalance = async (account, contract, isEthereum = true) => {
  try {
    if (isEthereum) {
      const balance = await callContract(contract, 'balanceOf', [account]);
      return Number(web3.utils.fromWei(balance));
    } else {
      const {balance} = await callStarknetContract(contract, 'balanceOf', [{account}]);
      return uint256.uint256ToBN(balance).toNumber();
    }
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const getEthBalance = async account => {
  try {
    const balance = await web3.eth.getBalance(account);
    return Number(web3.utils.fromWei(balance));
  } catch (ex) {
    return Promise.reject(ex);
  }
};
