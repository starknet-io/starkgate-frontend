import {NetworkType} from '@starkware-industries/commons-js-enums';
import React, {Fragment, useEffect, useState} from 'react';

import {ActionType} from '../../../enums';
import {
  useConstants,
  useTransferToL1,
  useTransferToL2,
  useTransferTracking,
  useTransferTranslation
} from '../../../hooks';
import {useLogin} from '../../../providers/AppProvider';
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
  TransferMenuTab,
  LoginWalletButton
} from '../../UI';
import styles from './Transfer.module.scss';

export const Transfer = () => {
  const {
    insufficientBalanceErrorMsg,
    maxDepositErrorMsg,
    tooManyDigitsErrorMsg,
    negativeValueErrorMsg,
    bridgeIsFullErrorMsg,
    bridgeIsFullReadMore
  } = useTransferTranslation();
  const {BRIDGE_FULL_READ_MORE_URL} = useConstants();
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
  const {isLoggedIn} = useLogin();

  const tabs = [
    {
      text: `${NetworkType.L1} -> ${NetworkType.L2}`,
      isActive: action === ActionType.TRANSFER_TO_L2,
      onClick: () => onNetworkTabClick(ActionType.TRANSFER_TO_L2)
    },
    {
      text: `${NetworkType.L2} -> ${NetworkType.L1}`,
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
      if (bridgeIsFull) {
        const readMoreErrorMsg = BridgeIsFullError();
        setErrorMsg(readMoreErrorMsg);
      } else if (isLoading || isZero(amount) || (isL1 && !maxDeposit)) {
        setIsButtonDisabled(true);
      } else {
        validateAmount();
      }
    }
  }, [amount, selectedToken, isL1, bridgeIsFull]);

  const validateAmount = () => {
    let errorMsg = '';
    const {decimals, balance, maxDeposit, symbol} = selectedToken;

    if (afterDecimal(amount) > decimals) {
      errorMsg = tooManyDigitsErrorMsg;
    } else if (isNegative(amount)) {
      errorMsg = negativeValueErrorMsg;
    } else if (Number(amount) > Number(balance)) {
      errorMsg = insufficientBalanceErrorMsg;
    } else if (isL1 && Number(amount) > Number(maxDeposit)) {
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

  const BridgeIsFullError = () => {
    return (
      <Fragment>
        {bridgeIsFullErrorMsg}
        <a
          className={styles.readMore}
          href={BRIDGE_FULL_READ_MORE_URL}
          rel="noreferrer"
          target="_blank"
        >
          {bridgeIsFullReadMore}
        </a>
      </Fragment>
    );
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
        isTarget={!isL1}
        networkName={NetworkType.L1}
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
        isTarget={!isL2}
        networkName={NetworkType.L2}
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
          isInputDisabled={bridgeIsFull}
          tokenData={selectedToken}
          value={amount}
          onInputChange={onInputChange}
          onMaxClick={onMaxClick}
          onTokenSelect={showSelectTokenMenu}
        />
        {(hasInputError || bridgeIsFull) && <div className={styles.errorMsg}>{errorMsg}</div>}
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
        {isLoggedIn ? (
          <TransferButton isDisabled={isButtonDisabled || bridgeIsFull} onClick={onTransferClick} />
        ) : (
          <LoginWalletButton />
        )}
      </div>
    </Menu>
  );
};
