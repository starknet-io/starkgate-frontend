import React, {useEffect, useState} from 'react';

import {track, TrackEvent} from '../../../analytics';
import {ActionType, NetworkType} from '../../../enums';
import {useMaxDeposit, useTransferToL1, useTransferToL2} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useProgressModal, useTransactionSubmittedModal} from '../../../providers/ModalProvider';
import {useL1Token, useL2Token, useTokens} from '../../../providers/TokensProvider';
import {useAmount, useIsL1, useIsL2, useTransfer} from '../../../providers/TransferProvider';
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
import styles from './Transfer.module.scss';
import {INSUFFICIENT_BALANCE_ERROR_MSG, MAX_DEPOSIT_ERROR_MSG} from './Transfer.strings';

export const Transfer = () => {
  const [isL1, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();
  const [amount, setAmount] = useAmount();
  const [hasInputError, setHasInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {showSelectTokenMenu} = useMenu();
  const {selectToken, selectedToken, action, symbol} = useTransfer();
  const {tokens, updateTokenBalance} = useTokens();
  const transferToL2 = useTransferToL2();
  const transferToL1 = useTransferToL1();
  const getL1Token = useL1Token();
  const getL2Token = useL2Token();
  const maxDeposit = useMaxDeposit();

  const show = useTransactionSubmittedModal();

  // useEffect(() => {
  //   show({
  //     id: 'de007d52-c5b1-4717-ba5b-f37b9bef8c50',
  //     timestamp: 1648996087509,
  //     type: 1,
  //     sender: '0x9B1239B1bd98436f15980Ab05456a0efe162AE4C',
  //     recipient: '0x573d6c01f64dd68d20b0d62f98ce19fcf387c8fddedfff4a5cede84490f73ed',
  //     name: 'Ether',
  //     symbol: 'ETH',
  //     amount: '0.01',
  //     l1hash: '0x43175d756534d27ecd09e4ef04d5cb28c246a6b80bb9bf30dad41f8e8de698c1',
  //     l2hash: '0x7ca258279bcce6273f94480ce282e231e6b90550e81574d5a83e72107acea91',
  //     status: 'ACCEPTED_ON_L2',
  //     lastChecked: '0x591e857d5c0046628cca4dfebd8b0761c7883788cecc8b2c98b69908f5c8fab'
  //   });
  //   // show({
  //   //   "id": "de007d52-c5b1-4717-ba5b-f37b9bef8c50",
  //   //   "timestamp": 1648996087509,
  //   //   "type": 1,
  //   //   "sender": "0x9B1239B1bd98436f15980Ab05456a0efe162AE4C",
  //   //   "recipient": "0x573d6c01f64dd68d20b0d62f98ce19fcf387c8fddedfff4a5cede84490f73ed",
  //   //   "name": "Ether",
  //   //   "symbol": "ETH",
  //   //   "amount": "0.01",
  //   //   "l1hash": "0x43175d756534d27ecd09e4ef04d5cb28c246a6b80bb9bf30dad41f8e8de698c1",
  //   //   "l2hash": "0x7ca258279bcce6273f94480ce282e231e6b90550e81574d5a83e72107acea91",
  //   //   "status": "NOT_RECEIVED",
  //   //   "lastChecked": "0x203de8ede06f6cb6096fd391725ffdc87184fa3d7ce5cce3fe4192cd081f637"
  //   // });
  // }, []);

  useEffect(() => {
    if (!selectedToken) {
      selectToken(tokens[0].symbol);
    }
  }, []);

  useEffect(() => {
    if (selectedToken) {
      setHasInputError(false);
      if (selectedToken.isLoading || Math.ceil(amount) === 0 || (isL1 && !maxDeposit)) {
        setIsButtonDisabled(true);
      } else {
        if (amount > selectedToken.balance) {
          setHasInputError(true);
          setErrorMsg(INSUFFICIENT_BALANCE_ERROR_MSG);
          setIsButtonDisabled(true);
        } else if (isL1 && amount > maxDeposit) {
          setHasInputError(true);
          setErrorMsg(MAX_DEPOSIT_ERROR_MSG);
          setIsButtonDisabled(true);
        } else {
          setIsButtonDisabled(false);
        }
      }
    }
  }, [amount, selectedToken, maxDeposit, isL1]);

  const onMaxClick = () => {
    try {
      track(TrackEvent.TRANSFER.MAX_CLICK);
      setAmount(String(Math.min(selectedToken.balance, Number(maxDeposit))));
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
