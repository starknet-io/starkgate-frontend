import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import {NetworkType} from '../../../../enums';
import {useEthereumToken, useTransferToStarknet} from '../../../../hooks';
import {useEthereumTokenBalance} from '../../../../hooks/useTokenBalance';
import {useEthereumWallet} from '../../../../providers/WalletsProvider/hooks';
import {isEth} from '../../../../utils';
import {
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal
} from '../../ModalProvider/ModalProvider.hooks';
import {useAmount, useTransferData} from '../Transfer/Transfer.hooks';
import {NetworkMenu} from '../index';
import {TRANSFER_TO_STARKNET_MODAL_TITLE} from './EthereumNetwork.strings';

export const EthereumNetwork = ({isTarget}) => {
  const {selectedToken} = useTransferData();
  const {account} = useEthereumWallet();
  const [amount, , clearAmount] = useAmount();
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal();
  const ethereumTokenData = useEthereumToken(selectedToken.symbol);
  const getEthereumBalance = useEthereumTokenBalance(ethereumTokenData.tokenAddress, account);

  const {transferEthToStarknet, transferTokenToStarknet, data, error, isLoading, progress} =
    useTransferToStarknet(selectedToken);

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
    isEth(selectedToken) ? transferEthToStarknet(amount) : transferTokenToStarknet(amount);

  return (
    <NetworkMenu
      getBalance={getEthereumBalance}
      isTarget={isTarget}
      isTransferring={isLoading}
      networkData={NetworkType.ETHEREUM}
      onTransferClick={onTransferClick}
    />
  );
};

EthereumNetwork.propTypes = {
  isTarget: PropTypes.bool
};
