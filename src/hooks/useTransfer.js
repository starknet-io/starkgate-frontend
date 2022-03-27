import {
  useErrorModal,
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal
} from '../providers/ModalProvider';
import {useTokens} from '../providers/TokensProvider';
import {useAmount} from '../providers/TransferProvider';
import {useTransfersLog} from '../providers/TransfersLogProvider';

export const useTransfer = () => {
  const showProgressModal = useProgressModal();
  const showErrorModal = useErrorModal();
  const hideModal = useHideModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal();
  const {addTransfer} = useTransfersLog();
  const {updateTokenBalance} = useTokens();
  const [, , clearAmount] = useAmount();

  const handleProgress = progress => {
    showProgressModal(progress.type, progress.message);
  };

  const handleError = error => {
    hideModal();
    showErrorModal(error.type, error.message);
  };

  const handleData = data => {
    addTransfer(data);
    showTransactionSubmittedModal(data);
    updateTokenBalance(data.symbol);
    clearAmount();
  };

  return {
    handleProgress,
    handleError,
    handleData
  };
};
