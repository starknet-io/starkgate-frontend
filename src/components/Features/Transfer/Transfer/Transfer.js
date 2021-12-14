import React, {useEffect, useState} from 'react';

import {ActionType, NetworkType} from '../../../../enums';
import {useTransferToStarknet} from '../../../../hooks';
import {isEth} from '../../../../utils';
import {Menu} from '../../../UI';
import {useBridgeActions} from '../../Bridge/Bridge.hooks';
import {
  useProgressModal,
  useTransactionSubmittedModal
} from '../../ModalProvider/ModalProvider.hooks';
import {TransferMenuTab} from '../TransferMenuTab/TransferMenuTab';
import {NetworkMenu, NetworkSwap, TokenInput, TransferButton} from '../index';
import {useAmount, useIsEthereum, useIsStarknet, useTransferData} from './Transfer.hooks';
import styles from './Transfer.module.scss';
import {
  INSUFFICIENT_BALANCE_ERROR_MSG,
  TRANSFER_TO_STARKNET_MODAL_TITLE
} from './Transfer.strings.js';

export const Transfer = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();
  const [amount, setAmount, clearAmount] = useAmount();
  const {action, selectedToken, fromNetwork, toNetwork} = useTransferData();
  const {showSelectTokenMenu} = useBridgeActions();
  const {
    transferData,
    transferEthToStarknet,
    transferTokenToStarknet,
    transferError,
    isTransferring,
    transferProgress
  } = useTransferToStarknet(selectedToken);
  const showProgressModal = useProgressModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal();

  useEffect(() => {
    if (isTransferring) {
      showProgressModal(TRANSFER_TO_STARKNET_MODAL_TITLE, transferProgress.message);
    } else if (transferError) {
      // TODO: show error modal
    } else if (transferData) {
      const [receipt, event] = transferData;
      clearAmount();
      showTransactionSubmittedModal(receipt.transactionHash);
      // TODO: add tx store and calc tx hash from msg hash
    }
  }, [transferProgress, transferData, transferError, isTransferring, amount]);

  useEffect(() => {
    clearAmount();
  }, [selectedToken]);

  useEffect(() => {
    setError(null);
    if (Math.ceil(amount) === 0) {
      setIsButtonDisabled(true);
    } else {
      if (amount > selectedToken.balance) {
        setError(INSUFFICIENT_BALANCE_ERROR_MSG);
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    }
  }, [amount, action]);

  const onMaxClick = () => {
    setAmount(selectedToken.balance);
  };

  const onInputChange = event => {
    setAmount(event.target.value);
  };

  const onSwapClick = () => {
    isEthereum ? setStarknet() : setEthereum();
  };

  const onTransferClick = async () => {
    if (isEthereum) {
      return isEth(selectedToken) ? transferEthToStarknet(amount) : transferTokenToStarknet(amount);
    }
  };

  const renderTabs = () => {
    return Object.values(ActionType).map((tab, index) => {
      return (
        <TransferMenuTab
          key={index}
          isActive={action === tab}
          text={
            tab === ActionType.TRANSFER_TO_STARKNET
              ? NetworkType.ETHEREUM.name
              : NetworkType.STARKNET.name
          }
          onClick={() => action !== tab && onSwapClick()}
        />
      );
    });
  };

  return (
    <Menu>
      <div className={styles.transfer}>
        <div className={styles.tabsContainer}>{renderTabs()}</div>
        <div className={styles.container}>
          <NetworkMenu networkData={fromNetwork} title="from" tokenData={selectedToken}>
            <TokenInput
              hasError={!!error}
              selectedToken={selectedToken}
              value={amount}
              onInputChange={onInputChange}
              onMaxClick={onMaxClick}
              onTokenSelect={showSelectTokenMenu}
            />
            {error && <div className={styles.errorMsg}>{error}</div>}
            <TransferButton
              isDisabled={isButtonDisabled}
              isLoading={isTransferring}
              onClick={onTransferClick}
            />
            <NetworkSwap isFlipped={isStarknet} onClick={onSwapClick} />
          </NetworkMenu>
          <NetworkMenu networkData={toNetwork} title="to" tokenData={selectedToken} />
        </div>
      </div>
    </Menu>
  );
};
