import React, {useEffect, useState} from 'react';

import {NetworkType} from '../../../../enums';
import {useTransferToStarknet} from '../../../../hooks';
import {useTokens} from '../../../../providers/TokensProvider/hooks';
import {isEth} from '../../../../utils';
import {
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal
} from '../../ModalProvider/ModalProvider.hooks';
import {useAmount, useTransferData} from '../Transfer/Transfer.hooks';
import {NetworkMenu} from '../index';
import {TRANSFER_TO_STARKNET_MODAL_TITLE} from './EthereumNetwork.strings';

export const EthereumNetwork = () => {
  const {isEthereum, selectedEthereumToken} = useTransferData();
  const {ethereumTokens} = useTokens();
  const [tokenData, setTokenData] = useState(selectedEthereumToken || ethereumTokens[0]);
  const [amount, , clearAmount] = useAmount();
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal();

  useEffect(() => {
    setTokenData(selectedEthereumToken || ethereumTokens[0]);
  }, [ethereumTokens]);

  const {transferEthToStarknet, transferTokenToStarknet, data, error, isLoading, progress} =
    useTransferToStarknet(tokenData);

  useEffect(() => {
    if (isLoading) {
      progress && showProgressModal(TRANSFER_TO_STARKNET_MODAL_TITLE, progress.message);
    } else if (error) {
      // TODO: show error modal
      hideModal();
    } else if (data) {
      const [receipt, event] = data;
      clearAmount();
      showTransactionSubmittedModal(receipt.transactionHash);
      // TODO: add tx to store and calc tx hash from msg hash
    }
  }, [progress, data, error, isLoading, amount]);

  const onTransferClick = async () =>
    isEth(tokenData) ? transferEthToStarknet(amount) : transferTokenToStarknet(amount);

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
