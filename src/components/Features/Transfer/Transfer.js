import React, {useEffect, useState} from 'react';

import {ActionType, NetworkType} from '../../../enums';
import {
  useTransferToL1,
  useTransferToL2,
  useTransferTracking,
  useTransferTranslation
} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useL1Token, useL2Token, useTokens} from '../../../providers/TokensProvider';
import {
  useAmount,
  useIsL1,
  useIsL2,
  useBridgeIsFull,
  useTransfer
} from '../../../providers/TransferProvider';
import {afterDecimal, evaluate, isNegative, isZero} from '../../../utils';
import {
  Loading,
  LoadingSize,
  Menu,
  NetworkMenu,
  NetworkSwap,
  TokenInput,
  TransferButton,
  TransferMenuTab
} from '../../UI';
import styles from './Transfer.module.scss';

export const Transfer = () => {
  const {
    insufficientBalanceErrorMsg,
    maxDepositErrorMsg,
    tooManyDigitsErrorMsg,
    negativeValueErrorMsg
  } = useTransferTranslation();
  const [trackMaxClick, trackSwapNetworks] = useTransferTracking();
  const [isL1, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();
  const [amount, setAmount] = useAmount();
  const [hasInputError, setHasInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {showSelectTokenMenu} = useMenu();
  const {selectToken, selectedToken, action} = useTransfer();
  const {tokens, updateTokenBalance} = useTokens();
  const {bridgeIsFull} = useBridgeIsFull();
  const transferToL2 = useTransferToL2();
  const transferToL1 = useTransferToL1();
  const getL1Token = useL1Token();
  const getL2Token = useL2Token();
  const tabs = [
    {
      text: `${NetworkType.L1.name} -> ${NetworkType.L2.name}`,
      isActive: action === ActionType.TRANSFER_TO_L2,
      onClick: () => onNetworkTabClick(ActionType.TRANSFER_TO_L2)
    },
    {
      text: `${NetworkType.L2.name} -> ${NetworkType.L1.name}`,
      isActive: action === ActionType.TRANSFER_TO_L1,
      onClick: () => onNetworkTabClick(ActionType.TRANSFER_TO_L1)
    }
  ];

  useEffect(() => {
    if (!selectedToken) {
      selectToken(tokens[0].symbol);
    }
  }, []);

  useEffect(() => {
    if (selectedToken) {
      const {isLoading, maxDeposit} = selectedToken;
      setHasInputError(false);
      if (isLoading || isZero(amount) || (isL1 && !maxDeposit)) {
        setIsButtonDisabled(true);
      } else {
        validateAmount();
      }
    }
  }, [amount, selectedToken, isL1]);

  const validateAmount = () => {
    let errorMsg = '';
    const {decimals, balance, maxDeposit, symbol} = selectedToken;

    if (afterDecimal(amount) > decimals) {
      errorMsg = tooManyDigitsErrorMsg;
    } else if (isNegative(amount)) {
      errorMsg = negativeValueErrorMsg;
    } else if (amount > balance) {
      errorMsg = insufficientBalanceErrorMsg;
    } else if (isL1 && amount > maxDeposit) {
      errorMsg = evaluate(maxDepositErrorMsg, {maxDeposit, symbol});
    }

    if (errorMsg) {
      setHasInputError(true);
      setErrorMsg(errorMsg);
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const onMaxClick = () => {
    const {balance, maxDeposit} = selectedToken;
    try {
      trackMaxClick();
      setAmount(String(Math.min(balance, isL1 ? Number(maxDeposit) : Infinity)));
    } catch (ex) {
      setAmount(balance);
    }
  };

  const onInputChange = event => {
    setAmount(event.target.value);
  };

  const onSwapClick = () => {
    trackSwapNetworks();
    isL2 ? swapToL1() : swapToL2();
  };

  const onTransferClick = async () => (isL1 ? transferToL2(amount) : transferToL1(amount));

  const onNetworkTabClick = tab => {
    if (action !== tab) {
      onSwapClick();
    }
  };

  const onRefreshTokenBalanceClick = () => {
    updateTokenBalance(selectedToken.symbol);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <TransferMenuTab
          key={index}
          isActive={tab.isActive}
          text={tab.text}
          onClick={tab.onClick}
        />
      );
    });
  };

  const renderL1Network = () => {
    const tokenData = getL1Token(selectedToken.symbol);
    return (
      <NetworkMenu
        isDisabled={bridgeIsFull}
        isTarget={!isL1}
        networkData={NetworkType.L1}
        tokenData={tokenData}
        onRefreshClick={onRefreshTokenBalanceClick}
      >
        {isL1 && renderTransferInput()}
      </NetworkMenu>
    );
  };

  const renderL2Network = () => {
    const tokenData = getL2Token(selectedToken.symbol);
    return (
      <NetworkMenu
        isDisabled={bridgeIsFull}
        isTarget={!isL2}
        networkData={NetworkType.L2}
        tokenData={tokenData}
        onRefreshClick={onRefreshTokenBalanceClick}
      >
        {isL2 && renderTransferInput()}
      </NetworkMenu>
    );
  };

  const renderTransferInput = () => {
    return (
      <>
        <TokenInput
          hasError={hasInputError}
          isDisabled={bridgeIsFull}
          tokenData={selectedToken}
          value={amount}
          onInputChange={onInputChange}
          onMaxClick={onMaxClick}
          onTokenSelect={showSelectTokenMenu}
        />
        {hasInputError && <div className={styles.errorMsg}>{errorMsg}</div>}
        <TransferButton isDisabled={isButtonDisabled || bridgeIsFull} onClick={onTransferClick} />
      </>
    );
  };

  return (
    <Menu>
      <div className={styles.transfer}>
        <div className={styles.tabsContainer}>{renderTabs()}</div>
        {!selectedToken && (
          <center>
            <Loading size={LoadingSize.XL} />
          </center>
        )}
        {selectedToken && (
          <>
            {isL1 ? renderL1Network() : renderL2Network()}
            <NetworkSwap isFlipped={isL2} onClick={onSwapClick} />
            {isL1 ? renderL2Network() : renderL1Network()}
          </>
        )}
      </div>
    </Menu>
  );
};
