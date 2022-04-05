import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import {EventName, SelectorName} from '../../enums';
import {useL1TokenBridgeContract, useLogger, useStarknetContract} from '../../hooks';
import {starknet} from '../../libs';
import {useL1Tokens, useL2Tokens} from '../TokensProvider';
import {useL1Wallet, useL2Wallet} from '../WalletsProvider';
import {EventManagerContext} from './event-manager-context';
import constants from '../../config/constants'

const {MONITOR_TX_INTERVAL_MS} = constants;

const deposits = [];
const withdrawals = [];
const l2messages = [];

export const EventManagerProvider = ({children}) => {
  const logger = useLogger(EventManagerProvider.displayName);
  const starknetContract = useStarknetContract();
  const getTokenBridgeContract = useL1TokenBridgeContract();
  const {account: l1Account, chainId: l1ChainId} = useL1Wallet();
  const {account: l2Account, chainId: l2ChainId} = useL2Wallet();
  const l1Tokens = useL1Tokens();
  const l2Tokens = useL2Tokens();
  let recordWithdrawals = false;
  let recordDeposits = false;

  useEffect(() => {
    addLogDepositWithdrawalListeners();
    addLogMessageToL2Listener();
  }, []);

  const onLogWithdrawal = (error, event) => {
    if (recordWithdrawals && event) {
      logger.log(`Event ${EventName.L1.LOG_WITHDRAWAL} dispatched internal.`, {error, event});
      withdrawals.push(event);
      logger.log(`Withdrawal events`, withdrawals);
    }
  };

  const onLogDeposit = (error, event) => {
    if (recordDeposits && event) {
      logger.log(`Event ${EventName.L1.LOG_DEPOSIT} dispatched internal.`, {error, event});
      deposits.push(event);
      logger.log(`Deposits events`, deposits);
    }
  };

  const onLogMessageToL2 = (error, event) => {
    if (recordDeposits && event) {
      logger.log(`Event ${EventName.L1.LOG_MESSAGE_TO_L2} dispatched internal.`, {error, event});
      l2messages.push(event);
      logger.log(`MessageToL2 events`, l2messages);
    }
  };

  const addLogDepositWithdrawalListeners = () => {
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

  const addLogMessageToL2Listener = () => {
    logger.log(`Add ${EventName.L1.LOG_MESSAGE_TO_L2} listener.`);
    const l1BridgesAddresses = l1Tokens.map(token => token.bridgeAddress[l1ChainId]);
    const l2BridgesAddress = l2Tokens.map(token => token.bridgeAddress[l2ChainId]);
    addContractEventListener(
      starknetContract,
      EventName.L1.LOG_MESSAGE_TO_L2,
      {
        from_address: l1BridgesAddresses,
        to_address: l2BridgesAddress,
        selector: starknet.hash.getSelectorFromName(SelectorName.HANDLE_DEPOSIT)
      },
      onLogMessageToL2
    );
  };

  const addContractEventListener = (contract, eventName, filter, handler) => {
    contract.events[eventName](
      {
        filter
      },
      handler
    );
  };

  const addWithdrawalListener = (filter, callback) => {
    recordWithdrawals = true;
    const intervalId = setInterval(() => {
      const withdrawalEvent = findWithdrawalEvent(filter);
      if (withdrawalEvent) {
        recordWithdrawals = false;
        withdrawals.splice(0, deposits.length);
        clearInterval(intervalId);
        callback(withdrawalEvent);
      }
    }, MONITOR_TX_INTERVAL_MS);
  };

  const findWithdrawalEvent = filter => {
    return withdrawals.find(event => {
      const {recipient, amount} = event.returnValues;
      return recipient === filter.recipient && amount === filter.amount;
    });
  };

  const addDepositListener = (filter, callback) => {
    recordDeposits = true;
    const intervalId = setInterval(() => {
      const depositEvent = findDepositEvent(filter);
      if (depositEvent) {
        const l2messageEvent = findL2MessageEvent(depositEvent.transactionHash);
        if (l2messageEvent) {
          callback(l2messageEvent);
        }
        recordDeposits = false;
        deposits.splice(0, deposits.length);
        l2messages.splice(0, l2messages.length);
        clearInterval(intervalId);
      }
    }, MONITOR_TX_INTERVAL_MS);
  };

  const findDepositEvent = filter => {
    return deposits.find(event => {
      const {sender, amount, l2Recipient} = event.returnValues;
      return (
        sender === filter.sender && amount === filter.amount && l2Recipient === filter.l2Recipient
      );
    });
  };

  const findL2MessageEvent = transactionHash => {
    return l2messages.find(event => event.transactionHash === transactionHash);
  };

  const value = {
    addDepositListener,
    addWithdrawalListener
  };

  return <EventManagerContext.Provider value={value}>{children}</EventManagerContext.Provider>;
};

EventManagerProvider.displayName = 'EventManagerProvider';

EventManagerProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
