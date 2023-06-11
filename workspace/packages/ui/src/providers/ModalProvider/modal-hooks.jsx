import {useCallback, useContext} from 'react';

import {ReactComponent as AlertIcon} from '@assets/svg/alert-circle.svg';
import {ErrorModal} from '@components/Modal/ErrorModal/ErrorModal';
import {ModalType} from '@components/Modal/Modal/Modal';
import {ModalHeaderWithIcon} from '@components/Modal/ModalHeaderWithIcon/ModalHeaderWithIcon';

import {ModalContext} from './modal-context';

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

export const useErrorModal = () => {
  const {showModal} = useContext(ModalContext);
  const {buttonProps, containerStyle} = MODAL_HEADER_WITH_ICON_STYLE;

  return useCallback(
    (title, text) => {
      showModal({
        header: {
          components: [
            {
              component: ModalHeaderWithIcon,
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
              component: ErrorModal,
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
