import {NetworkType} from '@starkware-industries/commons-js-enums';
import {useFetchData} from '@starkware-industries/commons-js-hooks';
import {
  afterDecimal,
  createHttpClient,
  evaluate,
  isNegative,
  isZero,
  parseFromDecimals,
  promiseHandler
} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React, {Fragment, useEffect, useState} from 'react';

import {
  SPACESHARD_MAINNET_RELAYER_URL_MAINNET,
  SPACESHARD_TESTNET_RELAYER_URL_GOERLI
} from '../../../config/constants';
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
import {useL1Wallet} from '../../../providers/WalletsProvider';
import {getTimestamp} from '../../../utils/timestamp';
import {
  Loading,
  LoadingSize,
  NetworkMenu,
  NetworkSwap,
  TokenInput,
  TransferButton,
  MenuBackground,
  LinkType,
  Link,
  LoginWalletButton
} from '../../UI';
import {OneTxWithdrawal} from '../../UI/OneTxWithdrawal/OneTxWithdrawal';
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
  const [floorTimestamp, setFloorTimestamp] = useState(getTimestamp());
  const [useOneTxWithdrawal, setUseOneTxWithdrawal] = useState(false);
  const {chainId} = useL1Wallet();

  console.log(chainId);

  const fetchGasCostData = useFetchData(async () => {
    if (!isL1 && selectedToken) {
      const httpClient = createHttpClient({
        baseURL:
          chainId === 1
            ? SPACESHARD_MAINNET_RELAYER_URL_MAINNET
            : SPACESHARD_TESTNET_RELAYER_URL_GOERLI
      });

      const {bridgeAddress} = selectedToken;
      const timestamp = Math.floor(new Date().getTime() / 1000);
      // await sleep(3);
      const [result] = await promiseHandler(httpClient.get(`/${bridgeAddress}/${timestamp}`));
      console.log(result);
      if (result) {
        return result.data.result;
      }
      return null;
    }
  }, [selectedToken, isL1, floorTimestamp]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      const ftimestamp = getTimestamp();
      if (floorTimestamp < ftimestamp) {
        setFloorTimestamp(ftimestamp);
      }
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  const onTransferClick = async () =>
    isL1
      ? transferToL2(amount)
      : transferToL1(
          amount,
          useOneTxWithdrawal ? fetchGasCostData.data.relayerAddress : null,
          fetchGasCostData.data.gasCost
        );

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
          {!isL1 && fetchGasCostData.data && (
            <OneTxWithdrawal
              gasCost={parseFromDecimals(fetchGasCostData.data.gasCost, 18)}
              useOneTxWithdrawal={useOneTxWithdrawal}
              setUseOneTxWithdrawal={setUseOneTxWithdrawal}
            ></OneTxWithdrawal>
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
