import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ModalType} from '../../UI/Modal/Modal/Modal.constants';
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

export const useProgressModal = () => {
  const dispatch = useDispatch();
  return useCallback(
    (title, message, type = ModalType.INFO) => {
      dispatch(
        showModalAction({
          componentPath: 'UI/Modal/ProgressModal/ProgressModal',
          componentProps: {
            message
          },
          title,
          type
        })
      );
    },
    [dispatch]
  );
};

export const useTransactionSubmittedModal = () => {
  const dispatch = useDispatch();
  return useCallback(
    tx => {
      dispatch(
        showModalAction({
          componentPath: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModal',
          componentProps: {
            tx
          },
          title: 'Transaction submitted',
          isClosable: true
        })
      );
    },
    [dispatch]
  );
};

export const useErrorModal = title => {
  const dispatch = useDispatch();
  return useCallback(
    body => {
      dispatch(
        showModalAction({
          title,
          body,
          isClosable: true,
          type: ModalType.ERROR
        })
      );
    },
    [dispatch]
  );
};
