import {starknet} from '@starkware-industries/starkware-commons-js-libs';

import {parseToFelt} from './parser';

export const formatBalance = balance => {
  return balance || 'N/A';
};

export const shortenBalance = balance => {
  return balance.length > 7 ? `${balance.substring(0, 7)}...` : balance;
};

export const shortenAddress = account => {
  return account
    ? account.length <= 8
      ? account
      : `${account.substring(0, 5)}...${account.substring(account.length - 3)}`
    : '';
};

export const calcAccountHash = (account1, account2) => {
  return starknet.hash.computeHashOnElements([
    parseToFelt(account1).toString(),
    parseToFelt(account2).toString()
  ]);
};
