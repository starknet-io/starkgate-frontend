import {useCallback} from 'react';

import {deposit, depositEth} from '../api/bridge';
import {allowance, approve} from '../api/erc20';
import {useSelectedToken} from '../components/Features/Transfer/Transfer.hooks';
import {ActionType, TransactionHashPrefix} from '../enums';
import {starknet} from '../libs';
import {useLogMessageToL2Listener} from '../providers/EventManagerProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import utils from '../utils';
import {useTokenBridgeContract, useTokenContract} from './useContract';
import {useLogger} from './useLogger';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

export const useTransferToL2 = () => {
  const logger = useLogger('useTransferToL2');
  const {account: l1Account, chainId, config: l1Config} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const {handleProgress, handleData, handleError} = useTransfer();
  const selectedToken = useSelectedToken();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const progressOptions = useTransferProgress();
  const addLogMessageToL2Listener = useLogMessageToL2Listener();

  return useCallback(
    async amount => {
      const {symbol, decimals, tokenAddress, bridgeAddress} = selectedToken;
      const isEthToken = utils.token.isEth(symbol);
      const tokenContract = getTokenContract(tokenAddress);
      const bridgeContract = getTokenBridgeContract(bridgeAddress);

      const readAllowance = async () => {
        return await allowance({
          owner: l1Account,
          spender: bridgeAddress[chainId],
          decimals,
          contract: tokenContract
        });
      };

      const sendApproval = async () => {
        return await approve({
          spender: bridgeAddress[chainId],
          value: starknet.constants.MASK_250,
          contract: tokenContract,
          options: {from: l1Account}
        });
      };

      const sendDeposit = async () => {
        const depositHandler = isEthToken ? depositEth : deposit;
        return await depositHandler({
          recipient: l2Account,
          amount,
          decimals,
          contract: bridgeContract,
          options: {from: l1Account},
          emitter: error => {
            if (!error) {
              logger.log('Tx signed');
              handleProgress(progressOptions.deposit(amount, symbol));
            }
          }
        });
      };

      const onLogMessageToL2 = (error, event) => {
        handleData({
          type: ActionType.TRANSFER_TO_L2,
          sender: l1Account,
          recipient: l2Account,
          name,
          symbol,
          amount,
          ...extractTransactionsHashFromEvent(event)
        });
      };

      const extractTransactionsHashFromEvent = event => {
        const {to_address, from_address, selector, payload, nonce} = event.returnValues;
        return {
          l1hash: event.transactionHash,
          l2hash: utils.blockchain.starknet.getTransactionHash(
            TransactionHashPrefix.L1_HANDLER,
            from_address,
            to_address,
            selector,
            payload,
            chainId,
            nonce
          )
        };
      };

      try {
        logger.log('TransferToL2 called');
        if (!isEthToken) {
          logger.log('Token needs approval');
          handleProgress(progressOptions.approval(symbol));
          const allow = await readAllowance();
          logger.log('Current allow value', {allow});
          if (allow < amount) {
            logger.log('Allow value is smaller then amount, sending approve tx...', {amount});
            await sendApproval();
          }
        }
        handleProgress(progressOptions.waitForConfirm(l1Config.name));
        addLogMessageToL2Listener(onLogMessageToL2);
        logger.log('Calling deposit');
        await sendDeposit();
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
      }
    },
    [
      selectedToken,
      addLogMessageToL2Listener,
      chainId,
      l1Account,
      l2Account,
      l1Config,
      getTokenBridgeContract,
      getTokenContract,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions
    ]
  );
};
