import {TransactionStatus} from '@starkware-industries/commons-js-enums';
import {web3} from '@starkware-industries/commons-js-libs/web3';
import {
  callContractL1,
  sendTransactionL1,
  callContractL2,
  parseFromDecimals,
  parseFromUint256,
  promiseHandler
} from '@starkware-industries/commons-js-utils';
import {useCallback} from 'react';

import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet} from '../providers/WalletsProvider';
import {useL1TokenContract, useL2TokenContract} from './useContract';

export const useTokenContractAPI = () => {
  const selectedToken = useSelectedToken();
  const getL1TokenContract = useL1TokenContract();
  const getL2TokenContract = useL2TokenContract();
  const {account: accountL1} = useL1Wallet();

  const approve = useCallback(
    async ({spender, value}) => {
      const {tokenAddress} = selectedToken;
      const contract = getL1TokenContract(tokenAddress);

      return sendTransactionL1(contract, 'approve', [spender, value], {from: accountL1});
    },
    [selectedToken, accountL1, getL1TokenContract]
  );

  const allowance = useCallback(
    async ({owner, spender}) => {
      const {tokenAddress, decimals} = selectedToken;
      const contract = getL1TokenContract(tokenAddress);

      const [allow, error] = await promiseHandler(
        callContractL1(contract, 'allowance', [owner, spender])
      );
      if (error) {
        return Promise.reject(error);
      }
      return parseFromDecimals(allow, decimals);
    },
    [selectedToken, getL1TokenContract]
  );

  const balanceOfEth = useCallback(async account => {
    const [balance, error] = await promiseHandler(web3.eth.getBalance(account));
    if (error) {
      return Promise.reject(error);
    }
    return parseFromDecimals(balance);
  }, []);

  const balanceOfL1 = useCallback(
    async ({account, token}) => {
      const {tokenAddress, decimals} = token || selectedToken;
      const contract = getL1TokenContract(tokenAddress);

      const [balance, error] = await promiseHandler(
        callContractL1(contract, 'balanceOf', [account])
      );
      if (error) {
        return Promise.reject(error);
      }
      return parseFromDecimals(balance, decimals);
    },
    [selectedToken, getL1TokenContract]
  );

  const balanceOfL2 = useCallback(
    async ({account, token}) => {
      const {tokenAddress, decimals} = token || selectedToken;
      const contract = getL2TokenContract(tokenAddress);

      const [{balance}, error] = await promiseHandler(
        callContractL2(contract, 'balanceOf', account, {
          blockIdentifier: TransactionStatus.PENDING.toLowerCase()
        })
      );
      if (error) {
        return Promise.reject(error);
      }
      return parseFromUint256(balance, decimals);
    },
    [selectedToken, getL2TokenContract]
  );

  return {
    approve,
    allowance,
    balanceOfL1,
    balanceOfL2,
    balanceOfEth
  };
};
