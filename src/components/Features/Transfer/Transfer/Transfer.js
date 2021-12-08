import React, {useEffect, useState} from 'react';

import {ActionType, NetworkType} from '../../../../enums';
import {Menu} from '../../../UI';
import {useBridgeActions} from '../../Bridge/Bridge.hooks';
import {TransferMenuTab} from '../TransferMenuTab/TransferMenuTab';
import {NetworkMenu, NetworkSwap, TokenInput, TransferButton} from '../index';
import {useAmount, useIsEthereum, useIsStarknet, useTransferData} from './Transfer.hooks';
import styles from './Transfer.module.scss';
import {INSUFFICIENT_BALANCE_ERROR_MSG} from './Transfer.strings.js';

export const Transfer = () => {
  const [hasError, setHasError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const {action, selectedToken, fromNetwork, toNetwork} = useTransferData();
  const {showSelectTokenMenu} = useBridgeActions();
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();
  const [amount, setAmount] = useAmount();

  useEffect(() => {
    setAmount('');
  }, [selectedToken]);

  useEffect(() => {
    if (Math.ceil(amount) === 0) {
      setHasError(false);
      setIsButtonDisabled(true);
    } else {
      if (amount > selectedToken.balance) {
        setHasError(true);
        setIsButtonDisabled(true);
        setErrorMsg(INSUFFICIENT_BALANCE_ERROR_MSG);
      } else {
        setHasError(false);
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
              hasError={hasError}
              selectedToken={selectedToken}
              value={amount}
              onInputChange={onInputChange}
              onMaxClick={onMaxClick}
              onTokenSelect={showSelectTokenMenu}
            />
            {hasError && <div className={styles.errorMsg}>{errorMsg}</div>}
            <TransferButton isDisabled={isButtonDisabled} onClick={() => {}} />
            <NetworkSwap isFlipped={isStarknet} onClick={onSwapClick} />
          </NetworkMenu>
          <NetworkMenu networkData={toNetwork} title="to" tokenData={selectedToken} />
        </div>
      </div>
    </Menu>
  );
};
