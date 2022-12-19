import {
  EventName,
  isCompleted,
  isConsumed,
  SelectorName,
  TransactionHashPrefix
} from '@starkware-industries/commons-js-enums';
import {useLogger} from '@starkware-industries/commons-js-hooks';
import {
  getPastEvents,
  getStorageItem,
  getTransactionHash,
  promiseHandler,
  setStorageItem
} from '@starkware-industries/commons-js-utils';
import {getStarknet} from 'get-starknet';
import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import {hash} from 'starknet';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {useAccountChange, useEnvs, useStarknetContract} from '../../hooks';
import {useBlockHash} from '../BlockHashProvider';
import {useTokens} from '../TokensProvider';
import {useAccountHash, useL2Wallet} from '../WalletsProvider';
import {TransfersLogContext} from './transfers-log-context';
import {actions, initialState, reducer} from './transfers-log-reducer';

export const TransfersLogProvider = ({children}) => {
  const [transfers, dispatch] = useReducer(reducer, initialState);
  const {LOCAL_STORAGE_TRANSFERS_LOG_KEY} = useEnvs();
  const logger = useLogger(TransfersLogProvider.displayName);
  const blockHash = useBlockHash();
  const {updateTokenBalance} = useTokens();
  const {chainId: chainIdL2} = useL2Wallet();
  const starknetContract = useStarknetContract();
  const accountHash = useAccountHash();

  useAccountChange(accountHash => {
    if (accountHash) {
      const storedTransfers = getTransfersFromStorage();
      logger.log('Extract transfers from local storage', storedTransfers);
      setTransfers(storedTransfers);
    } else {
      resetTransfers();
    }
  });

  useDeepCompareEffect(() => {
    if (transfers.length > 0) {
      logger.log('Transfers changed, save updated transfers to local storage', transfers);
      saveTransfersToStorage(transfers);
    }
  }, [transfers]);

  useEffect(() => {
    const checkTransfers = async () => {
      logger.log('Block hash updated. Checking transfers...', {blockHash});
      if (!blockHash) {
        return;
      }
      const newTransfers = [];
      for (const transfer of transfers) {
        const {l2hash} = transfer;
        const newTransfer = await (l2hash
          ? checkTransaction(transfer)
          : calcL2TransactionHash(transfer));
        if (newTransfer) {
          newTransfers.push(newTransfer);
        }
      }
      if (newTransfers.length) {
        logger.log('Following transfers updated', newTransfers);
        updateTransfers(newTransfers);
      }
    };

    blockHash && checkTransfers();
  }, [blockHash]);

  const checkTransaction = async transfer => {
    if (!(isCompleted(transfer.status) || transfer.lastChecked === blockHash)) {
      logger.log(`Checking tx status ${transfer.l2hash}`);
      const [{tx_status}, error] = await promiseHandler(
        getStarknet().provider.getTransactionStatus(transfer.l2hash)
      );
      if (!error) {
        if (transfer.status !== tx_status) {
          logger.log(`Status changed from ${transfer.status}->${tx_status}`);
          if (isConsumed(tx_status)) {
            updateTokenBalance(transfer.symbol);
          }
        } else {
          logger.log(`Status is still ${tx_status}`);
        }
        return {
          ...transfer,
          status: tx_status,
          lastChecked: blockHash
        };
      }
    }
  };

  const getMessageToL2 = async depositEvent => {
    logger.log('Getting L2 message for deposit event', {depositEvent});
    const {blockNumber, transactionHash} = depositEvent;
    const [pastEvents, error] = await promiseHandler(
      getPastEvents({
        contract: starknetContract,
        eventName: EventName.L1.LOG_MESSAGE_TO_L2,
        filter: {
          fromAddress: depositEvent.address,
          selector: hash.getSelectorFromName(SelectorName.HANDLE_DEPOSIT)
        },
        options: {
          fromBlock: blockNumber - 1,
          toBlock: 'latest'
        }
      })
    );
    if (error) {
      return null;
    }
    return pastEvents.find(e => e.transactionHash === transactionHash);
  };

  const calcL2TransactionHash = async transfer => {
    const messageToL2Event = await getMessageToL2(transfer.event);
    if (messageToL2Event) {
      logger.log('Found L2 message. calculating L2 transaction hash...', {messageToL2Event});
      const {toAddress, fromAddress, selector, payload, nonce} = messageToL2Event.returnValues;
      delete transfer.event;
      return {
        ...transfer,
        l2hash: getTransactionHash(
          TransactionHashPrefix.L1_HANDLER,
          fromAddress,
          toAddress,
          selector,
          payload,
          chainIdL2,
          nonce
        )
      };
    }
    return transfer;
  };

  const getTransfersFromStorage = () => {
    const storedTransfers = getStorageItem(LOCAL_STORAGE_TRANSFERS_LOG_KEY) || {};
    return storedTransfers[accountHash] || [];
  };

  const saveTransfersToStorage = transfers => {
    const storedTransfers = getStorageItem(LOCAL_STORAGE_TRANSFERS_LOG_KEY) || {};
    const updatedTransfers = {
      ...storedTransfers,
      [accountHash]: transfers
    };
    setStorageItem(LOCAL_STORAGE_TRANSFERS_LOG_KEY, updatedTransfers);
  };

  const updateTransfers = updatedTransfers => {
    dispatch({
      type: actions.UPDATE_TRANSFERS,
      updatedTransfers: Array.isArray(updatedTransfers) ? updatedTransfers : [updatedTransfers]
    });
  };

  const addTransfer = newTransfer => {
    dispatch({
      type: actions.ADD_TRANSFER,
      newTransfer
    });
  };

  const setTransfers = transfers => {
    dispatch({
      type: actions.SET_TRANSFERS,
      transfers
    });
  };

  const resetTransfers = () => {
    dispatch({
      type: actions.RESET_TRANSFERS
    });
  };

  const context = {
    transfers,
    addTransfer,
    updateTransfers
  };

  return <TransfersLogContext.Provider value={context}>{children}</TransfersLogContext.Provider>;
};

TransfersLogProvider.displayName = 'TransfersLogProvider';

TransfersLogProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
