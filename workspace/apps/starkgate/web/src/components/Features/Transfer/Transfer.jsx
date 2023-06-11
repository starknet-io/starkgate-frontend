import PropTypes from 'prop-types';
import React, {Fragment, useEffect, useState} from 'react';

import {AutoWithdrawal, FastWithdrawal} from '@features';
import {
  useConstants,
  useEnvs,
  useTransferToL1,
  useTransferToL2,
  useTransferTracking,
  useTransferTranslation
} from '@hooks';
import {
  useAmount,
  useBridgeIsFull,
  useIsL1,
  useIsL2,
  useL1Token,
  useL2Token,
  useLogin,
  useMenu,
  useTokens,
  useTransfer
} from '@providers';
import {NetworkType} from '@starkware-webapps/enums';
import {afterDecimal, evaluate, isNegative, isZero} from '@starkware-webapps/utils';
import {
  Link,
  LinkType,
  Loading,
  LoadingSize,
  LoginWalletButton,
  MenuBackground,
  NetworkMenu,
  NetworkSwap,
  TokenInput,
  TransferButton
} from '@ui';

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
  const {selectToken, selectedToken, autoWithdrawal, fastWithdrawal} = useTransfer();
  const {tokens, updateTokenBalance} = useTokens();
  const {bridgeIsFull} = useBridgeIsFull();
  const transferToL2 = useTransferToL2();
  const transferToL1 = useTransferToL1();
  const getL1Token = useL1Token();
  const getL2Token = useL2Token();
  const {isLoggedIn} = useLogin();
  const {ENABLE_AUTO_WITHDRAWAL, ENABLE_FAST_WITHDRAWAL} = useEnvs();

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
        setErrorMsg(<BridgeIsFullError />);
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

  const onTransferClick = async () => {
    isL1
      ? await transferToL2(amount)
      : await transferToL1(
          amount,
          !!selectedToken.autoWithdrawal && autoWithdrawal,
          !!selectedToken.fastWithdrawal && fastWithdrawal
        );
  };

  const onRefreshTokenBalanceClick = () => {
    updateTokenBalance(selectedToken.symbol);
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
          isInputDisabled={bridgeIsFull || !isLoggedIn}
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
          {ENABLE_AUTO_WITHDRAWAL && selectedToken.autoWithdrawal && (
            <AutoWithdrawal checked={autoWithdrawal} disabled={isButtonDisabled} />
          )}
          {ENABLE_FAST_WITHDRAWAL && selectedToken.fastWithdrawal && (
            <FastWithdrawal checked={fastWithdrawal} disabled={isButtonDisabled} />
          )}
          {isLoggedIn ? (
            <TransferButton
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

const BridgeIsFullError = () => {
  const {bridgeIsFullErrorMsg, readMoreTxt} = useTransferTranslation();
  const {STARKGATE_ALPHA_LIMITATIONS_URL} = useConstants();

  return (
    <Fragment>
      {bridgeIsFullErrorMsg}{' '}
      <Link
        className={styles.bridgeIsFullReadMore}
        link={STARKGATE_ALPHA_LIMITATIONS_URL}
        text={readMoreTxt}
        type={LinkType.URL}
      />
    </Fragment>
  );
};
