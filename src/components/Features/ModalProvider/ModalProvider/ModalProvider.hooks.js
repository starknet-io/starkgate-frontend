import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ModalType} from '../../../UI/Modal/Modal/Modal.constants';
import {selectModal} from './ModalProvider.selectors';
import {hideModalAction, showModalAction} from './ModalProvider.slice';

export const useModal = () => ({
  modal: useSelector(selectModal)
});

export const useHideModal = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(hideModalAction());
  }, [dispatch]);
};

export const useWalletConnectionModal = () => {
  const dispatch = useDispatch();
  return useCallback(
    walletName => {
      dispatch(
        showModalAction({
          componentPath: 'Features/ModalProvider/WalletConnectionModal/WalletConnectionModal',
          componentProps: {
            walletName
          },
          title: walletName
        })
      );
    },
    [dispatch]
  );
};

export const useErrorModal = () => {
  const dispatch = useDispatch();
  return useCallback(
    error => {
      dispatch(
        showModalAction({
          title: error.name,
          body: error.message,
          type: ModalType.ERROR
        })
      );
    },
    [dispatch]
  );
};
