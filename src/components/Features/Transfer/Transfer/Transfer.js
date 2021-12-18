import React, {useEffect} from 'react';

import {ActionType, NetworkType} from '../../../../enums';
import {useTransfer} from '../../../../hooks';
import {
  useEthereumToken,
  useStarknetToken,
  useTokens
} from '../../../../providers/TokensProvider/hooks';
import {Loading, Menu} from '../../../UI';
import {LoadingSize} from '../../../UI/Loading/Loading.enums';
import {
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal
} from '../../ModalProvider/ModalProvider.hooks';
import {NetworkMenu} from '../NetworkMenu/NetworkMenu';
import {NetworkSwap} from '../NetworkSwap/NetworkSwap';
import {TransferMenuTab} from '../TransferMenuTab/TransferMenuTab';
import {
  useAmount,
  useIsEthereum,
  useIsStarknet,
  useTransferActions,
  useTransferData
} from './Transfer.hooks';
import styles from './Transfer.module.scss';

export const Transfer = () => {
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();
  const [amount, , clearAmount] = useAmount();
  const {selectedToken, action} = useTransferData();
  const {selectToken} = useTransferActions();
  const tokens = useTokens();
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal();
  const getEthereumToken = useEthereumToken();
  const getStarknetToken = useStarknetToken();
  const {transferTokenToStarknet, transferTokenFromStarknet, data, error, isLoading, progress} =
    useTransfer();

  useEffect(() => {
    !selectedToken && selectToken(tokens[0]);
  }, []);

  useEffect(() => {
    if (isLoading) {
      progress && showProgressModal(progress.type, progress.message);
    } else if (error) {
      // TODO: show error modal
      hideModal();
    } else if (data) {
      const [receipt, event] = data;
      clearAmount();
      showTransactionSubmittedModal(receipt.transactionHash);
    }
  }, [progress, data, error, isLoading, amount]);

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

  const onSwapClick = () => {
    isStarknet ? setEthereum() : setStarknet();
  };

  const onTransferClick = async () => {
    debugger;
    return isEthereum ? transferTokenToStarknet(amount) : transferTokenFromStarknet(amount);
  };

  const renderEthereumNetwork = () => {
    const tokenData = getEthereumToken(selectedToken.symbol);
    return (
      <NetworkMenu
        isTarget={!isEthereum}
        isTransferring={isLoading}
        networkData={NetworkType.ETHEREUM}
        tokenData={tokenData}
        onTransferClick={onTransferClick}
      />
    );
  };

  const renderStarknetNetwork = () => {
    const tokenData = getStarknetToken(selectedToken.symbol);
    return (
      <NetworkMenu
        isTarget={!isStarknet}
        isTransferring={isLoading}
        networkData={NetworkType.STARKNET}
        tokenData={tokenData}
        onTransferClick={onTransferClick}
      />
    );
  };

  return (
    <Menu>
      <div className={styles.transfer}>
        <div className={styles.tabsContainer}>{renderTabs()}</div>
        {!selectedToken && (
          <center>
            <Loading size={LoadingSize.EXTRA_LARGE} />
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
