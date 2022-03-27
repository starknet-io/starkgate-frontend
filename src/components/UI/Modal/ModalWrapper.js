import React, {lazy, Suspense} from 'react';

import {useHideModal, useModal} from '../../../providers/ModalProvider';
import {LoadingSize} from '../Loading/Loading.enums';
import {Loading, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from '../index';

export const ModalWrapper = () => {
  const modal = useModal();
  const handleOnClose = useHideModal();
  const CustomComponent = lazy(() => import(`../../${modal.componentPath}`));

  return (
    <Modal show={modal.show} size={modal.size} type={modal.type}>
      <ModalHeader isClosable={modal.isClosable} type={modal.type} onClose={handleOnClose}>
        {modal.title && <ModalTitle>{modal.title}</ModalTitle>}
      </ModalHeader>
      <ModalBody type={modal.type}>
        <Suspense fallback={<Loading size={LoadingSize.LARGE} />}>
          {modal.componentPath ? <CustomComponent {...modal.componentProps} /> : modal.body}
        </Suspense>
      </ModalBody>
      {modal.withButtons && <ModalFooter onClose={handleOnClose} {...modal} />}
    </Modal>
  );
};
