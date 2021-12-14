import {useCallback, useState} from 'react';

import {deposit} from '../api/bridge';
import {approve} from '../api/erc20';
import {ERC20_BRIDGE_CONTRACT_ADDRESS} from '../config/contracts/contracts.ethereum';
import {useWallets, useStarknetWallet} from '../providers/WalletsProvider/hooks';
import {listenOnce} from '../utils/contract';
import {web3} from '../web3';
import {useMessagingContract, useTokenBridgeContract, useTokenContract} from './useContract';

const PROGRESS = {
  approval: symbol => ({
    type: 'approval',
    message: `Requesting permission to access your ${symbol} funds`
  }),
  deposit: (amount, symbol) => ({
    type: 'deposit',
    message: `Depositing ${amount} ${symbol} to StarkNet`
  })
};

export const useTransferToStarknet = tokenData => {
  const {address, symbol} = tokenData;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const {account, chainId} = useWallets();
  const {account: starknetAccount} = useStarknetWallet();
  const tokenContract = useTokenContract(address);
  const tokenBridgeContract = useTokenBridgeContract();
  const messagingContract = useMessagingContract();

  const waitForLogMessageToL2 = () => {
    return new Promise((resolve, reject) => {
      listenOnce(messagingContract, 'LogMessageToL2', (error, event) => {
        if (error) {
          reject(error);
        }
        resolve(event);
      });
    });
  };

  const transferToStarknet = useCallback(
    async amount => {
      setError(null);
      setData(null);
      setProgress(null);
      setIsLoading(false);
      try {
        setIsLoading(true);
        const amountNumber = Number(amount);
        const amountBN = web3.utils.toBN(amountNumber);
        setProgress(PROGRESS.approval(symbol));
        await approve(tokenContract, ERC20_BRIDGE_CONTRACT_ADDRESS[chainId], account, amountNumber);
        setProgress(PROGRESS.deposit(amountBN, symbol));
        const depositPromise = deposit(tokenBridgeContract, account, starknetAccount, amountBN);
        const depositEvent = await waitForLogMessageToL2();
        const depositReceipt = await depositPromise;
        setIsLoading(false);
        setProgress(null);
        setData([depositReceipt, depositEvent]);
      } catch (ex) {
        setIsLoading(false);
        setProgress(null);
        setError(ex);
      }
    },
    [account, starknetAccount, tokenContract]
  );

  return {
    isTransferring: isLoading,
    transferProgress: progress,
    transferError: error,
    transferData: data,
    transferToStarknet
  };
};
