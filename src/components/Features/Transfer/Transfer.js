import {NetworkType} from '@starkware-industries/commons-js-enums';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {
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
  NetworkMenu,
  NetworkSwap,
  TokenInput,
  TransferButton,
  LoginWalletButton,
  MenuBackground
} from '../../UI';
import styles from './Transfer.module.scss';

export const Transfer = ({onNetworkSwap}) => {
  const {
    insufficientBalanceErrorMsg,
    maxDepositErrorMsg,
    tooManyDigitsErrorMsg,
    negativeValueErrorMsg
  } = useTransferTranslation();
  const [trackMaxClick] = useTransferTracking();
  const [isL1] = useIsL1();
  const [isL2] = useIsL2();
  const [amount, setAmount] = useAmount();
  const [hasInputError, setHasInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {showSelectTokenMenu} = useMenu();
  const {selectToken, selectedToken} = useTransfer();
  const {tokens, updateTokenBalance} = useTokens();
  const {bridgeIsFull} = useBridgeIsFull();
  const transferToL2 = useTransferToL2();
  const transferToL1 = useTransferToL1();
  const getL1Token = useL1Token();
  const getL2Token = useL2Token();
  const {isLoggedIn} = useLogin();

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

  const onTransferClick = async () => (isL1 ? transferToL2(amount) : transferToL1(amount));

  const onRefreshTokenBalanceClick = () => {
    updateTokenBalance(selectedToken.symbol);
  };

  const renderL1Network = () => {
    const tokenData = getL1Token(selectedToken.symbol);
    return (
      <NetworkMenu
        isDisabled={bridgeIsFull}
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
        isDisabled={bridgeIsFull}
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
          isInputDisabled={bridgeIsFull || !isLoggedIn}
          tokenData={selectedToken}
          value={amount}
          onInputChange={onInputChange}
          onMaxClick={onMaxClick}
          onTokenSelect={showSelectTokenMenu}
        />
        {hasInputError && <div className={styles.errorMsg}>{errorMsg}</div>}
      </>
    );
  };

  return (
    <>
      {!selectedToken && (
        <center>
          <Loading size={LoadingSize.XL} />
        </center>
      )}
      {selectedToken && (
        <>
          <MenuBackground>{isL1 ? renderL1Network() : renderL2Network()}</MenuBackground>
          <NetworkSwap isFlipped={isL2} onClick={onNetworkSwap} />
          <MenuBackground>{isL1 ? renderL2Network() : renderL1Network()}</MenuBackground>
          {isLoggedIn ? (
            <TransferButton
              hasInputError={hasInputError}
              isDisabled={isButtonDisabled || bridgeIsFull}
              onClick={onTransferClick}
            />
          ) : (
            <LoginWalletButton />
          )}
        </>
      )}
    </>
  );
};

Transfer.propTypes = {
  onNetworkSwap: PropTypes.func
};
