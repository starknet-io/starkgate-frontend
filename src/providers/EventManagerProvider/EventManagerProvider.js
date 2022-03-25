import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import {EventName, SelectorName} from '../../enums';
import {useL1TokenBridgeContract, useLogger, useStarknetContract} from '../../hooks';
import {starknet} from '../../libs';
import {useL1Tokens, useL2Tokens} from '../TokensProvider';
import {useL1Wallet, useL2Wallet, useWallets} from '../WalletsProvider';
import {EventManagerContext} from './event-manager-context';

const listeners = {};

const eventsQueue = {};

export const EventManagerProvider = ({children}) => {
  const logger = useLogger(EventManagerProvider.displayName);
  const starknetContract = useStarknetContract();
  const getTokenBridgeContract = useL1TokenBridgeContract();
  const {chainId} = useWallets();
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const l1Tokens = useL1Tokens();
  const l2Tokens = useL2Tokens();

  useEffect(() => {
    addLogDepositListener();
    addLogWithdrawalListener();
    addLogMessageToL2Listener();
  }, []);

  const addListener = (eventName, callback) => {
    logger.log(`Registered to ${eventName} event.`);
    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }
    listeners[eventName].push(callback);
  };

  const insertEventToQueue = (eventName, event) => {
    logger.log(`Insert event ${eventName} to queue.`);
    if (!eventsQueue[eventName]) {
      eventsQueue[eventName] = [];
    }
    eventsQueue[eventName].push(event);
  };

  const emitListeners = (eventName, error, event) => {
    logger.log(`Event ${eventName} emitted to listeners.`, event);
    listeners[eventName]?.forEach(listener => listener(error, event));
    cleanListeners(eventName);
  };

  const cleanListeners = eventName => {
    logger.log(`Clean listeners for event ${eventName}.`);
    listeners[eventName] = [];
  };

  const removeFromQueue = (eventName, index) => {
    logger.log(`Remove event ${eventName} at index ${index} from queue.`);
    eventsQueue[eventName].splice(index, 1);
  };

  const onLogWithdrawal = (error, event) => {
    logger.log(`Event ${EventName.L1.LOG_WITHDRAWAL} dispatched internal.`, {error, event});
    emitListeners(EventName.L1.LOG_WITHDRAWAL, error, event);
  };

  const onLogDeposit = (error, event) => {
    logger.log(`Event ${EventName.L1.LOG_DEPOSIT} dispatched internal.`, {error, event});
    const matchedLogMessageToL2EventIndex = eventsQueue[EventName.L1.LOG_MESSAGE_TO_L2]?.findIndex(
      e => e.transactionHash === event.transactionHash
    );
    logger.log(`Searching matched ${EventName.L1.LOG_MESSAGE_TO_L2} event.`);
    if (matchedLogMessageToL2EventIndex > -1) {
      logger.log(
        `Found matched ${EventName.L1.LOG_MESSAGE_TO_L2} event at index ${matchedLogMessageToL2EventIndex}.`,
        eventsQueue
      );
      emitListeners(EventName.L1.LOG_DEPOSIT, error, event);
      emitListeners(
        EventName.L1.LOG_MESSAGE_TO_L2,
        error,
        eventsQueue[EventName.L1.LOG_MESSAGE_TO_L2][matchedLogMessageToL2EventIndex]
      );
      removeFromQueue(EventName.L1.LOG_MESSAGE_TO_L2, matchedLogMessageToL2EventIndex);
    } else {
      logger.log(`Didn't found matched ${EventName.L1.LOG_MESSAGE_TO_L2} event.`);
      insertEventToQueue(EventName.L1.LOG_DEPOSIT, event);
      emitListeners(EventName.L1.LOG_DEPOSIT, error, event);
    }
  };

  const onLogMessageToL2 = (error, event) => {
    logger.log(`Event ${EventName.L1.LOG_MESSAGE_TO_L2} dispatched internal.`, {error, event});
    const matchedLogDepositEventIndex = eventsQueue[EventName.L1.LOG_DEPOSIT]?.findIndex(
      e => e.transactionHash === event.transactionHash
    );
    logger.log(`Searching matched ${EventName.L1.LOG_DEPOSIT} event.`);
    if (matchedLogDepositEventIndex > -1) {
      logger.log(
        `Found matched ${EventName.L1.LOG_DEPOSIT} event at index ${matchedLogDepositEventIndex}.`
      );
      removeFromQueue(EventName.L1.LOG_DEPOSIT, matchedLogDepositEventIndex);
      emitListeners(EventName.L1.LOG_MESSAGE_TO_L2, error, event);
    } else {
      logger.log(`Didn't found matched ${EventName.L1.LOG_DEPOSIT} event.`);
      insertEventToQueue(EventName.L1.LOG_MESSAGE_TO_L2, event);
    }
  };

  const addLogWithdrawalListener = () => {
    l1Tokens.forEach(l1Token => {
      const bridgeContract = getTokenBridgeContract(l1Token.bridgeAddress);
      logger.log(`Add ${EventName.L1.LOG_WITHDRAWAL} listener for token ${l1Token.symbol}.`);
      addContractEventListener(
        bridgeContract,
        EventName.L1.LOG_WITHDRAWAL,
        {
          recipient: l1Account
        },
        onLogWithdrawal
      );
    });
  };

  const addLogDepositListener = () => {
    l1Tokens.forEach(l1Token => {
      const bridgeContract = getTokenBridgeContract(l1Token.bridgeAddress);
      logger.log(`Add ${EventName.L1.LOG_DEPOSIT} listener for token ${l1Token.symbol}.`);
      addContractEventListener(
        bridgeContract,
        EventName.L1.LOG_DEPOSIT,
        {
          sender: l1Account,
          l2Recipient: l2Account
        },
        onLogDeposit
      );
    });
  };

  const addLogMessageToL2Listener = () => {
    logger.log(`Add ${EventName.L1.LOG_MESSAGE_TO_L2} listener.`);
    const l1BridgesAddresses = l1Tokens.map(token => token.bridgeAddress[chainId]);
    const l2BridgesAddress = l2Tokens.map(token => token.bridgeAddress[chainId]);
    addContractEventListener(
      starknetContract,
      EventName.L1.LOG_MESSAGE_TO_L2,
      {
        from_address: l1BridgesAddresses,
        to_address: l2BridgesAddress,
        selector: starknet.stark.getSelectorFromName(SelectorName.HANDLE_DEPOSIT)
      },
      onLogMessageToL2
    );
  };

  const addContractEventListener = (contract, eventName, filter, handler) => {
    contract.events[eventName](
      {
        filter
      },
      (error, event) => handler(error, event)
    );
  };

  const value = {
    addListener
  };

  return <EventManagerContext.Provider value={value}>{children}</EventManagerContext.Provider>;
};

EventManagerProvider.displayName = 'EventManagerProvider';

EventManagerProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
