import {
  useErrorModal,
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal
} from '../components/Features/ModalProvider/ModalProvider.hooks';
import {useAmount} from '../components/Features/Transfer/Transfer.hooks';
import {useTokens} from '../providers/TokensProvider';
import {useTransfers} from '../providers/TransfersProvider';

export const useTransfer = () => {
  const showProgressModal = useProgressModal();
  const showErrorModal = useErrorModal();
  const hideModal = useHideModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal();
  const {addTransfer} = useTransfers();
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
