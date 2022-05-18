import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import {EventName, SelectorName} from '../../enums';
import {useL1TokenBridgeContract, useLogger} from '../../hooks';
import {starknet} from '../../libs';
import {parseToFelt} from '../../utils/parser';
import {useL1Tokens, useL2Tokens} from '../TokensProvider';
import {useL1Wallet, useL2Wallet} from '../WalletsProvider';
import {EventManagerContext} from './event-manager-context';

const listeners = {};
const filters = {};
let emitters = [];

export const EventManagerProvider = ({children}) => {
  const logger = useLogger(EventManagerProvider.displayName);
  const getTokenBridgeContract = useL1TokenBridgeContract();
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const l1Tokens = useL1Tokens();
  const l2Tokens = useL2Tokens();

  useEffect(() => {
    setEventFilters();
    addDepositWithdrawalListeners();
    return () => cleanEmittersAndRemoveListeners();
  }, []);

  const addListener = (eventName, callback) => {
    logger.log(`Registered to ${eventName} event.`);
    listeners[eventName] = listeners[eventName] || [];
    listeners[eventName].push(callback);
  };

  const removeListeners = eventName => {
    logger.log(`Remove listeners for event ${eventName}.`);
    listeners[eventName] = [];
  };

  const getPastEvents = (contract, eventName, options = {}) => {
    logger.log(`Getting ${eventName} past events.`);
    return contract.getPastEvents(eventName, {
      filter: filters[eventName],
      ...options
    });
  };

  const emitListeners = (eventName, error, event) => {
    logger.log(`Event ${eventName} emitted to listeners.`, event);
    listeners[eventName]?.forEach(listener => listener(error, event));
    removeListeners(eventName);
  };

  const onWithdrawal = (error, event) => {
    logger.log(`Event ${EventName.L1.LOG_WITHDRAWAL} dispatched internal.`, {error, event});
    emitListeners(EventName.L1.LOG_WITHDRAWAL, error, event);
  };

  const onDeposit = (error, event) => {
    logger.log(`Event ${EventName.L1.LOG_DEPOSIT} dispatched internal.`, {error, event});
    emitListeners(EventName.L1.LOG_DEPOSIT, error, event);
  };

  const addDepositWithdrawalListeners = () => {
    l1Tokens.forEach(l1Token => {
      const bridgeContract = getTokenBridgeContract(l1Token.bridgeAddress);
      logger.log(`Add ${EventName.L1.LOG_DEPOSIT} listener for token ${l1Token.symbol}.`);
      addContractEventListener(
        bridgeContract,
        EventName.L1.LOG_DEPOSIT,
        filters[EventName.L1.LOG_DEPOSIT],
        onDeposit
      );
      logger.log(`Add ${EventName.L1.LOG_WITHDRAWAL} listener for token ${l1Token.symbol}.`);
      addContractEventListener(
        bridgeContract,
        EventName.L1.LOG_WITHDRAWAL,
        filters[EventName.L1.LOG_WITHDRAWAL],
        onWithdrawal
      );
    });
  };

  const setEventFilters = () => {
    // LogMessageToL2 filter
    const l1BridgesAddresses = l1Tokens.map(token => token.bridgeAddress);
    const l2BridgesAddress = l2Tokens.map(token => token.bridgeAddress);
    filters[EventName.L1.LOG_MESSAGE_TO_L2] = {
      from_address: l1BridgesAddresses,
      to_address: l2BridgesAddress,
      selector: starknet.hash.getSelectorFromName(SelectorName.HANDLE_DEPOSIT)
    };
    // LogDeposit filter
    filters[EventName.L1.LOG_DEPOSIT] = {
      sender: l1Account,
      l2Recipient: parseToFelt(l2Account).toString()
    };
    // LogWithdrawal filter
    filters[EventName.L1.LOG_WITHDRAWAL] = {
      recipient: l1Account
    };
  };

  const addContractEventListener = (contract, eventName, filter, handler) => {
    emitters.push(
      contract.events[eventName](
        {
          filter
        },
        handler
      )
    );
  };

  const cleanEmittersAndRemoveListeners = () => {
    logger.log('Remove all listeners.');
    emitters.forEach(emitter => emitter.removeAllListeners());
    logger.log('Clean emitters.');
    emitters = [];
  };

  const value = {
    addListener,
    getPastEvents,
    removeListeners
  };

  return <EventManagerContext.Provider value={value}>{children}</EventManagerContext.Provider>;
};

EventManagerProvider.displayName = 'EventManagerProvider';

EventManagerProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
