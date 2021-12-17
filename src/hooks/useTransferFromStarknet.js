import {useState} from 'react';

import {initiateWithdrawToken, withdrawToken} from '../api/bridge';
import {useEthereumToken} from '../providers/TokensProvider/hooks';
import {useEthereumWallet, useWallets} from '../providers/WalletsProvider/hooks';
import {listenOnce, waitForStarknetTransaction} from '../utils/contract';
import {
  useEthereumTokenBridgeContract,
  useMessagingContract,
  useTokenBridgeContract,
  useTokenContract
} from './useContract';

const PROGRESS = {
  initiateWithdraw: (amount, symbol, sender) => ({
    type: 'Withdrawing from L2',
    message: `Initiating withdraw of ${amount} ${symbol} from ${sender}`
  }),
  waitForAccept: () => ({
    type: 'Transaction received',
    message: `Waiting for transaction to be accepted on L2`
  }),
  waitForEvent: () => ({
    type: 'Accepted on L2',
    message: 'Waiting for message to be received on L1'
  }),
  withdraw: (amount, symbol, recipient) => ({
    type: 'Withdrawing from bridge contract',
    message: `Withdrawing ${amount} ${symbol} to ${recipient}`
  })
};

export const useTransferFromStarknet = tokenData => {
  const {tokenAddress, bridgeAddress, symbol} = tokenData;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const {account: starknetAccount} = useWallets();
  const {account: ethereumAccount} = useEthereumWallet();
  const tokenContract = useTokenContract(tokenAddress);
  const starknetTokenBridgeContract = useTokenBridgeContract(bridgeAddress);
  const getEthereumToken = useEthereumToken();
  const ethereumToken = getEthereumToken(symbol);
  const ethereumTokenBridgeContract = useEthereumTokenBridgeContract(ethereumToken.bridgeAddress);
  const messagingContract = useMessagingContract();

  const waitForLogMessageToL1 = () => {
    return new Promise((resolve, reject) => {
      listenOnce(messagingContract, 'LogMessageToL1', (error, event) => {
        if (error) {
          reject(error);
        }
        resolve(event);
      });
    });
  };

  const transferFromStarknet = async amount => {
    setError(null);
    setData(null);
    setProgress(null);
    setIsLoading(false);
    try {
      setIsLoading(true);

      setProgress(PROGRESS.initiateWithdraw(amount, symbol, starknetAccount));
      const initiateWithdrawTxResponse = await initiateWithdrawToken(
        ethereumAccount,
        amount,
        starknetTokenBridgeContract,
        tokenContract
      );

      const waitForAcceptPromise = waitForStarknetTransaction(
        initiateWithdrawTxResponse.transaction_hash
      );

      const waitForMsgPromise = waitForLogMessageToL1();

      setProgress(PROGRESS.waitForAccept());
      await waitForAcceptPromise;

      setProgress(PROGRESS.waitForEvent());
      await waitForMsgPromise;

      setProgress(PROGRESS.withdraw(amount, symbol, ethereumAccount));
      const withdrawReceipt = await withdrawToken(
        ethereumAccount,
        amount,
        ethereumTokenBridgeContract,
        tokenContract
      );
      setIsLoading(false);
      setProgress(null);
      setData([{}, withdrawReceipt]);
    } catch (ex) {
      setIsLoading(false);
      setProgress(null);
      setError(ex);
    }
  };

  return {
    isLoading,
    progress,
    error,
    data,
    transferFromStarknet
  };
};
