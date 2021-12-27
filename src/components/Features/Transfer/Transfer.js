import React, {useEffect, useState} from 'react';

import {ActionType, NetworkType} from '../../../enums';
import {useTransfer} from '../../../hooks';
import {useEthereumToken, useStarknetToken, useTokens} from '../../../providers/TokensProvider';
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
import {
  useAmount,
  useIsEthereum,
  useIsStarknet,
  useTransferActions,
  useTransferData
} from './Transfer.hooks';
import styles from './Transfer.module.scss';
import {INSUFFICIENT_BALANCE_ERROR_MSG} from './Transfer.strings';

export const Transfer = () => {
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();
  const [amount, setAmount] = useAmount();
  const [hasInputError, setHasInputError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {showSelectTokenMenu} = useBridgeActions();
  const {selectedToken, action} = useTransferData();
  const {selectToken} = useTransferActions();
  const {transferTokenToStarknet, transferTokenFromStarknet, isLoading} = useTransfer();
  const {tokens} = useTokens();
  const getEthereumToken = useEthereumToken();
  const getStarknetToken = useStarknetToken();

  useEffect(() => {
    if (!selectedToken) {
      selectToken(tokens[0].symbol);
    }
  }, []);

  useEffect(() => {
    if (selectedToken) {
      setHasInputError(false);
      if (selectedToken.isLoading || Math.ceil(amount) === 0) {
        setIsButtonDisabled(true);
      } else {
        if (amount > selectedToken.balance) {
          setHasInputError(true);
          setIsButtonDisabled(true);
        } else {
          setIsButtonDisabled(false);
        }
      }
    }
  }, [amount, selectedToken]);

  const onMaxClick = () => {
    setAmount(selectedToken.balance);
  };

  const onInputChange = event => {
    setAmount(event.target.value);
  };

  const onSwapClick = () => {
    isStarknet ? setEthereum() : setStarknet();
  };

  const onTransferClick = async () =>
    isEthereum ? transferTokenToStarknet(amount) : transferTokenFromStarknet(amount);

  const renderTabs = () => {
    return Object.values(ActionType).map((tab, index) => {
      return (
        <TransferMenuTab
          key={index}
          isActive={action === tab}
          text={
            tab === ActionType.TRANSFER_TO_STARKNET
              ? NetworkType.ETHEREUM.name
              : NetworkType.STARKNET.name
          }
          onClick={() => action !== tab && onSwapClick()}
        />
      );
    });
  };

  const renderEthereumNetwork = () => {
    const tokenData = getEthereumToken(selectedToken.symbol);
    return (
      <NetworkMenu isTarget={!isEthereum} networkData={NetworkType.ETHEREUM} tokenData={tokenData}>
        {isEthereum && renderTransferInput()}
      </NetworkMenu>
    );
  };

  const renderStarknetNetwork = () => {
    const tokenData = getStarknetToken(selectedToken.symbol);
    return (
      <NetworkMenu isTarget={!isStarknet} networkData={NetworkType.STARKNET} tokenData={tokenData}>
        {isStarknet && renderTransferInput()}
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
        {hasInputError && <div className={styles.errorMsg}>{INSUFFICIENT_BALANCE_ERROR_MSG}</div>}
        <TransferButton
          isDisabled={isButtonDisabled}
          isLoading={isLoading}
          onClick={onTransferClick}
        />
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
            {isEthereum ? renderEthereumNetwork() : renderStarknetNetwork()}
            <NetworkSwap isFlipped={isStarknet} onClick={onSwapClick} />
            {isEthereum ? renderStarknetNetwork() : renderEthereumNetwork()}
          </>
        )}
      </div>
    </Menu>
  );
};
