import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import {EventName, SelectorName} from '../../enums';
import {useL1TokenBridgeContract, useLogger, useStarknetContract} from '../../hooks';
import {starknet} from '../../libs';
import {useL1Tokens, useL2Tokens} from '../TokensProvider';
import {TransfersProvider} from '../TransfersProvider';
import {useL1Wallet, useL2Wallet, useWallets} from '../WalletsProvider';
import {EventManagerContext} from './event-manager-context';

const listeners = {};

export const EventManagerProvider = ({children}) => {
  const logger = useLogger(EventManagerProvider.displayName);
  const starknetContract = useStarknetContract();
  const getTokenBridgeContract = useL1TokenBridgeContract();
  const {chainId} = useWallets();
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const l1Tokens = useL1Tokens();
  const l2Tokens = useL2Tokens();

  const addListener = (eventName, callback) => {
    logger.log(`Registered to ${eventName} event`);
    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }
    listeners[eventName].push(callback);
  };

  const emitListeners = (eventName, error, event) => {
    logger.log(`Event ${eventName} dispatched`);
    listeners[eventName]?.forEach(listener => listener(error, event));
    cleanListeners(eventName);
  };

  const cleanListeners = eventName => {
    listeners[eventName] = [];
  };

  /* eslint-disable-next-line no-unused-vars */
  const addLogDepositListener = () => {
    l1Tokens.forEach(l1Token => {
      const bridgeContract = getTokenBridgeContract(l1Token.bridgeAddress);
      bridgeContract.events[EventName.L1.LOG_DEPOSIT](
        {
          filter: {
            sender: l1Account,
            l2Recipient: l2Account
          }
        },
        (error, event) => emitListeners(EventName.L1.LOG_DEPOSIT, error, event)
      );
    });
  };

  const addLogMessageToL2Listener = () => {
    const l1BridgesAddresses = l1Tokens.map(token => token.bridgeAddress[chainId]);
    const l2BridgesAddress = l2Tokens.map(token => token.bridgeAddress[chainId]);
    starknetContract.events[EventName.L1.LOG_MESSAGE_TO_L2](
      {
        filter: {
          from_address: l1BridgesAddresses,
          to_address: l2BridgesAddress,
          selector: starknet.stark.getSelectorFromName(SelectorName.HANDLE_DEPOSIT)
        }
      },
      (error, event) => emitListeners(EventName.L1.LOG_MESSAGE_TO_L2, error, event)
    );
  };

  useEffect(() => {
    addLogMessageToL2Listener();
  }, []);

  const value = {
    addListener
  };

  return <EventManagerContext.Provider value={value}>{children}</EventManagerContext.Provider>;
};

EventManagerProvider.displayName = 'EventManagerProvider';

EventManagerProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
