import {NetworkType} from '@starkware-industries/commons-js-enums';
import {useCallback, useContext} from 'react';

import {ReactComponent as AlertIcon} from '../../assets/svg/icons/alert-circle.svg';
import {ReactComponent as WarningIcon} from '../../assets/svg/icons/warning-circle.svg';
import {ModalType} from '../../components/UI';
import {useOnboardingModalTranslation} from '../../hooks';
import {ModalContext} from './modal-context';

const transactionModalsStyling = {
  containerStyle: {
    padding: '32px',
    width: '495px'
  }
};

const IconedHeaderModalStyling = {
  containerStyle: {
    width: '466px',
    padding: '24px'
  },
  buttonProps: {
    height: '52px',
    style: {
      margin: '0'
    }
  }
};

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
  const {containerStyle} = transactionModalsStyling;

  return useCallback(
    (title, message, activeStep = 0, type = ModalType.INFO) => {
      showModal({
        header: {
          components: steps.length > 0 && [
            {
              path: 'UI/Stepper/Stepper',
              props: {
                steps,
                activeStep
              }
            },
            {
              path: 'UI/Modal/ProgressModal/ProgressModalHeader/ProgressModalHeader',
              props: {
                title
              }
            }
          ]
        },
        body: {
          components: [
            {
              path: 'UI/Modal/ProgressModal/ProgressModalBody/ProgressModalBody',
              props: {
                message
              }
            }
          ]
        },
        type,
        containerStyle
      });
    },
    [showModal]
  );
};

export const useTransactionSubmittedModal = steps => {
  const {showModal} = useContext(ModalContext);

  const {containerStyle} = transactionModalsStyling;
  const buttonProps = {
    height: '48px',
    style: {
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '18px',
      margin: '0 5px'
    }
  };

  return useCallback(
    transfer => {
      showModal({
        header: {
          components: [
            {
              path: 'UI/Stepper/Stepper',
              props: {
                steps,
                activeStep: steps.length
              }
            },
            {
              path: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModalHeader/TransactionSubmittedModalHeader'
            }
          ]
        },
        body: {
          components: [
            {
              path: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModalBody/TransactionSubmittedModalBody',
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
                transfer,
                buttonProps
              }
            }
          ],
          buttonProps
        },
        containerStyle
      });
    },
    [showModal]
  );
};

export const useErrorModal = () => {
  const {showModal} = useContext(ModalContext);
  const {buttonProps, containerStyle} = IconedHeaderModalStyling;

  return useCallback(
    (title, text) => {
      showModal({
        header: {
          components: [
            {
              path: 'UI/Modal/ModalIconHeader/ModalIconHeader',
              props: {
                title,
                icon: AlertIcon
              }
            }
          ]
        },
        body: {
          components: [
            {
              path: 'UI/Modal/ErrorModal/ErrorModal',
              props: {
                text
              }
            }
          ]
        },
        footer: {
          withButtons: true,
          buttonProps
        },
        containerStyle,
        type: ModalType.ERROR
      });
    },
    [showModal]
  );
};

export const useOnboardingModal = () => {
  const {showModal} = useContext(ModalContext);
  const {titleTxt} = useOnboardingModalTranslation();
  const {buttonProps, containerStyle} = IconedHeaderModalStyling;

  return useCallback(() => {
    showModal({
      header: {
        components: [
          {
            path: 'UI/Modal/ModalIconHeader/ModalIconHeader',
            props: {
              icon: WarningIcon,
              title: titleTxt
            }
          }
        ]
      },
      body: {
        components: [
          {
            path: 'UI/Modal/OnboardingModal/OnboardingModal'
          }
        ]
      },
      footer: {
        withButtons: true,
        buttonProps
      },
      containerStyle
    });
  }, [showModal]);
};

export const useLoginModal = () => {
  const {showModal} = useContext(ModalContext);

  return useCallback(
    (networkName = NetworkType.L1) => {
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
          background: 'unset',
          boxShadow: 'unset',
          width: '464px'
        },
        exitable: true
      });
    },
    [showModal]
  );
};
