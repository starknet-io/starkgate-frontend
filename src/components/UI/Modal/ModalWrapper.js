import React, {lazy, Suspense} from 'react';

import {useHideModal, useModal} from '../../../providers/ModalProvider';
import {LoadingSize} from '../Loading/Loading.enums';
import {Loading, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from '../index';
import {ModalText} from './ModalText/ModalText';

export const ModalWrapper = () => {
  const modal = useModal();
  const handleOnClose = useHideModal();
  const CustomComponent = lazy(() => import(`../../${modal.componentPath}`));
  const CustomHeaderComponent = lazy(() => import(`../../${modal.headerComponentPath}`));

  return (
    <Modal show={modal.show} size={modal.size} type={modal.type}>
      <ModalHeader type={modal.type}>
        <Suspense fallback={<Loading size={LoadingSize.LARGE} />}>
          {modal.headerComponentPath && <CustomHeaderComponent {...modal.headerComponentProps} />}
        </Suspense>
        {modal.title && <ModalTitle>{modal.title}</ModalTitle>}
      </ModalHeader>
      <ModalBody type={modal.type}>
        <Suspense fallback={<Loading size={LoadingSize.LARGE} />}>
          {modal.componentPath ? (
            <CustomComponent {...modal.componentProps} />
          ) : (
            <ModalText>{modal.body}</ModalText>
          )}
        </Suspense>
      </ModalBody>
      {modal.withButtons && <ModalFooter type={modal.type} onClose={handleOnClose} {...modal} />}
    </Modal>
  );
};
