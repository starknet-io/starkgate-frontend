import {useCallback} from 'react';
import {stark} from 'starknet';

import {useSelectedToken} from '../components/Features/Transfer/Transfer.hooks';
import {useEthereumToken, useStarknetToken} from '../providers/TokensProvider';
import {useEthereumWallet, useStarknetWallet} from '../providers/WalletsProvider';
import {txHash} from '../utils';
import {useMessagingContract, useTokenBridgeContract} from './useContract';
import {useLogger} from './useLogger';

const HOOK_MODULE = 'useEventListener';

export const useLogMessageToL2Listener = () => {
  const logger = useLogger(`${HOOK_MODULE}:useLogMessageToL2Listener`);
  const selectedToken = useSelectedToken();
  const getEthereumToken = useEthereumToken();
  const getStarknetToken = useStarknetToken();
  const messagingContract = useMessagingContract();
  const addEventListener = useEventListener();
  const {chainId} = useEthereumWallet();

  return useCallback(async () => {
    logger.log('Registering to LogMessageToL2 event');
    const {symbol} = selectedToken;
    const snBridgeAddress = getStarknetToken(symbol).bridgeAddress[chainId];
    const ethBridgeAddress = getEthereumToken(symbol).bridgeAddress[chainId];
    try {
      const event = await addEventListener(messagingContract, 'LogMessageToL2', {
        filter: {
          to_address: snBridgeAddress,
          from_address: ethBridgeAddress,
          selector: stark.getSelectorFromName('handle_deposit')
        }
      });
      logger.log('Event received', {event});
      const {to_address, from_address, selector, payload} = event.returnValues;
      return txHash(from_address, to_address, selector, payload, chainId);
    } catch (ex) {
      logger.error('Event error', {ex});
      return Promise.reject(ex.message);
    }
  }, [
    addEventListener,
    chainId,
    getEthereumToken,
    getStarknetToken,
    logger,
    messagingContract,
    selectedToken
  ]);
};

export const useLogDepositListener = () => {
  const logger = useLogger(`${HOOK_MODULE}:useLogDepositListener`);
  const selectedToken = useSelectedToken();
  const getTokenBridgeContract = useTokenBridgeContract();
  const addEventListener = useEventListener();
  const {account: ethereumAccount} = useEthereumWallet();
  const {account: starknetAccount} = useStarknetWallet();

  return useCallback(async () => {
    logger.log('Registering to LogDeposit event');
    const {bridgeAddress} = selectedToken;
    const contract = getTokenBridgeContract(bridgeAddress);
    try {
      const event = await addEventListener(contract, 'LogDeposit', {
        filter: {
          l2Recipient: starknetAccount,
          sender: ethereumAccount
        }
      });
      logger.log('Event received', {event});
      return event.transactionHash;
    } catch (ex) {
      logger.error('Event error', {ex});
      return Promise.reject(ex.message);
    }
  }, [
    addEventListener,
    ethereumAccount,
    starknetAccount,
    getTokenBridgeContract,
    logger,
    selectedToken
  ]);
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
