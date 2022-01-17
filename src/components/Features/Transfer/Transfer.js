import React, {useEffect, useState} from 'react';
import {useAsyncMemo} from 'use-async-memo';

import {maxDeposit} from '../../../api/bridge';
import {ActionType, NetworkType} from '../../../enums';
import {useTokenBridgeContract, useTransferToL1, useTransferToL2} from '../../../hooks';
import {useL1Token, useL2Token, useTokens} from '../../../providers/TokensProvider';
import {evaluate} from '../../../utils';
import {
  Loading,
  Menu,
  NetworkMenu,
  NetworkSwap,
  TokenInput,
  TransferButton,
  TransferMenuTab
} from '../../UI';
import {LoadingSize} from '../../UI/Loading/Loading.enums';
import {useBridgeActions} from '../Bridge/Bridge.hooks';
import {useAmount, useIsL1, useIsL2, useTransferActions, useTransferData} from './Transfer.hooks';
import styles from './Transfer.module.scss';
import {INSUFFICIENT_BALANCE_ERROR_MSG, MAX_AMOUNT_ERROR_MSG} from './Transfer.strings';

export const Transfer = () => {
  const [isL1, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();
  const [amount, setAmount] = useAmount();
  const [maxAmount, setMaxAmount] = useState(null);
  const [hasInputError, setHasInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {showSelectTokenMenu} = useBridgeActions();
  const {selectedToken, action, symbol} = useTransferData();
  const {selectToken} = useTransferActions();
  const transferToL2 = useTransferToL2();
  const transferToL1 = useTransferToL1();
  const {tokens} = useTokens();
  const getL1Token = useL1Token();
  const getL2Token = useL2Token();
  const getTokenBridgeContract = useTokenBridgeContract();

  const memoizedMaxAmount = useAsyncMemo(async () => {
    if (symbol) {
      const {decimals, bridgeAddress} = selectedToken;
      const contract = getTokenBridgeContract(bridgeAddress);
      return await maxDeposit({decimals, contract});
    }
  }, [symbol]);

  useEffect(() => {
    if (!selectedToken) {
      selectToken(tokens[0].symbol);
    }
  }, []);

  useEffect(() => {
    setMaxAmount(isL1 ? memoizedMaxAmount : null);
    if (selectedToken) {
      setHasInputError(false);
      if (selectedToken.isLoading || Math.ceil(amount) === 0 || (isL1 && !maxAmount)) {
        setIsButtonDisabled(true);
      } else {
        if (amount > selectedToken.balance) {
          setHasInputError(true);
          setErrorMsg(INSUFFICIENT_BALANCE_ERROR_MSG);
          setIsButtonDisabled(true);
        } else if (isL1 && amount > maxAmount) {
          setHasInputError(true);
          setErrorMsg(evaluate(MAX_AMOUNT_ERROR_MSG, {maxAmount, symbol}));
          setIsButtonDisabled(true);
        } else {
          setIsButtonDisabled(false);
        }
      }
    }
  }, [amount, selectedToken, memoizedMaxAmount, maxAmount, isL1]);

  const onMaxClick = () => {
    try {
      setAmount(Math.min(selectedToken.balance, Number(memoizedMaxAmount)));
    } catch (ex) {
      setAmount(selectedToken.balance);
    }
  };

  const onInputChange = event => {
    setAmount(event.target.value);
  };

  const onSwapClick = () => {
    isL2 ? swapToL1() : swapToL2();
  };

  const onTransferClick = async () => (isL1 ? transferToL2(amount) : transferToL1(amount));

  const renderTabs = () => {
    return Object.values(ActionType).map((tab, index) => {
      return (
        <TransferMenuTab
          key={index}
          isActive={action === tab}
          text={tab === ActionType.TRANSFER_TO_L2 ? NetworkType.L1.name : NetworkType.L2.name}
          onClick={() => action !== tab && onSwapClick()}
        />
      );
    });
  };

  const renderL1Network = () => {
    const tokenData = getL1Token(selectedToken.symbol);
    return (
      <NetworkMenu isTarget={!isL1} networkData={NetworkType.L1} tokenData={tokenData}>
        {isL1 && renderTransferInput()}
      </NetworkMenu>
    );
  };

  const renderL2Network = () => {
    const tokenData = getL2Token(selectedToken.symbol);
    return (
      <NetworkMenu isTarget={!isL2} networkData={NetworkType.L2} tokenData={tokenData}>
        {isL2 && renderTransferInput()}
      </NetworkMenu>
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
