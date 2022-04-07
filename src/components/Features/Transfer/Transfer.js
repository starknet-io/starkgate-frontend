import React, {useEffect, useState} from 'react';
import useBreakpoint from 'use-breakpoint';

import {track, TrackEvent} from '../../../analytics';
import {ActionType, NetworkType, isTablet, Breakpoint} from '../../../enums';
import {useMaxDeposit, useTransferToL1, useTransferToL2} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useL1Token, useL2Token, useTokens} from '../../../providers/TokensProvider';
import {useAmount, useIsL1, useIsL2, useTransfer} from '../../../providers/TransferProvider';
import utils from '../../../utils';
import {
  Loading,
  Menu,
  NetworkMenu,
  NetworkMenuDual,
  NetworkSwap,
  TokenInput,
  TransferButton,
  TransferMenuTab
} from '../../UI';
import {LoadingSize} from '../../UI/Loading/Loading.enums';
import styles from './Transfer.module.scss';
import {
  INSUFFICIENT_BALANCE_ERROR_MSG,
  MAX_DEPOSIT_ERROR_MSG,
  NEGATIVE_VALUE_ERROR_MSG,
  TOO_MANY_DIGITS_ERROR_MSG
} from './Transfer.strings';

export const Transfer = () => {
  const [isL1, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();
  const [amount, setAmount] = useAmount();
  const [hasInputError, setHasInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {showSelectTokenMenu} = useMenu();
  const {selectToken, selectedToken, action} = useTransfer();
  const {tokens, updateTokenBalance} = useTokens();
  const transferToL2 = useTransferToL2();
  const transferToL1 = useTransferToL1();
  const getL1Token = useL1Token();
  const getL2Token = useL2Token();
  const maxDeposit = useMaxDeposit();
  const {breakpoint} = useBreakpoint(Breakpoint);

  useEffect(() => {
    if (!selectedToken) {
      selectToken(tokens[0].symbol);
    }
  }, []);

  useEffect(() => {
    if (selectedToken) {
      setHasInputError(false);
      if (selectedToken.isLoading || utils.number.isZero(amount) || (isL1 && !maxDeposit)) {
        setIsButtonDisabled(true);
      } else {
        validateAmount();
      }
    }
  }, [amount, selectedToken, maxDeposit, isL1]);

  const validateAmount = () => {
    let errorMsg = '';

    if (utils.number.afterDecimal(amount) > selectedToken.decimals) {
      errorMsg = TOO_MANY_DIGITS_ERROR_MSG;
    } else if (utils.number.isNegative(amount)) {
      errorMsg = NEGATIVE_VALUE_ERROR_MSG;
    } else if (amount > selectedToken.balance) {
      errorMsg = INSUFFICIENT_BALANCE_ERROR_MSG;
    } else if (isL1 && amount > maxDeposit) {
      errorMsg = MAX_DEPOSIT_ERROR_MSG;
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
    try {
      track(TrackEvent.TRANSFER.MAX_CLICK);
      setAmount(String(Math.min(selectedToken.balance, isL1 ? Number(maxDeposit) : Infinity)));
    } catch (ex) {
      setAmount(selectedToken.balance);
    }
  };

  const onInputChange = event => {
    setAmount(event.target.value);
  };

  const onSwapClick = () => {
    track(TrackEvent.TRANSFER.SWAP_NETWORK);
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
    return Object.values(ActionType).map((tab, index) => {
      return (
        <TransferMenuTab
          key={index}
          isActive={action === tab}
          text={tab === ActionType.TRANSFER_TO_L2 ? NetworkType.L1.name : NetworkType.L2.name}
          onClick={() => onNetworkTabClick(tab)}
        />
      );
    });
  };

  const renderL1Network = () => {
    const tokenData = getL1Token(selectedToken.symbol);
    return (
      <NetworkMenu
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
        isTarget={!isL2}
        networkData={NetworkType.L2}
        tokenData={tokenData}
        onRefreshClick={onRefreshTokenBalanceClick}
      >
        {isL2 && renderTransferInput()}
      </NetworkMenu>
    );
  };

  const renderL1L2Networks = () => {
    const l1TokenData = getL1Token(selectedToken.symbol);
    const l2TokenData = getL2Token(selectedToken.symbol);
    return (
      <NetworkMenuDual
        fromNetworkData={isL1 ? NetworkType.L1 : NetworkType.L2}
        fromTokenData={isL1 ? l1TokenData : l2TokenData}
        toNetworkData={isL1 ? NetworkType.L2 : NetworkType.L1}
        toTokenData={isL1 ? l2TokenData : l1TokenData}
        onRefreshClick={onRefreshTokenBalanceClick}
      >
        {renderTransferInput()}
      </NetworkMenuDual>
    );
  };

  const renderTransferInput = () => {
    return (
      <>
        <TokenInput
          hasError={hasInputError}
          tokenData={selectedToken}
          value={amount}
          onInputChange={onInputChange}
          onMaxClick={onMaxClick}
          onTokenSelect={showSelectTokenMenu}
        />
        {hasInputError && <div className={styles.errorMsg}>{errorMsg}</div>}
        <TransferButton isDisabled={isButtonDisabled} onClick={onTransferClick} />
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
        {selectedToken && isTablet(breakpoint) ? (
          <div className={styles.networks}>{renderL1L2Networks()}</div>
        ) : (
          selectedToken && (
            <>
              {isL1 ? renderL1Network() : renderL2Network()}
              <NetworkSwap isFlipped={isL2} onClick={onSwapClick} />
              {isL1 ? renderL2Network() : renderL1Network()}
            </>
          )
        )}
      </div>
    </Menu>
  );
};
