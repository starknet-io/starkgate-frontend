import React, {Suspense, lazy} from 'react';

import {useHideModal, useModal} from '@providers';
import {
  DynamicIcon,
  Loading,
  LoadingSize,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalText,
  ModalTitle
} from '@ui';

export const ModalWrapper = () => {
  const modal = useModal();

  const {withHeader, header, body, footer} = modal;
  const hideModal = useHideModal();

  const handleOnClose = () => {
    footer.onClick && footer.onClick();
    hideModal();
  };

  const getComponents = components => {
    return components
      ? components.map(c => ({
          component: lazy(c.import),
          props: c.props
        }))
      : [];
  };

  const renderComponents = (components, fallbackComponent) => {
    return components.length > 0
      ? components.map((c, i) => <c.component key={i} {...c.props} />)
      : fallbackComponent;
  };

  const renderLoading = () => {
    return (
      <div className={'center'}>
        <Loading size={LoadingSize.LARGE} />
      </div>
    );
  };

  const headerComponents = getComponents(header.components);
  const bodyComponents = getComponents(body.components);
  const footerComponents = getComponents(footer.components);

  return (
    <Modal
      containerStyle={modal.containerStyle}
      exitable={modal.exitable}
      hideModal={modal.hideModal}
      show={modal.show}
      size={modal.size}
      type={modal.type}
    >
      {withHeader && (
        <ModalHeader type={modal.type}>
          <Suspense fallback={renderLoading()}>{renderComponents(headerComponents)}</Suspense>
          {header.title && (
            <ModalTitle>
              {header.icon && <DynamicIcon path={header.icon} size={50} />}
              {header.title}
            </ModalTitle>
          )}
        </ModalHeader>
      )}
      <ModalBody type={modal.type}>
        <Suspense fallback={renderLoading()}>
          {renderComponents(bodyComponents, <ModalText>{body.text}</ModalText>)}
        </Suspense>
      </ModalBody>
      {footer.withButtons && (
        <ModalFooter type={modal.type} onClose={handleOnClose} {...footer}>
          <Suspense fallback={renderLoading()}>{renderComponents(footerComponents)}</Suspense>
        </ModalFooter>
      )}
    </Modal>
  );
};
