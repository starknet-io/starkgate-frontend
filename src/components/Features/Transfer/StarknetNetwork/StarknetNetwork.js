import React, {useEffect} from 'react';

import {NetworkType} from '../../../../enums';
import {useTransferFromStarknet} from '../../../../hooks/useTransferFromStarknet';
import {useStarknetToken} from '../../../../providers/TokensProvider/hooks';
import {
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal
} from '../../ModalProvider/ModalProvider.hooks';
import {useAmount, useTransferData} from '../Transfer/Transfer.hooks';
import {NetworkMenu} from '../index';

export const StarknetNetwork = () => {
  const [amount, , clearAmount] = useAmount();
  const {isStarknet, selectedToken} = useTransferData();
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal();
  const getStarknetToken = useStarknetToken();
  const tokenData = getStarknetToken(selectedToken.symbol);

  const {transferFromStarknet, data, error, isLoading, progress} =
    useTransferFromStarknet(tokenData);

  useEffect(() => {
    if (isLoading) {
      progress && showProgressModal(progress.type, progress.message);
    } else if (error) {
      // TODO: show error modal
      hideModal();
    } else if (data) {
      const [receipt] = data;
      clearAmount();
      showTransactionSubmittedModal(receipt.transaction_hash);
    }
  }, [progress, data, error, isLoading, amount]);

  const onTransferClick = async () => transferFromStarknet(amount);

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
