import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {Badge} from '../../../UI';
import {useBridgeActions} from '../../Bridge/Bridge.hooks';
import {NetworkTitle} from '../NetworkTitle/NetworkTitle';
import {TokenBalance} from '../TokenBalance/TokenBalance';
import {TokenInput} from '../TokenInput/TokenInput';
import {useAmount} from '../Transfer/Transfer.hooks';
import {TransferButton} from '../TransferButton/TransferButton';
import styles from './NetworkMenu.module.scss';
import {FROM, INSUFFICIENT_BALANCE_ERROR_MSG, TO} from './NetworkMenu.strings';

export const NetworkMenu = ({
  networkData,
  tokenData,
  isTarget,
  isTransferring,
  onTransferClick,
  children
}) => {
  return (
    <div className={styles.networkMenu}>
      <Badge text={isTarget ? TO : FROM} />
      <div className={styles.networkContainer}>
        <NetworkTitle networkData={networkData} />
        <TokenBalance tokenData={tokenData} />
      </div>
      <div className={styles.transferContainer}>
        {!isTarget && (
          <TransferContainer
            isTransferring={isTransferring}
            tokenData={tokenData}
            onTransferClick={onTransferClick}
          />
        )}
      </div>
      {children}
    </div>
  );
};

NetworkMenu.propTypes = {
  networkData: PropTypes.object,
  tokenData: PropTypes.object,
  isTarget: PropTypes.bool,
  isTransferring: PropTypes.bool,
  onTransferClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const TransferContainer = ({tokenData, isTransferring, onTransferClick}) => {
  const [amount, setAmount] = useAmount();
  const {showSelectTokenMenu} = useBridgeActions();
  const [hasInputError, setHasInputError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {balance} = tokenData;

  useEffect(() => {
    setHasInputError(false);
    if (Math.ceil(amount) === 0) {
      setIsButtonDisabled(true);
    } else {
      if (amount > balance) {
        setHasInputError(true);
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    }
  }, [amount, balance]);

  const onMaxClick = () => {
    setAmount(balance);
  };

  const onInputChange = event => {
    setAmount(event.target.value);
  };

  return (
    <>
      <TokenInput
        hasError={hasInputError}
        tokenData={tokenData}
        value={amount}
        onInputChange={onInputChange}
        onMaxClick={onMaxClick}
        onTokenSelect={showSelectTokenMenu}
      />
      {hasInputError && <div className={styles.errorMsg}>{INSUFFICIENT_BALANCE_ERROR_MSG}</div>}
      <TransferButton
        isDisabled={isButtonDisabled}
        isLoading={isTransferring}
        onClick={onTransferClick}
      />
    </>
  );
};

TransferContainer.propTypes = {
  tokenData: PropTypes.object,
  isTransferring: PropTypes.bool,
  onTransferClick: PropTypes.func
};
