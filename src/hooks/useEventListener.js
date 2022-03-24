import {useCallback} from 'react';

import {TransactionHashPrefix} from '../enums';
import {starknet} from '../libs';
import {useL1Token, useL2Token} from '../providers/TokensProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import utils from '../utils';
import {useStarknetContract, useTokenBridgeContract} from './useContract';
import {useLogger} from './useLogger';

const HOOK_MODULE = 'useEventListener';

export const useLogMessageToL2Listener = () => {
  const logger = useLogger(`${HOOK_MODULE}:useLogMessageToL2Listener`);
  const selectedToken = useSelectedToken();
  const getL1Token = useL1Token();
  const getL2Token = useL2Token();
  const starknetContract = useStarknetContract();
  const addEventListener = useEventListener();
  const {chainId} = useL1Wallet();

  return useCallback(async () => {
    logger.log('Registering to LogMessageToL2 event');
    const {symbol} = selectedToken;
    const l1BridgeAddress = getL1Token(symbol).bridgeAddress[chainId];
    const l2BridgeAddress = getL2Token(symbol).bridgeAddress[chainId];
    try {
      const event = await addEventListener(starknetContract, 'LogMessageToL2', {
        filter: {
          to_address: l2BridgeAddress,
          from_address: l1BridgeAddress,
          selector: starknet.stark.getSelectorFromName('handle_deposit')
        }
      });
      logger.log('Event received', {event});
      const {to_address, from_address, selector, payload, nonce} = event.returnValues;
      return utils.blockchain.starknet.getTransactionHash(
        TransactionHashPrefix.L1_HANDLER,
        from_address,
        to_address,
        selector,
        payload,
        chainId,
        nonce
      );
    } catch (ex) {
      logger.error('Event error', {ex});
      return Promise.reject(ex.message);
    }
  }, [addEventListener, chainId, getL1Token, getL2Token, logger, starknetContract, selectedToken]);
};

export const useLogDepositListener = () => {
  const logger = useLogger(`${HOOK_MODULE}:useLogDepositListener`);
  const selectedToken = useSelectedToken();
  const getTokenBridgeContract = useTokenBridgeContract();
  const addEventListener = useEventListener();
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();

  return useCallback(async () => {
    logger.log('Registering to LogDeposit event');
    const {bridgeAddress} = selectedToken;
    const contract = getTokenBridgeContract(bridgeAddress);
    try {
      const event = await addEventListener(contract, 'LogDeposit', {
        filter: {
          l2Recipient: l2Account,
          sender: l1Account
        }
      });
      logger.log('Event received', {event});
      return event.transactionHash;
    } catch (ex) {
      logger.error('Event error', {ex});
      return Promise.reject(ex.message);
    }
  }, [addEventListener, l1Account, l2Account, getTokenBridgeContract, logger, selectedToken]);
};

export const useEventListener = () => {
  return useCallback((contract, event, options) => {
    return new Promise((resolve, reject) => {
      contract.once(event, options, (error, event) => {
        if (error) {
          reject(error);
        }
        resolve(event);
      });
    });
  }, []);
};
