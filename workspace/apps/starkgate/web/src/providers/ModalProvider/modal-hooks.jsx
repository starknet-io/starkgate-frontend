import {useCallback, useContext, useEffect} from 'react';

import {ReactComponent as AlertIcon} from '@assets/svg/icons/alert-circle.svg';
import {ReactComponent as WarningIcon} from '@assets/svg/icons/warning-circle.svg';
import {
  useBlockedAddressModalTranslation,
  useOnboardingModalTranslation,
  useUnsupportedModalTranslation
} from '@hooks';
import {useL2Wallet} from '@providers';
import {NetworkType, isConnecting} from '@starkware-webapps/enums';
import {usePrevious} from '@starkware-webapps/ui';
import {ModalSize, ModalType} from '@ui';

import {ModalContext} from './modal-context';

const modules = import.meta.glob([
  '../../components/UI/Modal/**/*.jsx',
  '../../components/UI/Stepper/Stepper.jsx'
]);

const importComponent = modulePath => modules[`../../components/UI/${modulePath}.jsx`];

const TRANSACTION_MODAL_STYLE = {
  containerStyle: {
    width: '495px',
    padding: '32px'
  },
  buttonProps: {
    height: '48px',
    style: {
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '18px',
      margin: '8px 8px'
    }
  }
};

const MODAL_HEADER_WITH_ICON_STYLE = {
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
  const {containerStyle} = TRANSACTION_MODAL_STYLE;

  return useCallback(
    (title, message, activeStep = 0, type = ModalType.INFO) => {
      showModal({
        header: {
          components: steps.length > 0 && [
            {
              import: importComponent('Stepper/Stepper'),
              props: {
                steps,
                activeStep
              }
            },
            {
              import: importComponent(
                'Modal/ProgressModal/ProgressModalHeader/ProgressModalHeader'
              ),
              props: {
                title
              }
            }
          ]
        },
        body: {
          components: [
            {
              import: importComponent('Modal/ProgressModal/ProgressModalBody/ProgressModalBody'),
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
  const {containerStyle, buttonProps} = TRANSACTION_MODAL_STYLE;

  return useCallback(
    transfer => {
      showModal({
        header: {
          components: [
            {
              import: importComponent('Stepper/Stepper'),
              props: {
                steps,
                activeStep: steps.length
              }
            },
            {
              import: importComponent(
                'Modal/TransactionSubmittedModal/TransactionSubmittedModalHeader/TransactionSubmittedModalHeader'
              ),
              props: {
                transfer
              }
            }
          ]
        },
        body: {
          components: [
            {
              import: importComponent(
                'Modal/TransactionSubmittedModal/TransactionSubmittedModalBody/TransactionSubmittedModalBody'
              ),
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
              import: importComponent(
                'Modal/TransactionSubmittedModal/TransactionSubmittedModalButton'
              ),
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

export const useUnsupportedModal = () => {
  const showErrorModal = useErrorModal();
  const {titleTxt, bodyTxt} = useUnsupportedModalTranslation();

  return useCallback(() => {
    showErrorModal(titleTxt, bodyTxt, {
      withButtons: false,
      size: ModalSize.AUTO,
      buttonProps: null,
      containerStyle: null
    });
  }, [showErrorModal]);
};

export const useErrorModal = () => {
  const {showModal} = useContext(ModalContext);
  const {buttonProps: defaultButtonProps, containerStyle: defaultContainerStyle} =
    MODAL_HEADER_WITH_ICON_STYLE;

  return useCallback(
    (
      title,
      text,
      {withButtons, size, buttonProps, containerStyle} = {
        withButtons: true,
        size: ModalSize.MEDIUM,
        buttonProps: defaultButtonProps,
        containerStyle: defaultContainerStyle
      }
    ) => {
      showModal({
        header: {
          components: [
            {
              import: importComponent('Modal/ModalHeaderWithIcon/ModalHeaderWithIcon'),
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
              import: importComponent('Modal/ErrorModal/ErrorModal'),
              props: {
                text
              }
            }
          ]
        },
        footer: {
          withButtons,
          buttonProps
        },
        size,
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
  const {buttonProps, containerStyle} = MODAL_HEADER_WITH_ICON_STYLE;

  return useCallback(() => {
    showModal({
      header: {
        components: [
          {
            import: importComponent('Modal/ModalHeaderWithIcon/ModalHeaderWithIcon'),
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
            import: importComponent('Modal/OnboardingModal/OnboardingModal')
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
  const {showModal, show} = useContext(ModalContext);
  const prevShow = usePrevious(show);
  const {status, resetWallet} = useL2Wallet();

  useEffect(() => {
    // reset L2 wallet if the user closed the modal on connecting
    if (prevShow && !show && isConnecting(status)) {
      resetWallet();
    }
  }, [show, status]);

  return useCallback(
    (networkName = NetworkType.L1) => {
      showModal({
        withHeader: false,
        body: {
          components: [
            {
              import: importComponent('Modal/LoginModal/LoginModal'),
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

export const useBlockedAddressModal = () => {
  const {showModal} = useContext(ModalContext);
  const {titleTxt, closeButtonTxt} = useBlockedAddressModalTranslation();
  const {buttonProps, containerStyle} = MODAL_HEADER_WITH_ICON_STYLE;

  return useCallback(
    account => {
      showModal({
        header: {
          components: [
            {
              import: importComponent('Modal/ModalHeaderWithIcon/ModalHeaderWithIcon'),
              props: {
                icon: WarningIcon,
                title: titleTxt,
                subtitle: account
              }
            }
          ]
        },
        body: {
          components: [
            {
              import: importComponent('Modal/BlockedAddressModal/BlockedAddressModal')
            }
          ]
        },
        footer: {
          withButtons: true,
          buttonProps: {
            ...buttonProps,
            text: closeButtonTxt
          }
        },
        containerStyle
      });
    },
    [showModal]
  );
};
