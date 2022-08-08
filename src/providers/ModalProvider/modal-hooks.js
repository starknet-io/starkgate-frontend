import {useCallback, useContext} from 'react';

import {ModalType} from '../../components/UI';
import {useOnboardingModalTranslation, useTransactionSubmittedModalTranslation} from '../../hooks';
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

export const useProgressModal = (steps = []) => {
  const {showModal} = useContext(ModalContext);

  return useCallback(
    (title, message, activeStep = 0, type = ModalType.INFO) => {
      showModal({
        header: {
          title,
          components: steps.length > 0 && [
            {
              path: 'UI/Stepper/Stepper',
              props: {
                steps,
                activeStep
              }
            }
          ]
        },
        body: {
          components: [
            {
              path: 'UI/Modal/ProgressModal/ProgressModal',
              props: {
                message
              }
            }
          ]
        },
        type
      });
    },
    [showModal]
  );
};

export const useTransactionSubmittedModal = steps => {
  const {showModal} = useContext(ModalContext);
  const {titleTxt} = useTransactionSubmittedModalTranslation();

  return useCallback(
    transfer => {
      showModal({
        header: {
          title: titleTxt,
          icon: 'icons/rocket.svg',
          components: [
            {
              path: 'UI/Stepper/Stepper',
              props: {
                steps,
                activeStep: steps.length
              }
            }
          ]
        },
        body: {
          components: [
            {
              path: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModal',
              props: {
                transfer
              }
            }
          ]
        },
        footer: {
          withButtons: true,
          components: [
            {
              path: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModalButton',
              props: {
                transfer
              }
            }
          ]
        }
      });
    },
    [showModal]
  );
};

export const useErrorModal = () => {
  const {showModal} = useContext(ModalContext);

  return useCallback(
    (title, text) => {
      showModal({
        header: {
          title
        },
        body: {
          text
        },
        footer: {
          withButtons: true
        },
        type: ModalType.ERROR
      });
    },
    [showModal]
  );
};

export const useOnboardingModal = () => {
  const {showModal} = useContext(ModalContext);
  const {titleTxt} = useOnboardingModalTranslation();

  return useCallback(() => {
    showModal({
      header: {
        title: titleTxt
      },
      body: {
        components: [
          {
            path: 'UI/Modal/OnboardingModal/OnboardingModal'
          }
        ]
      },
      footer: {
        withButtons: true
      }
    });
  }, [showModal]);
};

export const useLoginModal = () => {
  const {showModal} = useContext(ModalContext);

  return useCallback(
    (networkName = 'Ethereum') => {
      showModal({
        withHeader: false,
        body: {
          components: [
            {
              path: 'UI/Modal/LoginModal/LoginModal',
              props: {networkName}
            }
          ]
        },
        containerStyle: {
          background: 'unset'
        }
      });
    },
    [showModal]
  );
};
