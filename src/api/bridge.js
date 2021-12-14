import {sendTransaction} from '../utils/contract';
import {web3} from '../web3';

export const depositToken = async (l2Recipient, amount, bridgeContract, from) => {
  try {
    return await sendTransaction(
      bridgeContract,
      'deposit',
      [web3.utils.toWei(amount, 'ether'), l2Recipient],
      {from}
    );
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const depositEth = async (l2Recipient, value, ethBridgeContract, from) => {
  try {
    return await sendTransaction(ethBridgeContract, 'deposit', [l2Recipient], {
      from,
      value: web3.utils.toWei(value, 'ether')
    });
  } catch (ex) {
    return Promise.reject(ex);
  }
};
