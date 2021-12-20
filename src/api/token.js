import {DEFAULT_DECIMALS, fromDecimals, starknet_fromUint256} from '../utils';
import {balanceOf, decimals} from './erc20';

export const fetchTokenInfo = async (account, contract, isEthereum = true) => {
  try {
    let [balance, dec] = await Promise.all([
      balanceOf(account, contract, isEthereum),
      decimals(account, contract, isEthereum)
    ]);
    if (isEthereum) {
      balance = fromDecimals(balance, dec);
    } else {
      balance = starknet_fromUint256(balance, dec);
    }
    return {balance, decimals: dec || DEFAULT_DECIMALS};
  } catch (ex) {
    return Promise.reject(ex);
  }
};
