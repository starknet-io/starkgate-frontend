import {
  useErrorModal,
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal
} from '../providers/ModalProvider';
import {useTokens} from '../providers/TokensProvider';
import {useAmount} from '../providers/TransferProvider';
import {useTransfersLog} from '../providers/TransfersLogProvider';

export const useTransfer = steps => {
  const showProgressModal = useProgressModal(steps);
  const showErrorModal = useErrorModal();
  const hideModal = useHideModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal(steps);
  const {addTransfer, updateTransfer} = useTransfersLog();
  const {updateTokenBalance} = useTokens();
  const [, , clearAmount] = useAmount();

  const handleProgress = progress => {
    showProgressModal(progress.type, progress.message, progress.activeStep);
  };

  const handleError = error => {
    hideModal();
    showErrorModal(error.type, error.message);
  };

  const handleData = transfer => {
    transfer.id ? updateTransfer(transfer) : addTransfer(transfer);
    showTransactionSubmittedModal(transfer);
    updateTokenBalance(transfer.symbol);
    clearAmount();
  };

  return {
    handleProgress,
    handleError,
    handleData
  };
};
