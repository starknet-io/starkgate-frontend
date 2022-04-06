import {useCallback, useContext} from 'react';

import {ModalType} from '../../components/UI/Modal/Modal/Modal.constants';
import utils from '../../utils';
import {evaluate} from '../../utils/object';
import {ModalContext} from './modal-context';

export const useModal = () => {
  return {
    ...useContext(ModalContext)
  };
};

export const useHideModal = () => {
  const {hideModal} = useContext(ModalContext);

  return useCallback(() => {
    hideModal();
  }, [hideModal]);
};

export const useConnectingWalletModal = () => {
  const {showModal} = useContext(ModalContext);
  const titleTxt = utils.getTranslation('modals.login.title_txt');

  return useCallback(
    (walletName, iconPath) => {
      showModal({
        componentPath: 'UI/Modal/ConnectingWalletModal/ConnectingWalletModal',
        componentProps: {
          walletName,
          iconPath
        },
        title: evaluate(titleTxt, {walletName})
      });
    },
    [showModal]
  );
};

export const useProgressModal = (steps = []) => {
  const {showModal} = useContext(ModalContext);

  return useCallback(
    (title, message, activeStep = 0, type = ModalType.INFO) => {
      showModal({
        headerComponentPath: steps.length > 0 ? 'UI/Stepper/Stepper' : null,
        headerComponentProps:
          steps.length > 0
            ? {
                steps,
                activeStep
              }
            : null,
        componentPath: 'UI/Modal/ProgressModal/ProgressModal',
        componentProps: {
          message
        },
        title,
        type
      });
    },
    [showModal]
  );
};

export const useTransactionSubmittedModal = steps => {
  const {showModal} = useContext(ModalContext);
  const title = utils.getTranslation('modals.transactionSubmitted.title_txt');

  return useCallback(
    transfer => {
      showModal({
        headerComponentPath: 'UI/Stepper/Stepper',
        headerComponentProps: {
          steps,
          activeStep: steps.length
        },
        componentPath: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModal',
        componentProps: {
          transfer
        },
        title,
        withButtons: true
      });
    },
    [showModal]
  );
};

export const useErrorModal = () => {
  const {showModal} = useContext(ModalContext);

  return useCallback(
    (title, body) => {
      showModal({
        title,
        body,
        withButtons: true,
        type: ModalType.ERROR
      });
    },
    [showModal]
  );
};

export const useOnboardingModal = () => {
  const {showModal} = useContext(ModalContext);
  const title = utils.getTranslation('modals.onboarding.title_txt');

  return useCallback(() => {
    showModal({
      componentPath: 'UI/Modal/OnboardingModal/OnboardingModal',
      title,
      withButtons: true
    });
  }, [showModal]);
};
