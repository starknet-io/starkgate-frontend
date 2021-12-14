import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {Badge} from '../../../UI';
import {useBridgeActions} from '../../Bridge/Bridge.hooks';
import {NetworkTitle} from '../NetworkTitle/NetworkTitle';
import {TokenBalance} from '../TokenBalance/TokenBalance';
import {TokenInput} from '../TokenInput/TokenInput';
import {useAmount, useTransferActions, useTransferData} from '../Transfer/Transfer.hooks';
import {TransferButton} from '../TransferButton/TransferButton';
import styles from './NetworkMenu.module.scss';
import {FROM, INSUFFICIENT_BALANCE_ERROR_MSG, TO} from './NetworkMenu.strings';

export const NetworkMenu = ({
  networkData,
  isTarget,
  isTransferring,
  getBalance,
  onTransferClick,
  children
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useAmount();
  const {action, selectedToken} = useTransferData();
  const {selectToken} = useTransferActions();
  const {showSelectTokenMenu} = useBridgeActions();
  const [mounted, setMounted] = useState(true);

  useEffect(async () => {
    if (isTarget || selectedToken.balance === null) {
      try {
        const tokenBalance = await getBalance();
        if (!mounted) return;
        selectToken({...selectedToken, balance: tokenBalance});
        setBalance(tokenBalance);
      } catch (ex) {
        setError(ex);
      }
    } else {
      setBalance(selectedToken.balance);
    }
    return () => setMounted(false);
  }, [action]);

  useEffect(() => {
    if (!isTarget) {
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
    }
  }, [amount, action]);

  const onMaxClick = () => {
    setAmount(selectedToken.balance);
  };

  const onInputChange = event => {
    setAmount(event.target.value);
  };

  return (
    <div className={styles.networkMenu}>
      <Badge text={isTarget ? TO : FROM} />
      <div className={styles.networkContainer}>
        <NetworkTitle networkData={networkData} />
        <TokenBalance balance={balance} symbol={selectedToken.symbol} />
      </div>
      <div className={styles.transferContainer}>
        {!isTarget && (
          <>
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
          </>
        )}
      </div>
      {children}
    </div>
  );
};

NetworkMenu.propTypes = {
  networkData: PropTypes.object,
  isTarget: PropTypes.bool,
  isTransferring: PropTypes.bool,
  getBalance: PropTypes.func,
  onTransferClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
