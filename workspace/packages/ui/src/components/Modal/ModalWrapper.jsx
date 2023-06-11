import React, {Suspense} from 'react';

import {useHideModal, useModal} from '@providers';

import {DynamicIcon} from '../DynamicIcon/DynamicIcon';
import {Loading, LoadingSize} from '../Loading/Loading';
import {Modal} from './Modal/Modal';
import {ModalBody} from './ModalBody/ModalBody';
import {ModalFooter} from './ModalFooter/ModalFooter';
import {ModalHeader} from './ModalHeader/ModalHeader';
import {ModalText} from './ModalText/ModalText';
import {ModalTitle} from './ModalTitle/ModalTitle';

export const ModalWrapper = () => {
  const modal = useModal();
  const hideModal = useHideModal();

  const {withHeader, header, body, footer} = modal;

  const handleOnClose = () => {
    footer.onClick && footer.onClick();
    hideModal();
  };

  const getComponents = components => {
    return components
      ? components.map(({component, props}) => ({
          component,
          props
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
